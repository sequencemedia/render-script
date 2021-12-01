const debug = require('debug')

const log = debug('render-script')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`render-script` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      targets: {
        node: 'current'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = [
  [
    'module-resolver', {
      root: ['.'],
      cwd: 'babelrc',
      alias: {
        '~': './src'
      }
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    compact: true,
    comments: false,
    presets,
    plugins
  }
}
