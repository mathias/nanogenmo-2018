const _ = require('lodash')

const locationAdjs = [
  'abandoned',
  'destroyed',
  'windswept',
  'ruined',
  'empty'
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

class Location {
  constructor(opts) {
    this._exits = []
    this._contents = []
    this.regionType = _.sample(regionTypes)
    this.name = `${_.sample(locationAdjs)} ${this.regionType.typeName}`
  }

  get exits() {
    return this._exits
  }

  set exits(exits) {
    this._exits = exits
  }

  addExit(exit) {
    this._exits.push(exit)
  }

  get contents() {
    return this._contents
  }

  set contents(contents) {
    this._contents = contents
  }

  addContents(content) {
    this._contents.push(content)
  }

  removeContents(content) {
    this._contents = _.without(this._contents, content)
    return this._contents
  }
}

module.exports = Location
