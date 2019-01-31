import './styles.scss'

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

    const title = document.createElement('h1')
    title.innerHTML = 'Native WebGL experiments'
    this.container.appendChild(title)

    const list = document.createElement('ul')
    this.container.appendChild(list)

    routes.routes.forEach(route => {
      const { name, description, path } = route
      if (path === '/') return

      const li = document.createElement('li')
      const a = document.createElement('a')
      const strong = document.createElement('strong')
      const i = document.createElement('i')

      a.href = path
      strong.innerHTML = name
      i.innerHTML = ` - ${description}`

      a.appendChild(strong)
      a.appendChild(i)
      li.appendChild(a)
      list.appendChild(li)
    })
  }
}
