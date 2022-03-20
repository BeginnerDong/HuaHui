<template>
	<div>

		<div>
			<!-- QiNiuUpload -->
			<el-button size="mini" type="primary" @click="customButtonClick">上传<i
					class="el-icon-upload el-icon--right"></i></el-button>

			<input :ref="randomId" type="file" class="custom-input" @change='upload($event,0)'
				style='display: none !important;' multiple="multiple">
			<span style="float: right;width: 260px;margin-left: 30px;font-size: 12px;">
				<el-progress :percentage="progress" :width="80"></el-progress>
				剩余时间：{{progress==100?0:resttime}}&nbsp;&nbsp;&nbsp;
				速度：{{progress==100?0:speedUnits}}
			</span>

		</div>
		<div style="margin-top: 10px;">

			<el-input size="mini" placeholder="请输入url" v-model="insertUrl" class="input-with-select">
				<el-button slot="append" size="mini" type="primary" @click="insert">插入</el-button>
			</el-input>




		</div>
		<div style="width:100%;height:30px;"></div>
		<div style="width:100%;">
			<template v-for="(item, index) in uploadImg">
				<div :key="index" v-if="item.type=='image'"
					style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">

					<div style="width:150px;height:80px;object-fit: contain;">
						<img style="object-fit: contain;width: 100%;height: 100%;" :src="item.url"></img>
					</div>
					<div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
						<i class="el-icon-delete" :data-index="index" @click="removeImg"></i>
						<a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)"
							:class="item.id + 'tag'">复制链接</a>
					</div>

				</div>
				<div :key="index" v-else-if="item.type=='vedio'"
					style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
					<div style="width:150px;height:80px;">
						<video style="object-fit: contain;width: 100%;height: 100%;" :src="item.url"
							controls="controls">
							您的浏览器不支持 video 标签。
						</video>
					</div>
					<div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
						<i class="el-icon-delete" :data-index="index" @click="removeImg"></i>
						<a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)"
							:class="item.id + 'tag'">复制链接</a>
					</div>
				</div>
				<div :key="index" v-else-if="item.type=='doc'"
					style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
					<div style="width:150px;height:80px;">
						<span>{{item.title}}</span>
					</div>
					<div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
						<i class="el-icon-delete" :data-index="index" @click="removeImg"></i>
						<a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)"
							:class="item.id + 'tag'">复制链接</a>
					</div>
				</div>
				<div :key="index" v-else-if="!item.type"
					style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
					<div style="width:150px;height:80px;">
						<span>{{item.title}}</span>
					</div>
					<div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
						<i class="el-icon-delete" :data-index="index" @click="removeImg"></i>
						<a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)"
							:class="item.id + 'tag'">复制链接</a>
					</div>
				</div>
				<div :key="index" v-else
					style="margin-bottom:10px;width:150px;height:110px;word-wrap: break-word;word-break: normal;float:left;border-bottom:1px solid gray;position:relative;margin-right:10px;">
					<div style="width:150px;height:80px;overflow:hidden">
						<span>{{item.url}}</span>
					</div>
					<div style="width:150px;height:20px;padding-top: 5px;padding-left: 3px;">
						<i class="el-icon-delete" :data-index="index" @click="removeImg"></i>
						<a style="font-size: 12px;color:el-icon-document-copy" @click="copyLink(item.url,item.id)"
							:class="item.id + 'tag'">复制链接</a>
					</div>
				</div>
			</template>
		</div>

	</div>
</template>
<script>
	import Common from './js/Common'
	import plugins from '../../../register/plugin.js'
	import store from 'store/'
	import spark from '../../../utils/sparkmd5.js'
	// import func from '../../utils/func/func.js'
	import Clipboard from 'clipboard'

	import * as qiniu from 'qiniu-js';
	var Js = Common('upload')
	Js.mixins = [{
		data() {
			return {
				defaultProps: {
					children: 'child',
					label: 'title',
					value: 'id',
				},
				uploadImg: [],
				insertUrl: '',
				speedUnits: 0,
				progress: 0,
				resttime: 0,
				finishCount: 0,
				colors: [{
						color: '#f56c6c',
						percentage: 20
					},
					{
						color: '#e6a23c',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#1989fa',
						percentage: 80
					},
					{
						color: '#6f7ad3',
						percentage: 100
					}
				],
				randomId: Math.ceil(Math.random() * 10000) + 'file',
				insertUrl: '',
				
				fileObj:[],
				index:0,
				uptoken:''
			}
		},
		created() {
			if (!this.defaultValue[this.Data.key]) {
				this.uploadImg = []
			} else {
				this.uploadImg = this.defaultValue[this.Data.key];
			}
			console.log('defaultValue', this.Data.key, this.defaultValue, this.uploadImg)
		},
		mounted() {

		},
		computed: {},
		methods: {


			copyLink(url, id) {
				const self = this;
				let clipboard = new Clipboard('.' + id + 'tag', {
					text: function() {
						return url
					}
				})
				clipboard.on('success', e => {
					// func.notify('复制成功','success');
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// func.notify('复制失败','warning');
					clipboard.destroy()
				})
			},

			copyUrl(index) {
				console.log(index);
				const self = this;
				self.uploadImg[index]['showUrl'] = true;
				self.$set(self.uploadImg, index, self.uploadImg[index]);

			},

			insert() {
				const self = this;
				var url = self.insertUrl; //获取到了图片的URL


				var lastArray = self.insertUrl.split("/");
				self.orginName = lastArray[lastArray.length - 1];
				var obj = self.orginName.lastIndexOf(".");
				self.ext = self.orginName.substr(obj + 1);

				//判断文件类型渲染(H5 video标签只支持H264编码的MP4)
				var videoArray = ['mp4'];
				var imageArray = ['image', 'jpeg', 'png', 'PNG', 'JPEG', 'jpg', 'JPG'];
				var docArray = ['doc', 'xlsx', 'xls', 'csv', 'pdf', 'txt', 'ppt'];

				if (videoArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						type: 'vedio',
					});
				} else if (imageArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						type: 'image'
					});
				} else if (docArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						title: self.orginName,
						type: 'doc'
					});
				} else {
					self.uploadImg.push({
						url: url,
						title: self.orginName,
					});
				};
				self.$emit('onChange', [self.Data.key, self.uploadImg]);
				self.insertUrl = "";

			},


			customButtonClick() {
				const self = this;
				self.$refs[self.randomId].click(); //打开file 选择图片
			},


			async upload(e, start) {

				const self = this;
				const postData = {};
				var res = await plugins['api_system_uploadQiniImg']({
					data: postData
				});
				if (res.info.token) {
					self.uptoken = res.info.token;
				};
				self.fileObj = e.target.files;
				self.index = 0;

				console.log('e.target.files', e.target.files[0])
				self.moreUpload(start);
			},
			
			moreUpload(start){
				const self = this;
				console.log('index',self.index,self.fileObj[self.index])
				self.size = self.fileObj[self.index].size;
				var key = 'hh/' + new Date().getTime() + self.fileObj[self.index].name;
				var obj = self.fileObj[self.index].name.lastIndexOf(".");
				self.ext = self.fileObj[self.index].name.substr(obj + 1);
				self.orginName = self.fileObj[self.index].name;
				let config = {
					useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
					region: qiniu.region.z2 // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
				};
				let putExtra = {
					fname: "", //文件原文件名
					params: {}, //用来放置自定义变量
					mimeType: null //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
				};
				self.start_time = new Date().getTime();
				var observable = qiniu.upload(self.fileObj[self.index], key, self.uptoken, putExtra, config);
				observable.subscribe({
					next: (result) => {
						// 主要用来展示进度
						console.log(result);
						self.setProgress(result.total)
					},
					error: (errResult) => {
						// 失败报错信息
						console.log(errResult)
					},
					complete: (result) => {
						// 接收成功后返回的信息
						console.log(result)
						self.finish(result)
					}
				});
				
				if(self.fileObj.length>0&&self.fileObj.length>self.index+1){
					self.index++;
					self.moreUpload(0);
				}
			},

			removeImg(e) {
				const self = this;
				var index = e.target.dataset.index;
				self.uploadImg.splice(index, 1);
				self.$emit('onChange', [self.Data.key, self.uploadImg]);
			},

			async finish(e) {
				const self = this;
				var url = 'https://image.racpro.net/' + e.key; //获取到了图片的URL

				//判断文件类型渲染(H5 video标签只支持H264编码的MP4)
				var videoArray = ['mp4'];
				var imageArray = ['image', 'jpeg', 'png', 'PNG', 'JPEG', 'jpg', 'JPG'];
				var docArray = ['doc', 'xlsx', 'xls', 'csv', 'pdf', 'txt', 'ppt'];

				if (videoArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						type: 'vedio',
					});
				} else if (imageArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						type: 'image'
					});
				} else if (docArray.indexOf(self.ext) != -1) {
					self.uploadImg.push({
						url: url,
						title: self.orginName,
						type: 'doc'
					});
				} else {
					self.uploadImg.push({
						url: url,
						title: self.orginName,
					});
				};

				var jqObj = self.$refs[self.randomId];
				jqObj.value = "";
				console.log('Data', self.Data,[self.Data.key, self.uploadImg])
				self.$emit('onChange', [self.Data.key, self.uploadImg]);
			},


			// 进度条
			setProgress(e) {
				const self = this;
				self.loaded = e.loaded;
				self.progress = parseInt(e.percent);
				self.size = e.size;


				//上传速度计算
				var nt = new Date().getTime();
				var speed = self.loaded / (nt - self.start_time) * 1000; //单位b/s
				var orginSpeed = speed;
				var units = 'b/s'; //单位名称
				if (speed / 1024 > 1) {
					speed = speed / 1024;
					units = 'k/s';
				}
				if (speed / 1024 > 1) {
					speed = speed / 1024;
					units = 'M/s';
				}
				speed = speed.toFixed(1);

				self.resttime = ((self.size - self.loaded) / orginSpeed).toFixed(1) + '-s';
				self.speedUnits = speed + units;

			},

			doNormalTest(fileObj, callback) { //这里假设直接将文件选择框的dom引用传入
				const self = this;
				if (self.running) { // 如果正在计算、不允许开始下一次计算
					return;
				};
				var fileReader = new FileReader();
				fileReader.callback = callback; //创建FileReader实例
				fileReader.onload = function(e, callback) { //FileReader的load事件，当文件读取完毕时触发
					self.running = false;
					// e.target指向上面的fileReader实例
					if (fileObj.size != e.target.result.length) { //如果两者不一致说明读取出错
						alert("ERROR:Browser reported success but could not read the file until the end.");
					} else {
						self.md5Res = SparkMD5.hashBinary(e.target.result);
						this.callback();
					}
				};

				fileReader.onerror = function() { //如果读取文件出错，取消读取状态并弹框报错
					self.running = false;
					alert(
						"ERROR:FileReader onerror was triggered, maybe the browser aborted due to high memory usage.");
				};
				self.running = true;
				fileReader.readAsBinaryString(fileObj); //通过fileReader读取文件二进制码
			}


		},
		watch: {
			defaultValue() {
				console.log('defaultValue', this.defaultValue)
				if (!this.defaultValue[this.Data.key]) {
					this.uploadImg = []
				} else {
					this.uploadImg = this.defaultValue[this.Data.key];
				}
			},
		}

	}]
	export default Js
</script>
