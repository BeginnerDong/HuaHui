/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'
import { Article ,Flowlog} from 'views/'

export default {
  path: 'score',
  name: '积分管理',
  icon: 'inbox',
  id:'2-/flowLog/score',
  component: Content,
  meta:{
    children:['3-/flowLog/score/score']
  },
  children: [
    {
      path: 'score',
      name: '积分记录列表',
      icon: 'reorder',
      id:'3-/flowLog/score/score',
      child_button:[
        { 
          name:'添加流水',
          id:'/flowLog/score/score-添加流水'
        },
        { 
          name:'编辑',
          id:'/flowLog/score/score-编辑'
        },
        { 
          name:'删除选中',
          id:'/flowLog/score/score-删除选中'
        },       
      ],
      component: Flowlog.Score
    },
  ]
}
