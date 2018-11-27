// book.js: Publish a new book with generators to txt (md) and PDF
const _ = require('lodash')
const fs = require('fs')

//const Artifact = require('./classes/artifact')
//const Character = require('./classes/character')
const Generator = require('./classes/generator')
//const Language = require('./classes/language')
//const Region = require('./classes/region')
const World = require('./classes/world')


let generator = new Generator({
  title: 'The Path to Nama-Ku',
})

generator.publish()
