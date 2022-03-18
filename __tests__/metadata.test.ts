import {Queries} from '../src/queries'
import {Metadata} from '../src/metadata'
import {expect, test} from '@jest/globals'
import {SoqlUtil} from '../src/soql-util'

import {components, release} from './records.test'

const releaseId = 'a005f000005UNs8AAG'
const sfUser = 'test@test.com'
const taskId = '00T5f00000MenOSEAZ'
const sfUserDeploy = 'test@testDeploy.com'

// shows how the runner will run a javascript action with env / stdout protocol
describe('Queries Class', () => {
  test('QUERIES', () => {
    const q: Queries = new Queries()

    const qRelease = q.getRelase(releaseId)
    const qTasks = q.getTasks(taskId, releaseId)
    const qComponents = q.getComponents(releaseId)

    expect.stringContaining(qRelease)
    expect.stringContaining(qTasks)
    expect.stringContaining(qComponents)
  })

  test('METADATA', () => {
    const map = SoqlUtil.recordToMapGroup(
      'DeployManager__Type__c',
      components.result.records
    )

    const m = new Metadata(release.result.records, map, sfUser, sfUserDeploy)
    const xmlPackage = m.getPackage()
    const sfdxRetirve: string = m.getSourceSfdx()
    const sfdxDeploy: string = m.getDeploySfdx()
    const addGit: string = m.getGit()

    expect.stringContaining(xmlPackage)
    expect.stringContaining(sfdxRetirve)
    expect.stringContaining(sfdxDeploy)
    expect.stringContaining(addGit)
    // console.log(xmlPackage)
    // console.log(sfdxRetirve)
    console.log(sfdxDeploy)
    console.log(addGit)
  })
})
