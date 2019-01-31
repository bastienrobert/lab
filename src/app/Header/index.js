import css from './styles.scss'

import routes from '../routes'

export default class Header {
  constructor() {
    this.createDOM()
    this.background = false
  }

  setBackground(background) {
    if (this.background === background) return
    this.header.className = background ? css.background : ''
    this.background = background
  }

  createDOM() {
    this.header = document.createElement('header')

    const a = document.createElement('a')
    a.href =
      process.env.NODE_ENV !== 'production' ? '/' : process.env.PUBLIC_URL

    const title = document.createElement('h1')
    title.innerHTML = routes.title

    a.appendChild(title)
    this.header.appendChild(a)

    document.body.appendChild(this.header)
  }
}
