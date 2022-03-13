import * as core from '@actions/core'
import * as exec from '@actions/exec'

async function run(): Promise<void> {
  try {
    await exec.exec('echo', ['"hello"', '>gile.txt'])

    await exec.exec(`ls`)
    await exec.exec(`echo "Hola Mundo"`)
    await exec.exec(`echo "Hola ${Date.now()}" > readme2.md`)

    await exec.exec(`ls`)
    await exec.exec(`pwd`)
    
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
