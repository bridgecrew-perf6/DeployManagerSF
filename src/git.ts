/* eslint-disable no-console */
import * as github from '@actions/github'
import {TypesFloder} from './interfaces'
import {pathsSFDX} from './constants'
//import {setFailed} from '@actions/core'
export class Git {
  async setRelease(
    markdown: string,
    authToken?: string | void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    releaseInfo?: any
  ): Promise<unknown> {
    const octokit = github.getOctokit(`${authToken}`)
    return octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: 'v0.0.1-rc0',
      name: `${releaseInfo.Name}`,
      body: markdown,
      prerelease: true,
      draft: true
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getGitAddCommand(types: any, releaseInfo: any): string[] {
    const command = 'git add'
    let commit = ''
    let commitPush = ''
    const root = 'force-app/main/default/'
    const components: Set<string> = new Set()
    const r = []

    if (releaseInfo?.Tasks?.records) {
      for (const tsk of releaseInfo?.Tasks?.records) {
        commit = `git commit -m "${tsk.Subject}"`
      }
    }

    if (releaseInfo.DeployManager__Branch__c) {
      commitPush = `git push origin ${releaseInfo.DeployManager__Branch__c}`
    }

    for (const type in types) {
      const patInfo: TypesFloder | undefined = pathsSFDX.get(type)
      if (patInfo) {
        for (const member of types[type].members) {
          let file = null

          if (patInfo.directoryNameChild) {
            file = `${patInfo.directoryName}/${member.replace(
              '.',
              `/${patInfo.directoryNameChild}/`
            )}.${patInfo.suffix}-meta.xml`
          } else if (!patInfo.suffix) {
            file = `${patInfo.directoryName}/${member}`
          } else if (patInfo.suffix && !patInfo.noExtension) {
            file = `${patInfo.directoryName}/${member}.${patInfo.suffix}`
          } else if (patInfo.suffix && patInfo.noExtension) {
            file = `${patInfo.directoryName}/${member}`
          } else {
            file = `Fail ==> ${member}`
          }

          if (!patInfo.directoryNameChild && patInfo.suffix) {
            components.add(
              `${root}${patInfo.directoryName}/${member}.${patInfo.suffix}-meta.xml`
            )
          }

          components.add(`${root}${file}`)
        }
      } else {
        console.log(`fail ${type}`)
      }
    }

    r.push(`${command} ${Array.from(components).join(' ')}`)
    r.push(`${commit}`)
    r.push(`${commitPush}`)

    return r
  }
}
