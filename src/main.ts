import * as core from '@actions/core'
import * as exec2 from '@actions/exec'
import {exec} from 'child_process'

async function run(): Promise<void> {
  try {
    await exec2.exec('echo', ['"hello"', '> .sfdx/file.txt'])

    exec(`echo "ssh hshs" > data.txt`)

    await exec2.exec(`ls`)
    await exec2.exec(`echo "Hola Mundo"`)
    await exec2.exec(`echo 'Hola ${Date.now()}' > .sfdx/readme2.md`)

    await exec2.exec(`ls`)
    await exec2.exec(`pwd`)

    await exec2.exec(`cd .sfdx`)
    await exec2.exec(`ls`)

    /*
    await exec.exec(`git config user.name github-actions`)
    await exec.exec(`git config user.email github-actions@github.com`)
    await exec.exec(`git add .`)
    await exec.exec(`git commit -m "generated"`)
    await exec.exec(`git push origin main`)
    */

    core.debug(`HERE ${new Date().toTimeString()}`)
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
