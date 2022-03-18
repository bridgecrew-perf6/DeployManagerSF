/* eslint-disable no-console */
import {getInput, info, setFailed} from '@actions/core'
import {Git} from './git'
import {Markdown} from './markdown'
import {Metadata} from './metadata'
import {Queries} from './queries'
import {SfdxUtil} from './sfdx-util'
import {SoqlUtil} from './soql-util'

export async function validation(): Promise<void> {
  try {
    info('VALIDATION')
    const releaseId = getInput('release-id', {required: true})
    const taskId = getInput('task-id', {required: true})

    const sfUser = getInput('sf-user', {required: true})
    const sfUserDeploy = getInput('sf-user-deploy', {required: true})

    const enviroment = getInput('enviroment', {required: true})
    const customerId = getInput('customer-id', {required: true})
    const authToken = getInput('auth-token', {required: true})
    const createRelease = getInput('create-release', {required: true})

    SfdxUtil.authorice(sfUser, 'server.key', customerId, enviroment)

    const q: Queries = new Queries()

    const qRelease = q.getRelase(releaseId)
    const release = SfdxUtil.createFileByQuery(
      qRelease,
      `realease${releaseId}`,
      sfUser
    ).result.records

    const qTasks = q.getTasks(taskId, releaseId)
    const tasks = SfdxUtil.createFileByQuery(
      qTasks,
      `tasks${releaseId}`,
      sfUser
    )
    console.log(tasks)

    const qComponents = q.getComponents(releaseId)
    const components = SfdxUtil.createFileByQuery(
      qComponents,
      `components${releaseId}`,
      sfUser
    )

    const map = SoqlUtil.recordToMapGroup(
      'DeployManager__Type__c',
      components.result.records
    )

    const m = new Metadata(release, map, sfUser, sfUserDeploy)
    const xmlPackage = m.getPackage()
    const sfdxRetrieve: string = m.getSourceSfdx()
    const sfdxDeploy: string = m.getSourceSfdx()
    const gitCommand: string = m.getGit()

    if (createRelease === 'true') {
      const doc = new Markdown(
        release,
        map,
        tasks.result.records,
        sfUser,
        sfUserDeploy
      )

      doc.setCode(xmlPackage, 'xml', 'Package')
      doc.setCode(sfdxRetrieve, 'shell', 'Retrieve')
      doc.setCode(sfdxDeploy, 'shell', 'Deploy')
      doc.setCode(gitCommand, 'shell', 'Git')

      const gitClass: Git = new Git()
      gitClass.setRelease(doc.getRelease(), authToken, release)
    }
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
