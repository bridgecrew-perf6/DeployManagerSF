/* eslint-disable @typescript-eslint/no-explicit-any */
export class Markdown {
  _tasks: any[]
  _release: any[]
  _components: Map<string, Set<any>>
  _sfUser: string
  _sfUserDeploy: string
  _code: string = ''

  constructor(
    release: any[],
    components: Map<string, Set<any>>,
    tasks: any[],
    sfUser: string,
    sfUserDeploy: string
  ) {
    this._sfUser = sfUser
    this._sfUserDeploy = sfUserDeploy
    this._tasks = tasks
    this._release = release
    this._components = components
  }

  getRelease(): string {
    let body = ''

    body += `# ${this._release[0].Name}\n`
    body += this.getComponents()
    body += this._code
    body += this.getTasks()

    return body
  }

  getComponents(): string {
    let m = ''
    for (const type of this._components.keys()) {
      m += `### ${type}\n`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const component of this._components.get(type)) {
        m += `+ ${component.DeployManager__FullName__c}\n`
      }
      m = `\n\n`
    }
    return m
  }

  setCode(code: string, language: string, title: string): void {
    this._code += `### ${title}\n`
    this._code += this.getCode(code, language)
    this._code += `\n`
  }

  getCode(code: string, language: string): string {
    return `\n\`\`\`${language ? language : ''}\n${code}\n\`\`\`\n`
  }

  getTasks(): string {
    let tasks = ''
    const url = 'https://login.salesforce.com'
    for (const tsk of this._tasks) {
      if (tsk.RecordType.Name !== 'CD/CI') {
        tasks += `### :memo: ${tsk.Subject} (${tsk.RecordType.Name}) \n\n ${tsk.Description} \n\n `
        if (tsk.ContentDocumentLink) {
          for (const link of tsk.ContentDocumentLink.records) {
            tasks += `[${link.ContentDocument.Title}](${url}/sfc/servlet.shepherd/document/download/${link.ContentDocumentId}?operationContext=S1 "${link.ContentDocument.Title}")`
          }
        }
      }
    }
    return `\n${tasks}\n`
  }
}
