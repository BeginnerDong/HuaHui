export default {
  name: 'articles',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      search_header:'',
      fields: [
        {
          key: 'id',
          label: '文章ID',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'title',
          label: '名称',
          application:['编辑','添加'],
          type:'input',
          listType:'normal',
          placeholder:'请输入名称',
          header_search:true,
          header_search_type:'input',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(e,self){
            console.log('e.target.value',e,self)
            if(e.target.value){
              self.searchItem.title = ['LIKE',['%'+e.target.value+'%']];
            }else{
              delete self.searchItem.title;
            };
            self.initMainData();
          },
        },
				{
				  key: "title_e",
				  label: '名称(英)',
				  application:['添加','编辑'],
				  type:'input'
				},
				{
				  key: "title_f",
				  label: '名称(繁)',
				  application:['添加','编辑'],
				  type:'input'
				},
        {
          key: 'small_title',
          label: '描述标题',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "small_title_e",
          label: '描述标题(英)',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "small_title_f",
          label: '描述标题(繁)',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: 'description',
          label: '描述',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: "description_e",
          label: '描述(英)',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "description_f",
          label: '描述(繁)',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "passage1",
          label: '跳转菜单',
          application:['编辑','添加'],
          type:'select',
          options:'labelOptions',
          listType:'normal',
          formatter:function(val,tests){
            return  val.menu.title?val.menu.title:'';
          },
          placeholder:'请选择跳转菜单',
          header_search:true,
          header_search_type:'select',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(value>=0){
              self.searchItem.passage1 = value
            }else{
              delete self.searchItem.passage1;
            };
            console.log('value',value,self.searchItem)
            self.initMainData();
          },
          defaultProps: {
            label: 'title',
            value: 'id',
            children: 'child',
          },
        },
        {
          key: "mainImg",
          label: '主图',
          application:['编辑','添加'],
          type:'qiupload',
          limit:1,
        },
        {
          key: "mainImg_e",
          label: '主图(英)',
          application:['添加','编辑'],
          type:'qiupload',
          limit:1,
        },
        {
          key: "mainImg_f",
          label: '主图(繁)',
          application:['添加','编辑'],
          type:'qiupload',
          limit:1,
        },
        {
          key: 'listorder',
          label: '自定义排序',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
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
          width:100
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
              return '编辑'
            },
            func:{
              apiName:function(data){
                return "api_article_update"
              },
              formData:function(data,self){
                return data
              },
              postData:function(data,self){
                var postData={
                  searchItem:{
                    id:self.btnData.id
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
                return "api_article_update"
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
                return "api_article_add"
              },
              formData:function(data,self,func){
                var data = {
                  content:'',
                  mainImg: [],
                  mainImg_e:[],
                  mainImg_f:[],
                  bannerImg: [],
                  bannerImg_e:[],
                  bannerImg_f:[],
                };
                return data
              },
              postData:function(data,self){
                data.type = 1;
                data.menu_id = 158;
                var postData = {
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
        type:1,
        menu_id:158
      },
      optionData:{
        labelOptions:[]
      },
      otherData:{
      },
      getBefore:{},
      UserInfo:{
        tableName:'UserInfo',
        searchItem:{},
        key:'user_no',
        middleKey:'user_no',
        condition:'in',
      },
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
      this.initMenuData()
    },



    async initMenuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={
        type:['=',1],
        parentid:8
      };
      postData.token = self.$store.getters.getToken;
      postData.order ={
        listorder:'desc'
      };

      try{
        var res = await self.$$api_label_get({data: postData});
      }catch(err){
        console.log(err);
        notify('网络故障','error');
      };

      if(res){
        self.optionData.labelOptions = res.info.data;
      };

    },


    /**
     * 获取文章列表
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
        menu:{
          tableName:'Label',
          middleKey:'passage1',
          key:'id',
          condition:'=',
          info:['title']
        }
      }
      var res = await self.$$api_article_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
      for(var i=0;i<self.mainData.length;i++){
        self.mainData[i].passage1 = parseInt(self.mainData[i].passage1)
      }
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

    async fieldChange(val){
      console.log('product_fieldChange',val);
      const self = this;
    },

  },


}
