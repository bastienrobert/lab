import css from './styles.scss'

import page from 'page'

import routes from 'app/routes'
import { querystringToObject } from 'utils/helpers'

export default class Home {
  componentWillMount(ctx) {
    this.query = querystringToObject(ctx.querystring)
    this.createDOM()
  }

  componentWillUnmount() {
    try {
      this.select.removeEventListener('change', this.onSelectChange)
      document.body.removeChild(this.container)
    } catch (e) {
      console.log(e)
    }
  }

  createDOM() {
    this.container = document.createElement('section')
    document.body.appendChild(this.container)

    this.createSelect()
    this.createList()
  }

  createSelect() {
    const nav = document.createElement('nav')
    this.select = document.createElement('select')

    const blank = document.createElement('option')
    blank.text = 'No filter'
    blank.value = ''
    this.select.add(blank)
    Object.entries(routes.categories).forEach(c => {
      const [k, v] = c
      const option = document.createElement('option')
      option.value = k
      option.text = v
      if (this.query && this.query.category === option.value)
        option.selected = true
      this.select.add(option)
    })

    this.select.addEventListener('change', this.onSelectChange)
    nav.appendChild(this.select)
    this.container.appendChild(nav)
  }

  createList() {
    const list = document.createElement('ul')
    this.container.appendChild(list)

    routes.routes.forEach(route => {
      if (
        route.path === '/' ||
        (this.query && !route.categories.includes(this.query.category))
      )
        return
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

  onSelectChange = () => {
    const value = this.select.value
    value === '' ? page('/') : page(`/?category=${value}`)
  }
}
