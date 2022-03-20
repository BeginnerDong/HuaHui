/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import thirdApp from './thirdApp'

export default {
  path: '/thirdApp',
  name: '项目管理',
  icon: 'inbox',
  id:'1-/thirdApp',
  component: Home,
  meta:{
    children:['2-/thirdApp/thirdAppLists']
  },
  children: [thirdApp]
}
