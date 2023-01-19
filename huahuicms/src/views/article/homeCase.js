export default {
	name: 'homeCase',
	components: {},
	data() {
		return {
			mainData: [],
			self: this,
			search_header: '',
			fields: [{
					key: 'id',
					label: '文章ID',
					application: [],
					type: 'input',
					listType: ''
				},
				{
					key: 'title',
					label: '文章标题',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal',
					placeholder: '请输入文章标题',
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
					label: '文章标题(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "title_f",
					label: '文章标题(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: 'small_title',
					label: '列表标题',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				{
					key: "small_title_e",
					label: '列表标题(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "small_title_f",
					label: '列表标题(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: 'description',
					label: '描述',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
				},
				{
					key: "description_e",
					label: '描述(英)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "description_f",
					label: '描述(繁)',
					application: ['添加', '编辑'],
					type: 'input'
				},
				// {
				// 	key: "menu_id",
				// 	label: '菜单',
				// 	application: ['编辑', '添加'],
				// 	type: 'cascader',
				// 	options: 'labelOptions',
				// 	listType: 'normal',
				// 	formatter: function(val, tests) {
				// 		return val.label[val.menu_id]['title'];
				// 	},
				// 	placeholder: '请选择菜单',
				// 	header_search: true,
				// 	header_search_type: 'cascader',
				// 	header_search_value: '',
				// 	header_search_style: 'width:160px;margin-right:2px;',
				// 	changeFunc: function(value, self) {
				// 		if (!value) {
				// 			delete self.searchItem.menu_id;
				// 		} else {
				// 			self.searchItem.menu_id = value[value.length - 1]
				// 		};
				// 		self.initMainData();
				// 	},
				// 	defaultProps: {
				// 		label: 'title',
				// 		value: 'id',
				// 		children: 'child',
				// 	},
				// },
				{
					key: "home_show",
					label: '首页最新',
					application: ['编辑', '添加'],
					type: 'select',
					options: [{
							text: '是',
							value: 1
						},
						{
							text: '否',
							value: 0
						},
					],
					formatter: function(val, tests) {
						return val.home_show === 1 ? '是' : '否'
					},
					filter_multiple: false,
					listType: 'normal',
					defaultProps: {
						label: 'text',
						value: 'value',
					},
				},
				{
					key: "case_show",
					label: '同步展示',
					application: ['编辑', '添加'],
					type: 'select',
					options: [{
							text: '展示',
							value: 0
						},
						{
							text: '不展示',
							value: 1
						},
					],
					formatter: function(val, tests) {
						return val.case_show === 1 ? '不展示' : '展示'
					},
					filter_multiple: false,
					listType: 'normal',
					defaultProps: {
						label: 'text',
						value: 'value',
					},
				},
				{
					key: "mainImg",
					label: '主图',
					application: ['编辑', '添加'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "mainImg_e",
					label: '主图(英)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "mainImg_f",
					label: '主图(繁)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "bannerImg",
					label: '内容多图',
					application: ['编辑', '添加'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "bannerImg_e",
					label: '内容多图(英)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "bannerImg_f",
					label: '内容多图(繁)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "content",
					label: '内容',
					application: ['编辑', '添加'],
					type: 'vueEditor',
				},
				{
					key: "content_e",
					label: '内容(英)',
					application: ['添加', '编辑'],
					type: 'vueEditorone'
				},
				{
					key: "content_f",
					label: '内容(繁)',
					application: ['添加', '编辑'],
					type: 'vueEditortwo'
				},
				{
					key: 'listorder',
					label: '自定义排序',
					application: ['编辑', '添加'],
					type: 'input',
					listType: 'normal'
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
								content:'',
								mainImg: [],
								mainImg_e:[],
								mainImg_f:[],
								bannerImg: [],
								bannerImg_e:[],
								bannerImg_f:[],
							};
							return data
						},
						postData: function(data, self) {
							data.type = 1;
							data.menu_id = 158;
							var postData = {
								data: data
							};
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
				type: 1,
				menu_id: 158
			},
			optionData: {
				labelOptions: []
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
			// this.initMenuData()
		},



		async initMenuData() {
			const self = this;
			const postData = {};
			postData.searchItem = {
				type: ['=', 1],
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
				self.optionData.labelOptions = res.info.data;
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
			var res = await self.$$api_article_get({
				data: postData
			});
			self.mainData = res.info.data;
			self.paginate.count = res.info.total;

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
