/* eslint-disable @typescript-eslint/no-explicit-any */
const Q = {
  S: 'SELECT',
  F: 'FROM',
  W: 'WHERE',
  A: 'AND',
  O: 'OR',
  L: 'LIMIT',
  ORDER: 'ORDER BY'
}

export class SoqlUtil {
  _sobject: string
  _joinCondition: string
  _fields: Set<string> = new Set()
  _conditions: Set<string> = new Set()
  _limit: number = 0
  _order: Set<string> = new Set()
  _orderDirection: string = 'ASC'

  constructor(sobject: string, joinCondition: string = Q.A) {
    this._sobject = sobject
    this._joinCondition = joinCondition
  }

  setDirection(orderDirection: string): void {
    this._orderDirection = orderDirection
  }

  add(field: string): void {
    this._fields.add(field)
  }

  getQuery(): string {
    return `${Q.S} ${Array.from(this._fields).join(', ')} ${Q.F} ${
      this._sobject
    }${this.getWhere()}${this.getOrder()}${this.getLimit()}`
  }

  setCondition(conditions: string): void {
    this._conditions.add(conditions)
  }

  getWhere(): string {
    return this._conditions.size === 0
      ? ''
      : ` ${Q.W} ${Array.from(this._conditions).join(
          ` ${this._joinCondition} `
        )} `
  }

  getLimit(): string {
    return `${this._limit === 0 ? '' : ` ${Q.L} ${this._limit}`} `
  }

  setLimit(limit: number): void {
    this._limit = limit
  }

  setOrder(order: string): void {
    this._order.add(order)
  }

  getOrder(): string {
    return `${
      this._order.size === 0
        ? ''
        : ` ${Q.ORDER} ${Array.from(this._order).join(`, `)}  ${
            this._orderDirection
          }`
    } `
  }

  static recordToMap(fieldName: string, records: any[]): Map<string, any> {
    const map: Map<string, any> = new Map()

    for (const record of records) {
      map.set(record[`${fieldName}`], record)
    }

    return map
  }

  static recordToMapGroup(fieldName: string, records: any[]): Map<string, any> {
    const map: Map<string, Set<any>> = new Map()

    for (const record of records) {
      if (!map.has(fieldName)) {
        map.set(fieldName, new Set())
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Object is possibly 'null'.
      map.get(fieldName).add(record)
    }

    return map
  }
}
