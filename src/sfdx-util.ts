import * as cp from 'child_process'
import * as fs from 'fs'
import {types} from './interfaces'

const metadataCommand = new Map<string, string>([
  ['CustomLabels', 'CustomLabel']
])

export const SfdxUtil = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFileByQuery(query: string, fileName: string, user: string): any {
    const file = `".sfdx/${fileName}.json"`
    const command = `sfdx force:data:soql:query -u ${user} --json -q "${query}" > ${file}`
    cp.execSync(command)

    let data = {}

    if (fs.existsSync(file)) {
      const dataS: string = fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
      })
      data = dataS ? JSON.parse(dataS) : {}
    }
    return data
  },
  getMetadata(type: string): string {
    return metadataCommand.get(type) || type
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCommand(typesLst: types[], releaseInfo: any): string[] {
    const command: string[] = []
    const commandLst: string[] = []

    for (const type of typesLst) {
      for (const member of type.members) {
        command.push(`${this.getMetadata(type.name)}:${member}`)
      }
    }

    this.getCommandTest(releaseInfo)

    commandLst.push(`sfdx force:source:retrieve -m "${command.join(', ')}"`)

    commandLst.push(
      `sfdx force:source:deploy -m "${command.join(
        ', '
      )}" ${this.getCommandTest(releaseInfo)}`
    )

    return commandLst
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCommandTest(releaseInfo: any): string {
    let arg = ''

    switch (releaseInfo.DeployManager__TestOptions__c) {
      case 'Run All Tests': {
        arg = `-l RunAllTestsInOrg`
        break
      }
      case 'Run Specified Tests': {
        arg = `-l RunSpecifiedTests -r "${releaseInfo.DeployManager__TestClasses__c}"`
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
