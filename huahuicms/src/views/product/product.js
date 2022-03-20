export default {
  name: 'product',
  components: {},
  data () {
    return {
      mainData:[],
      self:this,
      fields: [
        {
          key: 'product_no',
          label: '商品No',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'title',
          label: '商品标题',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'description',
          label: '商品描述',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'price',
          label: '商品价格',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'score',
          label: '可使用积分',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'stock',
          label: '商品库存',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'sale_count',
          label: '销量',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'group_stock',
          label: '团购库存',
          application:[],
          type:'input'
        },
        {
          key: "sku_array",
          label: 'sku',
          application:[],
          type:'checkbox',
          options:'skuOptions',
          listType:'',
          defaultProps: {
            label: 'id',
            value: 'title',
          },
        },
        {
          key: "category_id",
          label: '菜单',
          application:['编辑','添加'],
          type:'cascader',
          options:'categoryOptions',
          listType:'normal',
          formatter:function(val,tests){
            return  val.label[val.category_id]&&val.label[val.category_id]['title']?val.label[val.category_id]['title']:'' ;
          },
          defaultProps: {
            children: 'child',
            label: 'title',
            value: 'id',
          },
          placeholder:'请选择菜单',
          header_search:true,
          header_search_type:'cascader',
          header_search_value:'',
          header_search_style:'width:160px;margin-right:2px;',
          changeFunc:function(value,self){
            if(!value){
              delete self.searchItem.category_id;
            }else{
              self.searchItem.category_id = value[value.length-1];
            };
            self.initMainData();
          },
        },
        {
          key: 'listorder',
          label: '排序',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: "mainImg",
          label: '主图',
          application:['编辑','添加'],
          type:'upload',
          limit:1,
        },
        {
          key: "bannerImg",
          label: '轮播图',
          application:['编辑','添加'],
          type:'upload',
          limit:10,
        },
        // {
        //   key: 'start_time',
        //   label: '开启时间',
        //   application:['编辑','添加'],
        //   type:'datetime',
        //   listType:'custom',
        //   width:150,
        //   custom:function(val,func){
        //     return val.start_time?func.formatDate(new Date(parseInt(val.start_time)),'yyyy/M/d hh:mm'):''
        //   }
        // },
        // {
        //   key: 'end_time',
        //   label: '结束时间',
        //   application:['编辑','添加'],
        //   type:'datetime',
        //   listType:'custom',
        //   width:150,
        //   custom:function(val,func){
        //     return val.end_time?func.formatDate(new Date(parseInt(val.end_time)),'yyyy/M/d hh:mm'):''
        //   }
        // },
        // {
        //   key: 'limit',
        //   label: '购买数量限制',
        //   application:['编辑','添加'],
        //   type:'input',
        // },
        // {
        //   key: 'use_limit',
        //   label: '使用数量限制',
        //   application:['编辑','添加'],
        //   type:'input',
        // },
        {
          key:'duration',
          label:'有效期',
          application:['编辑','添加'],
          type:'input',
          listType: 'timeinit',
          timeinit:function(val){
            return val.duration?parseInt(val.duration)/86400/10000:''
          }
        },
        {
          key: "content",
          label: '内容',
          application:['编辑','添加'],
          type:'vueEditor',
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
          listType:'',
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
              return "api_product_update"
            },
            formData:function(data,self,func){
              var newFormData = func.cloneForm(data);
              newFormData.duration = parseInt(newFormData.duration)/86400/1000;
              return newFormData;
            },
            postData:function(data,self){
              if (data.duration){
                data.duration = data.duration*86400*1000;
              };
              if(data.category_id==0){
                return false;
              };
              var postData = {
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
          type:'info',
          icon:'edit',
          size:'mini',
          position:'list',
          text:function(data){
            return '管理Sku'
          },
          funcType:'func',
          func:{
            func:function(data,self){
              self.$router.push({
                path:'/product/product/sku',
                name:'sku列表',
                query:{
                  product_no:data.product_no
                }
              });
              var path = '';
              return path
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
              return "api_product_update"
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
              return "api_product_add"
            },
            formData:function(data,self,func){
              var data = {
                sku_array:[],
								start_time:'',
								end_time:'',
              };
              return data
            },
            postData:function(data,self){
              data.type = 1;
              data.duration = data.duration?data.duration*86400*1000:'';
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
        type:1
      },
      optionData:{
        categoryOptions:[],
        skuOptions:[],
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
      this.initMenuData()
      this.initSkuData()
    },


    async initMenuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={
        type:['in',[3]]
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
        self.optionData.categoryOptions = res.info.data;
      };

    },


    async initSkuData(){
      const self =this;
      const postData = {};
      postData.searchItem ={
        type:['in',[5]]
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
        self.optionData.skuOptions = res.info.data;
      };

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
      postData.order = {
				create_time:'desc',
      };

      var res =  await self.$$api_product_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
    },


    async onClickBtn(val){
      const self = this;
      console.log(val)
      if(val[0]=='导出excel'){
        const postData  = {};
        postData.paginate = self.$$cloneForm(self.paginate);
        postData.token = self.$store.getters.getToken;
        if (self.searchItem) {
          postData.searchItem = self.$$cloneForm(self.searchItem)
        };
        if(JSON.stringify(self.getBefore) != "{}"){
          postData.getBefore = self.$$cloneForm(self.getBefore);
        };
        postData.order = self.$$cloneForm(self.order);
        postData.getAfter = {
          UserInfo:{
            tableName:'userInfo',
            middleKey:'passage1',
            key:'user_no',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['name'],
          },
          Area:{
            tableName:'label',
            middleKey:'discount',
            key:'id',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['title'],
          },
          Subject:{
            tableName:'label',
            middleKey:'view_count',
            key:'id',
            condition:'=',
            searchItem:{
              status:1
            },
            info:['title'],
          },
          FlowLog:{
            tableName:'FlowLog',
            middleKey:'product_no',
            key:'product_no',
            condition:'=',
            searchItem:{
              status:1
            },
            compute:{
              benifits:[
                'sum',
                'count',
                {
                  status:1
                }
              ],
              count:[
                'count',
                'count',
                {
                  status:1
                }
              ],
            }
          }
        };
        postData.excelOutput = {
          expTitle:'test',
          expCellName:[
            ['ID','id'],
            ['名称','title'],
            ['科目','Subject','title']
          ],
          fileName:'test'
        };
        var res =  await self.$$api_product_get({data: postData});
        window.location.href = res.info;
        console.log(res);
      }
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

  },

}
