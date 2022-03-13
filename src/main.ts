import {getInput, info, setFailed} from '@actions/core'
import {Git} from './git'
import {SfdxRelease} from './sfdx-release'

export async function validation(): Promise<void> {
  try {
    info('VALIDATION')
    const releaseId = getInput('release-id', {required: true})
    const authToken = getInput('auth-token', {required: true})
    const createRelease = getInput('create-release', {required: true})

    const sfdx = new SfdxRelease()
    const git: Git = new Git()

    const releaseInfo = sfdx.getRelease(releaseId)
    const packageInfo = sfdx.getPackage(releaseId, releaseInfo)

    if (createRelease) {
      await git.setRelease(packageInfo.markdown, authToken, releaseInfo)
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
