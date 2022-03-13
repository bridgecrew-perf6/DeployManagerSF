export interface Attributes {
  type: string
  url: string
}

export interface Member__c {
  attributes: Attributes
  DeployManager__ApiName__c: string
  DeployManager__FullName__c: string
  Id: string
  Name: string
  DeployManager__Parent__c: string
  DeployManager__Release__c: string
  DeployManager__Type__c: string
  DeployManager__Unique__c: string
}

export interface types {
  members: string[]
  name: string
}

export interface packageXML {
  Package: Package
}
export interface Package {
  $: $
  types?: types[]
  version: string
}
export interface $ {
  xmlns: string
}

export interface pathLogic {
  path: string
  full: boolean
  extensions?: string[]
  subPath?: string
}

export interface queryResult {
  result: result
  status: number
}

export interface result {
  totalSize: number
  done: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  records: any[]
}
export interface TypesFloder {
  childXmlNames?: string[] | null
  directoryName: string
  inFolder: boolean
  metaFile: boolean
  suffix: string | null
  xmlName: string
  directoryNameChild?: string
  noExtension?: boolean
}
