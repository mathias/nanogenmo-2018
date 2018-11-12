const fs = require('fs');

const {
  ngramsDistribution,
  sentences,
  createSentence,
} = require('markovian-nlp');

// 'inputs/' contains source texts to read and run Markov chains on
const inputs = 'inputs/';

let document = '';

let files = fs.readdirSync(inputs);

files.forEach(function(file) {
  document += fs.readFileSync(inputs + file) + '\n';
  //console.log(file);
});

//console.log(inputStrs);

//const output = sentences({
  //count: 3,
  //document: inputStrs,
//});

const distribution = ngramsDistribution(document);

let output = '';

//console.log(output);
console.log(distribution);
