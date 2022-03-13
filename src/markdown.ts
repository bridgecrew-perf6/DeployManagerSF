import {types} from './interfaces'

export const Markdown = {
  getTypes(typesLst: types[]): string {
    let m = ''
    for (const type of typesLst) {
      m += `## ${type.name}\n`
      for (const member of type.members) {
        m += `+ ${member}\n`
      }
      m += `\n\n`
    }
    return m
  },
  getCode(code: string, language: string): string {
    return `\n\`\`\`${language ? language : ''}\n${code}\n\`\`\`\n`
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTasks(releaseInfo: any): string {
    let tasks = ''
    if (releaseInfo?.Tasks?.records) {
      for (const tsk of releaseInfo?.Tasks?.records) {
        if (tsk.RecordType.Name !== 'CD/CI') {
          tasks += `# :memo: ${tsk.Subject} (${tsk.RecordType.Name}) \n\n ${tsk.Description} \n\n `
        }
      }
    }
    return `\n${tasks}\n`
  }
}
