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

const bookTitle = `The Placeholder of ${worldLanguage.makeName()}`
console.log(bookTitle);
console.log(`A history written in ${worldLanguage.langName}.\n`);

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
  tags: ['character', 'child'],
  properties: {age: _.random(7,10), lastName: childrenLastName}
}));

entities.push(new Character({
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

//let squirrelLang = new Language({
  //minsyll: 1,
  //maxsyll: 2,
  //V: "aeiou",
  //vortho: {},
  //cortho: {}
//});

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
//console.log(entities);

// Introduction
let introText = ''

let wizardName = entities[3].name
let squirrelName = entities[4].name

function adj() {
  return _.sample(adjs);
}

introText += `The ${childrenLastName} children were all asleep in their beds. As you may already know, sleep is when the world of imagination is closest to our world. That is why, at this moment, a ${adj()} ${_.sample(bodyParts)} appeared in the middle of the room. There was a ripping sound, like a pair of trousers being split, and then the owner of that body part stepped fully through the background. It was, of course, ${wizardName}. But you will meet them later. The hole they left behind seemed to be in the wall itself, as if they'd stepped in from the next room. But the room behind the hole was ${adj()} and ${adj()}, completely unlike the children's bedroom.\n\n`

introText += `Sneaking in behind ${wizardName} was a peculiar sight. A small woodland creature, in a ${adj()} jumpsuit. It turned, revealing that it was carrying a small backpack with various leaves sticking out of it. Its tiny eyes darted nervously around the room.\n\n`

let sayWords = getGibberish()
introText += `"${sayWords}", it chirped.\n\n`

introText +=`"That may well be, ${squirrelName}", said ${wizardName}. "But I am sure this is the right place!"\n\n`

introText += `${wizardName} snapped their fingers, and the ${childrenLastName} disappeared out of their beds. Turning, ${wizardName} and ${squirrelName} disappeared back through the hole in time and space. A needle and thread appeared, sewing up the gateway, which faded until it disappeared completely.`

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

let n = new seaduck.Narrative({
  "nouns": entities.concat([
    {
      tags: ['region'],
      name: 'house of the wizard'
    }
  ]),
  "actions": [
    {
      "match": ["#character"],
      "when": function(a) {
        return a.properties.traits && a.properties.traits.includes('amiable')
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("amiable", a);
      }
    },
    {
      "match": ["#character"],
      "when": function(a) {
        return a.properties.age > 0
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("isAlive", a);
      }
    },
    {
      "match": ["#character"],
      "when": function(a) {
        return a.properties.race
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("describeRace", a);
      }
    },
  ],
  "initialize": function*() {
    yield new seaduck.StoryEvent('describeRoom', this.noun('house of the wizard'));
    //yield new seaduck.StoryEvent('describePerson', this.noun(entities[0].name));
    //yield new seaduck.StoryEvent('describePerson', this.noun(entities[1].name));
    //yield new seaduck.StoryEvent('describePerson', this.noun(entities[2].name));
  },
  "traceryDiscourse": {
    "amiable": ["#nounA# is a friendly sort of person.", "#nounA# is often good-natured."],
    "isAlive": ["#nounA# is alive."],
    "describeRace": ["#nounA# is a #nounA_race#."],
    "smell1": ["cheeze", "old socks", "baloney"],
    "smell2": ["lilac", "earth", "wood"],
    "describeRoom": ["The #nounA# is where everyone is. It smells like #smell1# and #smell2# at once."],
    "describePerson": ["#nounA# is #nounA_age# years old."],
    "_end": ["That's all."]
  }
})

let strs = []
let step = 0;
let stepsDesired = 25;

while (step < stepsDesired) {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    step++;

    for (let ev of storyEvents) {
      strs.push(ev)
    }
  } else {
    break;
  }
}
str = _.uniq(strs).join('\n')

let chapterNum = 1
chapters.push({title: `Chapter ${chapterNum}.`, text: str})

// Ending
chapters.push({title: '', text: `Then the squirrel person ${squirrel.name} said: '${getGibberish()}' and it was over.\n\nTHE END`})

// Output (TODO: PDF generation rendering here)
chapters.map(function(chapter) {
  console.log(chapter.title + '\n')
  console.log(chapter.text + '\n\n')
})
