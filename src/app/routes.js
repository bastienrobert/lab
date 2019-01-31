import Home from './Home'

// THREE
import Template from 'lab/_template'

// WebGL
import NormalCube from 'lab/webgl/NormalCube'

export default {
  title: '👨🏻‍🔬',
  opts: {
    ghPages: true
  },
  categories: {
    three: 'ThreeJS',
    webgl: 'Native WebGL',
    misc: 'Misc'
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
      categories: ['three', 'misc'],
      date: '31/01/2019'
    },
    {
      path: '/normal-cube',
      component: NormalCube,
      name: 'Normal cube',
      description: 'Normal cube with orbit controls',
      categories: ['webgl'],
      date: '31/01/2019'
    }
  ]
}
