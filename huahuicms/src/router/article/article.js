/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Article } from 'views/'

export default {
  path: 'article',
  name: '内容管理',
  icon: 'inbox',
  id:'2-/article/article',
  component: Content,
  meta:{
    children:[
      '3-/article/article/article',
      '3-/article/article/articles',
      '3-/article/article/data',
      '3-/article/article/image',
      '3-/article/article/video',
      '3-/article/article/product',
      '3-/article/article/info',
      '3-/article/article/recruit',
      '3-/article/article/company',
      '3-/article/article/software',
      '3-/article/article/cooperation',
    ]
  },
  children: [
    {
      path: 'article',
      name: '文章列表',
      icon: 'reorder',
      id:'3-/article/article/article',
      child_button:[
        {
          name:'添加',
          id:'/article/article/article-添加'
        },
        {
          name:'编辑',
          id:'/article/article/article-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/article-删除选中'
        },
      ],
      component: Article.Article
    },
    {
      path: 'articles',
      name: '首页轮播案例',
      icon: 'reorder',
      id:'3-/article/article/articles',
      child_button:[
        {
          name:'添加',
          id:'/article/article/articles-添加'
        },
        {
          name:'编辑',
          id:'/article/article/articles-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/articles-删除选中'
        },
      ],
      component: Article.Articles
    },
    {
      path: 'data',
      name: '资料列表',
      icon: 'reorder',
      id:'3-/article/article/data',
      child_button:[
        {
          name:'添加',
          id:'/article/article/data-添加'
        },
        {
          name:'编辑',
          id:'/article/article/data-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/data-删除选中'
        },
      ],
      component: Article.Data
    },
    {
      path: 'image',
      name: '高清图列表',
      icon: 'reorder',
      id:'3-/article/article/image',
      child_button:[
        {
          name:'添加',
          id:'/article/article/image-添加'
        },
        {
          name:'编辑',
          id:'/article/article/image-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/image-删除选中'
        },
      ],
      component: Article.Image
    },
    {
      path: 'video',
      name: '视频列表',
      icon: 'reorder',
      id:'3-/article/article/video',
      child_button:[
        {
          name:'添加',
          id:'/article/article/video-添加'
        },
        {
          name:'编辑',
          id:'/article/article/video-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/video-删除选中'
        },
      ],
      component: Article.Video
    },
    {
      path: 'product',
      name: '产品列表',
      icon: 'reorder',
      id:'3-/article/article/product',
      child_button:[
        {
          name:'添加',
          id:'/article/article/product-添加'
        },
        {
          name:'编辑',
          id:'/article/article/product-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/product-删除选中'
        },
      ],
      component: Article.Product
    },
    {
      path: 'info',
      name: '信息列表',
      icon: 'reorder',
      id:'3-/article/article/info',
      child_button:[
        {
          name:'添加',
          id:'/article/article/info-添加'
        },
        {
          name:'编辑',
          id:'/article/article/info-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/info-删除选中'
        },
      ],
      component: Article.Info
    },
    {
      path: 'software',
      name: '软件列表',
      icon: 'reorder',
      id:'3-/article/article/software',
      child_button:[
        {
          name:'添加',
          id:'/article/article/software-添加'
        },
        {
          name:'编辑',
          id:'/article/article/software-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/software-删除选中'
        },
      ],
      component: Article.Software
    },
    {
      path: 'recruit',
      name: '招聘列表',
      icon: 'reorder',
      id:'3-/article/article/recruit',
      child_button:[
        {
          name:'添加',
          id:'/article/article/recruit-添加'
        },
        {
          name:'编辑',
          id:'/article/article/recruit-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/recruit-删除选中'
        },
      ],
      component: Article.Recruit
    },
    {
      path: 'company',
      name: '分公司列表',
      icon: 'reorder',
      id:'3-/article/article/company',
      child_button:[
        {
          name:'添加',
          id:'/article/article/company-添加'
        },
        {
          name:'编辑',
          id:'/article/article/company-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/company-删除选中'
        },
      ],
      component: Article.Company
    },
    {
      path: 'cooperation',
      name: '合作租赁公司列表',
      icon: 'reorder',
      id:'3-/article/article/cooperation',
      child_button:[
        {
          name:'添加',
          id:'/article/article/cooperation-添加'
        },
        {
          name:'编辑',
          id:'/article/article/cooperation-编辑'
        },
        {
          name:'删除选中',
          id:'/article/article/cooperation-删除选中'
        },
      ],
      component: Article.Cooperation
    },
  ]
}
