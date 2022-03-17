/* eslint-disable no-console */
import {getInput, info, setFailed} from '@actions/core'
import {Metadata} from './metadata'
//import {Git} from './git'
import {Queries} from './queries'
//import {SfdxRelease} from './sfdx-release'
import {SfdxUtil} from './sfdx-util'
import {SoqlUtil} from './soql-util'
//import {SoqlUtil} from './soql-util'

export async function validation(): Promise<void> {
  try {
    info('VALIDATION')
    const releaseId = getInput('release-id', {required: true})
    const taskId = getInput('task-id', {required: true})
    const sfUser = getInput('sf-user', {required: true})
    const enviroment = getInput('enviroment', {required: true})
    const customerId = getInput('customer-id', {required: true})
    //const authToken = getInput('auth-token', {required: true})
    //const createRelease = getInput('create-release', {required: true})

    SfdxUtil.authorice(sfUser, 'server.key', customerId, enviroment)

    const qRelease = Queries.getRelase(releaseId)
    const release = SfdxUtil.createFileByQuery(
      qRelease,
      `realease${releaseId}`,
      sfUser
    )
    console.log(release)

    const qTasks = Queries.getTasks(taskId, releaseId)
    const tasks = SfdxUtil.createFileByQuery(
      qTasks,
      `tasks${releaseId}`,
      sfUser
    )
    console.log(tasks)

    const qComponents = Queries.getComponents(releaseId)
    const components = SfdxUtil.createFileByQuery(
      qComponents,
      `components${releaseId}`,
      sfUser
    )

    const map = SoqlUtil.recordToMapGroup('Type__c', components.result.records)

    const m = new Metadata(release, map, tasks)
    console.log(m.getPackage())

    /*
    const sfdx = new SfdxRelease()
    const git: Git = new Git()

    const releaseInfo = sfdx.getRelease(releaseId)
    const packageInfo = sfdx.getPackage(releaseId, releaseInfo)

    if (createRelease === 'true') {
      await git.setRelease(packageInfo.markdown, authToken, releaseInfo)
    }
    */
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

export async function deploy(): Promise<void> {
  info('DEPLOY')
}

const type = getInput('type', {required: true})

if (type === 'validation') {
  validation()
} else if (type === 'deploy') {
  deploy()
} else if (type === 'validation-deploy') {
  validation()
}
