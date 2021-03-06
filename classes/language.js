let _ = require('lodash')

const allStructures = [
  "CVC", "CVV?C", "CVVC?", "CVC?", "CV", "VC", "CVF", "C?VC", "CVF?", "CL?VC",
  "CL?VF", "S?CVC", "S?CVF", "S?CVC?", "C?VF", "C?VC?", "C?VF?", "C?L?VC",
  "VC", "CVL?C?", "C?VL?C", "C?VLC?"
]

const consets = [
  {
    name: "Minimal",
    C: "ptkmnls"
  },
  {
    name: "English-ish",
    C: "ptkbdgmnlrsʃzʒʧ"
  },
  {
    name: "Pirahã (very simple)",
    C: "ptkmnh"
  },
  {
    name: "Hawaiian-ish",
    C: "hklmnpwʔ"
  },
  {
    name: "Greenlandic-ish",
    C: "ptkqvsgrmnŋlj"
  },
  {
    name: "Arabic-ish",
    C: "tksʃdbqɣxmnlrwj"
  },
  {
    name: "Arabic-lite",
    C: "tkdgmnsʃ"
  },
  {
    name: "English-lite",
    C: "ptkbdgmnszʒʧhjw"
  }
];

const vowsets = [
  {
    name: "Standard 5-vowel",
    V: "aeiou"
  },
  {
    name: "3-vowel a i u",
    V: "aiu"
  },
  {
    name: "Extra A E I",
    V: "aeiouAEI"
  },
  {
    name: "Extra U",
    V: "aeiouU"
  },
  {
    name: "5-vowel a i u A I",
    V: "aiuAI"
  },
  {
    name: "3-vowel e o u",
    V: "eou"
  },
  {
    name: "Extra A O U",
    V: "aeiouAOU"
  }
];

const defaultOrtho = {
  'ʃ': 'sh',
  'ʒ': 'zh',
  'ʧ': 'ch',
  'ʤ': 'j',
  'ŋ': 'ng',
  'j': 'y',
  'x': 'kh',
  'ɣ': 'gh',
  'ʔ': '‘',
  A: "á",
  E: "é",
  I: "í",
  O: "ó",
  U: "ú"
};

const corthsets = [
  {
    name: "Default",
    orth: {}
  },
  {
    name: "Slavic",
    orth: {
      'ʃ': 'š',
      'ʒ': 'ž',
      'ʧ': 'č',
      'ʤ': 'ǧ',
      'j': 'j'
    }
  },
  {
    name: "German",
    orth: {
      'ʃ': 'sch',
      'ʒ': 'zh',
      'ʧ': 'tsch',
      'ʤ': 'dz',
      'j': 'j',
      'x': 'ch'
    }
  },
  {
    name: "French",
    orth: {
      'ʃ': 'ch',
      'ʒ': 'j',
      'ʧ': 'tch',
      'ʤ': 'dj',
      'x': 'kh'
    }
  },
  {
    name: "Chinese (pinyin)",
    orth: {
      'ʃ': 'x',
      'ʧ': 'q',
      'ʤ': 'j',
    }
  }
];

const vorthsets = [
  {
    name: "Ümlauts",
    orth: {
      A: "ä",
      E: "ë",
      I: "ï",
      O: "ö",
      U: "ü"
    }
  },
  {
    name: "Welsh",
    orth: {
      A: "â",
      E: "ê",
      I: "y",
      O: "ô",
      U: "w"
    }
  },
  {
    name: "Diphthongs",
    orth: {
      A: "au",
      E: "ei",
      I: "ie",
      O: "ou",
      U: "oo"
    }
  },
  {
    name: "Doubles",
    orth: {
      A: "aa",
      E: "ee",
      I: "ii",
      O: "oo",
      U: "uu"
    }
  }
];

class Language {
  constructor(opts) {
    opts = opts || {}
    let minsyll = _.random(1, 3)
    let maxsyll = _.random(minsyll+1, 7)

    this.config = _.defaults(opts, {
      structure: _.sample(allStructures).split(''),
      maxMorphemes: _.random(7,16),
      C: _.sample(consets).C,
      V: _.sample(vowsets).V,
      S: 's'.split(''),
      F: 'mn'.split(''),
      L: 'rl'.split(''),
      minsyll: minsyll,
      maxsyll: maxsyll,
      cortho: _.sample(corthsets).orth,
      vortho: _.sample(vorthsets).orth,
      joiner: _.sample("'   -".split(''))
    })

    this.morphemes = this.makeMorphemes()
    this.genitives = {
      'of': this.makeWord(),
    }
    this.definites = {
      'the': this.makeWord()
    }

    this.words = []

    this.langName = this.makeName()
  }

  chooseConsonents() {
    let count = _.random(5, allConsonents.length);

    return _.shuffle(allConsonents).slice(0, count).sort();
  }

  makeMorpheme() {
    let syll = ''
    let structure = this.config.structure

    for (let i = 0; i < structure.length; i++) {
      let ptype = structure[i];
      if (structure[i+1] == '?') {
        i++;

        if (Math.random() <= 0.5) {
          continue;
        }
      }
      syll += _.sample(this.config[ptype])
    }
    return syll
  }

  makeMorphemes() {
    return _.uniq(_.map(_.range(this.config.maxMorphemes), _.bind(function () {
      return this.makeMorpheme();
    }, this)))
  }

  makeWord(maxsyll) {
    let nsylls = _.random(this.config.minsyll, maxsyll || this.config.maxsyll);
    let w = ''

    for (var i = 0; i < nsylls; i++) {
      w += _.sample(this.morphemes)
    }

    w = this.spell(w)

    return w;
  }

  spell(w) {
    let s = '';
    for (let i = 0; i < w.length; i++) {
      let c = w[i];
      s += this.config.cortho[c] || this.config.vortho[c] || defaultOrtho[c] || c;
    }
    return s;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  }

  makeName() {
    let name = ''

    let w1 = this.capitalize(this.makeWord())
    let w2 = this.capitalize(this.makeWord())
    if (w1 == w2) return w1;

    if (Math.random() > 0.5) {
      name = ([w1, w2]).join(this.config.joiner);
    } else {
      name = [w1, this.genitives['of'], w2].join(this.config.joiner);
    }
    if (Math.random() < 0.1) {
      name = [this.definites['the'], name].join(this.config.joiner);
    }
    return name
  }

  makePlaceName() {
    let name = this.capitalize(this.makeWord(3))

    const directions = ['North', 'South', 'East', 'West', 'Upper']
    const suffixers = ['the Lesser', 'the Greater', `upon ${this.makeName(3)}`]

    if (Math.random() > 0.5) { name = `${_.sample(directions)} ${name}` }
    if (Math.random() > 0.75) { name = name + ' ' + _.sample(suffixers) }

    return name;
  }
}

module.exports = Language
