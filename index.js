const _ = require('lodash')
const fs = require('fs')
const seaduck = require('seaduck')
const tracery = require('tracery-grammar')

const Artifact = require('./classes/artifact')
const Character = require('./classes/character')
const Language = require('./classes/language')

// Data files:
const adjs = JSON.parse(fs.readFileSync('corpora/data/words/adjs.json', 'utf8'))["adjs"]
const bodyParts = JSON.parse(fs.readFileSync('corpora/data/humans/bodyParts.json', 'utf8'))["bodyParts"]
const lastNames = JSON.parse(fs.readFileSync('corpora/data/humans/lastNames.json', 'utf8'))["lastNames"]

const grammarJson = JSON.parse(fs.readFileSync('./grammar.json', 'utf8'))
let gibberishGrammar = tracery.createGrammar(grammarJson)
gibberishGrammar.addModifiers(tracery.baseEngModifiers);

function getGibberish() {
  return gibberishGrammar.flatten('#origin#').replace(/"+/gi, '').replace(/[ ]+/, ' ')
}

// The new plan:
// 1. Generate regions, one per chapter. (How many chapters? 16 might work)
// 2. Generate peoples for the regions -- "animal peoples" needs generator
// 3. Generate a crisis or puzzle for each region
// 4. Link regions together as a "path" -- chapter order
// 5. Optionally, 'draw' a map with SVG of the regions linked for the path
// 6. Generate children characters
// 7. Generate intro where children are introduced to a 'wizard' that starts
//    their journey
// 8. Generate the villain who the children are trying to overcome
// 9. Generate the penultimate chapter where they face down the villain
// 10. Generate the final chapter
// 11. Draw PDF

let worldLanguage = new Language({
  minsyll: 1,
  maxsyll: 3,
  structure: 'CV',
  //C: "ptkmnls",
  V: "aeiouU"
});
worldLanguage.langName = `Ancient ${worldLanguage.langName}`

const bookTitle = `The Road to ${worldLanguage.makeName()}`
console.log(bookTitle);

let chapters = []

// Entity system:
// - Characters persist through various chapters (regions)
// - Regions get built for each chapter, and they contain objects, enemies, etc.
let entities = []

let childrenLastName = _.sample(lastNames)

entities.push(new Character({
  tags: ['character', 'child'],
  properties: {age: _.random(4,6), lastName: childrenLastName}
}));

entities.push(new Character({
  takenNames: [entities[0].name],
  tags: ['character', 'child'],
  properties: {age: _.random(7,10), lastName: childrenLastName}
}));

entities.push(new Character({
  takenNames: [entities[0].name, entities[1].name],
  tags: ['character', 'child'],
  properties: {age: _.random(11,13), lastName: childrenLastName}
}));


let wizardNames = ['Hilde', 'Noirin', 'Butterflax', 'Anise', 'Matilda']
entities.push(new Character({
  name: _.sample(wizardNames),
  tags: ['character', 'wizard'],
  properties: {
    age: _.random(100,399),
    profession: 'Wizard'
  }
}));

let squirrel = new Character({
  name: worldLanguage.makeName(),
  tags: ['character'],
  properties: {
    race: 'squirrel person',
    age: _.random(1,10),
    languages: {
      spoken: [worldLanguage.langName],
      understood: [worldLanguage.langName],
      read: [worldLanguage.langName]
    }
  }
})
entities.push(squirrel)

// initial entities + world state
console.log(entities);

// Introduction
let introText = ''

let wizardName = entities[3].name
let squirrelName = entities[4].name

function adj() {
  return _.sample(adjs);
}

let sayWords = getGibberish()
introText += `"${sayWords}", ${squirrelName} chirped.\n\n`

chapters.push({title: 'Introduction', text: introText})

// In each region:
// 1. Introduce how the characters got there.
// 2. Revisit the character's current state, if anything out of the ordinary. (Is anyone injured? Is anyone sick?)
// 3. Describe the region initially
// 4. Introduce the challenge
// 4.5 Characters discuss the challenge
// 5. Search space for actions that lead to a narrative that solves the challenge
// 6. Describe solving the challenge
// 7. Have locals reward/thank characters
// 8. Describe how characters move on to next region

let str= ''
let chapterNum = 1
chapters.push({title: `Chapter ${chapterNum}.`, text: str})

// Ending
chapters.push({title: '', text: 'THE END'})

// Output (TODO: PDF generation rendering here)
chapters.map(function(chapter) {
  console.log(chapter.title + '\n')
  console.log(chapter.text + '\n\n')
})

// TODO: instead of templating in Tracery/Seaduck, do string templates w/ local
// names using closures? Like this:
let foo = (function(squirrelNomer, wizardNomer) {
  return `${squirrelNomer} and ${wizardNomer}`
})(squirrelName, wizardName)
console.log(foo)
