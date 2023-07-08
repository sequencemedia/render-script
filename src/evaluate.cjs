/*!
 * renderapp.js
 * http://renderapp.co
 *
 * Copyright 2021 Renderapp Limited
 */

const debug = require('debug')

const log = debug('render-script')

log('`render-script` is awake')

const RULE_MAP = new Map()

const isTruthy = (v) => Boolean((v || '').trim())

function getEvaluationFor (rule, configuration) {
  /**
   *  log('evaluate')
   */

  function isSubRuleValid (subRule) {
    /**
     *  log('isSubRuleValid')
     */
    return (
      subRule.startsWith('!')
        ? configuration.includes('+' + subRule.substring(1)) !== true // does not include
        : configuration.includes('+' + subRule)
    )
  }

  function isTopRuleValid (topRule) {
    /**
     *  log('isTopRuleValid')
     */

    /**
     *  Split the `topRule` argument on the `/` character
     *  into an array of `subRule` strings
     */
    return topRule.split('/') // split `topRule` into an array of `subRule` strings
      /**
       *  Remove any zero-length strings from the array
       */
      .filter(isTruthy)
      /**
       *  Some `subRule` strings must be valid for the
       *  configuration
       */
      .some(isSubRuleValid) // At least one `subRule` must be valid
  }

  function isRuleSetValid (ruleSet) {
    /**
     *  log('isRuleSetValid')
     */

    /**
     *  Split the `ruleSet` argument on the `+` character
     *  into an array of `topRule` strings
     */
    return ruleSet.split('+')
      /**
       *  Remove any zero-length strings from the array
       */
      .filter(isTruthy)
      /**
       *  Every `topRule` string must be valid for the
       *  configuration
       */
      .every(isTopRuleValid)
  }

  function evaluateRule (rule) {
    /**
     *  log('evaluateRule')
     */

    /**
     *  Split the `rule` argument on the `;` character
     *  into an array of `ruleSet` strings
     */
    return rule.split(';')
      /**
       *  Remove any zero-length strings from the array
       */
      .filter(isTruthy)
      /**
       *  Some `ruleSet` strings must be valid for the
       *  configuration
       */
      .some(isRuleSetValid)
  }

  return evaluateRule(rule)
}

function getRuleMap (ruleMap = RULE_MAP) {
  return ruleMap
}

function getConfigurationMap (ruleMap = new Map(), rule = '') {
  /**
   *  log('getConfigurationMap')
   */

  let configurationMap

  /**
   *  Does the `ruleMap` contain the `rule` argument as a key?
   */
  if (ruleMap.has(rule)) {
    /**
     *  It does! Get the `configurationMap` from the `ruleMap`
     */
    configurationMap = ruleMap.get(rule)
  } else {
    /**
     *  It doesn't. Get a `Map` instance and set it into the `ruleMap`
     */
    ruleMap.set(rule, (configurationMap = new Map()))
  }

  return configurationMap
}

function evaluate (rule = '', configuration = '') {
  /**
   *  log('evaluate')
   */

  return isTruthy(rule) ? isTruthy(configuration) ? getEvaluationFor(rule, configuration) : false : false
}

module.exports = {
  isTruthy,
  getRuleMap,
  getConfigurationMap,
  evaluate
}
