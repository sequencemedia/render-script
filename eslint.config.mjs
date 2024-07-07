import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard'

function merge (alpha) {
  return (
    standard
      .map((omega) => ({
        ...omega,
        ...alpha
      }))
  )
}

export default (
  merge({
    files: [
      '*',
      'src/*'
    ],
    ignores: [
      'test'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }).concat(
    merge({
      files: [
        'test/*'
      ],
      ignores: [
        '*',
        'src/*'
      ],
      languageOptions: {
        globals: {
          ...globals.mocha
        }
      }
    })
  )
)
