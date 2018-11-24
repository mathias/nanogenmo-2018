const Language = require('./classes/language.js')
const Character = require('./classes/character.js')
const Artifact = require('./classes/artifact.js')
const _ = require('lodash')

let lang = new Language()

console.log(`This language is named: ${lang.langName}`)

console.log(`The morphemes are: ${lang.morphemes}`)

console.log('Example words:')

let words = []
_.range(20).map(function() {
  words.push(lang.makeWord())
})
console.log(words.join(' '))

console.log('Example names:')

_.range(5).map(function() {
  console.log(lang.makeName())
})


console.log(new Character())
