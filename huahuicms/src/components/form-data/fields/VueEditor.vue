<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
				<el-breadcrumb-item>编辑器</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="plugins-tips">

			Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
			访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
		</div>
		<quill-editor ref="myTextEditor" v-model="content_data" :options="editorOption" @focus="onEditorFocus($event)"
			@change="onEditorChange($event)">
			<div id="editorAbOne" slot="toolbar">

				<span class="ql-formats"><button type="button" class="ql-bold"></button></span>
				<span class="ql-formats"><button type="button" class="ql-italic"></button></span>
				<span class="ql-formats"><button type="button" class="ql-underline"></button></span>
				<span class="ql-formats"><button type="button" class="ql-strike"></button></span>
				<span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
				<span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
				<span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
				<span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
				<span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
				<span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
				<span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
				<span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
				<span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
				<span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
				<span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>
				<span class="ql-formats"><select class="ql-size">
						<option value="small"></option>
						<option selected=""></option>
						<option value="large"></option>
						<option value="huge"></option>
					</select></span>
				<span class="ql-formats"><select class="ql-header">
						<option value="1"></option>
						<option value="2"></option>
						<option value="3"></option>
						<option value="4"></option>
						<option value="5"></option>
						<option value="6"></option>
						<option selected="selected"></option>
					</select></span>
				<span class="ql-formats"><select class="ql-color">
						<option selected="selected"></option>
						<option value="#e60000"></option>
						<option value="#ff9900"></option>
						<option value="#ffff00"></option>
						<option value="#008a00"></option>
						<option value="#0066cc"></option>
						<option value="#9933ff"></option>
						<option value="#ffffff"></option>
						<option value="#facccc"></option>
						<option value="#ffebcc"></option>
						<option value="#ffffcc"></option>
						<option value="#cce8cc"></option>
						<option value="#cce0f5"></option>
						<option value="#ebd6ff"></option>
						<option value="#bbbbbb"></option>
						<option value="#f06666"></option>
						<option value="#ffc266"></option>
						<option value="#ffff66"></option>
						<option value="#66b966"></option>
						<option value="#66a3e0"></option>
						<option value="#c285ff"></option>
						<option value="#888888"></option>
						<option value="#a10000"></option>
						<option value="#b26b00"></option>
						<option value="#b2b200"></option>
						<option value="#006100"></option>
						<option value="#0047b2"></option>
						<option value="#6b24b2"></option>
						<option value="#444444"></option>
						<option value="#5c0000"></option>
						<option value="#663d00"></option>
						<option value="#666600"></option>
						<option value="#003700"></option>
						<option value="#002966"></option>
						<option value="#3d1466"></option>
					</select></span>
				<span class="ql-formats"> <select class="ql-background">
						<option value="#000000"></option>
						<option value="#e60000"></option>
						<option value="#ff9900"></option>
						<option value="#ffff00"></option>
						<option value="#008a00"></option>
						<option value="#0066cc"></option>
						<option value="#9933ff"></option>
						<option selected="selected"></option>
						<option value="#facccc"></option>
						<option value="#ffebcc"></option>
						<option value="#ffffcc"></option>
						<option value="#cce8cc"></option>
						<option value="#cce0f5"></option>
						<option value="#ebd6ff"></option>
						<option value="#bbbbbb"></option>
						<option value="#f06666"></option>
						<option value="#ffc266"></option>
						<option value="#ffff66"></option>
						<option value="#66b966"></option>
						<option value="#66a3e0"></option>
						<option value="#c285ff"></option>
						<option value="#888888"></option>
						<option value="#a10000"></option>
						<option value="#b26b00"></option>
						<option value="#b2b200"></option>
						<option value="#006100"></option>
						<option value="#0047b2"></option>
						<option value="#6b24b2"></option>
						<option value="#444444"></option>
						<option value="#5c0000"></option>
						<option value="#663d00"></option>
						<option value="#666600"></option>
						<option value="#003700"></option>
						<option value="#002966"></option>
						<option value="#3d1466"></option>
					</select></span>
				<span class="ql-formats"><select class="ql-font">
						<option selected="selected"></option>
						<option value="serif"></option>
						<option value="monospace"></option>
					</select></span>
				<span class="ql-formats">
					<select class="ql-align">
						<option selected="selected"></option>
						<option value="center"></option>
						<option value="right"></option>
						<option value="justify"></option>
					</select>
				</span>
				<span class="ql-formats"><button type="button" class="ql-clean"></button></span>
				<span class="ql-formats"><button type="button" class="ql-link"></button></span>
				<span class="ql-formats"><button type="button" class="ql-video"></button></span>
				<!--图片按钮点击事件-->
				<button type="button" @click="customButtonClick">imgs</button>
				<input type="file" class="custom-input" @change='upload' style='display: none !important;'
					multiple="multiple">
			</div>
		</quill-editor>
	</div>
</template>
<style>
	.ql-editor{height: 500px!important;}
</style>
<script>
	import Common from './js/Common';
	import func from '../../../register/func.js';
	import plugins from '../../../register/plugin.js';
	import {
		Quill
	} from 'vue-quill-editor';
	import {
		quillEditor
	} from 'vue-quill-editor';
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import store from 'store/'
	import {
		ImageResize
	} from '../../../../static/modules/ImageResize.js';
	Quill.register('modules/imageResize', ImageResize);
	import * as qiniu from 'qiniu-js';
	var Js = Common('vue-editor')
	Js.mixins = [{
		data() {
			return {
				defaultProps: {
					children: 'child',
					label: 'title',
					value: 'id',
				},
				editorOption: {
					modules: {
						toolbar: '#editorAbOne',
						imageResize: {
							displaySize: true
						},
					},
				},
				content: {},
				image_array: [],

				randomId: '',

				index: 0,
				file: [],
				fileObj: []
			}
		},
		components: {
			quillEditor
		},
		created() {
			const self = this;
			self.randomId = Math.ceil(Math.random() * 10000) + 'map';
			this.editorOption.modules.toolbar = '#' + self.randomId;
		},
		computed: {
			cascader_attrs() {
				return this.Data.cascader_attrs || {}
			},
			content_data: {

				get: function() {
					return this.submit_data[this.data.key] ? this.submit_data[this.data.key].toString() : '';
				},
				set: function(newValue) {
					this.submit_data[this.data.key] = newValue;
				},

			},
			editor: {
				get: function() {
					const self = this;
					return self.$refs.myTextEditor.quill;
				},
				set: function(newValue) {
					const self = this;
					self.$refs.myTextEditor.quill = newValue;
				}
			}

		},
		methods: {

			init() {
				const self = this;
				// self.image_array = self.getIdArrByHtml(self.content_data);
				// console.log('init-self.idArr',self.idArr)
			},

			onEditorChange({
				quill,
				html,
				text,
				iamge
			}) {
				const self = this;
				self.content = html;
				// console.log('onEditorChange-html', html);
				// var idArr = self.getIdArrByHtml(html);
				// var new_image_array = [];
				// for(var i =0;i<self.image_array.length;i++){
				//   if(idArr.indexOf(self.image_array[i])==-1){
				//     self.changeFileList(self.image_array[i],'del');
				//   }else{
				//     new_image_array.push(self.image_array[i]);
				//   };
				// };
				// self.image_array = new_image_array;
				// console.log('self.image_array',self.image_array);
				this.$emit('onChange', [this.data.key, html]);
			},


			getIdArrByHtml(html) {
				const self = this;
				var imgReg = /<img.*?(?:>|\/>)/gi;
				var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
				var imgIdReg = /id(\S*)\./i;
				var arr = html.match(imgReg);
				if (!arr) {
					arr = [];
				};
				var idArr = [];
				for (var i = 0; i < arr.length; i++) {
					idArr.push(arr[i].match(imgIdReg)[1]);
				};
				return idArr;
			},


			onEditorFocus(editor) {
				const self = this;
				self.editor = editor //当content获取到焦点的时候就 存储editor
			},

			customButtonClick() {
				const self = this;
				var jqObj = self.$el.querySelector('.custom-input');
				jqObj.value = "";
				var range
				console.log('editor', self.editor)
				if (self.editor.getSelection() != null) {
					range = self.editor.getSelection()
					self.length = range.index //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
				} else {
					self.length = self.content.length //content没有获取到焦点时候 目的是为了在content末尾插入img
				}
				self.$el.querySelector('.custom-input').click(); //打开file 选择图片
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
				self.index = self.fileObj.length - 1;

				console.log('e.target.files', e.target.files[0])
				self.moreUpload(self);
			},

			moreUpload(self) {
				
				console.log('index', self.index, self.fileObj[self.index], self.fileObj)
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
				self.loading = null;
				var observable = qiniu.upload(self.fileObj[self.index], key, self.uptoken, putExtra, config);
				observable.subscribe({
					next: (result) => {
						// 主要用来展示进度
						if(result.total.percent==100){
							self.loading.close();
						}else{
							self.loading = this.$loading({
								lock: true,
								text: '图片上传中'+parseFloat(result.total.percent.toFixed(2)),
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
						}
						console.log(result);
					},
					error: (errResult) => {
						// 失败报错信息
						console.log(errResult)
					},
					complete: (result) => {
						// 接收成功后返回的信息
						console.log('result', result);
						console.log('self', self);
						if (self.index > 0) {
							self.index--;
							self.moreUpload(self);
						}
						var url = 'http://image.racpro.net/' + result.key; //获取到了图片的URL
						self.editor.insertEmbed(self.length, 'image', url);
						
					}
				});
				
			},

			// upload(e) {
			// 	const self = this;
			// 	var file = e.target.files;

			// 	self.file = e.target.files;
			// 	self.index = 0;
			// 	console.log('self.file',file,file.length,self.index)
			// 	self.moreUpload(file,file.length,0);
			// },

			// async moreUpload(file,length,index){
			// 	const self = this;
			// 	let param = new FormData() // 创建form对象
			// 	console.log('name',file,length,index,self.file)
			// 	param.append('file', file[index], file[index].name) // 通过append向form对象添加数据
			// 	param.append('token', store.getters.getToken);
			// 	//param.append('chunk', '0') // 添加form表单中其他数据
			// 	//console.log(param.get('file'))  FormData私有类对象，访问不到，可以通过get判断值是否传进去
			// 	let config = {
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	}
			// 	//console.log(param.get('file'));
			// 	var res = await plugins.api_system_uploadImg({
			// 		data: param,
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data'
			// 		}
			// 	});
			// 	if (res.solely_code == 100000) {
			// 		self.contentImg = res.info.url; //获取到了图片的URL
			// 		//判断文件类型渲染(H5 video标签只支持H264编码的MP4)
			// 		var videoArray = ['mp4'];
			// 		var url = res.info.url;
			// 		var obj = url.lastIndexOf(".");
			// 		var ext = url.substr(obj + 1);
			// 		if (videoArray.indexOf(ext) != -1) {
			// 			self.editor.insertEmbed(self.length, 'video', self.contentImg);
			// 		} else {
			// 			self.editor.insertEmbed(self.length, 'image', self.contentImg)
			// 		};
			// 		var jqObj = self.$el.querySelector('.custom-input');
			// 		jqObj.value = "";

			// 		if(length>0&&length-1>index){
			// 			console.log('length',length,index++)
			// 			self.moreUpload(file,length,index++);
			// 		}
			// 	}
			// },


			changeFileList(id, type) {
				const self = this;
				var image_array = this.submit_data['img_array'];
				console.log('changeFileList', image_array);
				if (!image_array) {
					image_array = [];
				};
				if (type == 'add' && image_array.indexOf(id) == -1) {
					image_array.push(id)
				} else if (type == 'del' && image_array.indexOf(id) != -1) {
					image_array.splice(image_array.indexOf(id), 1);
				};
				self.$emit('onChange', ['img_array', image_array]);
			},





			/**
			 * 根据数组的长度，来决定需要递归几次，最终取出需要的结果，我曹，没法解释，解释不清的玩意。
			 * @param  {array}  areas 地区列表，无线分类结构
			 * @param  {array}  temps 一维数组,如果只有一个，代表取顶级;如果两个，取顶级的子级；如果三个，顶级的子级的子级....以此类推
			 * @param  {number} k     递归次数，当这个值等于temps的长度时，就代表结束了
			 * @return {string}       地区名称
			 */
			onDeepGetCityName(list, temps, k) {
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
			sonChange(v) {
				this.temp_field_obj[this.data.key] = []
				this.onDeepGetCityName(this.data.options, v, 0)
				this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
				this.$emit('onChange', [this.data.key, value])
				this.events.change && this.events.change({
					value: v,
					info: this.submit_info[this.data.key]
				})
			},
			onChange(val) {

				this.$emit('onChange', [this.data.key, val[val.length - 1]])

			},

			/**
			 * 每选择一项时就触发这个
			 * 场景：当选择的条件不允许继续选择时，可以使用这个事件
			 * @param v 选中的值数组，根据这个数组取出对应的文本
			 */
			onActiveItemChange(v) {
				this.temp_field_obj[this.data.key] = []
				this.onDeepGetCityName(this.data.options, v, 0)
				this.submit_info[this.data.key] = this.temp_field_obj[this.data.key]
				this.events['active-item-change'] && this.events['active-item-change']({
					value: v,
					info: this.submit_info[this.data.key]
				})
			}
		},
		created() {
			this.init();
		},
		mounted() {},
		watch: {

			content(val) {
				const self = this;
				self.$emit('contentsave', self.content);
			},
			defaultcontent(val) {
				console.log(val);
			},

		},
	}]
	export default Js
</script>
