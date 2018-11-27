const _ = require('lodash')

class Region {
  constructor(opts) {
    opts = _.defaults(opts, {
      locations: []
    })

    this._locations = opts.locations
  }

  get locations() {
    return this._locations
  }

  set locations(locationList) {
    this._locations = locationList
  }

  addLocation(loc) {
    return this._locations.push(loc)
  }
}

module.exports = Region
