/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Product } from 'views/'

export default {
  path: 'product',
  name: '商品管理',
  icon: 'inbox',
  id:'2-/product/product',
  component: Content,
  meta:{
    children:[
      '3-/product/product/product',
      '3-/product/product/Coupon',
      '3-/product/product/sku',
     ]
  },
  children: [
    {
      path: 'product',
      name: '商品列表',
      icon: 'reorder',
      id:'3-/product/product/product',
      child_button:[
        {
          name:'添加',
          id:'/product/product/product-添加'
        },
        {
          name:'编辑',
          id:'/product/product/product-编辑'
        },
        {
          name:'管理Sku',
          id:'/product/product/product-管理Sku'
        },
        {
          name:'删除选中',
          id:'/product/product/product-删除选中'
        },
      ],
      component: Product.Product
    },
    {
      path: 'Coupon',
      name: '优惠券列表',
      icon: 'reorder',
      id:'3-/product/product/Coupon',
      child_button:[
        {
          name:'添加',
          id:'/product/product/Coupon-添加'
        },
        {
          name:'编辑',
          id:'/product/product/Coupon-编辑'
        },
        {
          name:'删除选中',
          id:'/product/product/Coupon-删除选中'
        },
      ],
      component: Product.Coupon
    },
    {
      path: 'sku',
      name: 'sku列表',
      icon: 'reorder',
      id:'3-/product/product/sku',
      child_button:[
        {
          name:'添加',
          id:'/product/product/sku-添加'
        },
        {
          name:'编辑',
          id:'/product/product/sku-编辑'
        },
        {
          name:'删除选中',
          id:'/product/product/sku-删除选中'
        },
        {
          name:'返回',
          id:'/product/product/sku-返回'
        },
      ],
      hide: true,
      component: Product.Sku
    },
  ]
}
