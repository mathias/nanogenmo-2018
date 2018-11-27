const _ = require('lodash')

const Location = require('../classes/location')
const Region = require('../classes/region')

class World {
  constructor(opts) {
    this.regions = []

    opts = _.defaults(opts, {chaptersCount: 16})

    for(let i = 0; i < opts.chaptersCount; i++) {
      this.regions[i] = new Region()

      let loc1 = new Location()
      let loc2 = new Location()
      loc1.addExit(loc2)
      loc2.addExit(loc1)

      this.regions[i].addLocation(loc1)
      this.regions[i].addLocation(loc2)
    }


  }

  regionFor(index) {
    return this.regions[index-1]
  }
}

module.exports = World
