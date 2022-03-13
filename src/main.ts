import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    await exec.exec(`echo "${Date.now()}" > here.txt`)

    await exec.exec(`git config user.name github-actions`)
    await exec.exec(`git config user.email github-actions@github.com`)
    await exec.exec(`git add .`)
    await exec.exec(`git commit -m "generated"`)
    await exec.exec(`git push`)

    core.debug(`HERE ${new Date().toTimeString()}`)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
