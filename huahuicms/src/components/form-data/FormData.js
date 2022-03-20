import Fields from './fields/'

export default {
  components: Fields,
  name: 'form-data',
  data () {
    return {
      setting: this.Setting,
      primary_key: this.PrimaryKey,
      fields: this.FieldList,
      components: {
        input: 'SlsInput',
        textarea: 'SlsTextarea',
        select: 'SlsSelect',
        radio: 'SlsRadio',
        switch: 'SlsSwitch',
        cascader: 'SlsCascader',
        checkbox: 'SlsCheckbox',
        date: 'SlsDate',
        daterange: 'SlsDateRange',
        year: 'SlsDateYear',
        month: 'SlsDateMonth',
        week: 'SlsDateWeek',
        time: 'SlsTime',
        timerange: 'SlsTimeRange',
        timefixed: 'SlsTimeFixed',
        timefixedrange: 'SlsTimeFixedRange',
        datetime: 'SlsDateTime',
        datetimerange: 'SlsDateTimeRange',
        editor: 'SlsEditor',
        upload: 'upload',
        vueEditor: 'VueEditor',
        vueEditorone: 'VueEditorOne',
        vueEditortwo: 'VueEditorTwo',
		baiduMap: 'baiduMap',
		qiupload: 'QiUpload',
		// tinymceEditor: 'TinymceEditor'
      },
      cur_component: '',
      temp_field_obj: {},
      FormData:this.formData,
      submit_info: {},
      rules: this.Rules || {},
      submitData:{},
      option_Data:this.OptionData

    }
  },
  created(){
    
  },
  methods: {

    

    onChange(val){
      const self = this;
      console.log('onChange',val)
      self.submitData[val[0]] = val[1];
      if(val[0]=='img_array'){
        self.$set(self.FormData,'img_array',val[1]);
        console.log('63259632',self.FormData)
      };
      console.log('FormData--222',self.FormData,self.submitData)
      this.$emit('fieldChange', val);
    },




    /**
     * 表单提交事件
     */
    onSubmit (ref) {
      var data = {
        data: this.defaultValue,
        info: this.submit_info
      }
	  console.log('this.submitData',this.submitData)
      if (this.rules) {
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.$emit('onSubmit', this.submitData)
          }
        })
      } else {
        this.$emit('onSubmit', this.submitData)
      }
    }
  },
  created () {
    console.log('formDataJs',this.formData)
  },
  mounted () {
  },
  props: {
    FieldList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },

    OptionData: {
      type: Object,
      default () {
        return {}
      }
    },
    Editor: {
      type: Object,
      default () {
        return {}
      }
    },
    Rules: {
      type: Object,
      default () {
        return {}
      }
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    Setting: {
      type: Object,
      default () {
        return {}
      }
    },
    PrimaryKey: {
      type: String,
      default: 'id'
    },
    Token: {
      type: Number,
      default:0
    },
  },

  /**
   * 监控参数
   * @type {Object}
   */
  watch: {
    FieldList: {
      deep: true,
      handler (v) {
        if (v) {
          this.fields = v
        }
      }
    },
    formData: {
      deep: true,
      handler (v) {
        console.log('formData_v',v)
		this.FormData = v;
        //this.submitData = {}
      }
    },
    Token: {
      deep: true,
      handler (v) {
        this.submitData = {}
      }
    },
    DefaultValue: {
      deep: true,
      handler (v) {
        this.default_value = v
      }
    },
    wangeditor_update (v) {

    },
    Setting (v) {
      this.setting = v
    },
    PrimaryKey (v) {
      this.primary_key = v
    }
  }
}
