import { BelongsToOptions, HasOneOptions, HasManyOptions, DataTypes, ModelAttributes } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel } from '../models/base'
import { IModel } from '../models'
import { GUID } from '../types/guid'

export function generateId(): GUID {
  return uuidv4()
}

export const initModelFields = (fields: ModelAttributes): ModelAttributes => {
  const defaultFields = {
    Id: {
      autoIncrement: true,
      type: DataTypes.NUMBER,
      field: 'id',
    },
    Guid: {
      primaryKey: true,
      type: DataTypes.STRING,
      field: 'guid',
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      field: 'is_deleted',
    },
  }
  return {
    ...defaultFields,
    ...fields,
  }
}

class Base<T extends IModel<number, GUID>, U> extends BaseModel<T, U> {} // model type convert purpose

export type Instance = typeof Base

export const belongsTo = (
  model1: Instance,
  model2: Instance,
  keyInModel1: string,
  keyInModel2: string,
  options: BelongsToOptions = {},
) => {
  model1.belongsTo(model2, {
    ...(keyInModel1 ? { foreignKey: keyInModel1 } : {}),
    ...(keyInModel2 ? { targetKey: keyInModel2 } : {}),
    ...options,
  })
}

export const hasOne = (
  model1: Instance,
  model2: Instance,
  keyInModel1: string,
  keyInModel2: string,
  options: HasOneOptions = {},
) => {
  model1.hasOne(model2, {
    ...(keyInModel2 ? { foreignKey: keyInModel2 } : {}),
    ...(keyInModel1 ? { sourceKey: keyInModel1 } : {}),
    ...options,
  })
}

export const hasMany = (
  model1: Instance,
  model2: Instance,
  keyInModel1: string,
  keyInModel2: string,
  options: HasManyOptions = {},
) => {
  model1.hasMany(model2, {
    ...(keyInModel2 ? { foreignKey: keyInModel2 } : {}),
    ...(keyInModel1 ? { sourceKey: keyInModel1 } : {}),
    ...options,
  })
}
