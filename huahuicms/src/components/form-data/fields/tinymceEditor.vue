<template>
    <div style="width: 100%;">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="height: 15px;">

        </div>
        <div style="width: 100%;">
          <editor v-if="tinymceFlag"  :id='randomId' v-model='content_defaultValue' :init='init'></editor>
        </div>

     </div>

</template>
<script>
  import Common from './js/Common';
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/mobile/theme'
  import 'tinymce/themes/silver/theme'
  import Editor from "@tinymce/tinymce-vue";
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/contextmenu'
  import store from 'store/'
  import plugins from '../../../register/plugin.js'
  import * as qiniu from 'qiniu-js';
  var Js = Common('tinymce-editor');
  Js.mixins = [{
    data () {
      return {
        tinymceFlag:true,
        tinymceHTML:'hello world',
        init: {
          language_url: '/static/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide',
          height: 430,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu media',
          toolbar:[
            'image bold italic underline strikethrough | fontsizeselect | forecolor backcolor ',
            'alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote',
            'undo redo | link unlink  code | removeformat media'
          ],
          branding: false,
          media_live_embeds: true,
          convert_urls: false,

          images_upload_handler:function(){}

       },
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
        editorOption: {
          modules: {
            toolbar: '#editorAb',
            imageResize: {
               displaySize: true
            },
          },
        },
        content:{},
        image_array:[],
        content_defaultValue:'',
        tinymceHtml: '请输入内容',
        randomId:''

      }
    },
    components: {
        Editor
    },
    computed: {
      editor: {
        get: function () {
          const self = this;
          return self.$refs.myTextEditor.quill;
        },
        set: function (newValue) {
          const self = this;
          self.$refs.myTextEditor.quill = newValue;
        }
      }

    },
    created () {
      const self = this;
      this.init.images_upload_handler = async function (blobInfo, succFun, failFun) {
        const postData = {};
        var res = await plugins['api_uploadQiniImg']({data: postData});
        if(res.info.token){
          var uptoken = res.info.token;
        };
        let fileObj = blobInfo.blob();
        self.size  = fileObj.size;
        var key = 'solely/'+new Date().getTime()+fileObj.name;
        var obj = fileObj.name.lastIndexOf(".");
        self.ext = fileObj.name.substr(obj+1);
        self.orginName = fileObj.name;
        let config = {
          useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: qiniu.region.z0     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };
        let putExtra = {
          fname: "",  //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        self.start_time = new Date().getTime();
        var observable = qiniu.upload(fileObj, key, uptoken, putExtra, config);
        observable.subscribe({
          next: (result) => {
          // 主要用来展示进度
            console.log(result);
            //self.setProgress(result.total)
          },
          error: (errResult) => {
          // 失败报错信息
            console.log(errResult)
          },
          complete: (result) => {
          // 接收成功后返回的信息
            console.log(result)
            self.finish(result,succFun)
          }
        });
      };
      this.content_defaultValue = this.defaultValue;
      self.randomId = Math.ceil(Math.random()*10000)+'map';
      this.init.selector = '#' + self.randomId;
    },
    mounted () {
      tinymce.init({})
    },

  activated(){
     this.tinymceFlag = true;
   },
   deactivated(){
     this.tinymceFlag = false;
   },
    watch:{

      content_defaultValue(val) {
        const self = this;
        this.$emit('onChange', {field:this.field,value:this.content_defaultValue})
      },
      defaultValue(val) {
        const self = this;
        self.content_defaultValue = this.defaultValue;
      },

    },
    methods: {

      inittest(){
        const self = this;
        self.content_defaultValue = this.defaultValue;
        console.log('init-self.idArr',self.idArr)
      },

      onEditorChange({quill, html, text ,iamge }) {
        const self = this;
        self.content = html;
        this.$emit('onChange', {field:self.field,value:html})
      },


      getIdArrByHtml(html){
        const self = this;
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var imgIdReg = /id(\S*)\./i;
        var arr = html.match(imgReg);
        if(!arr){
          arr = [];
        };
        var idArr = [];
        for(var i=0;i<arr.length;i++){
          idArr.push(arr[i].match(imgIdReg)[1]);
        };
        return idArr;
      },


      onEditorFocus(editor) {
        const self = this;
        self.editor = editor   //当content获取到焦点的时候就 存储editor
      },

      customButtonClick(){
        const self = this;
        var range
        if (self.editor.getSelection() != null) {
          range = self.editor.getSelection()
          self.length = range.index  //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
        } else {
          self.length = self.content.length  //content没有获取到焦点时候 目的是为了在content末尾插入img
        }
        self.$el.querySelector('.custom-input').click();   //打开file 选择图片
      },




      async finish(e,succFun){
        const self = this;
        var url ='https://qiniu.solelycloud.com/' + e.key ;    //获取到了图片的URL
        succFun(url);
        //判断文件类型渲染(H5 video标签只支持H264编码的MP4)


        const postData = {
          data:{
            'origin_name':self.orginName,
            "title":self.orginName,
            "thirdapp_id":store.getters.getUserinfo.thirdapp_id,
            "user_no":store.getters.getUserinfo.user_no,
            "path" : url,
            "prefix"  : store.getters.getUserinfo.thirdapp_id+'/'+self.orginName,
            "size" :self.size,
            "type" : self.ext,
            "origin" : 2,
            "behavior" : 1,
            "param" : 1,
            "create_time" : new Date().getTime()/1000,
            'user_type':store.getters.getUserinfo.user_type,
          }
        };
        var res = await plugins['api_fileAdd']({data: postData});
      },





      /**
       * 根据数组的长度，来决定需要递归几次，最终取出需要的结果，我曹，没法解释，解释不清的玩意。
       * @param  {array}  areas 地区列表，无线分类结构
       * @param  {array}  temps 一维数组,如果只有一个，代表取顶级;如果两个，取顶级的子级；如果三个，顶级的子级的子级....以此类推
       * @param  {number} k     递归次数，当这个值等于temps的长度时，就代表结束了
       * @return {string}       地区名称
       */
      onDeepGetCityName (list, temps, k) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].id + '' === temps[k] + '') {
            if (k < temps.length - 1) {
              k = k + 1
              this.temp_field_obj[this.data.key].push(list[i].city)
              this.onDeepGetCityName(list[i].children, temps, k)
            } else {
              // console.log(list[i]);
              this.temp_field_obj[this.data.key].push(list[i].city)
              return
            }
          }
        }
      },

      /**
       * 最后一级选择完后触发
       * @param v 选中的值数组，根据这个数组取出对应的文本
       */
      sonChange (v) {
        this.temp_field_obj[this.data.key] = []
        this.onDeepGetCityName(this.data.options, v, 0)
        this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
        this.$emit('onChange', [this.data.key,value])
        this.events.change && this.events.change({value: v, info: this.submit_info[this.data.key]})
      },
      onChange (val) {

        this.$emit('onChange', [this.data.key,val[val.length-1]])

      },

      /**
       * 每选择一项时就触发这个
       * 场景：当选择的条件不允许继续选择时，可以使用这个事件
       * @param v 选中的值数组，根据这个数组取出对应的文本
       */
      onActiveItemChange (v) {
        this.temp_field_obj[this.data.key] = []
        this.onDeepGetCityName(this.data.options, v, 0)
        this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
        this.events['active-item-change'] && this.events['active-item-change']({
          value: v,
          info: this.submit_info[this.data.key]
        })
      }
    },


  }]
  export default Js
</script>
<style>
  .tox-tinymce-aux{
    z-index:9999!important
  }
</style>
