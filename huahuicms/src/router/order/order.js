/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Order } from 'views/'

export default {
  path: 'order',
  name: '订单管理',
  icon: 'inbox',
  id:'2-/order/order',
  component: Content,
  meta:{
    children:['3-/order/order/order']
  },
  children: [
    {
      path: 'order',
      name: '订单列表',
      icon: 'reorder',
      id:'3-/order/order/order',
      child_button:[
        { 
          name:'添加',
          id:'/order/order/order-添加'
        },
        { 
          name:'编辑',
          id:'/order/order/order-编辑'
        },
        { 
          name:'删除选中',
          id:'/order/order/order-删除选中'
        },       
      ],
      component: Order.order
    },
  ]
}
