export default {
	name: 'cooperation',
	components: {},
	data() {
		return {
			mainData: [],
			self: this,
      search_header:'',
			fields: [{
					key: 'id',
					label: '文章ID',
					application: [],
					type: 'input',
					listType: ''
				},
				{
					key: 'title',
					label: '名称',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal',
					placeholder: '请输入名称',
					header_search: true,
					header_search_type: 'input',
					header_search_style: 'width:160px;margin-right:2px;',
					changeFunc: function(e, self) {
						if (e.target.value) {
							self.searchItem.title = ['LIKE', ['%' + e.target.value + '%']];
						} else {
							delete self.searchItem.title;
						};
						self.initMainData();
					},
				},
				{
					key: "title_e",
					label: '名称(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "title_f",
					label: '名称(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				// {
				// 	key: 'address',
				// 	label: '地址',
				// 	application: ['编辑', '添加'],
				// 	type: 'input',
				// 	listType: 'normal'
				// },
				// {
				// 	key: "address_e",
				// 	label: '地址(英)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				// {
				// 	key: "address_f",
				// 	label: '地址(繁)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				{
					key: 'phone',
					label: '电话',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				{
					key: "phone_e",
					label: '电话(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "phone_f",
					label: '电话(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: 'description',
					label: '邮箱',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				{
					key: 'mainEX',
					label: '主扩',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				{
					key: "mainEX_e",
					label: '主扩(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "mainEX_f",
					label: '主扩(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: 'mixer',
					label: '调音台(旧)',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				// {
				// 	key: "mixer_e",
				// 	label: '调音台(英)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				// {
				// 	key: "mixer_f",
				// 	label: '调音台(繁)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				{
					key: "mixer_id",
					label: '调音台',
					application: ['编辑', '添加'],
					type: 'cascader',
					options: 'mixerOptions',
					listType: 'normal',
					formatter: function(val, tests) {
						if(val.mixerArr&&val.mixerArr.length>0){
							var data = [];
							val.mixerArr.forEach((item,index)=>{
								data.push(item.title);
							})
							return data.join(',')
						}
					},
					multi:true,
					placeholder: '请选择调音台',
					defaultProps: {
						label: 'title',
						value: 'id',
						multiple: true
					},
					style:'width: 100%;'
				},
				// {
				//   key: 'postal_code',
				//   label: '邮编',
				//   application:['编辑','添加'],
				//   type:'input',
				//   listType:'normal'
				// },
				// {
				//   key: 'fax',
				//   label: '传真',
				//   application:['编辑','添加'],
				//   type:'input',
				//   listType:'normal'
				// },
				{
					key: "lng",
					label: '经度',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "lat",
					label: '纬度',
					application: ['添加', '编辑'],
					type: 'input'
				},
				// {
				// 	key: 'passage1',
				// 	label: '省份',
				// 	application: ['编辑', '添加'],
				// 	type: 'input',
				// 	listType: 'normal'
				// },
				// {
				// 	key: "passage1_e",
				// 	label: '省份(英)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				// {
				// 	key: "passage1_f",
				// 	label: '省份(繁)',
				// 	application: ['添加', '编辑'],
				// 	type: 'input'
				// },
				{
					key: "area_id",
					label: '区域',
					application: ['编辑', '添加'],
					type: 'cascader',
					options: 'labelOptions',
					listType: 'normal',
					formatter: function(val, tests) {
						if(val.area&&val.area.length>0){
							var data = [];
							val.area.forEach((item,index)=>{
								data.push(item.title);
							})
							return data.join('-')
						}
					},
					multi:true,
					placeholder: '请选择区域',
					header_search: true,
					header_search_type: 'cascader',
					header_search_value: '',
					header_search_style: 'width:160px;margin-right:2px;',
					changeFunc: function(value, self) {
						if (!value) {
							delete self.searchItem.area_id;
						} else {
							self.searchItem.area_id = value
						};
						self.initMainData();
					},
					defaultProps: {
						label: 'title',
						value: 'id'
					},
				},
				{
					key: "mainImg",
					label: 'LOGO',
					application: ['编辑', '添加'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: 'listorder',
					label: '自定义排序',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal',
					width: 100
				},
				{
					key: 'create_time',
					label: '创建时间',
					listType: 'normal',
					placeholder: '请选择创建时间',
					header_search: true,
					header_search_type: 'datePicker',
					header_search_value: '',
					header_search_style: 'width:160px;margin-right:2px;',
					changeFunc: function(value, self) {
						if (!value) {
							delete self.searchItem.create_time;
						} else {
							self.searchItem.create_time = ['between', value = value.map(function(e) {
								return e / 1000;
							})]
						};
						self.initMainData();
					},
					width: 200
				},
				{
					label: '操作',
					listType: 'deal',
					width: 100
				},

			],



			// 按钮配置
			btn_info: [

				{
					type: 'info',
					icon: 'edit',
					size: 'mini',
					position: 'list',
					text: function(data) {
						return '编辑'
					},
					func: {
						apiName: function(data) {
							return "api_article_update"
						},
						formData: function(data, self) {
							return data
						},
						postData: function(data, self) {
							var postData = {
								searchItem: {
									id: self.btnData.id
								},
								data: data
							};
							if(data.area_id){
								postData.data.area_id = data.area_id.join(',')
							}
							if(data.mixer_id){
								var arr = [];
								data.mixer_id.forEach((item,index)=>{
									item.forEach((v,i)=>{
										if(arr.indexOf(v)==-1){
											arr.push(v)
										}
									})
								})
								postData.data.mixer_id = arr.join(',')
							}
							return postData;
						}
					},
				},
				{
					type: 'danger',
					icon: 'delete',
					size: 'normal',
					funcType: 'submit',
					position: 'header',
					text: function(data) {
						return '删除选中'
					},
					func: {
						apiName: function(data) {
							return "api_article_update"
						},
						postData: function(data, self) {
							var postData = {
								searchItem: {
									id: ['in', self.deleteArray],
								},
								data: {
									status: -1
								}
							};
							return postData;
						}

					},
				},
				{
					type: 'info',
					icon: 'edit',
					size: 'normal',
					position: 'header',
					text: function(data) {
						return '添加'
					},
					func: {
						apiName: function(data) {
							return "api_article_add"
						},
						formData: function(data, self, func) {
							var data = {
								content: ''
							};
							return data
						},
						postData: function(data, self) {
							data.type = 8;
							data.menu_id = 121;
							var postData = {
								data: data
							};
							if(data.area_id){
								postData.data.area_id = data.area_id.join(',')
							}
							return postData;
						}
					},
				},

			],

			paginate: {
				count: 0,
				currentPage: 1,
				pagesize: 10,
				is_page: true,
				page_sizes: [10, 30, 60, 90],
				layout: 'total, sizes, prev, pager, next, jumper',
			},
			searchItem: {
				type: 8,
			},
			optionData: {
				labelOptions: [],
				mixerOptions:[]
			},
			otherData: {},
			getBefore: {},
			UserInfo: {
				tableName: 'UserInfo',
				searchItem: {},
				key: 'user_no',
				middleKey: 'user_no',
				condition: 'in',
			},
		}

	},
	mounted() {
		this.init()
	},
	computed: {
		token: function() {
			return this.$store.getters.getToken
		}
	},
	watch: {
		$route(to, from) {
			console.log(to)
			this.init()
		},
		token() {

		}
	},
	methods: {

		/**
		 * 初始化
		 */
		init() {
			this.initMainData()
			this.initMenuData()
		},



		async initMenuData() {
			const self = this;
			const postData = {};
			postData.searchItem = {
				type: ['=', 8],
				id:['not in',[121]]
			};
			postData.token = self.$store.getters.getToken;
			postData.order = {
				listorder: 'desc'
			};

			try {
				var res = await self.$$api_label_get({
					data: postData
				});
			} catch (err) {
				console.log(err);
				notify('网络故障', 'error');
			};

			if (res) {
				self.optionData.labelOptions = res.info.data[0].child;
				self.optionData.mixerOptions = res.info.data[1].child;
			};

		},


		/**
		 * 获取文章列表
		 */
		async initMainData() {

			const self = this;
			const postData = {};
			postData.paginate = self.$$cloneForm(self.paginate);
			postData.token = self.$store.getters.getToken;
			if (self.searchItem) {
				postData.searchItem = self.$$cloneForm(self.searchItem)
			};
			if (JSON.stringify(self.getBefore) != "{}") {
				postData.getBefore = self.$$cloneForm(self.getBefore);
			};
			postData.getAfter = {
				area:{
					tableName:'Label',
					middleKey:'area_id',
					key:'id',
					condition:'FIND_IN_SET',
					type:'or',
					order:{
						id:'asc'
					}
					// info:['title']
				},
				mixerArr:{
					tableName:'Label',
					middleKey:'mixer_id',
					key:'id',
					condition:'FIND_IN_SET',
					type:'or',
					order:{
						id:'asc'
					}
				}
			}
			var res = await self.$$api_article_get({
				data: postData
			});
			for(var i=0;i<res.info.data.length;i++){
				res.info.data[i].area_id = res.info.data[i].area_id?res.info.data[i].area_id.split(','):[];
				res.info.data[i].mixer_id = [];
				if(res.info.data[i].mixerArr.length>0){
					var arr = []
					res.info.data[i].mixerArr.forEach((item,index)=>{
						arr.push(item.parentid);
					})
					var brr = [];
					res.info.data[i].mixerArr.forEach((item,index)=>{
						if(arr.indexOf(item.id)==-1){
							brr.push(item);
							res.info.data[i].mixer_id.push([parseInt(item.parentid),parseInt(item.id)])
						}
					})
					res.info.data[i].mixerArr = brr;
				}
			}
			self.mainData = res.info.data;
			self.paginate.count = res.info.total;
			console.log('mainData',self.mainData)
		},


		onClickBtn(val) {
			console.log(val)
		},

		beforeSearch(TableName) {

			const self = this;
			if (JSON.stringify(self.getBefore) == "{}" && JSON.stringify(self[TableName]['searchItem']) != "{}") {
				self.getBefore = {
					[TableName]: self[TableName],
				};
			} else {
				if (JSON.stringify(self[TableName]['searchItem']) == "{}") {
					self.getBefore = {};
				} else {
					self.getBefore[TableName] = self[TableName];
				};
			};
			self.initMainData();
		},



		filtersChange(params) {
			const self = this;
			console.log(params);
			for (var key in params) {
				self.searchItem[key] = params[key][0]
			}
			console.log(self.searchItem)
			self.initMainData();
		},

		pageChange(val) {
			console.log(val);
			const self = this;
			self.paginate[val[0]] = val[1];
			self.initMainData();
		},

		async fieldChange(val) {
			console.log('product_fieldChange', val);
			const self = this;
		},

	},


}
