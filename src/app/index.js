import 'reset-css'

import routes from './routes'
import page from 'page'

import Header from './Header'

export default class App {
  constructor() {
    this.header = new Header()
    this.router()
  }

  router() {
    this.currentPage = null
    this.previousPage = null

    routes.routes.forEach(route => {
      let path =
        process.env.NODE_ENV === 'production'
          ? process.env.PUBLIC_URL + route.path
          : route.path
      page(path, () => {
        this.header.setBackground(path === process.env.PUBLIC_URL + '/')

        this.previousPage = this.currentPage
        this.currentPage = new route.component()
        this.previousPage &&
          this.previousPage.componentWillUnmount &&
          this.previousPage.componentWillUnmount()
        this.currentPage.componentWillMount &&
          this.currentPage.componentWillMount()
      })
    })
    page()
  }
}
