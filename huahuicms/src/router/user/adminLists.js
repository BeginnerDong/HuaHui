/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { User } from 'views/'

export default {
  path: 'adminLists',
  name: '用户列表',
  icon: 'inbox',
  id:'2-/user/adminLists',
  component: Content,
  meta:{
    children:[
      '3-/user/adminLists/adminLists',
      '3-/user/adminLists/userOne',
      '3-/user/adminLists/user',
      '3-/user/adminLists/personal',
    ]
  },
  children: [
    {
      path: 'adminLists',
      name: '管理员列表',
      id:'3-/user/adminLists/adminLists',
      icon: 'reorder',
      child_button:[
        {
          name:'编辑信息',
          id:'/user/adminLists/adminLists-编辑信息'
        },
        { 
          name:'添加信息',
          id:'/user/adminLists/adminLists-添加信息'
        },
        { 
          name:'编辑账号',
          id:'/user/adminLists/adminLists-编辑账号'
        },
        { 
          name:'删除选中',
          id:'/user/adminLists/adminLists-删除选中'
        },
        { 
          name:'添加账号',
          id:'/user/adminLists/adminLists-添加账号'
        },        
      ],
      component: User.AdminLists
    },
    {
      path: 'userOne',
      name: '员工列表',
      icon: 'reorder',
      id:'3-/user/adminLists/userOne',
      child_button:[
        { 
          name:'编辑信息',
          id:'/user/adminLists/userOne-编辑信息'
        },
        { 
          name:'添加信息',
          id:'/user/adminLists/userOne-添加信息'
        },
        { 
          name:'编辑账号',
          id:'/user/adminLists/userOne-编辑账号'
        },
        { 
          name:'删除选中',
          id:'/user/adminLists/userOne-删除选中'
        },
        { 
          name:'添加账号',
          id:'/user/adminLists/userOne-添加账号'
        },
        { 
          name:'用户权限',
          id:'/user/adminLists/userOne-用户权限'
        },
        { 
          name:'管理权限',
          id:'/user/adminLists/userOne-管理权限'
        },
      ],
      component: User.UserOne
    },
    {
      path: 'personal',
      name: '个人信息',
      icon: 'reorder',
      id:'3-/user/adminLists/personal',
      child_button:[
        { 
          name:'编辑信息',
          id:'/user/adminLists/personal-编辑信息'
        },
        { 
          name:'编辑账号',
          id:'/user/adminLists/personal-编辑账号'
        },          
      ],
      component: User.Personal
    },
    {
      path: 'user',
      name: '用户列表',
      icon: 'reorder',
      id:'3-/user/adminLists/user',
      child_button:[
        { 
          name:'添加信息',
          id:'/user/adminLists/user-添加信息'
        },
        { 
          name:'编辑信息',
          id:'/user/adminLists/user-编辑信息'
        },
        { 
          name:'编辑账号',
          id:'/user/adminLists/user-编辑账号'
        },
        { 
          name:'管理佣金',
          id:'/user/adminLists/user-管理佣金'
        },
        { 
          name:'删除选中',
          id:'/user/adminLists/user-删除选中'
        },
        { 
          name:'添加账号',
          id:'/user/adminLists/user-添加账号'
        }
      ],
      component: User.User
    },

    {
      path: 'access',
      hide: true,
      name: '权限管理',
      icon: 'reorder',
      id:'3-/user/adminLists/access',
      meta:{
        application:['notInTab','notInAuth']
      },
      component: User.Access
    },
  ]
}
