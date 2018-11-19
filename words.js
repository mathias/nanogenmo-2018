
class Words {
  static defaultMappings() {
    return {
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
  }

  static consonents() { 
    return 'bdghjklmnpqrstvwxzŋɣʃʒʔʧ';
  }

  static randRange(min, max) {
    if (max == undefined) {
      max = min;
      min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static shuffle(a) {
    let j, temp, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  static getRandomSubset(arr, size) {
    let shuffled = this.shuffle(arr);

    return shuffled.slice(0, size);
  }

  static chooseConsonents() {
    let consonents = this.consonents().split('')
    let count = this.randRange(5, consonents.length);

    return this.getRandomSubset(consonents, count).sort();
  }

  static makeLanguage() {
    let maxMorphemes = this.randRange(8,16)
    let syllStructs = [
      "CVC",
      "CVV?C",
      "CVVC?", "CVC?", "CV", "VC", "CVF", "C?VC", "CVF?",
      "CL?VC", "CL?VF", "S?CVC", "S?CVF", "S?CVC?",
      "C?VF", "C?VC?", "C?VF?", "C?L?VC", "VC",
      "CVL?C?", "C?VL?C", "C?VLC?"
    ];

    let lang = {
      phonemes: {
        C: this.chooseConsonents(),
        V: 'aeiou'.split(''),
        S: 's'.split(''),
        F: 'mn'.split(''),
        L: 'rl'.split(''),
      },
      minsyll: this.randRange(1, 3),
      maxsyll: this.randRange(3, 7),
      morphemes: [],
      structure: this.getRandomSubset(syllStructs, 1)[0]
    };

    for(let i = 0; i < maxMorphemes; i++) {
      let morpheme = this.getMorpheme(lang);

      if (!lang.morphemes.includes(morpheme)) {
        lang.morphemes.push(this.getMorpheme(lang));
      }
    }

    return lang;
  }

  static spell(lang, syll) {
    //if (lang.noortho) return syll;
    let s = '';
    for (let i = 0; i < syll.length; i++) {
      let c = syll[i];
      //s += lang.cortho[c] || lang.vortho[c] || defaultOrtho[c] || c;
      s += c;
    }
    return s;
  }

  static getMorpheme(lang) {
    let syll = ''

    for (let i = 0; i < lang.structure.length; i++) {
      let ptype = lang.structure[i];
      if (lang.structure[i+1] == '?') {
        i++;

        if (Math.random() < 0.5) {
          continue;
        }
      }
      syll += this.getRandomSubset(lang.phonemes[ptype], 1)[0];
    }

    return this.spell(lang, syll);
  }

  static makeWord(language) {
    if (!language) {
      language = this.makeLanguage();
    }

    let nsylls = this.randRange(language.minsyll, language.maxsyll + 1);
    let w = '';
    let keys = [];

    for (var i = 0; i < nsylls; i++) {
        w += this.getMorpheme(language, keys[i]);
    }
    return w;
  }
}

module.exports = Words;
