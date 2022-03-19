/* eslint-disable @typescript-eslint/no-explicit-any */
import * as xml2js from 'xml2js'
import {TypesFloder, packageXML} from './interfaces'
import {XMLPCK, pathsSFDX} from './constants'
import {setFailed} from '@actions/core'

export class Metadata {
  _release: any[]
  _components: Map<string, Set<any>>
  _sfUser: string
  _sfUserDeploy: string

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
  }

  getPackage(): string {
    const builder = new xml2js.Builder()
    const pckXML: packageXML = XMLPCK
    const xml: any = {}
    const types = []

    for (const type of this._components.keys()) {
      const patInfo: TypesFloder | undefined = pathsSFDX.get(type)
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
      const patInfo: TypesFloder | undefined = pathsSFDX.get(type)
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
      const patInfo: TypesFloder | undefined = pathsSFDX.get(type)
      if (patInfo === undefined) {
        setFailed(`There is no metadata definition ${type}`)
        continue
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const record of this._components.get(type)) {
        let file = null
        const member = record.DeployManager__FullName__c

        if (patInfo.directoryNameChild) {
          file = `${patInfo.directoryName}/${member.replace(
            '.',
            `/${patInfo.directoryNameChild}/`
          )}.${patInfo.suffix}-meta.xml`
        } else if (!patInfo.suffix) {
          file = `${patInfo.directoryName}/${member}`
        } else if (patInfo.suffix && !patInfo.noExtension) {
          file = `${patInfo.directoryName}/${member}.${patInfo.suffix}`
        } else if (patInfo.suffix && patInfo.noExtension) {
          file = `${patInfo.directoryName}/${member}`
        } else {
          setFailed(`Invalid type  ${member}`)
        }

        if (!patInfo.directoryNameChild && patInfo.suffix) {
          components.add(
            `${root}${patInfo.directoryName}/${member}.${patInfo.suffix}-meta.xml`
          )
        }
        components.add(`${root}${file}`)
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
