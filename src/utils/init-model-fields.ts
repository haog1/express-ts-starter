import { DataTypes, ModelAttributes } from 'sequelize'

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
