import { BelongsToOptions, HasOneOptions, HasManyOptions, DataTypes, ModelAttributes } from 'sequelize'
import { BaseModel } from '../models/base'
import { IBaseModel } from '../models/def'

export const initModelFields = (fields: ModelAttributes): ModelAttributes => {
  const defaultFields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    guid: {
      type: DataTypes.STRING,
    },
    modifiedBy: {
      type: DataTypes.STRING,
      field: 'modifiedby',
    },
    createdBy: {
      type: DataTypes.STRING,
      field: 'createdby',
    },
    createdAt: {
      type: 'TIMESTAMP WITHOUT TIME ZONE',
      field: 'createdat',
    },
    modifiedAt: {
      type: 'TIMESTAMP WITHOUT TIME ZONE',
      field: 'modifiedat',
    },
    _isDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }
  return {
    ...defaultFields,
    ...fields,
  }
}

class Base<T extends IBaseModel, U> extends BaseModel<T, U> {} // model type convert purpose

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
