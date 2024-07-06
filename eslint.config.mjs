import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.node
      }
    }
  },
  ...standard
]
