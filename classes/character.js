let _ = require('lodash')
let fs = require('fs')

const descriptions = JSON.parse(fs.readFileSync('corpora/data/humans/descriptions.json', 'utf8'))["descriptions"]
const names = JSON.parse(fs.readFileSync('./data/character_names.json', 'utf8'))["names"]

const traits = {
  openness: [
    'imaginative',
    'insightful',
    'many interests',
    'original',
    'daring',
    'preference for variety',
    'clever',
    'creative',
    'curious',
    'perceptive',
    'intellectual',
    'complex/deep'
  ],
  conscientiousness: [
    'persistent',
    'ambitious',
    'thorough',
    'self-disciplined',
    'consistent',
    'predictable',
    'controlled',
    'reliable',
    'resourceful',
    'hard working',
    'energetic',
    'persevering',
    'planner'
  ],
  extroversion: [
    'sociable',
    'assertive',
    'merry',
    'outgoing',
    'energetic',
    'talkative',
    'articulate',
    'fun-loving',
    'affectionate',
    'friendly'
  ],
  agreeableness: [
    'altruistic',
    'trusting',
    'modest',
    'humble',
    'patient',
    'moderate',
    'tactful',
    'polite',
    'kind',
    'loyal',
    'unselfish',
    'helpful',
    'sensitive',
    'amiable',
    'cheerful',
    'considerate',
  ],
  neuroticism: [
    'awkward',
    'pessimistic',
    'moody',
    'jealous',
    'testy',
    'fearful',
    'nervous',
    'anxious',
    'timid',
    'wary',
    'self-critical',
    'unconfident',
    'insecure',
    'unstable',
    'oversensitive',
  ]
}

class Character {
  constructor(opts) {
    return _.defaults(opts, {
      type: 'character',
      inventory: [],
      name: _.sample(names),
      languages: {
        spoken: [],
        understood: [],
        read: []
      },
      age: 0,
      traits: _.reduce(traits, function(result, val, key) {
        result[key] = _.sample(val);
        return result;
      }, {}),
      adjectives: _.sample(descriptions)
    })
  }
}

module.exports = Character
