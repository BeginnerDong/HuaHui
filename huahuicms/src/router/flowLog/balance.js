/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article ,Flowlog} from 'views/'

export default {
  path: 'balance',
  name: '佣金管理',
  icon: 'inbox',
  id:'2-/flowLog/balance',
  component: Content,
  meta:{
    children:['3-/flowLog/balance/balance']
  },
  children: [
    {
      path: 'balance',
      name: '佣金列表',
      icon: 'reorder',
      id:'3-/flowLog/balance/balance',
      child_button:[
        { 
          name:'添加',
          id:'/flowLog/balance/balance-添加'
        },
        { 
          name:'编辑',
          id:'/flowLog/balance/balance-编辑'
        },
        { 
          name:'删除选中',
          id:'/flowLog/balance/balance-删除选中'
        },
      ],
      component: Flowlog.Balance
    },
  ]
}
