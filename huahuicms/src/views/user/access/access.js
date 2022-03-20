export default {
  name: 'access',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      searchForm:{
        status:'1'
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          application:[],
          type:'input',
        },
        {
          key: "title",
          label: '名称',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "description",
          label: '描述',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "url",
          label: '跳转链接',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "listorder",
          label: '排序',
          application:['添加','编辑'],
          type:'input'
        },
        {
          key: "parentid",
          label: '父级ID',
          application:['添加','编辑'],
          type:'cascader',
          options:'labelOptions',
        },
        {
          key: "mainImg",
          label: '主图',
          application:['添加','编辑'],
          type:'upload',
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
          value:'',
          placeholder:'请选择状态',
          header_search:true,
          header_search_type:'select',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(value){
              self.searchItem.status = value;
            }else{
              delete self.searchItem.status;
            };
            self.initMainData();
          },
        },
        {
          key: 'create_time',
          label: '创建时间'
        },
      ],

      // 需要给分页组件传的信息
      pagination: {
        current_page: 1,
        total: 0,
        page_sizes: [3, 9, 12, 24],
        layout: 'total, sizes, prev, pager, next, jumper',
        pagesize:10,
        is_page:true,
      },

      // 搜索配置
      search_data: {
        fields: [
          {
            key: 'title',
            label: '标题'
          }
        ],
        default_value: {
          title: ''
        }
      },

      // 按钮配置
      btn_info:[
        {
          type:'danger',
          icon:'delete',
          size:'normal',
          funcType:'emit',
          position:'header',
          text:function(data){
            return '更新权限'
          },
          func:{
            apiName:function(data){
              return "api_user_auth"
            },
            postData:function(data,self,func){
              var res = self.getCheckedNodesAlone();
              var newArray = [];
              for (var i = 0; i < res.length; i++) {
                newArray.push(res[i].id)
              };
              var postData = {
                searchItem:{
                  user_no:self.$store.getters.getUserinfo.user_no
                },
                data:{
                  auth:newArray
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
            return '返回'
          },
          funcType:'func',
          func:{
            func:function(data,self,func){
              if(self.otherData.origin=="adminLists"){
              	self.$router.push('/user/adminLists/adminLists');
              }else if(self.otherData.origin=="userOne"){
              	self.$router.push('/user/adminLists/userOne');
              }
            },
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
        type:3
      },
      optionData:{
        labelOptions:[]
      },
      defaultProps:{
        children: 'children',
        label: 'name',
        value:'id',
      },
      otherData:{
        deleteApiName:'api_label_update',
      },
      defaultChecked:[]
    }
  },

  methods: {

    test(){
      this.$router.push('/function')
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

    async initMainData(){
      const self =this;
      var results = [];
      var data = self.$$cloneForm(self.$router.options.routes);
      if(self.$store.getters.getUserinfo.primary_scope==90){
        var checkData = 'All';
      }else{
        var checkData = self.$store.getters.getUserinfo.auth;
      };

      console.log('initMainData-data',data);
      pushItemsExclude(data,results);
      self.mainData = results;
      console.log('initMainData-results',results);
      return;


      function pushItemsExclude(data,results){

        for (var i = 0; i < data.length; i++) {
          var childItem = {};
          if(!(data[i].meta&&data[i].meta.application&&data[i].meta.application.indexOf('notInAuth')>=0)){
            if(checkData!='All'&&checkData.indexOf(data[i].id)>=0){
              childItem = data[i];
            }else if(checkData=='All'){
              childItem = data[i];
            };
          };
          if(JSON.stringify(childItem)!='{}'&&data[i].children&&data[i].children.length>0){
            var newArray = self.$$cloneForm(data[i].children);
            childItem.children = [];
            pushItemsExclude(newArray,childItem.children);
          }else if(JSON.stringify(childItem)!='{}'&&data[i].child_button&&data[i].child_button.length>0){
            var newArray = self.$$cloneForm(data[i].child_button);
            childItem.children = [];
            pushItemsExclude(newArray,childItem.children);
          };
          if(JSON.stringify(childItem)!='{}'){
            results.push(childItem);
          };
        };

      };

    },


    async onSubmit(data){
      console.log(data)
    },

    /**
     * 点击删除按钮
     */
    onClickBtnDelete(opts) {
      this.$confirm('删除后不可恢复', '确认删除？').then(() => {
        this.$$api_article_deleteArticle({
          data: {
            id: opts.data.id
          },
          fn: data => {
            this.onGetList()
          }
        })
      })
    },


    /**
     * 添加文章
     */
    onClickBtnAdd() {
      this.$router.push('/adv/article/edit')
    },

    onClickBtnSelect(opts) {
      console.log(opts)
      this.$message('查看自己处理吧')
    },

    /**
     * 修改按钮
     * @param opts
     */
    onClickBtnUpdate(opts) {
      this.$router.push({
        path: '/adv/article/edit',
        query: {
          id: opts.data.id
        }
      })
    },

    /**
     * 改变页码事件
     * @param current_page    当前页码
     */
    onChangeCurPage(currentPage) {
      var path = this.$route.path
      var query = Object.assign({}, this.$route.query)
      query.current_page = currentPage
      this.$router.push({
        path,
        query
      })
    },

    /**
     * 改变每页显示数量事件
     * @param page_size    每页显示的数量
     */
    onChangePageSize(pageSize) {
      var path = this.$route.path
      var query = Object.assign({}, this.$route.query)
      query.page_size = pageSize
      this.$router.push({
        path,
        query
      })
    },

    /**
     * 更新参数
     */
    onUpdateParams() {
      if (this.$route.query.current_page) {
        this.paginations.current_page = parseInt(this.$route.query.current_page)
      }
      if (this.$route.query.page_size) {
        this.paginations.page_size = parseInt(this.$route.query.page_size)
      }

      this.search_data.default_value.title = this.$route.query.title
    },

    /**
     * 搜索事件
     * @param data    表单数据
     * @param info    其他有用的数据
     */
    onSearch({data, info}) {
      console.log(data)
      console.log(info)

      var path = this.$route.path
      var query = Object.assign({}, this.$route.query, data)

      this.$router.push({
        path,
        query
      })
    },

    // 批量选择改变CheckBox事件
    onSelectionChange({ids, datas}) {
      // console.log(ids);
      // console.log(datas);
    },

    /**
     * 批量删除
     * @param ids 选中的ids
     * @param datas  选中的数据集合
     */
    onClickBtnBatchDelete({ids, datas}) {
      this.$confirm('删除的数据：' + ids.join(','), '确认删除？').then(() => {
        this.$$api_article_deleteArticle({
          data: {
            id: ids.join(',')
          },
          fn: data => {
            this.onGetList()
          }
        })
      })
    },

    /**
     * 初始化
     */
    init() {
      this.onUpdateParams()
      this.initMainData()

      const routerquery = this.$route.params;
      this.user_no = routerquery.user_no;
      this.defaultChecked = routerquery.defaultChecked;
      this.origin = routerquery.origin;
      this.otherData.origin = routerquery.origin;

      if(!this.user_no||!this.defaultChecked){
        this.$router.push('/user/adminLists/adminLists');
      };

    },

    async onClickBtn(param){
      const self = this;
      console.log('onClickBtn',param)

      var res = param[2].getCheckedNodesAlone();
      var newArray = [];
      for (var i = 0; i < res.length; i++) {
        newArray.push(res[i].id)
      };

      var postData = {
        searchItem:{
          user_no:self.user_no
        },
        data:{
          auth:newArray
        }
      };

      var res = await self.$$api_user_auth({data: postData});
      if(res.solely_code==100000){
        this.$$notify('更新权限成功','success');
      }else{
        this.$$notify('更新权限失败','error');
      };
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
  }

}
