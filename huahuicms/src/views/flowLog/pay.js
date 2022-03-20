export default {
  name: 'pay',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: '微信支付流水ID',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'count',
          label: '金额',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'trade_info',
          label: '流水备注',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
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
            return  val.UserInfo.name?val.UserInfo.name:'';
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
            return  val.UserInfo.phone?val.UserInfo.phone:'';
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
						},
					],  
          formatter:function(val,tests){
            return val.status === 1 ? '启用' : '禁用'
          },
          filter_multiple: false,
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
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

      searchForm:{

      },



      // 按钮配置
      btn_info:[
        { type:'info',
          icon:'edit',
          size:'mini',
          text:function(data){
            return '编辑'
          },
          func:{
            apiName:function(data){
              return "api_flowLog_update"
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
							return "api_flowLog_update"
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
						return '添加'
					},
					func:{
						apiName:function(data){
							return "api_flowLog_add"
						},
						formData:function(data,self,func){
							var data = {}; 
							return data
						},
						postData:function(data,self){
							var postData={
								data:data
							};
							postData.data.type = 1;
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
      var res =  await self.$$api_flowLog_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

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

    onClickBtn(val){
      console.log(val)
    },
		
		async fieldChange(val){
		  const self = this;
		},
    
  },
  

}