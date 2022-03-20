export default {
  name: 'coupon',
  components: {},
  data () {
    return {
      mainData: [],
      self:this,
      fields: [
        {
          key: 'coupon_no',
          label: '优惠券No',
          application:[],
          type:'input',
          listType:'normal'
        },
        {
          key: 'title',
          label: '优惠券标题',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        {
          key: 'description',
          label: '优惠券描述',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        // {
        //   key: 'price',
        //   label: '价格',
        //   application:['编辑','添加'],
        //   type:'input',
        //   listType:'normal'
        // },
        {
          key: 'value',
          label: '价值',
          application:['编辑','添加'],
          type:'input',
          listType:'normal'
        },
        // {
        //   key: 'discount',
        //   label: '折抵份额',
        //   listType:'normal',
        //   application:['编辑','添加'],
        //   type:'input',
        // },
        // {
        //   key: 'condition',
        //   label: '限额（满减）',
        //   listType:'normal',
        //   application:['编辑','添加'],
        //   type:'input',
        // },
        {
          key: 'stock',
          label: '库存',
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
          key: "type",
          label: '优惠券类型',
          application:['编辑','添加'],
          type:'select',
          options:[
            {
              text: '抵扣券',
              value: 1
            },
            // {
            //   text: '折扣券',
            //   value: 2
            // }
          ],
          formatter:function(val,tests){
            return val.type == 1 ? '抵扣券' : '折扣券'
          },
          listType:'normal',
          defaultProps: {
            label: 'text',
            value: 'value',
          },
        //   placeholder:'请选择优惠券类型',
        //   header_search:true,
        //   header_search_type:'select',
        //   header_search_value:'',
        //   header_search_style:'width:160px;margin-right:2px;',
        //   changeFunc:function(value,self){
        //     if(value){
        //       self.searchItem.type = value;
        //     }else{
        //       delete self.searchItem.type;
        //     };
        //     self.initMainData();
        //   },
        },
        {
          key:'valid_time',
          label:'有效期',
          application:['编辑','添加'],
          type:'input',
          listType: 'timeinit',
          timeinit:function(val){
            return val.valid_time?parseInt(val.valid_time)/86400/10000:''
          }
        },
        // {
        //   key: "onShelf",
        //   label: '是否上架',
        //   application:['编辑','添加'],
        //   type:'select',
        //   options:[
        //     {
        //       text: '上架',
        //       value: 1
        //     },
        //     {
        //       text: '下架',
        //       value: -1
        //     }
        //   ],
        //   defaultProps: {
        //     label: 'text',
        //     value: 'value',
        //   },
        //   formatter:function(val,tests){
        //     return val.onShelf == 1 ? '上架' : '下架'
        //   },
        //   filter_multiple: false,
        //   listType:'normal',
        // },
        {
          key: 'limit',
          label: '购买数量限制',
          application:['编辑','添加'],
          type:'input',
        },
        {
          key: 'use_limit',
          label: '使用数量限制',
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
        // {
        //   key: "bannerImg",
        //   label: '轮播图',
        //   application:['编辑','添加'],
        //   type:'upload',
        //   limit:10,
        // },
        // {
        //   key: "content",
        //   label: '内容',
        //   application:['编辑','添加'],
        //   type:'vueEditor',
        // },
        {
          key: 'start_time',
          label: '开启时间',
          application:['编辑','添加'],
          type:'datetime',
          listType:'',
          width:150,
          custom:function(val,func){
            return val.start_time?func.formatDate(new Date(parseInt(val.start_time)),'yyyy/M/d hh:mm'):''
          }
        },
        {
          key: 'end_time',
          label: '结束时间',
          application:['编辑','添加'],
          type:'datetime',
          listType:'',
          width:150,
          custom:function(val,func){
            return val.end_time?func.formatDate(new Date(parseInt(val.end_time)),'yyyy/M/d hh:mm'):''
          }
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
            return val.status === 1 ? '启用' : '禁用'
          },
          filter_multiple: false,
          listType:'normal',
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
              return "api_coupon_update"
            },
            formData:function(data,self,func){
              var newFormData = func.cloneForm(data);
              newFormData.valid_time = parseInt(newFormData.valid_time)/86400/1000;
              return newFormData
            },
            postData:function(data,self){
              if (data.valid_time) {
                data.valid_time = data.valid_time*86400*1000;
              }
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
              return "api_coupon_update"
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
              return "api_coupon_add"
            },
            formData:function(data,self,func){
              var data = {
								start_time:'',
								end_time:'',
              };
              return data
            },
            postData:function(data,self){
              data.valid_time = data.valid_time?data.valid_time*86400*1000:'';
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
      postData.order = {
          create_time:'desc',
      };
      var res =  await self.$$api_coupon_get({data: postData});
      self.mainData = res.info.data;
      self.paginate.count = res.info.total;
    },


    async onClickBtn(val){
      const self = this;
      console.log(val)
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
