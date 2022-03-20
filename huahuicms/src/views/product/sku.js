
export default {
  name: 'sku',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'sku_no',
          label: 'skuNO',
          application:[],
          type:'input',
          listType:''
        },
        {
          key: 'title',
          label: '名称',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'description',
          label: '描述',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'price',
          label: 'sku价格',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'score',
          label: '可使用积分',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'o_price',
          label: '原价价格',
          application:['编辑','添加'],
          type:'input',
          listType:''
        },
        {
          key: 'stock',
          label: 'sku库存',
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
          label: '多图',
          application:['编辑','添加'],
          type:'upload',
          limit:10,
        },
        // {
        //   key: "content",
        //   label: '内容',
        //   application:['编辑','添加'],
        //   type:'vueEditor',
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
						},
					],
          formatter:function(val,tests){
            return val.status === 1 ? '启用' : '禁用'
          },
          defaultProps: {
            label: 'text',
            value: 'value',
          },
          filter_multiple: false,
          listType:'',
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
        // {
        //   key: 'start_time',
        //   label: '开启时间',
        //   application:['编辑','添加'],
        //   type:'datetime',
        //   listType:'custom',
        //   width:150,
        //   formatter:function(val,tests){
        //     return val.start_time?new Date(parseInt(val.start_time)):'';
        //   },
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
        //   formatter:function(val,tests){
        //     return val.end_time?new Date(parseInt(val.end_time)):'';
        //   },
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
        // {
        //   key:'duration',
        //   label:'有效期',
        //   application:['编辑','添加'],
        //   type:'input',
        // },

        //index:19
        // {
        //   key: "is_group",
        //   label: '是否团购',
        //   application:['编辑','添加'],
        //   type:'select',
        //   options:[{
        //     text: '开启',
        //     value: 1
        //   }, {
        //     text: '关闭',
        //     value: 0
        //   }],
        //   formatter:function(val,tests){
        //     return val.is_group === 1 ? '开启' : '关闭'
        //   },
        //   defaultProps: {
        //     label: 'text',
        //     value: 'value',
        //   },
        //   filter_multiple: false,
        //   listType:'normal',
        // },
        {
          key: 'group_stock',
          label: '团购库存',
          application:[],
          type:'input',
        },
        {
          key: 'group_price',
          label: '团购价格',
          application:[],
          type:'input',
        },
        {
          key: 'standard',
          label: '成团标准',
          application:[],
          type:'input',
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
            return '编辑'
          },
          func:{
            apiName:function(data){
              return "api_sku_update"
            },
            formData:function(data,self){
              if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                for(var i=0;i<self.optionData.sku_item.length;i++){
                  data[self.optionData.sku_item[i].title] = '';
                  for(var c_i=0;c_i<data.sku.length;c_i++){
                    if(data.sku[c_i].parentid==self.optionData.sku_item[i].id){
                      data[self.optionData.sku_item[i].title] = data.sku[c_i].id;
                      break;
                    };
                  };
                };
              };
              //团购字段控制
              // if(data.is_group==1) {
              //   self.fields[20]['application'] = ['编辑','添加'];
              //   self.$set(self.fields,20,self.fields[20]);
              //   self.fields[21]['application'] = ['编辑','添加'];
              //   self.$set(self.fields,21,self.fields[21]);
              //   self.fields[22]['application'] = ['编辑','添加'];
              //   self.$set(self.fields,22,self.fields[22]);
              //   console.log('changeaAfter',self.fields);
              //   self.computeFields();
              // }else if(data.is_group==0){
              //   self.fields[20]['application'] = [];
              //   self.$set(self.fields,20,self.fields[20]);
              //   self.fields[21]['application'] = [];
              //   self.$set(self.fields,21,self.fields[21]);
              //   self.fields[22]['application'] = [];
              //   self.$set(self.fields,22,self.fields[22]);
              //   console.log('changeaAfter',self.fields);
              //   self.computeFields();
              // }
              return data;
            },
            postData:function(data,self){
              data.sku_item = [];
              if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                for(var i=0;i<self.optionData.sku_item.length;i++){
                  if(data[self.optionData.sku_item[i].title]){
                    data.sku_item.push(data[self.optionData.sku_item[i].title])
                  }else if(self.formData[self.optionData.sku_item[i].title]){
                    data.sku_item.push(self.formData[self.optionData.sku_item[i].title])
                  };
                  delete data[self.optionData.sku_item[i].title];
                };
              };
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
              return "api_sku_update"
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
              return "api_sku_add"
            },
            formData:function(data,self,func){
              var data = {};
              if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                for(var i=0;i<self.optionData.sku_item.length;i++){
                  data[self.optionData.sku_item[i].title] = '';
                };
              };
              return data;
            },
            postData:function(data,self){
              data.sku_item = [];
              if(self.optionData.sku_item&&self.optionData.sku_item.length>0){
                for(var i=0;i<self.optionData.sku_item.length;i++){
                  if(data[self.optionData.sku_item[i].title]){
                    data.sku_item.push(data[self.optionData.sku_item[i].title])
                  };
                  delete data[self.optionData.sku_item[i].title]
                };
              };
              var postData={
                data:data
              };
              if(self.otherData.product_no){
                postData.data.product_no = self.otherData.product_no;
                return postData;
              }else{
                return false;
              };
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
              self.$router.push('/product/product/product');
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
      },
      optionData:{
        categoryOptions:[],
        skuOptions:[],
        sku_item:[],
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
    init () {
      const  routerquery = this.$route.query;
      this.product_no = routerquery.product_no;
      this.otherData.product_no = routerquery.product_no;
      this.initProductData()
      this.initMainData()

    },

    async initProductData(product_no){
      const self = this;
      const postData = {};
      postData.searchItem ={
        product_no:self.product_no
      };
      try{
        var res = await self.$$api_product_get({data: postData});
      }catch(err){
        console.log(err);
        notify('网络故障','error');
      };

      if(res.info.data.length>0){
        self.productInfo = res.info.data[0];
        self.initSkuData(self.productInfo.sku_array);
      }else{
        notify('制定商品不存在','error');
      };

    },

    async initSkuData(sku_array){
      const self =this;
      console.log('initSkuData')
      const postData = {};
      postData.searchItem ={
        id:['in',sku_array]
      };
      postData.searchItemOr ={
        parentid:['in',sku_array]
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
      self.sku = res.info.data;
      if(self.sku.length>0){

        for(var key in self.sku){
          console.log('item',self.sku[key])
          if(self.sku[key].type=='5'){
            self.fields.push({
              key: self.sku[key].title,
              label: self.sku[key].title,
              application:['添加','编辑'],
              type:'select',
              options:self.sku[key].child||[],
              defaultProps: {
                label: 'title',
                value: 'id',
              },
            });
            self.optionData.sku_item.push(self.sku[key]);
          };
        };
      };

    },


    async initMainData() {

      const self = this;
      const postData  = {};
      postData.paginate = self.$$cloneForm(self.paginate);
      postData.token = self.$store.getters.getToken;
      if (self.searchItem) {
        postData.searchItem = self.$$cloneForm(self.searchItem);
      };
      postData.searchItem.product_no = this.product_no;

      if(JSON.stringify(self.getBefore) != "{}"){
        postData.getBefore = self.$$cloneForm(self.getBefore);
      };
      postData.order = {
        create_time:'desc',
      };
      postData.getAfter = {
        sku:{
          tableName:'Label',
          middleKey:'sku_item',
          key:'id',
          condition:'in',
          searchItem:{
            status:1
          },
        },
      };
      var res =  await self.$$api_sku_get({data: postData});
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
        var res =  await self.$$api_sku_get({data: postData});
        window.location.href = res.info;
        console.log(res);
      }
    },

    async fieldChange(val){
      console.log('product_fieldChange',val);
      const self = this;
      if (val[0][0]=="is_group"&&val[0][1]==1) {
        self.fields[20]['application'] = ['编辑','添加'];
        self.$set(self.fields,20,self.fields[20]);
        self.fields[21]['application'] = ['编辑','添加'];
        self.$set(self.fields,21,self.fields[21]);
        self.fields[22]['application'] = ['编辑','添加'];
        self.$set(self.fields,22,self.fields[22]);
        console.log('changeaAfter',self.fields);
        val[1].computeFields();
      }else if(val[0][0]=="is_group"&&val[0][1]==0){
        self.fields[20]['application'] = [];
        self.$set(self.fields,20,self.fields[20]);
        self.fields[21]['application'] = [];
        self.$set(self.fields,21,self.fields[21]);
        self.fields[22]['application'] = [];
        self.$set(self.fields,22,self.fields[22]);
        val[1].computeFields();
      }
    },

  },

}
