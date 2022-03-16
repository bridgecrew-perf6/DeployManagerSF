import {SoqlUtil} from './soql-util'

export const Queries = {
  getRelase(releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('Release__c')
    soql.add('Id')
    soql.add('Name')
    soql.add('Branch__c')
    soql.add('Enviroment__c')
    soql.add('TestClasses__c')
    soql.add('TestOptions__c')
    soql.add('IsDestructive__c')
    soql.setCondition(`Id = '${releaseId}'`)
    return soql.getQuery()
  },
  getTasks(taskId: string, releaseId: string): string {
    const soql: SoqlUtil = new SoqlUtil('Tasks')
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
    const soql: SoqlUtil = new SoqlUtil('Member__c')
    soql.add('Id')
    soql.add('ApiName__c')
    soql.add('FullName__c')
    soql.add('Id')
    soql.add('Name')
    soql.add('Parent__c')
    soql.add('Release__c')
    soql.add('Type__c')
    soql.add('Unique__c')
    soql.setCondition(`Release__c ='${releaseId}'`)

    return soql.getQuery()
  }
}
