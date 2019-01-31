import 'reset-css'
import './styles.scss'

import routes from './routes'
import page from 'page'

export default class App {
  constructor() {
    this.router()
  }

  router() {
    this.currentPage = null
    this.previousPage = null

    routes.routes.forEach(route => {
      const { path, component } = route
      page(path, () => {
        this.previousPage = this.currentPage
        this.currentPage = new component()
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
