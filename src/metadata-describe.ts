//import {SfdxUtil} from './sfdx-util'
import {TypesFloder} from './interfaces'
import {pathsSFDX} from './constants'
// eslint-disable-next-line @typescript-eslint/no-require-imports
import meta = require('./metadata-data.json')

export class MeatadataDescribe {
  _user
  static _metadata: Map<String, TypesFloder> = new Map()
  constructor(user: string) {
    this._user = user
  }

  getMetadata(): Map<String, TypesFloder> {
    if (!MeatadataDescribe._metadata.size) {
      const metaOverride = pathsSFDX

      const newMeta: Map<String, TypesFloder> = new Map()
      for (const describe of meta.result.metadataObjects) {
        newMeta.set(describe.xmlName, describe as TypesFloder)
      }
      MeatadataDescribe._metadata = new Map([...newMeta, ...metaOverride])
    }
    return MeatadataDescribe._metadata
  }
}

//
