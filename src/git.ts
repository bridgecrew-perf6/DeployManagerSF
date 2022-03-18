import * as github from '@actions/github'
export class Git {
  async setRelease(
    markdown: string,
    authToken: string | void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    release: any[]
  ): Promise<unknown> {
    const octokit = github.getOctokit(`${authToken}`)
    return octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: 'v0.0.1-rc0',
      name: `${release[0].Name}`,
      body: markdown,
      prerelease: true,
      draft: true
    })
  }
}
