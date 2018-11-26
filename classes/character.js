let _ = require('lodash')
let fs = require('fs')

const descriptions = JSON.parse(fs.readFileSync('corpora/data/humans/descriptions.json', 'utf8'))["descriptions"]
const names = JSON.parse(fs.readFileSync('./data/character_names.json', 'utf8'))["names"]

class Character {
  constructor(opts) {
    let name = this.pickName(opts.takenNames || [])
    return _.defaults(opts, {
      name: name,
      tags: ['character'],
      properties: {
        inventory: [],
        languages: {
          spoken: [],
          understood: [],
          read: []
        },
        age: 0,
        adjectives: _.sample(descriptions),
        height: _.sample(['short for their age', 'tall for their age', 'of average height']),
        hair_length: _.sample(['long', 'shoulder length', 'short', 'close cropped']),
        hair_colour: _.sample(['blonde', 'brown', 'red', 'auburn', 'black', 'blue', 'purple', 'pink', 'white']),
        eye_color: _.sample(['brown', 'blue', 'grey', 'green', 'hazel', 'red', 'aquamarine']),
        topic: ''
      }
    })
  }

  pickName(takenNames) {
    let name = _.sample(names)
    while(takenNames.includes(name)) {
      name = _.sample(names)
    }
    return name
  }
}

module.exports = Character
