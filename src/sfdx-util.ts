import * as cp from 'child_process'
import * as fs from 'fs'
import {setFailed} from '@actions/core'

export const SfdxUtil = {
  isAuthoriced: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFileByQuery(query: string, fileName: string, user: string): any {
    const file = `./.sfdx/${fileName}.json`
    const command = `sfdx force:data:soql:query -u ${user} --json -q "${query}" > ${file}`
    cp.execSync(command)

    let data = {}

    if (fs.existsSync(file)) {
      const dataS: string = fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
      })
      data = dataS ? JSON.parse(dataS) : {}
    } else {
      setFailed('no file found')
    }
    return data
  },
  authorice(
    user: string,
    keyName: string,
    customerId: string,
    enviroment: string
  ) {
    const command = `sfdx force:auth:jwt:grant --clientid ${customerId} --jwtkeyfile '.sfdx/${keyName}' --username '${user}' -r '${enviroment}'`
    cp.execSync(command)
  }
}
