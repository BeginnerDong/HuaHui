/**
 * Created by sailengsi on 2017/5/11.
 */

import { Content } from 'layout/'

import { Function } from 'views/'

export default {
  path: 'open',
  name: '数据统计',
  icon: 'inbox',
  component: Content,
  redirect: '/function/open/echarts',
  children: [{
    path: 'echarts',
    name: '图表',
    icon: 'bar-chart',
    component: Function.Open.Echarts
  }]
}
