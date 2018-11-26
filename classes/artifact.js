let _ = require('lodash')

const prefixes = [
  'Magical',
  'Mostly-working',
  'Awe-inspiring',
  'The People\'s',
  'Broken',
  'Bent',
  'Sticky',
  'Replica',
  'Omega',
  'Moth-eaten'
]

const materials = [
  'Cardboard', 'Suede', 'Velvet', 'Metallic', 'Acrylic', 'Brass', 'Cast iron',
  'Tinfoil', 'Rubbery', 'Polyester', 'Vinyl', 'Titanium', 'Taped-together',
]

const items = [
  'Rubber Chicken',
  'Alarm Clock',
  'Pencil',
  'Bottle',
  'Pocket Watch',
  'Dictionary',
  'Umbrella',
  'Scissors',
  'Flute',
  'Comb',
  'Sunscreen',
  'Hat',
  'Backpack'
]

const suffixes = [
  'the Breaker',
  'of Power',
  'for Joking Purposes Only',
  'the Concealer'
]

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class Artifact {
  constructor(opts) {
    return _.defaults(opts, {
      name: this.pickName(),
    })
  }

  pickName() {
    let name = capitalize(_.sample(items))

    if (Math.random() > 0.5) {
      // Add Material and Prefix
      name = _.sample(materials) + ' ' + name
      name = _.sample(prefixes) + ' ' + name

    } else if (Math.random() > 0.25) {
      name = _.sample(materials) + ' ' + name
    } else if (Math.random() > 0.25) {
      name = _.sample(prefixes) + ' ' + name
    } else if (Math.random() > 0.5 || name.split(' ').length == 1) {
      // add a suffix
      name += ' ' + _.sample(suffixes)
    }

    return name
  }
}

module.exports = Artifact
