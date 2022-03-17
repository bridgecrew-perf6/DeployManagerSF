import {SoqlUtil} from './soql-util'

export const Queries = {
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
  },
  getTasks(taskId: string, releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('Task')
    soql.add('Id')
    soql.add('Subject')
    soql.add('Description')
    soql.add('RecordType.Name')
    soql.setCondition(
      `(RecordType.Name IN ('Post Deployment','Pre Deployment') OR Id='${taskId}')`
    )
    soql.setCondition(`WhatId ='${releaseId}'`)
    soql.setOrder('RecordType.Name')
    return soql.getQuery()
  },
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
    soql.add('Unique__c')
    soql.setCondition(`DeployManager__Release__c ='${releaseId}'`)

    return soql.getQuery()
  }
}
