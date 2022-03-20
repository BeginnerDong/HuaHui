/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import {Label} from 'views/'

export default {
  path: 'subjectMenu',
  name: '特殊类别管理',
  icon: 'inbox',
  id:'2-/label/subjectMenu',
  component: Content,
  meta:{
    children:[
      '3-/label/subjectMenu/areaMenu',
      '3-/label/subjectMenu/sku',
    ]
  },
  children: [
    {
      path: 'areaMenu',
      name: '商品类别管理',
      icon: 'reorder',
      id:'3-/label/subjectMenu/areaMenu',
      child_button:[
        {
          name:'添加',
          id:'/label/subjectMenu/areaMenu-添加'
        },
        {
          name:'编辑',
          id:'/label/subjectMenu/areaMenu-编辑'
        },
        {
          name:'删除选中',
          id:'/label/subjectMenu/areaMenu-删除选中'
        },
      ],
      component: Label.AreaMenu
    },
    {
      path: 'sku',
      name: 'sku标签管理',
      icon: 'reorder',
      id:'3-/label/subjectMenu/sku',
      child_button:[
        {
          name:'添加',
          id:'/label/subjectMenu/sku-添加'
        },
        {
          name:'编辑',
          id:'/label/subjectMenu/sku-编辑'
        },
        {
          name:'删除选中',
          id:'/label/subjectMenu/sku-删除选中'
        },
      ],
      component: Label.Sku
    },
  ]
}
