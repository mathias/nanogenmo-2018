let _ = require('lodash')
let fs = require('fs')

const Event = require('../classes/event')

//const descriptions = JSON.parse(fs.readFileSync('corpora/data/humans/descriptions.json', 'utf8'))["descriptions"]
const names = JSON.parse(fs.readFileSync('./data/character_names.json', 'utf8'))["names"]

class Character {
  constructor(opts) {
    let name = this._pickName((opts || {}).takenNames || [])
    let config = _.defaults(opts, {
      name: name,
      inventory: [],
      languages: {
        spoken: [],
        understood: [],
        read: []
      },
      age: 0,
      //adjectives: _.sample(descriptions),
      //height: _.sample(['short for their age', 'tall for their age', 'of average height']),
      //hair_length: _.sample(['long', 'shoulder length', 'short', 'close cropped']),
      //hair_colour: _.sample(['blonde', 'brown', 'red', 'auburn', 'black', 'blue', 'purple', 'pink', 'white']),
      //eye_color: _.sample(['brown', 'blue', 'grey', 'green', 'hazel', 'red', 'aquamarine']),
      topic: null,
      collector: null,
      location: null
    })

    this.name = config.name
    this.age = config.age

    this._collector = config.collector
    this._location = config.location
    this._topic = config.topic

    this._was = 'was'
    this._inventory = []
    this._nerves = 'calm' // to start
    this.isAnimate = true // alive to start
    this.previousLocation = null
  }

  get collector() {
    return this._collector
  }

  set collector(coll) {
    this._collector = coll
  }

  get location() {
    return this._location
  }

  set location(loc) {
    this._location = loc
  }

  get topic() {
    return this._topic
  }

  set topic(t) {
    this._topic = t
  }

  get was() {
    return this._was
  }

  get isAlive() {
    return this.isAnimate
  }

  tick() {
    // if character is in a conversation, continue that
    if (this.topic) {
      return this._converse()
    }
    // else, if there are objects the character wants here, pick them up
    //let desired = _.first(location.contents, (item) => { return this.doesDesire(item) })
    //if (desired) {
      //return this.pickUp(desired)
    //}

    // else, fixate on something from the character's inventory:
    //let fixatedOn = _.first(this._inventory, () => {})

    // check if we're alone or if there are people around
    let peopleAbout = false
    let isAliveFn = (content) => {
      return content.isAlive
    }
    peopleAbout = _.some(this.location.contents, isAliveFn)

    let choice = _.random(0, 25)

    if (choice < 10 && !peopleAbout) {
        //return self.hide_and_seek(fixated_on)
      // TODO: something else besides trying to hide objects from others?
    } else if (choice < 20) {
      return this._wander()
    } else if (choice == 20) {
      let phrase = _.sample([])
      return this._collector.pushEvent(new Event("<1> yawned", this, this.location))
    } else if (choice == 21) {
      let phrase = _.sample([])
      return this._collector.pushEvent(new Event("<1> gazed thoughtfully into the distance", this, this.location))
    } else if (choice == 22) {
      let phrase = _.sample([])
      return this._collector.pushEvent(new Event("<1> thought <he-1> heard something", this, this.location))
    } else if (choice == 23) {
      let phrase = _.sample([])
      return this._collector.pushEvent(new Event("<1> scratched <his-1> head", this, this.location))
    } else if (choice == 24) {
      let phrase = _.sample([
        "<1> immediately had a bad feeling about this",
        "<1> started getting a bad feeling",
        "<1> had a bad feeling about their situation"
      ])
      return this._collector.pushEvent(new Event(phrase, this, this.location))
    } else {
      return this._wander()
    }
  }

  moveTo(location) {
    if (location === this.location || location === undefined || location === null) { return new Error('cannot move to same location') }

    let sawLeave = (content) => {
      if (content === this) {
        return // otherwise we get 'Bob saw Bob leave the room'
      } else if (content.isAlive) {
        return this._collector.pushEvent(new Event(`<1> saw <3> leave the ${content.location.name}`, content, this.location, this, [this, content]))
      }
    }
    this.location.contents.forEach(sawLeave)

    if (!(this.location === null) && !(this.location === undefined)) {
      this.location.removeContents(this)
    }

    this.previousLocation = this.location
    this.location = location

    if (this.location.contents.includes(this)) { return new Error('already in location') }
    this.location.addContents(this)


    return this._collector.pushEvent(
      new Event('<1> went to <2>', this, this.location, null, [this], {previousLocation: this.previousLocation})
    )
  }

  _pickName(takenNames) {
    let name = _.sample(names)
    while(takenNames.includes(name)) {
      name = _.sample(names)
    }
    return name
  }

  _wander() {
    if (this.location.exits.length > 0) {
      return this.moveTo(
        _.sample(this.location.exits)
      )
    }
  }

  _converse() {
    let other = this.topic.originator

    return this._collector.pushEvent(new Event("'Hello, <2>,' replied <1>", this, this.location, other, [this, other]))
  }
}

module.exports = Character
