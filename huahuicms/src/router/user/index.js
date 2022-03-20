/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import adminLists from './adminLists'

export default {
  path: '/user',
  name: '用户管理',
  icon: 'inbox',
  id:'1-/user',
  component: Home,
  meta:{
    children:['2-/user/adminLists']
  },
  children: [adminLists]
}
