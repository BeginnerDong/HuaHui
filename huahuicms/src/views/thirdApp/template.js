export default {
  name: 'template',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'id',
          label: 'ID',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'name',
          label: '模板名称',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'template_id',
          label: '模板号',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'path',
          label: '跳转小程序路径',
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
            }
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
          width:150,
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
              return "api_wxTemplate_update"
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
                return "api_wxTemplate_update"
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
                return "api_wxTemplate_add"
              },
              formData:function(data,self,func){
                var data = {};
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

      },
      optionData:{
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
     * 获取模板列表
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
      postData.order = {
        create_time:'desc',
      };
      var res = await self.$$api_wxTemplate_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;

    },

    async fieldChange(val){
      const self = this;
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

    onClickBtn(val){
      console.log(val)
    },

  },

}
