/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import { Flowlog } from 'views/'

export default {
  path: 'pay',
  name: '支付管理',
  icon: 'inbox',
  id:'2-/flowLog/pay',
  component: Content,
  meta:{
    children:['3-/flowLog/pay/pay']
  },
  children: [
    {
      path: 'pay',
      name: '微信支付记录列表',
      icon: 'reorder',
      id:'3-/flowLog/pay/pay',
      child_button:[
        { 
          name:'添加',
          id:'/flowLog/pay/pay-添加'
        },
        { 
          name:'编辑',
          id:'/flowLog/pay/pay-编辑'
        },
        { 
          name:'删除选中',
          id:'/flowLog/pay/pay-删除选中'
        },       
      ],
      component: Flowlog.pay
    },
  ]
}
