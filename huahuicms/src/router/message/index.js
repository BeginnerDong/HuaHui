/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import message from './message'

export default {
  path: '/message',
  name: '信息管理',
  icon: 'inbox',
  id:'1-/message',
  component: Home,
  meta:{
    children:[
      '2-/message/message',
    ]
  },
  children: [
  	message,
  ]
}
