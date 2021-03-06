import {SoqlUtil} from './soql-util'

export class Queries {
  getRelase(releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('DeployManager__Release__c')
    soql.add('Id')
    soql.add('Name')
    soql.add('DeployManager__Branch__c')
    soql.add('DeployManager__Enviroment__c')
    soql.add('DeployManager__TestClasses__c')
    soql.add('DeployManager__TestOptions__c')
    soql.add('DeployManager__IsDestructive__c')
    soql.setCondition(`Id = '${releaseId}'`)
    return soql.getQuery()
  }
  getTasks(taskId: string, releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('Task')
    const cd: SoqlUtil = new SoqlUtil('ContentDocumentLinks')
    cd.add('Id')
    cd.add('ContentDocument.FileType')
    cd.add('ContentDocument.FileExtension')
    cd.add('ContentDocument.Title')
    cd.add('ContentDocumentId')

    soql.add('Id')
    soql.add('Subject')
    soql.add('Description')
    soql.add('RecordType.Name')
    soql.add('RecordType.Name')
    soql.add(`(${cd.getQuery()})`)

    soql.setCondition(
      `(RecordType.Name IN ('Post Deployment','Pre Deployment') OR Id='${taskId}')`
    )
    soql.setCondition(`WhatId ='${releaseId}'`)
    soql.setOrder('RecordType.Name')
    return soql.getQuery()
  }
  getComponents(releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('DeployManager__Member__c')
    soql.add('Id')
    soql.add('DeployManager__ApiName__c')
    soql.add('DeployManager__FullName__c')
    soql.add('Id')
    soql.add('Name')
    soql.add('DeployManager__Parent__c')
    soql.add('DeployManager__Release__c')
    soql.add('DeployManager__Type__c')
    soql.add('DeployManager__Unique__c')
    soql.setCondition(`DeployManager__Release__c ='${releaseId}'`)

    return soql.getQuery()
  }
}
