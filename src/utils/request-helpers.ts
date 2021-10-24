import { Optional } from 'sequelize'
import { GUID_LENGTH } from '../constants'
import { DefaultHiddenFields, IModel } from '../models'
import { BaseParameter } from '../parameters'
import { GUID } from '../types/guid'

export const validateGUID = () => {
  return {
    options: (value: string) => {
      return !value || value.length === GUID_LENGTH
    },
    errorMessage: `Incorrect GUID - it should be ${GUID_LENGTH} chars long`,
  }
}

export const mapData = <T extends Optional<IModel<number, GUID>, DefaultHiddenFields>, C extends BaseParameter>(
  data: C,
): T => {
  const returnData: { [key: string]: any } = {}
  for (const [key, val] of Object.entries(data)) {
    const convertedKey = key.charAt(0).toUpperCase() + key.slice(1)
    returnData[convertedKey] = val
  }
  return returnData as T
}
