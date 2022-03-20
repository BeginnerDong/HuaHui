<template>
  <div v-loading="loading">
    <!--<el-upload
      class="upload-demo"
      action=""
      :limit="data.limit"
      :on-success="handlesuccess"
      :on-remove="handleRemove"
      :file-list="normalizedImglist"
      :http-request="handleFileUpload"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,上传张数限制 {{data.limit}}张</div>
    </el-upload>-->


    <div>
      <el-button size="small" type="primary" @click="customButtonClick">new upload</el-button>
      <input type="file"  class="custom-input" @change='upload' style='display: none !important;' multiple="multiple">
    </div>
    <div style="width:100%;height:15px;"></div>
    <div style="width:100%;overflow:hidden">
      <template v-for="(item, index) in uploadImg">
        <div :style="item.type=='image'?'width:110px;height:120px;':'width:220px;height:140px;'"  style="float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
          <div style="width:100%;height:80%;">{{item.type}}
            <img v-if="item.type=='image'" width="100%" height="100%;" :src="item.url">
            </img>
            <video v-else-if="item.type=='video'" :src="item.url" controls="controls" width="100%" height="100%" >
              您的浏览器不支持 video 标签。
            </video>
            <video v-else-if="item.type=='audio'" :src="item.url" controls="controls" width="100%" height="100%"  >
              您的浏览器不支持 audio 标签。
            </video>
            <sp v-else style="width:100%;height:100%" >
              {{item.url}}
            </sp>
          </div>
          <div style="height:20px;line-height:15px;" ><i class="el-icon-delete" :data-index="index" @click="removeImg" ></i></div>
        </div>
      </template>
    </div>

  </div>
</template>
<script>
  import Common from './js/Common'
  import plugins from '../../../register/plugin.js'
  import store from 'store/'
  var Js = Common('upload')
  Js.mixins = [{
    data () {
      return {
        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
        loading:false
      }
    },
    computed: {
      cascader_attrs () {
        return this.Data.cascader_attrs || {}
      },

      uploadImg () {
        if(this.isArrayFn(this.submit_data[this.data.key])){
          return this.submit_data[this.data.key];
        }else{
          return [];
        }
      }
    },
    methods: {

      customButtonClick(){
        const self = this;
        self.$el.querySelector('.custom-input').click();   //打开file 选择图片
      },


      async upload(e){

        const self = this;
        let file = e.target.files[0]
        let param = new FormData()  // 创建form对象

        param.append('file', file, file.name)  // 通过append向form对象添加数据
        param.append('token', store.getters.getToken);
        //param.append('chunk', '0') // 添加form表单中其他数据
        //console.log(param.get('file'))  FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        self.loading = true;
        var res = await plugins.api_system_uploadImg({data: param,headers: {'Content-Type': 'multipart/form-data'}});
        if(res.solely_code == 100000){

          var url = res.info.url ;    //获取到了图片的URL
          //var imgIdReg = /id(\S*)\./i;
          //var id = url.match(imgIdReg)[1];//获取到了图片的ID

          //判断文件类型渲染(H5 video标签只支持H264编码的MP4)
          var videoArray = ['mp4'];
          var imgArray = ['png','jpg','JPG','PNG'];
          var audioArray = ['mp3','wmv'];
          var url = res.info.url;
          var obj = url.lastIndexOf(".");
          var ext = url.substr(obj+1);
          if(videoArray.indexOf(ext)!=-1){
            self.uploadImg.push({
              url:url,
              type:'video',
            });
          }else if(imgArray.indexOf(ext)!=-1){
            self.uploadImg.push({
              url:url,
              type:'image'
            });
          }else if(audioArray.indexOf(ext)!=-1){
            self.uploadImg.push({
              url:url,
              type:'audio'
            });
          }else{
            self.uploadImg.push({
              url:url,
              type:'other'
            });
          };

					self.$set(self.data,'uploadImg',self.uploadImg);
          self.$emit('onChange',[this.data.key,this.uploadImg]);
          self.loading = false;
          var jqObj=self.$el.querySelector('.custom-input');
          jqObj.value = "";
          //self.changeFileList(id,'add');

        }
      },

      removeImg(e){

        const self = this;
        console.log('removeImg',e);
        var index = e.target.dataset.index;
        //var imgIdReg = /id(\S*)\./i;
        //var id = self.uploadImg[index].url.match(imgIdReg)[1];
        // self.changeFileList(id,'del');
        self.uploadImg.splice(index,1);
        self.$emit('onChange',[this.data.key,this.uploadImg]);

      },

      changeFileList(id,type){
        const self = this;
        var image_array = this.submit_data['image_array'];
        if(!image_array){
          image_array = [];
        };
        if(type=='add'&&image_array.indexOf(id)==-1){
            image_array.push(id)
        }else if(type=='del'&&image_array.indexOf(id)!=-1){
            image_array.splice(image_array.indexOf(id),1);
        };
        self.$emit('onChange',['img_array',image_array]);
      },


      isArrayFn(value){
        if (typeof Array.isArray === "function") {
        return Array.isArray(value);
        }else{
        return Object.prototype.toString.call(value) === "[object Array]";
        }
      },

      imageChange(fileList){
        if(fileList.length){
          var imgArray = [];
          fileList.forEach((item, index) => {
            imgArray.push(
              {
                name:item['name'],
                url:item['url']
              }
            );
          });
          return imgArray;

        }else{
          return 'empty';
        };

      },

      handleRemove(file, fileList) {
        const self = this;
        self.$emit('onChange',[this.data.key,this.imageChange(fileList)]);
      },

      handlesuccess(response, file, fileList){
        const self = this;
        file.url = self.response;
        self.$emit('onChange',[this.data.key,this.imageChange(fileList)]);
      },

      async handleFileUpload(data){
        const self = this;

        let file = data.file;
        let param = new FormData();

        param.append('file', file, file.name);
        param.append('token', store.getters.getToken);

        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        //console.log(self.$store.getters.getUserInfo.token);
        var res = await plugins.api_system_uploadImg({data: param,headers: {'Content-Type': 'multipart/form-data'}});
        console.log(res)

        this.response = res.info.url;

      },

      onChange (val) {
        this.$emit('onChange', [this.data.key,val[val.length-1]])
      },

    },
    created () {
      if (!this.submit_data[this.data.key] || !Array.isArray(this.submit_data[this.data.key])) {
        this.submit_data[this.data.key] = []
      }
      this.temp_field_obj[this.data.key] = []
    },
    mounted () {

    }
  }]
  export default Js
</script>
