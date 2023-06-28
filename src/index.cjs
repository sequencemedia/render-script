require('@babel/register')({
  ignore: [
    /node_modules\/(?!render-script)/
  ]
})

const renderScript = require('./index.mjs')

module.exports = {
  ...renderScript
}
