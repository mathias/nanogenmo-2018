const Artifact = require('./classes/artifact');
const Character = require('./classes/character');
const Language = require('./classes/language');
const _ = require('lodash');

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

let regions = Array(16);

let entities = []

entities.push(new Character({age: _.random(4,6), additional: ['child']}));
entities.push(new Character({age: _.random(7,10), additional: ['child']}));
entities.push(new Character({age: _.random(11,13), additional: ['child']}));

let wizardNames = ['Hilde', 'Noirin', 'Barflax']
entities.push(new Character({
  age: _.random(100,399),
  name: _.sample(wizardNames),
  profession: 'Wizard'
}));

console.log(entities);
