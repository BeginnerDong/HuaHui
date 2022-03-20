import { Home } from 'layout/'

import product from './product'

export default {
  path: '/product',
  name: '商品管理',
  icon: 'inbox',
  id:'1-/product',
  component: Home,
  meta:{
    children:['2-/product/product']
  },
  children: [product]
}
