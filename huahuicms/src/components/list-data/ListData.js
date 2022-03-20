import SlsTableHead from './SlsTableHead.vue'
import FormData from '../form-data/'
import _ from 'underscore'
import plugins from '../../register/plugin.js'
import func from '../../register/func.js'
import store from 'store/'


export default {
  name: 'list-data',
  components: {
    SlsTableHead,
    FormData
  },
  data () {
    return {
      batch_flag: true, // 符合批量删除为true,否则为false
      batch_datas: [],
      batch_ids: [],
      batch: {
        flag: true,
        datas: [],
        ids: []
      },
      list: this.mainData, // 列表数组
      fields: this.FieldList, // 字段数组
      expand: this.Expand, // 折叠
      btn_info: this.BtnInfo, // 按钮信息
      pagination: this.Pagination, // 分页
      search: this.Search,// 搜索
      optiondata: this.optionData,// 搜索
      formData:{},
      submitData:{},
      btn:{},
      dialogFormVisible:false,
      apiName:'',
      form_fields:[],
      token:0,
      self:this
      

    }
  },
  methods: {

    funcTransfer(){
      return func;
    },


    hasAuth(btn,data){

      const self = this;
      var auth = store.getters.getUserinfo.auth;

      if(btn){
        var id = this.$route.path+'-'+btn.text(data);
        if(auth.indexOf(id)>=0){
          return true;
        }else if(id=='/user/adminLists/adminLists-管理权限'){
          return true;
        }
        else if(id=='/user/adminLists/userOne-管理权限'){
          return true;
        };
      };
      
    },

    /**
     * 表格列表触发CheckBox的事件
     * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
     */
    onSelectionChange (val) {
      this.batch.datas = val
      this.batch.ids = []
      if (val.length) {
        this.batch.flag = false
        for (var i = 0; i < val.length; i++) {
          this.batch.ids.push(val[i].id)
        }
      }else{
        this.batch.flag = true
      };
      /**
       * 改变CheckBox事件，第一个参数是ID数组，第二个参数二维数组，每个数组是选中的对象
       */
      this.$emit('onSelectionChange', {
        ids: this.batch.ids,
        datas: this.batch.datas
      })
      this.$emit('onSelectionChangeObj', {
        ids: this.batch.ids,
        datas: this.batch.datas
      })
    },

    /**
     * 搜索事件
     * @param data    搜索表单的值
     */
    onSearch (opts) {
      this.$emit('onSearch', opts)
    },

    /**
     * 删除事件
     * @param  {object || boolean} user  当前信息对象或者为布尔值,为布尔值时，代表是批量删除
     * @param  {number} index 当前列表索引
     */
    onBatchDelete () {
      this.$emit('onClickBtnBatchDelete', {
        ids: this.batch.ids,
        datas: this.batch.datas
      })
    },

    /**
     * 点击按钮事件
     * @param opts  组装的返回参数
     * @param.attr  opts.type   string      按钮类型，内置四个(添加，查看，修改，删除)
     * @param.attr  opts.index  number      当点击列表中的按钮时，此值为当前行的索引
     * @param.attr  opts.data   object      当点击列表中的按钮时，此值为当前行数据
     * @param.attr  opts.list   array       当点击列别中的按钮时，此值为当前列表数据
     */
/*    onBtnEvent (opts) {
      switch (opts.type) {
        case 'Add':
          this.$emit('onClickBtnAdd', opts)
          break
        case 'Update':
          this.$emit('onClickBtnUpdate', opts)
          break
        case 'Delete':
          this.$emit('onClickBtnDelete', opts)
          break
        case 'BatchDelete':
          this.onBatchDelete()
          break
        case 'Select':
          this.$emit('onClickBtnSelect', opts)
          break
        default:
          this.$emit('onClickBtn', opts)
      }
    },*/

    /**
     * 自定义按钮事件
     * @param opts
     */
    onBtnEvent (opts) {
      const self = this;
      this.token = Date.parse(new Date())+Math.random()*10;
      this.btn = opts.btn;
      this.btnName = opts.btn.text({data:opts.data},this);
      this.btnData = opts.data;
      if(opts.btn.funcType=='func'){
        opts.btn.func.func(opts.data,this,func,plugins);
        return ;
      };
      if(opts.btn.funcType=='emit'){
        this.$emit('onClickBtn', [this.btnName,this.btnData]);
        return ;
      };
      this.apiName = opts.btn.func.apiName(opts.data);
      if(opts.btn.funcType=='submit'){
        this.onSubmit();
        return ;
      };
      
      this.formData = {};
      this.formData = func.cloneForm(opts.btn.func.formData(opts.data,this,func));
     console.log('this.formData',this.formData)
      if(this.formData.error){
        func.notify(this.formData.error,'warning');
        return ;
      };

      this.computeFields();
      
      if (opts.btn.fn) {
        opts.btn.fn(opts)
      } else {
        this.$emit('onClickBtn', opts)
      };


      
      if(this.btn.submitAlone){
        this.onSubmit();
      }else{
        this.dialogFormVisible = true;
      };
      
      
      

    },

    /**
     * 改变当前页码事件
     * @param  {number} page 当前页面
     */
    onChangeCurrentPage (page) {
      this.$emit('pageChange', ['currentPage',page])
    },

    /**
     * 改变每页显示的数量事件
     * @param  {number} page_size 每页显示的数量
     */
    onChangePageSize (pageSize) {
      this.$emit('pageChange', ['pagesize',pageSize])
    },

    filter_change(filters){
      const self = this;
      this.$emit('filtersChange', filters)
    },

    isInArray(array,item){
      return _.indexOf(array,item)>=0?true:false
    },

    async onSubmit(val){

      const self = this;
			console.log('onSubmit',val)
      this.$confirm('是否确定此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const postData = func.cloneForm(self.btn.func.postData(val,self));
        if(!postData){
          func.notify('数据故障','fail');
          return;
        };
        var res = await plugins[this.apiName]({data: postData});
        if(res){
          if(func.sCallBack(res)){
            self.dialogFormVisible = false;
            self.$emit('initMainData', )
          };
        };
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消'
        });          
      });

    },

    fieldChange(val){   
      console.log('ListData_fieldChange',this.formData);
      this.$emit('fieldChange', [val,this])
    },

    handleSelectionChange(val) {
      const self = this;
      console.log(val);
      self.deleteArray = [];
      for (var i = val.length - 1; i >= 0; i--) {
        self.deleteArray.push(val[i].id)
      };
    },
    async deleteUpdate(){
      const self = this;
      if(self.deleteArray&&self.deleteArray.length>0){
        const postData = {
          searchItem:{
            id:['in',self.deleteArray]
          },
          data:{
            status:-1
          }
        };
        var res = await plugins[this.otherData.deleteApiName]({data: postData});
        if(res){
          if(func.sCallBack(res)){
            self.dialogFormVisible = false;
            this.$emit('initMainData', )
          };
        };
        
      }else{
        func.notify('请选择选项','warning');
      }
      
    },

    computeFields(){
      const self = this;
      self.form_fields = [];
      for (var i = 0; i < self.fields.length; i++) {
        if(_.indexOf(self.fields[i].application,self.btnName)>=0){
          self.form_fields.push(self.fields[i])
        };
      };
    }
    
  },

  mounted () {
    console.log(this.fields);
    this.store = store;
  },

  /**
   * 接收参数
   * @type {Object}
   */
  props: {
    mainData: {
      type: Array,
      required: true
    },
    FieldList: {
      type: Array,
      required: true
    },
    BtnInfo: {
      type: Array,
      default () {
        return []
      }
    },
    Selection: {
      type: Boolean,
      default: false
    },
    Expand: {
      type: Object,
      default () {
        return {
          show: false,
          position: 'left'
        }
      }
    },
    Pagination: {
      type: Object,
      default () {
        return {}
      }
    },
    Search: {
      type: Object,
      default () {
        return {}
      }
    },
    optionData: {
      type: Object,
      default () {
        return {}
      }
    },
    otherData: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  /**
   * 监控参数
   * @type {Object}
   */
  watch: {
    mainData (v) {
      if (v) {
        this.list = v
      }
    },
    FieldList (v) {
      if (v) {
        this.fields = v
      }
    },
    Selection (v) {
      this.selection = v
    },
    Expand (v) {
      this.expand = v
    },
    BtnInfo (v) {
      console.log(v)
      this.btn_info = v
    },
    Pagination (v) {
      this.pagination = v
    },
    Search (v) {
      this.search = v
    },
    dialogFormVisible (v) {
      console.log('watchFormData',this.formData)
    }
  }
}
