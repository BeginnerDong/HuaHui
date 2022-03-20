
import FormData from '../form-data/'
import _ from 'underscore'
import plugins from '../../register/plugin.js'
import func from '../../register/func.js'
//import ElementUI from 'element-ui'
//import store from 'store/'


export default {
  name: 'tree-data',
  components: {
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

      treeData_mainData:[], // 列表数组
      fields: this.FieldList, // 字段数组
      expand: this.Expand, // 折叠
      btn_info: this.BtnInfo, // 按钮信息
      pagination: this.Pagination, // 分页
      search: this.Search,// 搜索
      optiondata: this.optionData,// 搜索
      treeData_defaultProps: this.defaultProps,// 搜索
      treeData_defaultChecked: this.defaultChecked,// 搜索
      formData:{},
      submitData:{},
      btn:{},
      dialogFormVisible:false,

      apiName:'',
      form_fields:[],
      filterText: '',
      token:0,

      
    }
  },
  methods: {

    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },


    //获取menu tree点击事件
    getCheckedNodes() {
      const data = this.$refs.tree.getCheckedNodes();
      if(data.length > 1){
          notify('请只选择一个菜单','warning');
          this.resetChecked(); 
      };
      if(data.length == 1){
         return data[0];
      };
      if(data.length == 0){
        notify('请选择一个菜单','warning');
        this.resetChecked();
      }
    },

    //获取menu tree点击事件
    getCheckedNodesAlone() {
      const data = this.$refs.tree.getCheckedNodes();
      return data;
    },
    //清空选中上传状态
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
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
      } else {
        this.batch.flag = true
      }

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
    sonBtnEvent (opts) {
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
    },

        /**
     * 自定义按钮事件
     * @param opts
     */
    onBtnEvent (opts) {
      
      this.token = Date.parse(new Date())+Math.random()*10;
      this.btn = opts.btn;
      this.btnName = opts.btn.text({data:opts.data},this);
      this.btnData = opts.data;
      if(opts.btn.funcType=='func'){
        opts.btn.func.func(opts.data,this,func,plugins);
        return ;
      };
      if(opts.btn.funcType=='emit'){
        this.$emit('onClickBtn', [this.btnName,this.btnData,this]);
        return ;
      };
      this.apiName = opts.btn.func.apiName(opts.data);
      if(opts.btn.funcType=='submit'){
        this.onSubmit();
        return ;
      };
      
      this.formData = {};
      this.formData = func.cloneForm(opts.btn.func.formData(opts.data,this,func));
     console.log('new_formData',this.formData);
      if(this.formData.error){
        func.notify(this.formData.error,'warning');
        return ;
      };

      this.form_fields = [];
      for (var i = 0; i < this.fields.length; i++) {
        if(_.indexOf(this.fields[i].application,this.btnName)>=0){
          this.form_fields.push(this.fields[i])
        };
      };
      
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




    getCheckedNodes() {
      const data = this.$refs.tree.getCheckedNodes();
      if(data.length > 1){
          func.notify('请只选择一个菜单','warning');
          this.resetChecked(); 
      };
      if(data.length == 1){
         return data[0];
      };
      if(data.length == 0){
        return false;
        this.resetChecked();
      }
    },
    //清空选中上传状态
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    /**
     * 改变当前页码事件
     * @param  {number} page 当前页面
     */
    onChangeCurrentPage (page) {
      this.$emit('pageChange', ['current_page',page])
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
      console.log(val);
      const postData = func.cloneForm(self.btn.func.postData(val,self));
      if(!postData){
        func.notify('数据故障','fail');
        return;
      };
      var res = await plugins[this.apiName]({data: postData});
      if(res){
        if(func.sCallBack(res)){
          self.dialogFormVisible = false;
          this.$emit('initMainData', )
        };
      };

    },


    fieldChange(val){   
      console.log('ListData_fieldChange',this.formData);
      this.$emit('fieldChange', [val,this])
    },
    
  },

  mounted () {
    // console.log(this.list);
    //this.store = store;

  },

  /**
   * 接收参数
   * @type {Object}
   */
  props: {
    MainData: {
      type: Array,
      required: true
    },
    defaultProps: {
      type: Object,
      default () {
        return {}
      }
    },
    defaultChecked: {
      type: Array,
      default () {
        return []
      }
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
    MainData (v) {
      if (v) {
        this.treeData_mainData = v
      }
    },
    FieldList (v) {
      if (v) {
        this.fields = v
      }
    },
    defaultChecked (v) {
      console.log('defaultChecked',v)
      if (v) {
        this.$refs.tree.setCheckedKeys(v)
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
    filterText(val) {
      console.log(val)
      this.$refs.tree.filter(val);
    }
  }

}
