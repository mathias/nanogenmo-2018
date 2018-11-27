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
    objects: ['catcus', 'rusted car'],
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
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'meadow',
    defaultAdjs: ['flower-scented', 'sunny'],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'beach',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'steppes',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'cave',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'wasteland',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'side of a river',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'glacier',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'mountaintop',
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'ruins', // what kind?
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'small village',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'rope bridge',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
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
    placeToCamp: 0.85
  },
  {
    typeName: 'schoolhouse',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'road',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'monolith',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
  {
    typeName: 'stadium',
    flags: ['madeByPeople'],
    defaultAdjs: [],
    optionalSpecificAdjs: [],
    objects: [],
    placeToCamp: 0.85
  },
]

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Region {
  constructor(opts) {
    return _.defaults(opts, this.pickType(opts.type))
  }

  pickName() {
    let name = capitalize(_.sample(items))

  }

  pickType(typeName) {
    let type = {}

    if (typeName) {
      type = _.find(regionTypes, function(d) { return d.typeName == typeName })
    } else {
      type = _.sample(regionTypes)
    }

    return type
  }
}

module.exports = Region
