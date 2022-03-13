import * as child from 'child_process'
import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    child.execSync(`echo  ${new Date().toTimeString()} > data.txt`)
    child.execSync(`ls`)

    await exec.exec(`git config user.name github-actions`)
    await exec.exec(`git config user.email github-actions@github.com`)
    await exec.exec(`git add .`)
    await exec.exec(`git commit -m "generated"`)
    await exec.exec(`git push origin main`)

    core.debug(`HERE ${new Date().toTimeString()}`)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
