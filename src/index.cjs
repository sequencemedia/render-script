require('@babel/register')({
  ignore: [
    /node_modules\/(?!render-script)/
  ]
})

const {
  default: evaluate
} = require('./index.mjs')

module.exports = evaluate
