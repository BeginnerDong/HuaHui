/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import {Label} from 'views/'


export default {
  path: 'articleMenu',
  name: '菜单管理',
  icon: 'inbox',
  id:'2-/label/articleMenu',
  component: Content,
  meta:{
    children:[
      '3-/label/articleMenu/article',
      '3-/label/articleMenu/data',
      '3-/label/articleMenu/image',
      '3-/label/articleMenu/video',
      '3-/label/articleMenu/product',
      '3-/label/articleMenu/info',
      '3-/label/articleMenu/software',
    ]
  },
  children: [
    {
      path: 'article',
      name: '文章菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/article',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/article-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/article-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/article-删除选中'
        },
      ],
      component: Label.Article
    },
    {
      path: 'data',
      name: '资料菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/data',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/data-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/data-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/data-删除选中'
        },
      ],
      component: Label.Data
    },
    {
      path: 'image',
      name: '高清图菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/image',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/image-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/image-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/image-删除选中'
        },
      ],
      component: Label.Image
    },
    {
      path: 'video',
      name: '视频菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/video',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/video-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/video-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/video-删除选中'
        },
      ],
      component: Label.Video
    },
    {
      path: 'product',
      name: '产品菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/product',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/product-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/product-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/product-删除选中'
        },
      ],
      component: Label.Product
    },
    {
      path: 'info',
      name: '信息菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/info',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/info-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/info-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/info-删除选中'
        },
      ],
      component: Label.Info
    },
    {
      path: 'software',
      name: '软件菜单',
      icon: 'reorder',
      id:'3-/label/articleMenu/software',
      child_button:[
        {
          name:'添加',
          id:'/label/articleMenu/software-添加'
        },
        {
          name:'编辑',
          id:'/label/articleMenu/software-编辑'
        },
        {
          name:'删除选中',
          id:'/label/articleMenu/software-删除选中'
        },
      ],
      component: Label.Software
    },
  ]
}
