import Home from './Home'

// MISC
// import Template from 'lab/_template'

// WebGL
import RainbowTriangle from 'lab/webgl/RainbowTriangle'
import RainbowPlane from 'lab/webgl/RainbowPlane'
import Circle from 'lab/webgl/Circle'
import RainbowCube from 'lab/webgl/RainbowCube'
import NormalCube from 'lab/webgl/NormalCube'
import DirtCube from 'lab/webgl/DirtCube'
import WireframePlane from 'lab/webgl/WireframePlane'
import WireframeCube from 'lab/webgl/WireframeCube'
import TransformationCube from 'lab/webgl/TransformationCube'
import PhongSphere from 'lab/webgl/PhongSphere'

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
    // {
    //   path: '/template',
    //   component: Template,
    //   name: 'Template',
    //   description: 'Basic template for future tests',
    //   categories: ['three', 'misc'],
    //   date: '31/01/2019'
    // },
    {
      path: '/rainbow-triangle',
      name: 'Rainbow triangle',
      description: 'A simple triangle with a rainbow shader',
      component: RainbowTriangle,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/rainbow-plane',
      name: 'Rainbow plane',
      description: 'A simple plane with a rainbow shader',
      component: RainbowPlane,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/circle',
      name: 'Circle',
      description: 'A 2d circle parametrable with dat.gui controls',
      component: Circle,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/normal-cube',
      component: NormalCube,
      name: 'Normal cube',
      description: 'Normal cube with orbit controls',
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/rainbow-cube',
      name: 'Rainbow cube',
      description: 'An animating cube in 3D',
      component: RainbowCube,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/normal-cube',
      name: 'Normal cube',
      description: 'Cube with normal shader and mouse orbit controls',
      component: NormalCube,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/dirt-cube',
      name: 'Dirt cube',
      description: 'Texture on a cube',
      component: DirtCube,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/wireframe-cube',
      name: 'Wireframe cube',
      description: 'Cube drawn in lines',
      component: WireframeCube,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/wireframe-plane',
      name: 'Wireframe plane',
      description: 'Plane drawn in lines',
      component: WireframePlane,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/transformation-cube',
      name: 'Transformation cube',
      description: 'Cube with small transformation tests, depending on time',
      component: TransformationCube,
      categories: ['webgl'],
      date: '31/01/2019'
    },
    {
      path: '/phong-sphere',
      name: 'Phong sphere',
      description: 'Sphere with phong shader',
      component: PhongSphere,
      categories: ['webgl'],
      date: '31/01/2019',
      wip: true
    }
  ]
}
