import {Queries} from '../src/queries'
import {Markdown} from '../src/markdown'
import {expect, test} from '@jest/globals'
import {SoqlUtil} from '../src/soql-util'

import {components, release, task} from './records.test'

const releaseId = 'a005f000005UNs8AAG'
const sfUser = 'test@test.com'
const taskId = '00T5f00000MenOSEAZ'
const sfUserDeploy = 'test@testDeploy.com'

// shows how the runner will run a javascript action with env / stdout protocol
describe('Markdown Class', () => {
  test('Markdown', () => {
    const map = SoqlUtil.recordToMapGroup(
      'DeployManager__Type__c',
      components.result.records
    )
    const m: Markdown = new Markdown(
      release.result.records,
      map,
      task.result.records,
      sfUser,
      sfUserDeploy
    )

    m.setCode('<p>Test</p>', 'html', 'CODE')
    m.setCode('<p>Test</p>', '', 'CODE')

    const releaseM = m.getRelease()
    console.log(releaseM)

    expect.stringContaining(releaseM)
  })
})
