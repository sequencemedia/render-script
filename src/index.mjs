import {
  isTruthy,
  getRuleMap,
  getConfigurationMap,
  evaluate as evaluateRuleForConfiguration
} from './evaluate.mjs'

function getEvaluation (configurationMap = new Map(), rule = '', configuration = '') {
  /**
   *  log('getEvaluation')
   */

  let evaluation

  /**
   *  Does the `configurationMap` contain the `configuration` argument as a key?
   */
  if (configurationMap.has(configuration)) {
    /**
     *  It does! Get the evaluation from the `configurationMap`
     */
    evaluation = configurationMap.get(configuration)
  } else {
    /**
     *  It doesn't. Get the evaluation from `evaluateRuleForConfiguration` and set it into the `configurationMap`
     */
    configurationMap.set(configuration, (evaluation = evaluateRuleForConfiguration(rule, configuration)))
  }

  return evaluation
}

export default function evaluate (rule = '', configuration = '') {
  return isTruthy(rule) ? isTruthy(configuration) ? getEvaluation(getConfigurationMap(getRuleMap(), rule), rule, configuration) : false : false
}
