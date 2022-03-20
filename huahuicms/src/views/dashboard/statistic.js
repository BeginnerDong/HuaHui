export default {
    name: 'dashboard',
    components: {},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
              title: { text: '在Vue中使用echarts' },
              tooltip: {},
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          });

          let myPieChart = this.$echarts.init(document.getElementById('pie'))
          // 绘制图表
          

          myPieChart.setOption({
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ]
                }
            ]
          });

          let myLineChart = this.$echarts.init(document.getElementById('line'))
          myLineChart.setOption({
            title: {
                text: '某楼盘销售情况',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['意向','预购','成交']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {show: true, type: ['stack', 'tiled']},
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '成交',
                type: 'line',
                smooth: true,
                data: [10, 12, 21, 54, 260, 830, 710]
            },
            {
                name: '预购',
                type: 'line',
                smooth: true,
                data: [30, 182, 434, 791, 390, 30, 10]
            },
            {
                name: '意向',
                type: 'line',
                smooth: true,
                data: [1320, 1132, 601, 234, 120, 90, 20]
            }]
        });







      }
    }
}