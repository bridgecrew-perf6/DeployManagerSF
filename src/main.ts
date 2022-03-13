import {getInput, setFailed} from '@actions/core'
import {Git} from './git'
import {SfdxRelease} from './sfdx-release'

export async function run(): Promise<void> {
  try {
    const releaseId = getInput('release-id', {required: true})
    const authToken = getInput('auth-token', {required: true})

    const sfdx = new SfdxRelease()
    const git: Git = new Git()

    const releaseInfo = sfdx.getRelease(releaseId)
    const packageInfo = sfdx.getPackage(releaseId, releaseInfo)
    //const gitListInfo = git.getGitAddCommand(packageInfo.members)

    await git.setRelease(packageInfo.markdown, authToken, releaseInfo)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}
run()
