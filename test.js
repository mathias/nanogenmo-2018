//const Words = require('./words.js');
const Language = require('./language.js')
const _ = require('lodash')


//console.log(Words.makeWord())
let lang = new Language()
//console.log(lang);

console.log(`This language is named: ${lang.langName}`)

console.log('Examples:')

let words = []
_.range(100).map(function() {
  words.push(lang.makeWord())
})
console.log(words.join(' '))
