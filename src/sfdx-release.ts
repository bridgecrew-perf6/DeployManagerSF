import * as fs from 'fs'
import * as xml2js from 'xml2js'
import {Member__c, packageXML, queryResult, types} from './interfaces'
import {Git} from './git'
import {Markdown} from './markdown'
import {SfdxUtil} from './sfdx-util'
import {XMLPCK} from './constants'
import {setFailed} from '@actions/core'

export class SfdxRelease {
  getRelease(releaseId: string): unknown {
    const file = `.sfdx/Release${releaseId}.json`

    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
      })

      const releaseJson: queryResult = JSON.parse(data)
      return releaseJson?.result?.records[0]
    } else {
      setFailed('Release file does not exist')
    }
  }
  getPackage(
    releaseId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    releaseInfo: any
  ): {
    xml: string
    markdown: string
    command: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    members: any
    gitCommand: string[]
  } {
    const pck: types[] = []
    const file = `.sfdx/${releaseId}.json`

    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
      })

      const releaseJson: queryResult = JSON.parse(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xml: any = {}
      if (releaseJson?.result?.records) {
        const releaseLst: Member__c[] = releaseJson?.result?.records
        for (const item of releaseLst) {
          if (!xml[item.DeployManager__Type__c]) {
            xml[item.DeployManager__Type__c] = {
              members: [],
              name: item.DeployManager__Type__c
            }
          }
          xml[item.DeployManager__Type__c].members.push(
            item.DeployManager__FullName__c
          )
        }
        //ORDER TYPES
        for (const item in xml) {
          pck.push(xml[item])
        }
      }
      const builder = new xml2js.Builder()
      const pckXML: packageXML = XMLPCK
      pckXML.Package.types = pck
      const theXml = builder.buildObject(pckXML)

      const command = SfdxUtil.getCommand(pck, releaseInfo)

      let markdown = Markdown.getTypes(pck)

      markdown += Markdown.getCode(theXml, 'xml')

      for (const c of command) {
        markdown += Markdown.getCode(c, 'bash')
      }

      markdown += Markdown.getCode(
        'sfdx force:source:retrieve -x package.xml',
        'bash'
      )

      const gitCommand = Git.getGitAddCommand(xml, releaseInfo)

      markdown += `# GIT \n`
      for (const git of gitCommand) {
        markdown += Markdown.getCode(git, 'bash')
      }

      markdown += Markdown.getTasks(releaseInfo)

      return {xml: theXml, markdown, command, members: xml, gitCommand}
    } else {
      setFailed('Release file does not exist')
    }
    return {xml: '', markdown: '', command: [], members: {}, gitCommand: []}
  }
}
