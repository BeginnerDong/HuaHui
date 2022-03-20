/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import article from './article'

export default {
  path: '/article',
  name: '内容管理',
  icon: 'inbox',
  id:'1-/article',
  component: Home,
  meta:{
    children:[
      '2-/article/article',
    ]
  },
  children: [article]
}
