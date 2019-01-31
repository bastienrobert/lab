import Home from './Home'
import Template from 'lab/_template'

export default {
  title: 'ThreeJS experiments',
  opts: {
    ghPages: true
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/template',
      component: Template,
      name: 'Template',
      description: 'Basic template for future tests',
      date: '31/01/2019'
    }
  ]
}
