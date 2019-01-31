import Home from './Home'
import Template from 'lab/_template'

export default {
  opts: {},
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/template',
      component: Template,
      name: 'Template',
      description: 'Basic template for future tests'
    }
  ]
}
