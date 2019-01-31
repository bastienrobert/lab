import './styles.scss'

import routes from '../routes'

export default class Header {
  constructor() {
    this.createDOM()
  }

  createDOM() {
    this.header = document.createElement('header')

    const a = document.createElement('a')
    a.href = '/'

    const title = document.createElement('h1')
    title.innerHTML = routes.title

    a.appendChild(title)
    this.header.appendChild(a)

    document.body.appendChild(this.header)
  }
}
