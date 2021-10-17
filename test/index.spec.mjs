import {
  expect
} from 'chai'

import evaluate, {
  evaluateRuleForConfiguration,
  getRuleMap,
  getConfigurationMap,
  getEvaluation
} from 'render-script'

describe('~', () => {
  describe('`evaluate`', () => {
    it('is a function', () => {
      return expect(evaluate)
        .to.be.a('function')
    })
  })

  describe('`evaluateRuleForConfiguration`', () => {
    it('is a function', () => {
      return expect(evaluateRuleForConfiguration)
        .to.be.a('function')
    })
  })

  describe('`getRuleMap`', () => {
    it('is a function', () => {
      return expect(getRuleMap)
        .to.be.a('function')
    })
  })

  describe('`getConfigurationMap`', () => {
    it('is a function', () => {
      return expect(getConfigurationMap)
        .to.be.a('function')
    })
  })

  describe('`getEvaluation`', () => {
    it('is a function', () => {
      return expect(getEvaluation)
        .to.be.a('function')
    })
  })

  describe('`evaluate()`', () => {
    describe('`rule` has rules', () => {
      describe('`configuration` has configuration', () => {
        describe('`configuration` has a match', () => {
          it('returns true', () => {
            return expect(evaluate('+A', '+A'))
              .to.be.true
          })
        })

        describe('`configuration` does not have a match', () => {
          it('returns false', () => {
            return expect(evaluate('+B', '+A'))
              .to.be.false
          })
        })

        describe('Every rule must be true', () => {
          describe('`configuration` has a combination match', () => {
            it('returns true', () => {
              return expect(evaluate('+1/2/3+A+4/5/6+B', '+1+6+A+B'))
                .to.be.true
            })
          })

          describe('`configuration` does not have a combination match', () => {
            it('returns false', () => {
              return expect(evaluate('+1/2/3+A+4/5/6+B', '+6+A'))
                .to.be.false
            })
          })

          describe('`configuration` has a negation match', () => {
            it('returns false', () => {
              return expect(evaluate('+1/2/3+A+4/5/6+!B', '+1+6+A+B'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match', () => {
            it('returns true', () => {
              return expect(evaluate('+1/2/3+A+4/5/6+!C', '+1+6+A+B'))
                .to.be.true
            })
          })
        })

        describe('At least one rule must be true', () => {
          describe('`configuration` has a combination match', () => {
            it('returns true', () => {
              return expect(evaluate('+1/2/3+A;+4/5/6+B', '+6+B'))
                .to.be.true
            })
          })

          describe('`configuration` does not have a combination match', () => {
            it('returns false', () => {
              return expect(evaluate('+1/2/3+A;+4/5/6+B', '+6+A'))
                .to.be.false
            })
          })

          describe('`configuration` has a negation match', () => {
            it('returns false', () => {
              return expect(evaluate('+!A;+!B', '+1+6+A+B'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match', () => {
            it('returns true', () => {
              return expect(evaluate('+1/2/3+A;!B', '+1+6+A+B'))
                .to.be.true
            })
          })

          describe('`configuration` has a negation match in combination', () => {
            it('returns false', () => {
              return expect(evaluate('+1/2/3+A;+4/5/6+B;+7/8/9+C;+!A+!B+!C', '+C'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match in combination', () => {
            it('returns true', () => {
              return expect(evaluate('+1/2/3+A;+4/5/6+B;+7/8/9+C;+!A+!B+!C;', '+9+C'))
                .to.be.true
            })
          })
        })
      })

      describe('`configuration` does not have configuration', () => {
        it('returns false', () => {
          return expect(evaluate('+A'))
            .to.be.false
        })
      })
    })

    describe('`rule` does not have rules', () => {
      describe('`configuration` has configuration', () => {
        it('returns false', () => {
          return expect(evaluate('', '+A'))
            .to.be.false
        })
      })

      describe('`configuration` does not have configuration', () => {
        it('returns false', () => {
          return expect(evaluate())
            .to.be.false
        })
      })
    })
  })

  describe('`getRuleMap()`', () => {
    it('is a `Map`', () => {
      return expect(getRuleMap())
        .to.be.an.instanceof(Map)
    })
  })

  describe('`getConfigurationMap`', () => {
    it('is a `Map`', () => {
      return expect(getConfigurationMap())
        .to.be.an.instanceof(Map)
    })
  })

  describe('`getEvaluation`', () => {
    it('returns false', () => {
      return expect(getEvaluation())
        .to.be.false
    })
  })

  describe('`evaluateRuleForConfiguration()`', () => {
    describe('`rule` has rules', () => {
      describe('`configuration` has configuration', () => {
        describe('`configuration` has a match', () => {
          it('returns true', () => {
            return expect(evaluateRuleForConfiguration('+A', '+A'))
              .to.be.true
          })
        })

        describe('`configuration` does not have a match', () => {
          it('returns false', () => {
            return expect(evaluateRuleForConfiguration('+B', '+A'))
              .to.be.false
          })
        })

        describe('Every rule must be true', () => {
          describe('`configuration` has a combination match', () => {
            it('returns true', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A+4/5/6+B', '+1+6+A+B'))
                .to.be.true
            })
          })

          describe('`configuration` does not have a combination match', () => {
            it('returns false', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A+4/5/6+B', '+6+A'))
                .to.be.false
            })
          })

          describe('`configuration` has a negation match', () => {
            it('returns false', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A+4/5/6+!B', '+1+6+A+B'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match', () => {
            it('returns true', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A+4/5/6+!C', '+1+6+A+B'))
                .to.be.true
            })
          })
        })

        describe('At least one rule must be true', () => {
          describe('`configuration` has a combination match', () => {
            it('returns true', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A;+4/5/6+B', '+6+B'))
                .to.be.true
            })
          })

          describe('`configuration` does not have a combination match', () => {
            it('returns false', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A;+4/5/6+B', '+6+A'))
                .to.be.false
            })
          })

          describe('`configuration` has a negation match', () => {
            it('returns false', () => {
              return expect(evaluateRuleForConfiguration('+!A;+!B', '+1+6+A+B'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match', () => {
            it('returns true', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A;!B', '+1+6+A+B'))
                .to.be.true
            })
          })

          describe('`configuration` has a negation match in combination', () => {
            it('returns false', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A;+4/5/6+B;+7/8/9+C;+!A+!B+!C', '+C'))
                .to.be.false
            })
          })

          describe('`configuration` does not have a negation match in combination', () => {
            it('returns true', () => {
              return expect(evaluateRuleForConfiguration('+1/2/3+A;+4/5/6+B;+7/8/9+C;+!A+!B+!C;', '+9+C'))
                .to.be.true
            })
          })
        })
      })

      describe('`configuration` does not have configuration', () => {
        it('returns false', () => {
          return expect(evaluateRuleForConfiguration('+A'))
            .to.be.false
        })
      })
    })

    describe('`rule` does not have rules', () => {
      describe('`configuration` has configuration', () => {
        it('returns false', () => {
          return expect(evaluateRuleForConfiguration('', '+A'))
            .to.be.false
        })
      })

      describe('`configuration` does not have configuration', () => {
        it('returns false', () => {
          return expect(evaluateRuleForConfiguration())
            .to.be.false
        })
      })
    })
  })
})
