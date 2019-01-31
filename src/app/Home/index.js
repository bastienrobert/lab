import css from './styles.scss'

import routes from 'app/routes'

export default class Home {
  componentWillMount() {
    this.createDOM()
  }

  componentWillUnmount() {
    try {
      document.body.removeChild(this.container)
    } catch (e) {
      console.log(e)
    }
  }

  createDOM() {
    this.container = document.createElement('section')
    document.body.appendChild(this.container)

    const list = document.createElement('ul')
    this.container.appendChild(list)

    routes.routes.forEach(route => {
      if (route.path === '/') return
      list.appendChild(this.createCard({ ...route }))
    })

    list.appendChild(this.createHelp())
  }

  createCard({ name, description, date, path, wip }) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const state = document.createElement('span')

    a.href =
      process.env.NODE_ENV === 'production'
        ? process.env.PUBLIC_URL + path
        : path
    h2.innerHTML = name
    p.innerHTML = description

    state.className = wip ? `${css.state} ${css.wip}` : css.state

    a.appendChild(h2)
    a.appendChild(p)
    a.appendChild(state)
    li.appendChild(a)

    if (date) {
      const when = document.createElement('span')
      when.className = css.date
      when.innerHTML = date
      a.appendChild(when)
    }

    return li
  }

  createHelp() {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const letter = document.createElement('span')
    const circle = document.createElement('span')
    li.className = css.help
    a.href = 'https://github.com/bastienrobert/threejs-lab#'
    a.target = '_blank'
    letter.className = css.letter
    letter.innerHTML = '?'
    circle.className = css.circle
    a.appendChild(circle)
    a.appendChild(letter)
    li.appendChild(a)
    return li
  }
}
