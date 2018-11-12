let seaduck = require("seaduck")

let n = new seaduck.Narrative({
  "nouns": [
    {
      "name": "Chris",
      "properties": {
        "has_drink": false,
        "sleepiness": 0,
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "Max",
      "properties": {
        "has_drink": false,
        "sleepiness": 0,
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "Rory",
      "properties": {
        "has_drink": false,
        "sleepiness": 0,
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "Horatio",
      "properties": {
        "has_drink": false,
        "sleepiness": 0,
        "happiness": 0,
        "hungry": true
      },
      "tags": ["person"]
    },
    {
      "name": "kitchen",
      "properties": {},
      "tags": ["room"]
    },
    {
      "name": "living room",
      "properties": {},
      "tags": ["room"]
    },
    {
      "name": "study",
      "properties": {},
      "tags": ["room"]
    },
    {
      "name": "bedroom",
      "properties": {},
      "tags": ["room"]
    },
    {
      "name": "coffee",
      "properties": {},
      "tags": ["drink"]
    },
    {
      "name": "tea",
      "properties": {},
      "tags": ["drink"]
    },
    {
      "name": "king-size bed",
      "properties": {
        "occupied": false
      },
      "tags": ["bed"]
    },
    {
      "name": "cookie",
      "properties": {
        "tastiness": 2,
        "eaten": false
      },
      "tags": ["food"]
    },
    {
      "name": "spinach",
      "properties": {
        "tastiness": 1,
        "eaten": false
      },
      "tags": ["food"]
    },
    {
      "name": "cake",
      "properties": {
        "tastiness": 3,
        "eaten": false
      },
      "tags": ["food"]
    }
  ],
  "initialize": function*() {
    // set up map
    this.reciprocal(
      "connects to", this.noun("kitchen"), this.noun("living room"));
    this.reciprocal(
      "connects to", this.noun("kitchen"), this.noun("study"));
    this.reciprocal(
      "connects to", this.noun("study"), this.noun("bedroom"));
    this.reciprocal(
      "connects to", this.noun("living room"), this.noun("bedroom"));

    // put people and objects in rooms
      //
    this.relate(
      "currently in", this.noun("Chris"), this.noun("living room"));
    yield new seaduck.StoryEvent(
      "in", this.noun("Chris"), this.noun("living room"));

    this.relate(
      "currently in", this.noun("Max"), this.noun("living room"));
    yield new seaduck.StoryEvent(
      "in", this.noun("Max"), this.noun("living room"));

    this.relate(
      "currently in", this.noun("Rory"), this.noun("study"));
    yield new seaduck.StoryEvent(
      "in", this.noun("Rory"), this.noun("study"));

    this.relate(
      "currently in", this.noun("Horatio"), this.noun("bedroom"));
    yield new seaduck.StoryEvent(
      "in", this.noun("Horatio"), this.noun("bedroom"));

    this.relate(
      "currently in", this.noun("coffee"), this.noun("kitchen"));
    yield new seaduck.StoryEvent(
      "in", this.noun("coffee"), this.noun("kitchen"));

    this.relate(
      "currently in", this.noun("tea"), this.noun("kitchen"));
    yield new seaduck.StoryEvent(
      "in", this.noun("tea"), this.noun("kitchen"));

    this.relate(
      "currently in", this.noun("king-size bed"), this.noun("bedroom"));
    yield new seaduck.StoryEvent(
      "in", this.noun("king-size bed"), this.noun("bedroom"));
  },
  "actions": [
    {
      "name": "take",
      "match": ["#person", "#drink"],
      "when": function(a, b) {
        let aLocation = this.relatedByTag("currently in", a, "room");
        let bLocation = this.relatedByTag("currently in", b, "room");
        return aLocation == bLocation && !a.properties.has_drink;
      },
      "action": function*(a, b) {
        yield (new seaduck.StoryEvent("take", a, b));
        // remove from all rooms
        this.unrelateByTag("currently in", b, "room");
        a.properties.has_drink = true;
      }
    },
    {
      "name": "move",
      "match": ["#person"],
      "when": function(a) {
        return !(this.isRelated("currently in", a, this.noun("study"))
          && a.properties.has_drink);
      },
      "action": function*(a) {
        let current = this.relatedByTag("currently in", a, "room");
        let dests = this.allRelatedByTag("connects to", current, "room");
        let chosenDest = this.choice(dests);
        this.unrelate("currently in", a, current);
        this.relate("currently in", a, chosenDest);
        yield (new seaduck.StoryEvent("moveTo", a, chosenDest));
      }
    },
    {
      "name": "talk",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        let aLocation = this.relatedByTag("currently in", a, "room");
        let bLocation = this.relatedByTag("currently in", b, "room");
        return aLocation == bLocation;
      },
      "action": function*(a, b) {
        yield (new seaduck.StoryEvent("chatsWith", a, b));
      }
    },
    {
      "name": "work",
      "match": ["#person"],
      "when": function(a) {
        return this.isRelated("currently in", a, this.noun("study"))
          && a.properties.has_drink;
      },
      "action": function*(a) {
        yield (new seaduck.StoryEvent("isWorking", a));
      }
    },
    {
      "name": "play video games",
      "match": ["#person"],
      "when": function(a) {
        return this.isRelated("currently in", a, this.noun("living room"));
      },
      "action": function*(a) {
        yield (new seaduck.StoryEvent("playGames", a));
      }
    },
    {
      "match": ["#person"],
      "when": function(a) {
        return a.properties.sleepiness < 10;
      },
      "action": function*(a) {
        a.properties.sleepiness++;
        yield new seaduck.StoryEvent("moreSleepy", a);
      }
    },
    {
      "match": ["#person"],
      "when": function(a) {
        return a.properties.sleepiness == 7;
      },
      "action": function*(a) {
        yield new seaduck.StoryEvent("reallySleepy", a);
      }
    },
    {
      "match": ["#person", "#bed"],
      "when": function(a, b) {
        return a.properties.sleepiness >= 10
          && !this.relatedByTag("sleepingIn", a, "bed")
          && !b.properties.occupied;
      },
      "action": function*(a, b) {
        this.relate("sleepingIn", a, b);
        b.properties.occupied = true;
        yield new seaduck.StoryEvent("getsInto", a, b);
      }
    },
    {
      "match": ["#person", "#bed"],
      "when": function(a, b) {
        return this.isRelated("sleepingIn", a, b);
      },
      "action": function*(a, b) {
        yield new seaduck.StoryEvent("asleep", a, b);
      }
    },
     {
      "name": "eat",
      "match": ["#person", "#food"],
      "when": function(a, b) {
        return a.properties.hungry
          && b.properties.tastiness > 0
          && !b.properties.eaten;
      },
      "action": function*(a, b) {
        yield (new seaduck.StoryEvent("eat", a, b));
        a.properties.hungry = false;
        b.properties.eaten = true;
        a.properties.happiness += b.properties.tastiness;
        if (b.properties.tastiness >= 2) {
          yield (new seaduck.StoryEvent("reallyLike", a, b));
        }
      }
    },
    {
      "name": "befriend",
      "match": ["#person", "#person"],
      "when": function(a, b) {
        return (
          (!a.properties.hungry && !b.properties.hungry)
          && !this.isRelated("friendship", a, b));
      },
      "action": function*(a, b) {
        yield (new seaduck.StoryEvent("makeFriends", a, b));
        this.reciprocal("friendship", a, b);
      }
    },
    {
      "name": "express happiness",
      "match": ["#person"],
      "when": function(a) {
        return !a.properties.hungry
          && a.properties.happiness >= 2
          && this.allRelatedByTag("friendship", a, "#person").length > 0;
      },
      "action": function*(a) {
        yield (new seaduck.StoryEvent("isHappy", a));
      }
    }
  ],
  "traceryDiscourse": {
    "in": [
      "#nounA.capitalize# was in the #nounB#."
    ],
    "take": [
      "#nounA# took #nounB#.",
      "'Oh, hey, #nounB#!' said #nounA#, and picked it up."
    ],
    "moveTo": [
      "After a while, #nounA# went into the #nounB#.",
      "#nounA# decided to go into the #nounB#."
    ],
    "topic": ["the weather", "the garden", "the phase of the moon",
      "#nounA#'s family", "the books they've been reading"],
    "chatsWith": [
      "#nounA# and #nounB# chatted for a bit.",
      "#nounA# asked #nounB# how their day was going.",
      "#nounB# told #nounA# about a dream they had last night.",
      "#nounA# and #nounB# talked for a bit about #topic#."
    ],
    "isWorking": [
      "#nounA# typed furiously on their laptop.",
      "#nounA# was taking notes while reading a book from the library.",
      "#nounA# sighed as they clicked 'Send' on another e-mail."
    ],
    "videoGame": ["Destiny 2", "Splatoon 2", "Skyrim", "Zelda", "Bejeweled"],
    "playGames": [
      "#nounA# sat down to play #videoGame# for a while.",
      "#nounA# decided to get a few minutes of #videoGame# in.",
      "#nounA# turned on the video game console. 'Ugh I love #videoGame# so much,' said #nounA#."
    ],
    "moreSleepy": [
      "#nounA# yawns.",
      "#nounA#'s eyelids droop.",
      "#nounA# nods off for a second, then perks up.",
      "#nounA# says, 'I could use a cup of coffee.'",
      "'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
      "#nounA# checks their watch."
    ],
    "adverb": ["at last", "finally", "not a moment too soon"],
    "getsInto": [
      "#adverb.capitalize#, #nounA# gets into the #nounB#.",
      "#adverb.capitalize#, #nounA# climbs into the #nounB#."
    ],
    "asleep": [
      "#nounA# is asleep in the #nounB#.",
      "#nounA# snores beneath the covers of the #nounB#.",
      "#nounA# sleep-mumbles peacefully in the #nounB#."
    ],
    "reallySleepy": [
      "#nounA# is really sleepy.",
      "'I'm just about ready to hit the hay,' says #nounA#.",
      "You can tell just by looking at them that #nounA# really needs some rest."
    ],
    "isHappy": ["#nounA# was happy", "#nounA# felt good!"],
    "isHungry": [
      "#nounA# had a rumble in their tummy.",
      "#nounA# felt very hungry."],
    "makeFriends": [
      "#nounA# made friends with #nounB#.",
      "#nounA# and #nounB# became friends."],
    "reallyLike": [
      "And let me tell you, #nounA# really enjoyed that #nounB#.",
      "#nounA# says, 'This #nounB# is so delicious!'"
    ],
    "eat": [
      "#nounA# ate a #nounB#.",
      "#nounA# gobbled up a #nounB#."
    ],
    "_end": [
      "The end.",
      "And they lived happily ever after."
    ]
  }
});

output = "";

let maxSteps = 1000; // maximum number of steps to perform

for (let i = 0; i < maxSteps; i++) {
  let storyEvents = n.stepAndRender();
  if (storyEvents.length > 0) {
    for (let ev of storyEvents) {
      console.log(ev);
    }
  }
  else {
    break;
  }
}
