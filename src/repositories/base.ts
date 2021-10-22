import { IRepository } from './contract'
import { IModel } from '../models/contract'
import { GUID } from '../types/guid'

export abstract class BaseRepository implements IRepository<IModel<GUID>> {
  public abstract getAll<ProductReturnAttrs>(): Promise<ProductReturnAttrs[]>
}
