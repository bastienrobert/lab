class Emitter {
  constructor() {
    this.events = {}
  }

  on(name, fn) {
    if (!this.events[name]) this.events[name] = []
    this.events[name].push(fn)
  }

  off(name, fn) {
    if (!fn) {
      this.events[name] = undefined
      return
    }

    this.events[name] = this.events[name].filter(currentFn => {
      if (currentFn.name === fn.name && currentFn === fn) {
        return false
      } else {
        return true
      }
    })
  }

  emit(name, ...args) {
    if (!this.events[name]) return

    for (let i = 0; i < this.events[name].length; i++) {
      this.events[name][i].apply(null, args)
    }
  }
}

export default new Emitter()
