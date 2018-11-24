let _ = require('lodash')
//let fs = require('fs')

//const descriptions = JSON.parse(fs.readFileSync('corpora/data/humans/descriptions.json', 'utf8'))["descriptions"]

class Artifact {
  constructor(opts) {
    return _.defaults(opts, {
    })
  }
}

module.exports = Artifact
