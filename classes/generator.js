const _ = require('lodash')
const fs = require('fs')

const Character = require('../classes/character')
const Editor = require('../classes/editor')
const EventCollector = require('../classes/event_collector')
const World = require('../classes/world')

class Generator {
  constructor(opts) {
    this.world = opts.world || this._makeWorld()
    this.title = opts.title || this._makeTitle()
    this.characters = opts.characters || this._makeCharacters()
    this.chaptersCount = opts.chaptersCount || 16
    this.eventsPerChapter = opts.eventsPerChapter || 800
  }

  publish() {
    let output = ''

    output += this.title + '\n'
    output += Array(this.title.length + 1).join('=') + '\n'
    output += 'A NaNoGenMo 2018 novel by Matt Gauger <matt.gauger@gmail.com>'
    output += '\n\n'

    for(let c = 1; c <= this.chaptersCount; c++) {
      output += `\nChapter ${c}\n`
      output += `--------------\n`
      output += this._publishChapter(c)
    }
    output += '\nFinal Chapter \n'
    output += `--------------\n`
    output += this._publishChapter(this.chaptersCount, {ending: true})

    output += '\n\n THE END'
    output += `\n\n ${this._countWords(output)}  words`

    console.log(output)
    //fs.writeFileSync('./output/book.txt', output, 'utf8')
    // TODO: write PDF here
  }

  _countWords(str) {
    let strCpy = _.clone(str)
    strCpy = strCpy.replace(/(\s)+/g, '$1')
    const wordsByWhitespace = strCpy.split(/\s/).length;
    const wordsByHyphens = 0 // strCpy.split('-').length;
    const wordsByEmdashes = 0 // strCpy.split('—').length;
    return wordsByWhitespace + wordsByHyphens + wordsByEmdashes;
  }

  _publishChapter(chapterNum, opts) {
    let eventCollector = new EventCollector()

    let characterSetup = (character) => {
      character.collector = eventCollector
      character.topic = null

      let region = this.world.regionFor(chapterNum)
      character.location = _.first(this.world.regionFor(chapterNum).locations)
    }

    this.characters.forEach(characterSetup)

    while (eventCollector.events.length < this.eventsPerChapter) {
      _.forEach(this.characters, function(character) {
        character.tick()
      })
    }

    let editor = new Editor(eventCollector, this.characters)

    editor.addTransformer()

    return editor.publish()
  }

  _makeCharacters() {
    let characters = []
    let takenNames = []
    let ages = [_.random(4,6), _.random(7,10), _.random(11,13)]

    // TODO: set up a region for the introduction chapter here (wizard's cottage or whatever)
    let startingRegion = _.first(this.world.regions)
    let startingLoc = _.first(startingRegion.locations)

    let characterSetup = (age) => {
      let character = new Character({age: age, takenNames: takenNames, location: startingLoc})
      takenNames.push(character.name)

      return character
    }

    return ages.map(characterSetup)

    return characters
  }

  _makeTitle() {
    return 'The ${journey} of ${worldName}'
  }

  _makeWorld() {
    let world = new World({chaptersCount: this.chaptersCount})
    // make language
    // make regions
    // make artifacts
    // make weather ?
    return world
  }
}

module.exports = Generator
