/**
 * Created by sailengsi on 2017/5/11.
 */

import { Home } from 'layout/'

import Balance from './balance'
import score from './score'
import pay from './pay'

export default {
  path: '/flowLog',
  name: '流水管理',
  icon: 'inbox',
  id:'1-/flowLog',
  component: Home,
  meta:{
    children:[
			'2-/flowLog/balance',
			'2-/flowLog/pay',
			'2-/flowLog/score',
		]
  },
  children: [
	  Balance,
		score,
	  pay,
  ]
}
