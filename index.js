const Artifact = require('./classes/artifact')
const Character = require('./classes/character')
const Language = require('./classes/language')
const _ = require('lodash')
const seaduck = require('seaduck')

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

let chapters = []

let entities = []

entities.push(new Character({age: _.random(4,6), additional: ['child']}));
entities.push(new Character({age: _.random(7,10), additional: ['child']}));
entities.push(new Character({age: _.random(11,13), additional: ['child']}));

let wizardNames = ['Hilde', 'Noirin', 'Butterflax', 'Anise', 'Matilda']
entities.push(new Character({
  age: _.random(100,399),
  name: _.sample(wizardNames),
  profession: 'Wizard'
}));

// At state: initial entities + world
//console.log(entities);

// Introduction
chapters.push({title: 'Introduction', text: 'Once upon a time'})

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


// Ending
chapters.push({title: '', text: 'THE END'})

// Output (TODO: PDF generation rendering here)
chapters.map(function(chapter) {
  console.log(chapter.title + '\n')
  console.log(chapter.text + '\n\n')
})
