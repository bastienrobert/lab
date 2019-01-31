import Emitter from 'utils/Emitter'

class Values {
  constructor() {
    this.locale = 'fr'

    this.viewport = {
      width: 0,
      height: 0
    }

    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  onResize = () => {
    Emitter.emit('resize')

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

export default new Values()
