require('@babel/register')({
  ignore: [
    /node_modules\/(?!render-script)/
  ]
})

const evaluate = require('./evaluate.mjs')

module.exports = {
  ...evaluate
}
