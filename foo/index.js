var fs = require('fs');
var tracery = require('tracery-grammar');

var inputs = JSON.parse(fs.readFileSync('grammar.json', 'utf8'));

//var grammar = tracery.createGrammar({
  //'animal': ['panda','fox','capybara','iguana'],
  //'emotion': ['sad','happy','angry','jealous'],
  //'origin':['I am #emotion.a# #animal#.'],
//});
var grammar = tracery.createGrammar(inputs);

grammar.addModifiers(tracery.baseEngModifiers);

console.log(grammar.flatten('#origin#'));
