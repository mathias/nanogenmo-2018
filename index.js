const Artifact = require('./classes/artifact')
const Character = require('./classes/character')
const Language = require('./classes/language')

const _ = require('lodash')
const seaduck = require('seaduck')
const tracery = require('tracery-grammar')
const fs = require('fs')

const grammarJson = JSON.parse(fs.readFileSync('./grammar.json', 'utf8'))
let gibberishGrammar = tracery.createGrammar(grammarJson)
gibberishGrammar.addModifiers(tracery.baseEngModifiers);

function getGibberish() {
  return gibberishGrammar.flatten('#origin#')
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

let chapters = []

let entities = []

entities.push(new Character({tags: ['character', 'child'], properties: {age: _.random(4,6)}}));
entities.push(new Character({tags: ['character', 'child'], properties: {age: _.random(7,10)}}));
entities.push(new Character({tags: ['character', 'child'], properties: {age: _.random(11,13)}}));

let wizardNames = ['Hilde', 'Noirin', 'Butterflax', 'Anise', 'Matilda']
entities.push(new Character({
  name: _.sample(wizardNames),
  tags: ['character', 'wizard'],
  properties: {
    age: _.random(100,399),
    profession: 'Wizard'
  }
}));

let squirrelLang = new Language({
  minsyll: 1,
  maxsyll: 2,
  V: "aeiou",
  vortho: {},
  cortho: {}
});

let squirrel = new Character({
  name: squirrelLang.makeName(),
  tags: ['character'],
  properties: {
    race: 'squirrel person',
    age: _.random(1,10),
    languages: {
      spoken: [squirrelLang.langName],
      understood: [squirrelLang.langName],
      read: [squirrelLang.langName]
    }
  }
})
//console.log(squirrel);
//console.log(squirrel.properties.languages);
entities.push(squirrel)

// initial entities + world state
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
        return a.properties.sleepiness == 7;
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("reallySleepy", a);
      }
    },
    {
      "match": ["#character", "#thing"],
      "when": function(a, b) {
        return a.properties.sleepiness >= 10 
          && !this.isRelated("sleepingIn", a, b)
          && !b.properties.occupied;
      },
      "action": function*(a, b) {
        this.relate("sleepingIn", a, b);
        b.properties.occupied = true;
        yield new seaduck.StoryEvent("getsInto", a, b);
      }
    },
    {
      "match": ["Chris", "king-size bed"],
      "when": function(a, b) {
        return this.isRelated("sleepingIn", a, b);
      },
      "action": function*(a, b) {
        yield new seaduck.StoryEvent("asleep", a, b);
      }
    }
  ],
  "initialize": function*() {
    yield new seaduck.StoryEvent('describe', this.noun('house of the wizard'));
  },
  "traceryDiscourse": {
    "amiable": ["#nounA# is a friendly sort of person.", "#nounA# is often good-natured."],
    "isAlive": ["#nounA# is alive."],
    "describe": ["The #nounA# is where everyone is."],
    "_end": ["That's all."]
  }
})

let strs = []
let step = 0;
let stepsDesired = 25;

//for (let i = 0; i < maxSteps; i++) {
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

chapters.push({title: 'Chapter #!', text: str})

// Ending
chapters.push({title: '', text: `Then the squirrel person ${squirrel.name} said: '${getGibberish()}' and it was over.\n\nTHE END`})

// Output (TODO: PDF generation rendering here)
chapters.map(function(chapter) {
  console.log(chapter.title + '\n')
  console.log(chapter.text + '\n\n')
})
