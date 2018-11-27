const _ = require('lodash')

class Topic {
  constructor(opts) {
    this._originator = opts.originator || {}
  }

  get originator() => {
    return this._originator
  }

  set originator(originator) => {
    this._originator = originator
  }

}

module.exports = Topic
