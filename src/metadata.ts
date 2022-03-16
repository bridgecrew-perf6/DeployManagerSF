/* eslint-disable @typescript-eslint/no-explicit-any */
import * as xml2js from 'xml2js'
import {XMLPCK} from './constants'
import {packageXML} from './interfaces'

export class Metadata {
  _tasks: any[]
  _release: any[]
  _components: Map<string, Set<any>>
  constructor(release: any[], components: Map<string, Set<any>>, tasks: any[]) {
    this._tasks = tasks
    this._release = release
    this._components = components
  }

  getPackage(): string {
    const builder = new xml2js.Builder()
    const pckXML: packageXML = XMLPCK
    const xml: any = {}
    const types = []

    for (const type of this._components.keys()) {
      xml[type] = {
        members: [],
        name: type
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      for (const component of this._components.get(type)) {
        xml[type].members.push(component.DeployManager__FullName__c)
      }
      types.push(xml[type])
    }
    pckXML.Package.types = types

    return builder.buildObject(pckXML)
  }
}
