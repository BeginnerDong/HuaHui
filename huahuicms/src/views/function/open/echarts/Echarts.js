import echarts from 'echarts'

export default {
  name: 'echarts',
  data () {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      data:this.$store.getters.getToken,

    }
  },
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    console.log(this.$store.getters.getUserinfo);
    this.chartColumn = echarts.init(document.getElementById('chartColumn'))
    this.chartBar = echarts.init(document.getElementById('chartBar'))
    //this.chartLine = echarts.init(document.getElementById('chartLine'))
    //this.chartPie = echarts.init(document.getElementById('chartPie'))

    


    /*this.chartLine.setOption({
      title: {
        text: 'line Chart'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }]
    })

    this.chartPie.setOption({
      title: {
        text: 'pie Chart',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
          value: 335,
          name: '直接访问'
        }, {
          value: 310,
          name: '邮件营销'
        }, {
          value: 234,
          name: '联盟广告'
        }, {
          value: 135,
          name: '视频广告'
        }, {
          value: 1548,
          name: '搜索引擎'
        }],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    })*/

    this.initMainData()
  },
  methods: {
    async initMainData () {
      
      const self = this;
      const postData  = {};  
      postData.token = self.$store.getters.getToken; 
      
      postData.searchItem = {
        parentid:352
      };
      
      postData.getAfter = {
        User:{
          tableName:'UserInfo',
          middleKey:'title',
          key:'passage1',
          condition:'=',
          searchItem:{
            status:1
          },
          compute:{
            counts:[
              'count',
              'count',
              {
                status:1
              }
            ],
            
          }
        },
        Product:{
          tableName:'product',
          middleKey:'id',
          key:'discount',
          condition:'=',
          searchItem:{
            status:1
          },
          compute:{
            counts:[
              'count',
              'count',
              {
                status:1
              }
            ],
            
          }
        },
        
        
      };

     

      var res =  await self.$$api_label_get({data: postData});
      console.log(res);
      res = res.info.data;
      var areaData = [];
      var studentData = [];
      var productData = [];
      for (var i = res.length - 1; i >= 0; i--) {
        areaData.push(res[i]['title']);
        studentData.push(res[i]['User']['totalCount']);
        productData.push(res[i]['Product']['totalCount']);
      };
      console.log(studentData);
      this.chartColumn.setOption({
        title: {
          text: '校区学员人数统计'
        },
        tooltip: {},
        xAxis: {
          data: areaData
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: studentData
        }]
      });
      this.chartBar.setOption({
        title: {
          text: '校区排课数量统计',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2018年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: areaData
        },
        series: [{
          name: '2018年',
          type: 'bar',
          data: productData
        }]
      })

    },

    async onSubmit(data){
      console.log(data)
    },
  }
}
