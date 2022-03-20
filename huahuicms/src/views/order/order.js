export default {
  name: 'order',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: '订单ID',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'price',
          label: '金额',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "pay_status",
          label: '支付状态',
          application:['编辑','添加'],
          type:'select',
          options:[
            {
              text: '未支付',
              value: 0
            },
            {
              text: '已支付',
              value: 1
            },
            {
              text: '已退款',
              value: 2
            },
          ],
          defaultProps: {
            label: 'text',
            value: 'value',
          },

          formatter:function(val,tests){
            return ['未支付','已支付','已退款'][val.pay_status];
          },
          filter_multiple: false,
          listType:'normal',
        },
        {
          key: "transport_status",
          label: '运输状态',
          application:[],
          type:'select',
          options:[
            {
              text: '未发货',
              value: 0
            },
            {
              text: '配送中',
              value: 1
            },
            {
              text: '已收货',
              value: 2
            },
          ],
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val,tests){
            var arr = ['未发货','配送中','已收货'];
            return arr[val.transport_status]?arr[val.transport_status]:'';
          },
          filter_multiple: false,
          listType:'normal',
        },
        {
          key: "order_step",
          label: '订单状态',
          application:[],
          type:'select',
          options:[
            {
              text: '正常下单',
              value: 0
            },
            {
              text: '申请撤单',
              value: 1
            },
            {
              text: '已撤单',
              value: 2
            },
            {
              text: '完结',
              value: 3
            },
            {
              text: '未成团',
              value: 4
            },
            {
              text: '成团',
              value: 5
            },
          ],
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val,tests){
            var arr = ['正常下单','申请撤单','已撤单','完结','未成团','成团'];
            return arr[val.order_step]?arr[val.order_step]:'';
          },
          filter_multiple: false,
          listType:'normal',
          placeholder:'请选择订单状态',
          header_search:true,
          header_search_type:'select',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(value||value===0){
              self.searchItem.order_step = value;
            }else{
              delete self.searchItem.order_step;
            };
            self.initMainData();
          },
        },
        {
          key: 'user_no',
          label: '用户NO',
          application:['编辑','添加'],
          type:'input',
          listType:'normal',
          placeholder:'请输入用户No',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            if(e.target._value){
              self.searchItem.user_no = e.target._value;
            }else{
              delete self.searchItem.user_no;
            };
            self.initMainData();
          },
        },
        {
          key: 'name',
          label: '用户姓名',
          application:[],
          type:'input',
          listType:'normal',
          formatter:function(val,tests){
            return val.UserInfo.name?val.UserInfo.name:'';
          },
          placeholder:'请输入用户姓名',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            if(e.target._value){
              self.UserInfo.searchItem.name = ['LIKE',['%'+e.target._value+'%']]
            }else{
              delete self.UserInfo.searchItem.name
            };
            self.beforeSearch('UserInfo');
          },
        },
        {
          key: 'phone',
          label: '用户电话',
          application:[],
          type:'input',
          listType:'normal',
          formatter:function(val,tests){
            return val.UserInfo.phone?val.UserInfo.phone:'';
          },
          placeholder:'请输入用户电话',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            if(e.target._value){
              self.UserInfo.searchItem.phone = ['LIKE',['%'+e.target._value+'%']]
            }else{
              delete self.UserInfo.searchItem.phone
            };
            self.beforeSearch('UserInfo');
          },
        },
        {
          key: "status",
          label: '状态',
          application:[],
          type:'select',
          options:[
            {
              text: '启用',
              value: 1
            },
            {
              text: '禁用',
              value: -1
            }
          ],
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val,tests){
            if(val.status==1){
              return '启用';
            }else{
              return '关闭';
            };
          }
        },
        {
          key: 'create_time',
          label: '创建时间',
          listType:'normal',
          placeholder:'请选择创建时间',
          header_search:true,
          header_search_type:'datePicker',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(!value){
              delete self.searchItem.create_time;
            }else{
              self.searchItem.create_time = ['between',value = value.map(function(e){return e/1000;})]
            };
            self.initMainData();
          },
        },
        {
          label: '操作',
          listType:'deal',
          width:300
        },
      ],


      // 按钮配置
      btn_info:[

        {
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '编辑'
          },
          func:{
            apiName:function(data){
              return "api_order_update"
            },
            formData:function(data,self){
              return data
            },
            postData:function(data,self){
              var postData={
                searchItem:{
                  id:self.btnData.id,
                  user_type:0
                },
                data:data
              };
              return postData;
            }
          },
        },
        {
          type:'danger',
          icon:'delete',
          size:'normal',
          funcType:'submit',
          position:'header',
          text:function(data){
            return '删除选中'
          },
          func:{
            apiName:function(data){
              return "api_order_update"
            },
            postData:function(data,self){
              var postData = {
                searchItem:{
                  id:['in',self.deleteArray],
                },
                data:{
                  status:-1
                }
              };
              return postData;
            }
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'normal',
          position:'',
          text:function(data){
            return '添加'
          },
          func:{
            apiName:function(data){
              return "api_order_add"
            },
            formData:function(data,self,func){
              return data
            },
            postData:function(data,self){
              var postData={
                data:data
              };
              return postData;
            }
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'normal',
          position:'header',
          text:function(data){
            return '导出excel'
          },
          funcType:'emit',
        }
      ],


      paginate: {
          count: 0,
          currentPage: 1,
          pagesize:10,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        type:1,
        user_type:0
      },
      optionData:{
        labelOptions:[]
      },
      otherData:{
      },
      getBefore:{},
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{

        },
        fixSearchItem:{
          status:['=',[1]]
        },
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
      defaultProps: {
        children: 'child',
        label: 'title',
        value: 'id',
      },
    }

  },
  mounted () {
    this.init()
  },
  computed: {
    token: function () {
      return this.$store.getters.getToken
    },
    labelOptions:function(){
      return this.optionData.labelOptions
    }

  },
  watch: {
    $route (to, from) {
      console.log(to)
      this.init()
    },
    token(){

    }
  },
  methods: {

    /**
     * 初始化
     */
    init () {
      this.initMainData()
    },


    async initMainData() {

      const self = this;
      const postData  = {};
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem)
      };
      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.order ={
        create_time:'desc'
      };
      postData.getAfter = {
        UserInfo:{
          tableName:'UserInfo',
          middleKey:'user_no',
          key:'user_no',
          condition:'=',
          searchItem:{
            status:1
          },
          info:['name','phone'],
        },
      };
      console.log('postData',postData)
      var res =  await self.$$api_order_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

    },

    async fieldChange(val){
      const self = this;
    },

    beforeSearch(TableName){

      const self = this;
      if(JSON.stringify(self.getBefore) == "{}"&&JSON.stringify(self[TableName]['searchItem']) != "{}"){
        var newArray = self.$$cloneForm(self[TableName]);
        Object.assign(newArray['searchItem'], newArray['fixSearchItem']);
        delete newArray['fixSearchItem'];
        self.getBefore = {
          [TableName]:newArray,
        };
      }else{
        if(JSON.stringify(self[TableName]['searchItem']) == "{}"){
          self.getBefore = {};
        }else{
          var newArray = self.$$cloneForm(self[TableName]);
          Object.assign(newArray['searchItem'], newArray['fixSearchItem']);
          delete newArray['fixSearchItem'];
          self.getBefore[TableName] = newArray;
        };
      };
      self.initMainData();
    },

    filtersChange(params){
      const self = this;
      console.log(params);
      for (var key in params) {
        self.searchItem[key] = params[key][0]
      }
      console.log(self.searchItem)
      self.initMainData();
    },

    pageChange(val){
      console.log(val);
      const self = this;
      self.paginate[val[0]] = val[1];
      self.initMainData();
    },

    async onClickBtn(val){

      const self = this;
      console.log(val)
      if(val[0]=='导出excel'){
        const postData  = {};
        postData.token = self.$store.getters.getToken;
        if (self.searchItem) {
          postData.searchItem = self.$$cloneForm(self.searchItem)
        };
        if(JSON.stringify(self.getBefore) != "{}"){
          postData.getBefore = self.$$cloneForm(self.getBefore);
        };
        postData.order = {create_time:'desc'};
        postData.getAfter = {
          UserInfo:{
            tableName:'userInfo',
            middleKey:'user_no',
            key:'user_no',
            condition:'=',
            searchItem:{
              status:1
            },
          },
        };

        postData.excelOutput = {
          expTitle:'test',
          height:100,
          expCellName:[
            {
              title:'订单号',
              key:['order_no'],
              type:'string',
            },
            {
              title:'金额',
              key:['price'],
              type:'string',

            },
            {
              title:'下单人',
              key:['UserInfo',0,'name'],
              type:'string',
            },
            {
              title:'测试图片',
              key:['products',0,'snap_product','mainImg',0,'url'],
              type:'image',
              image_width:80,
              image_height:80,
              url_intercepte_start:32
            },
          ],
          fileName:'test'
        };

        window.open('https://api.solelycloud.com/api/public/index.php/api/v1/Common/Order/get?token='
        +postData.token
        +'&searchItem='
        +JSON.stringify(postData.searchItem)
        +'&excelOutput='
        +JSON.stringify(postData.excelOutput))
        /*var res =  await self.$$api_order_get({data: postData});

        var a = document.createElement("a");
        a.href = res.info;
        a.download ="订单.xls";
        a.click();*/
      }

    },

  },
}
