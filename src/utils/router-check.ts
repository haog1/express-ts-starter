import { GUID_LENGTH } from '../constants'

export const validateGUID = () => {
  return {
    options: (value: string) => {
      return !value || value.length === GUID_LENGTH
    },
    errorMessage: `Incorrect GUID - it should be ${GUID_LENGTH} chars long`,
  }
}
