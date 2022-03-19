/* eslint-disable @typescript-eslint/no-explicit-any */
import * as xml2js from 'xml2js'
import {TypesFloder, packageXML} from './interfaces'
import {notice, setFailed} from '@actions/core'
import {MeatadataDescribe} from './metadata-describe'
import {XMLPCK} from './constants'

export class Metadata {
  _release: any[]
  _components: Map<string, Set<any>>
  _sfUser: string
  _sfUserDeploy: string
  _mDesc: MeatadataDescribe

  constructor(
    release: any[],
    components: Map<string, Set<any>>,
    sfUser: string,
    sfUserDeploy: string
  ) {
    this._sfUser = sfUser
    this._sfUserDeploy = sfUserDeploy
    this._release = release
    this._components = components
    this._mDesc = new MeatadataDescribe(sfUser)
  }

  getPackage(): string {
    const builder = new xml2js.Builder()
    const pckXML: packageXML = XMLPCK
    const xml: any = {}
    const types = []

    for (const type of this._components.keys()) {
      const patInfo: TypesFloder | undefined = this._mDesc
        .getMetadata()
        .get(type)
      const type2 =
        patInfo?.childXmlNames?.length === 1 ? patInfo.childXmlNames[0] : type

      xml[type] = {
        members: [],
        name: type2
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const component of this._components.get(type)) {
        xml[type].members.push(component.DeployManager__FullName__c)
      }
      types.push(xml[type])
    }
    pckXML.Package.types = types

    return builder.buildObject(pckXML)
  }

  getSourceSfdx(): string {
    return `sfdx force:source:retrieve -m "${this.getSfdxComponents().join(
      ', '
    )}"`
  }

  getDeploySfdx(): string {
    const isDestructive = this._release[0].DeployManager__IsDestructive__c
    return `sfdx force:source:${
      isDestructive ? 'delete' : 'deploy'
    } -m "${this.getSfdxComponents().join(', ')}" ${this.getCommandTest()}`
  }

  getGit(): string {
    const isDestructive = this._release[0].DeployManager__IsDestructive__c

    return `git ${isDestructive ? 'rm --force' : 'add'} ${this.getGitList()}`
  }

  getSfdxComponents(): string[] {
    const commands: string[] = []

    for (const type of this._components.keys()) {
      const patInfo: TypesFloder | undefined = this._mDesc
        .getMetadata()
        .get(type)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const component of this._components.get(type)) {
        const type2 =
          patInfo?.childXmlNames?.length === 1 ? patInfo.childXmlNames[0] : type
        commands.push(`${type2}:${component.DeployManager__FullName__c}`)
      }
    }

    return commands
  }

  getGitList(): string[] {
    const root = 'force-app/main/default/'
    const components: Set<string> = new Set()

    for (const type of this._components.keys()) {
      const patInfo: TypesFloder | undefined = this._mDesc
        .getMetadata()
        .get(type)
      if (patInfo === undefined) {
        setFailed(`There is no metadata definition ${type}`)
        continue
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const record of this._components.get(type)) {
        let file = ''
        const member = record.DeployManager__FullName__c

        if (
          patInfo.inFolder === false &&
          patInfo.metaFile === true &&
          patInfo.suffix !== null
        ) {
          file = `${patInfo.directoryName}/${member}`
          const ext = patInfo.noExtension === true ? '' : `.${patInfo.suffix}`
          components.add(`${root}${file}${ext}`)
          components.add(`${root}${file}.${patInfo.suffix}-meta.xml`)
        } else if (
          patInfo.inFolder === false &&
          patInfo.metaFile === false &&
          patInfo.suffix === null
        ) {
          file = `${patInfo.directoryName}/${member}`
          components.add(`${root}${file}`)
        } else if (
          patInfo.inFolder === false &&
          patInfo.metaFile === false &&
          patInfo.suffix !== null
        ) {
          file = `${patInfo.directoryName}/${patInfo.xmlName}`
          components.add(`${root}${file}.${patInfo.suffix}-meta.xml`)
        } else {
          // eslint-disable-next-line no-console
          console.log(`${patInfo.directoryName}`, member)
          notice(patInfo.directoryName)
        }
      }
    }

    return Array.from(components)
  }

  getCommandTest(): string {
    let arg = ''

    switch (this._release[0].DeployManager__TestOptions__c) {
      case 'Run All Tests': {
        arg = `-l RunAllTestsInOrg`
        break
      }
      case 'Run Specified Tests': {
        arg = `-l RunSpecifiedTests -r "${this._release[0].DeployManager__TestClasses__c}"`
        break
      }
      case 'Run Local Tests': {
        arg = `-l RunLocalTests`
        break
      }
      default: {
        arg = `-l NoTestRun`
        break
      }
    }
    return arg
  }
}
