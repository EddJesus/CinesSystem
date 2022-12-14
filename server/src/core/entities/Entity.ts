import { randomUUID } from 'crypto'

export abstract class Entity <T> {
  protected _id: string
  public props: T

  get id(): string {
    return this._id
  }

  constructor(props: T, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}