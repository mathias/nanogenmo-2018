const _ = require('lodash')

const Event = require('../classes/event')

class Editor {
  constructor(eventCollector, characters) {
    this.transformers = []

    // We want to push and pop off the 'front' of the list, so reverse it:
    this.events = _.reverse(eventCollector.events)
    this.mainCharacters = characters

    this.characterLocations = {}
    this.characterLastSeenAt = {}
    this.excitingDevelopments = {}
  }

  addTransformer(transformer) {
    this.transformers += transformer
  }

  publish() {
    let paragraphNum = 1
    let povIndex = 0
    let output = ''

    while (this.events.length > 0) {
      let character = this.mainCharacters[povIndex]
      let paragraphEvents = this._generateParagraphEvents(character)

      output += this._publishParagraph(paragraphEvents)
      this.povIndex += 1
      if (this.povIndex >= this.mainCharacters.length) {
        this.povIndex = 0
      }
      paragraphNum += 1
    }

    return output
  }

  _generateParagraphEvents(povCharacter) {
    let eventQuota = _.random(10,25)
    let paragraphEvents = []

    while (paragraphEvents.length < eventQuota && this.events.length > 0) {
      let event = this.events.pop()

      if (_.isEmpty(paragraphEvents)) {
        // this is the first sentence of the paragraph
        // if they don't know, let the reader know where characters are
        if (this.characterLastSeenAt[povCharacter.name] != event.location) {
          if (!(event.phrase.includes('went to') ||
                event.phrase.includes('made <his-1> way to') ||
                event.phrase.includes('<1> <was-1> in <2>'))) {
            paragraphEvents.push(new Event('<1> <was-1> in <2>', povCharacter, event.location))
          }
        }
      }

      // if something exciting happened, tell the reader
      if (this.excitingDevelopments && this.excitingDevelopments[povCharacter.name]) {
        let exciting = this.excitingDevelopments[povCharacter.name]
        paragraphEvents.push(new Event('<1> had found <2> in <3>', povCharacter, exciting.location, exciting.object))
        this.excitingDevelopments[povCharacter.name] = []
      }

      // Set location of character that caused this event (even if not povCharacter)
      this.characterLocations[event.character] = event.location

      if (event.location === this.characterLocations[povCharacter]) {
          paragraphEvents.push(event)

          // update the reader's idea of where the character is
          this.characterLastSeenAt[event.character] = event.location
      } else {
        //if (event.exciting) {
          //self.exciting_developments.setdefault(event.initiator(), []).append(
            //(event.participants[1], event.participants[2])
        //}
      }
    }
    return paragraphEvents
  }

  _publishParagraph(paragraphEvents) {
    return _.reduce(paragraphEvents, function(memo, event) {
      memo += event.toString() + ' '
      return memo
    }, '') + '\n\n'
  }
}

module.exports = Editor
