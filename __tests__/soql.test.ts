import {SoqlUtil} from '../src/soql-util'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
describe('SOQL Class', () => {
  test('SOQL', () => {
    const soql: SoqlUtil = new SoqlUtil('Account')
    soql.add('Id')
    soql.add('Name')
    soql.setCondition(`Id = '0015f00000DSH1q'`)
    soql.setCondition(`Name = 'Dickenson plc'`)
    soql.setLimit(2)
    soql.setOrder('Name')
    soql.setOrder('Id')
    soql.setDirection('DESC')
    const query = soql.getQuery()
    console.info(query)
    expect.stringContaining(query)
  })

  test('SOQL no order or limit', () => {
    const soql: SoqlUtil = new SoqlUtil('Account')
    soql.add('Id')
    soql.add('Name')
    expect.stringContaining(soql.getQuery())
  })

  test('SOQL no order or limit', () => {
    SoqlUtil.recordToMap('Id', [{Id: '0015f00000DSH1q'}])
  })
})
