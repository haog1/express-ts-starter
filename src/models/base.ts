import { Model } from 'sequelize'
import { GUID } from '../types/guid'
import { IModel } from './contract'

abstract class BaseModel<T extends IModel<number, GUID>, U extends {} = T>
  extends Model<T, U>
  implements IModel<number, GUID>
{
  public Id!: number
  public Guid!: GUID
  public IsDeleted!: boolean
}

export { BaseModel }
