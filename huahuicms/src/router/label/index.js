/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import articleMenu from './articleMenu'
import subjectMenu from './subjectMenu'

export default {
  path: '/label',
  name: '类别管理',
  icon: 'inbox',
  id:'1-/label',
  component: Home,
  meta:{
    children:['2-/label/articleMenu','2-/label/subjectMenu']
  },
  children: [
	  articleMenu,
	  subjectMenu
  ]
}
