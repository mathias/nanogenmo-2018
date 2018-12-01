const _ = require('lodash')

class EventCollector {
  constructor(opts) {
    this._events = []
  }

  get events() {
    return this._events
  }

  pushEvent(event) {
    // TODO: bring this back after we have more types of events:
    //if (this._events.length > 1 && event.toString() === _.last(this._events).toString()) {
      //return new Error(`Duplicate event: ${event.toString()}`)
    //}

    // TODO: if we need this
    //if (event.phrase === '<1> went to <2>') {
      //return if event.previousLocation && event.previousLocation === event.location
    //}
    this.events.push(event)
    return event
  }
}

module.exports = EventCollector
