describe('Data', () => {
  test('Data', () => {
    expect.stringContaining('Data')
  })
})

export const release = {
  status: 0,
  result: {
    done: true,
    totalSize: 1,
    records: [
      {
        attributes: {
          type: 'DeployManager__Release__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Release__c/a005f000005UNs8AAG'
        },
        Id: 'a005f000005UNs8AAG',
        Name: 'Release-000000',
        DeployManager__Branch__c: 'main',
        DeployManager__Enviroment__c: 'ThisOrg',
        DeployManager__TestClasses__c:
          'TableSoqlControllerTest, TableSoqlControllerTest',
        DeployManager__TestOptions__c: 'Run Specified Tests',
        DeployManager__IsDestructive__c: true
      }
    ]
  }
}

export const task = {
  status: 0,
  result: {
    done: true,
    totalSize: 3,
    records: [
      {
        attributes: {
          type: 'Task',
          url: '/services/data/v54.0/sobjects/Task/00T5f00000MenOSEAZ'
        },
        Id: '00T5f00000MenOSEAZ',
        Subject: 'Validation Commit',
        Description: null,
        RecordType: {
          attributes: {
            type: 'RecordType',
            url: '/services/data/v54.0/sobjects/RecordType/0125f000000iDo4AAE'
          },
          Name: 'CD/CI'
        }
      },
      {
        attributes: {
          type: 'Task',
          url: '/services/data/v54.0/sobjects/Task/00T5f00000KkMDnEAN'
        },
        Id: '00T5f00000KkMDnEAN',
        Subject: 'Jira-001',
        Description:
          '## Site Pages\r\n+ Create Page Home\r\n+ Salesforce.com_logo.svg\r\n![delta_principle](https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg)\r\n[Duck Duck Go](https://duckduckgo.com "The best search engine for privacy")',
        RecordType: {
          attributes: {
            type: 'RecordType',
            url: '/services/data/v54.0/sobjects/RecordType/0125f000000iDYaAAM'
          },
          Name: 'Post Deployment'
        }
      },
      {
        attributes: {
          type: 'Task',
          url: '/services/data/v54.0/sobjects/Task/00T5f00000KkMEREA3'
        },
        Id: '00T5f00000KkMEREA3',
        Subject: 'Disable Validation',
        Description: '## Disable Account\r\n+ rule 2X',
        RecordType: {
          attributes: {
            type: 'RecordType',
            url: '/services/data/v54.0/sobjects/RecordType/0125f000000iDYfAAM'
          },
          Name: 'Pre Deployment'
        }
      }
    ]
  }
}

export const components = {
  status: 0,
  result: {
    done: true,
    totalSize: 9,
    records: [
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzkjLAAR'
        },
        Id: 'a015f00000JzkjLAAR',
        DeployManager__ApiName__c: 'Branch__c',
        DeployManager__FullName__c: 'Release__c.Branch__c',
        Name: 'Branch',
        DeployManager__Parent__c: 'Release__c',
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'CustomField',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.Release__c.Branch__c'
      },
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzhroAAB'
        },
        Id: 'a015f00000JzhroAAB',
        DeployManager__ApiName__c: 'Date',
        DeployManager__FullName__c: 'Date',
        Name: 'Date',
        DeployManager__Parent__c: null,
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'toFail',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.Date'
      },
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzjTLAAZ'
        },
        Id: 'a015f00000JzjTLAAZ',
        DeployManager__ApiName__c: 'SiteSamples',
        DeployManager__FullName__c: 'SiteSamples',
        Name: 'SiteSamples',
        DeployManager__Parent__c: null,
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'StaticResource',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.SiteSamples'
      },
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzhroAAB'
        },
        Id: 'a015f00000JzhroAAB',
        DeployManager__ApiName__c: 'ClassB',
        DeployManager__FullName__c: 'ClassB',
        Name: 'ClassB',
        DeployManager__Parent__c: null,
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'ApexClass',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.Classb'
      },
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzhroAAB'
        },
        Id: 'a015f00000JzhroAAB',
        DeployManager__ApiName__c: 'ClassA',
        DeployManager__FullName__c: 'ClassA',
        Name: 'ClassA',
        DeployManager__Parent__c: null,
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'ApexClass',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.ClassA'
      },
      {
        attributes: {
          type: 'DeployManager__Member__c',
          url: '/services/data/v54.0/sobjects/DeployManager__Member__c/a015f00000JzhsvAAB'
        },
        Id: 'a015f00000JzhsvAAB',
        DeployManager__ApiName__c: 'lcomponent',
        DeployManager__FullName__c: 'lcomponent',
        Name: 'lcomponent',
        DeployManager__Parent__c: null,
        DeployManager__Release__c: 'a005f000005UNs8AAG',
        DeployManager__Type__c: 'LightningComponentBundle',
        DeployManager__Unique__c: 'a005f000005UNs8AAG.lcomponent'
      }
    ]
  }
}
