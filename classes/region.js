let _ = require('lodash')

const prefixes = [
  'abandoned',
  'destroyed',
  'windswept',
  'ruined',
  'empty'
]

const allObjects = []

const opposites = [
  ['bright', 'dark'],
  ['wet', 'dry'],
  ['salty', 'fresh'],
]

const regionTypes = [
  {
    typeName: 'desert',
    defaultAdjs: ['arid', 'dry'],
    optionalSpecificAdjs: ['sandy', 'ice-covered'],
    objects: ['cactus', 'rusted car'],
    placeToCamp: 0.75
  },
  {
    typeName: 'swamp',
    defaultAdjs: ['wet', 'green'],
    optionalSpecificAdjs: ['bug-ridden', 'mossy'],
    objects: ['overturned boat', 'lost basketball', 'a snake'],
    placeToCamp: 0.25
  },
  {
    typeName: 'forest',
    defaultAdjs: ['wooded'],
    optionalSpecificAdjs: [],
    objects: ['sticks', 'rocks', 'a lost sweater'],
    placeToCamp: 0.85
  },
  {
    typeName: 'field',
    defaultAdjs: ['grassy', 'sunny'],
    optionalSpecificAdjs: ['flowering',],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'meadow',
    defaultAdjs: ['flower-scented', 'sunny'],
    optionalSpecificAdjs: ['muddy'],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'beach',
    defaultAdjs: ['sandy', 'cool'],
    optionalSpecificAdjs: ['misty', 'salty'],
    objects: [],
    placeToCamp: 0.75
  },
  {
    typeName: 'steppes',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.5
  },
  {
    typeName: 'cave',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.25
  },
  {
    typeName: 'wasteland',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.25
  },
  {
    typeName: 'side of a river',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.75
  },
  {
    typeName: 'glacier',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.5
  },
  {
    typeName: 'mountaintop',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.5
  },
  {
    typeName: 'ruins', // what kind?
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.25
  },
  {
    typeName: 'small village',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.9
  },
  {
    typeName: 'rope bridge',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.9
  },
  {
    typeName: 'mines',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'factory',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.5
  },
  {
    typeName: 'schoolhouse',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.5
  },
  {
    typeName: 'road',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.75
  },
  {
    typeName: 'monolith',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.75
  },
  {
    typeName: 'stadium',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.75
  },
]

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Region {
  constructor(opts) {
    this.opts = opts
    return _.defaults(opts, this.pickType())
  }

  pickName() {
    let name = capitalize(_.sample(items))

  }

  pickType() {
    let type = {}

    if (this.opts && this.opts.type) {
      type = _.find(regionTypes, function(d) { return d.typeName == typeName })
    } else {
      type = _.sample(regionTypes)
    }

    return type
  }
}

module.exports = Region
