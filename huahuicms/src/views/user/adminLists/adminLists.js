export default {
  name: 'adminLists',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: '管理员ID',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'user_no',
          label: '管理员NO',
          application:[],
          type:'input',
          listType:'normal',
          placeholder:'请输入管理员NO',
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
          key: 'login_name',
          label: '管理员登录名',
          application:['编辑账号','添加账号'],
          type:'input',
          listType:'normal',
          placeholder:'请输入管理员登录名',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            if(e.target._value){
              self.searchItem.login_name = ['LIKE',['%'+e.target._value+'%']];
            }else{
              delete self.searchItem.login_name;
            };
            self.initMainData();
          },
        },
        {
          key: 'password',
          label: '管理员密码',
          application:['编辑账号','添加账号'],
          type:'input',
        },
        {
          key: "name",
          label: '管理员姓名',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info.name
          },
          placeholder:'请输入管理员姓名',
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
          label: '管理员电话',
          application:['添加信息','编辑信息'],
          type:'input',
          listType:'normal',
          formatter:function(val){
            return val.info.phone
          }
        },
        {
          key: "mainImg",
          label: '头像',
          application:['编辑账号'],
          type:'qiupload',
          limit:10,
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
            },
          ],
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          formatter:function(val){
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
                var data = {
                  name:(data.info&&data.info.name)?data.info.name:'',
                  phone:(data.info&&data.info.phone)?data.info.phone:'',
                };
                return data
              },
              postData:function(data,self){
                if(self.btnName=='编辑信息'){
                  var postData = {
                    searchItem:{
                      id:self.btnData.info.id,
                    },
                    data:data
                  };
                  postData.data.user_no=self.btnData.user_no;
                }else if(self.btnName=='添加信息'){
                  var postData = {
                    data:data
                  };
                };
                postData.data.user_no=self.btnData.user_no;
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
                    user_no:self.btnData.user_no,
                  },
                  data:data
                }
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
              return '管理权限'
            },
            isHide:function(data,self){
              if(data.user_no==self.$store.getters.getUserinfo.user_no&&self.$store.getters.getUserinfo.primary_scope<60){
                return true;
              }else{
                return false;
              };
            },
            funcType:'func',
            func:{
              func:function(data,self){
                self.$router.push({
                  path:'/user/adminLists/access',
                  name:'权限管理',
                  params:{
                    defaultChecked:data.auth,
                    user_no:data.user_no,
                    origin:'adminLists',
                  }
                });
              },
              postData:function(data,self){
                var postData = {
                  searchItem:{
                    id:self.btnData.id,
                  },
                  data:data
                };
                return postData;
              },
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
                data.user_type = 2;
                var postData={
                  data:data
                };
                return postData;
              }
            },
          },
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
        user_type:2
      },
      optionData:{
        labelOptions:[]
      },
      otherData:{
      },
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{
        },
        fixSearchItem:{
          status:1
        },
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
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
     * 列表主函数
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
      var res =  await self.$$api_user_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

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

    async fieldChange(val){
      console.log('product_fieldChange',val);
      const self = this;
    },

    pageChange(val){
      console.log('pageChange',val);
      const self = this;
      self.paginate[val[0]] = val[1];
      self.initMainData();
    },

    onClickBtn(val){
      console.log('onClickBtn',val)
    },


  },


}
