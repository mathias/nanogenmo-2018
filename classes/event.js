const _ = require('lodash')

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
 * For now, we assume such an event can be:
 *   - observed by every actor at that location
 *   - affects only actors at that location
 * speaker and addressed_to apply to dialogue.
 * if speaker is null, it means the narrator is speaking.
 * if addressedTo is null, it means the reader is being spoken to.
 */
class Event {
  constructor(phrase, character, location, object, participants, opts) {
    this.phrase = phrase
    this.character = character
    this.participants = participants || []
    this.location = location
    this.object = object

    opts = opts || {}
    this.exciting = opts.exciting || false
    this.previousLocation = opts.previousLocation || false

    this.speaker = opts.speaker || null
    this.addressedTo = opts.addressedTo || null

    this.exclaim = opts.exclaim || false // TODO: implement exclamation
  }

  toString() {
    let output = ''
    output = this.phrase.replace(/<1>/, this.character.name).
      replace(/<2>/, this.location.name).
      replace(/<was-1>/, 'was').
      replace(/<he-1>/, 'they').
      replace(/<his-1>/, 'their')

    if (this.object) {
      output = output.replace(/<3>/, this.object.name)
    }

    if (this.exclaim) {
      output += '!'
    } else {
      output += '.'
    }

    return capitalize(output)
  }
}

module.exports = Event
