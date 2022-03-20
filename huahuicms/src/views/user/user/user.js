export default {
  name: 'user',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: '用户ID',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'user_no',
          label: '用户NO',
          application:[],
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
        // {
        //   key: 'latitude',
        //   label: '地址',
        //   application:['编辑','添加'],
        //   type:'baiduMap',
        //   listType:''
        // },
        // {
        //   key: 'parent_no',
        //   label: '父级NO',
        //   application:[],
        //   type:'input',
        //   listType:'normal',
        //   placeholder:'请输入父级No',
        //   header_search:true,
        //   header_search_type:'input',
        //   header_search_style:'width:160px;margin-right:2px;',
        //   changeFunc:function(e,self){
        //     if(e.target._value){
        //       self.DistriChild.searchItem.parent_no = ['LIKE',['%'+e.target._value+'%']]
        //     }else{
        //       delete self.DistriChild.searchItem.parent_no
        //     };
        //     self.beforeSearch('DistriChild');
        //   },
        // },
        // {
        //   key: 'parent_no.name',
        //   label: '父级姓名',
        //   application:[],
        //   type:'input',
        //   listType:'normal',
        //   formatter:function(val){
        //     return val.parentInfo.name
        //   }
        // },
        {
          key: "headImgUrl",
          label: '用户头像',
          application:[],
          type:'input',
          listType:'headImgUrl',
        },
        {
          key: "nickname",
          label: '用户昵称',
          application:[],
          type:'input',
          listType:'normal',
        },
        {
          key: "name",
          label: '用户姓名',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info.name
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
          key: "phone",
          label: '用户电话',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info.phone
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
          key: "balance",
          label: '佣金',
          application:[],
          type:'input',
          listType:'',
          formatter:function(val){
            return val.info.balance
          }
        },
        // {
        //   key: "file",
        //   label: '用户二维码',
        //   application:['添加信息','编辑信息'],
        //   type:'input',
        //   listType:'qrImg',
        //   formatter:function(val){
        //     return val.info.qrImg
        //   }
        // },
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
          key: "count",
          label: '佣金金额',
          application:['管理佣金'],
          type:'input',
          width:'50px',
          height:'50px',
        },
        {
          key: "trade_info",
          label: '流水备注',
          application:['管理佣金'],
          type:'input',
          width:'50px',
          height:'50px',
        },
        {
          label: '操作',
          listType:'deal',
          width:300
        },
      ],

      // 按钮配置
      btn_info: [

        {
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return JSON.stringify(data.data.info)!= '[]'?'编辑信息':'添加信息'
          },
          func:{
            apiName:function(data){
              return JSON.stringify(data.info) != "[]" ?"api_userInfo_update":"api_userInfo_add"
            },
            formData:function(data,self,func){
              console.log(data)
              if(self.btnName=='编辑信息'){
                var data = data.info;
              }else if(self.btnName=='添加信息'){
                var data = {}
              };
              return data
            },
            postData:function(data,self){
              if(self.btnName=='编辑信息'){
                var postData={
                  searchItem:{
                    id:self.btnData.info.id,
                    user_type:0
                  },
                  data:data
                }
              }else if(self.btnName=='添加信息'){
                var postData={
                  data:data
                };
                postData.data.user_no=self.btnData.user_no;
              };
              return postData;
            }
          },
        },
        {
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '编辑账号'
          },
          func:{
            apiName:function(data){
              return "api_user_update"
            },
            formData:function(data,self){
              return data
            },
            postData:function(data,self){
              var postData = {
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
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '管理佣金'
          },
          func:{
            apiName:function(data){
              return "api_flowLog_add"
            },
            formData:function(data,self){
              var obj = {
                count:'',
                trade_info:'',
                user_no:data.user_no
              };
              return obj;
            },
            postData:function(data,self){
              var postData={
                searchItem:{
                  id:self.btnData.id,
                  user_type:0
                },
                data:data
              };
              postData.data.type = 2;
              postData.data.user_no = self.formData.user_no;
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
              return "api_user_update"
            },
            postData:function(data,self){
              var postData = {
                searchItem:{
                  id:['in',self.deleteArray],
                  user_type:0,
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
          position:'header',
          text:function(data){
            return '添加账号'
          },
          func:{
            apiName:function(data){
              return "api_user_add"
            },
            formData:function(data,self,func){
              var data = {
                login_name:'',
                password:'',
              };
              return data
            },
            postData:function(data,self){
              data.user_type = 0;
              var postData={
                data:data
              };
              return postData;
            }
          },
        },
      ],


      DistriChild:{
        tableName:'Distribution',
        searchItem:{
        },
        key:'child_no',
        middleKey:'user_no',
        condition:'in',
      },
      DistriParent:{
        tableName:'Distribution',
        searchItem:{
        },
        key:'parent_no',
        middleKey:'user_no',
        condition:'in',
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
        },
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
      paginate: {
          count: 0,
          currentPage: 1,
          pagesize:10,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
      },
      searchItem:{
        user_type:0
      },
      optionData:{
        labelOptions:[]
      },
      otherData:{
      },
      getBefore:{},

    }

  },
  mounted () {
    this.init()
  },
  computed: {
    token: function () {
      return this.$store.getters.getToken
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
    init() {
      this.initMainData()
    },


    /**
     * 获取用户列表
     */
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
      postData.getAfter = {
        file:{
          tableName:'File',
          middleKey:'user_no',
          key:'user_no',
          condition:'=',
          searchItem:{
            status:1,
            type:1,
            behavior:2
          },
          info:['path'],
        },
        parentInfo:{
          tableName:'UserInfo',
          middleKey:'parent_no',
          key:'user_no',
          condition:'=',
          searchItem:{
            status:1,
          },
          info:['name'],
        },
      };

      var res = await self.$$api_user_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

    },

    async fieldChange(val){
      const self = this;
    },

    onClickBtn(val){
      console.log(val)
    },


    beforeSearch(TableName){

      const self = this;
      if(JSON.stringify(self.getBefore) == "{}"&&JSON.stringify(self[TableName]['searchItem']) != "{}"){
        self.getBefore = {
          [TableName]:self[TableName],
        };
      }else{
        if(JSON.stringify(self[TableName]['searchItem']) == "{}"){
          self.getBefore = {};
        }else{
          self.getBefore[TableName] = self[TableName];
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





  },


}
