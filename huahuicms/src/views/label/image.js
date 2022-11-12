export default {
	name: 'image',
	components: {},
	data() {
		return {
			mainData: [],
			self: this,
			searchForm: {
				status: '1'
			},
			fields: [{
					key: 'id',
					label: '类别ID',
					application: [],
					type: 'input',
				},
				{
					key: "title",
					label: '名称',
					application: ['添加', '编辑'],
					type: 'input'
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
				{
					key: "description",
					label: '描述',
					application: ['添加', '编辑'],
					type: 'input'
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
				{
					key: "url",
					label: '跳转链接',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "listorder",
					label: '排序',
					application: ['添加', '编辑'],
					type: 'input'
				},
				{
					key: "parentid",
					label: '父级ID',
					application: ['添加', '编辑'],
					type: 'cascader',
					options: 'labelOptions',
				},
				{
					key: "mainImg",
					label: '图标',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 10,
				},
				{
					key: "mainImg_e",
					label: '图标(英)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "mainImg_f",
					label: '图标(繁)',
					application: ['添加', '编辑'],
					type: 'qiupload',
					limit: 1,
				},
				{
					key: "status",
					label: '状态',
					application: [],
					type: 'select',
					options: [{
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
					value: '',
					placeholder: '请选择状态',
					header_search: true,
					header_search_type: 'select',
					header_search_style: 'width:160px;margin-right:2px;',
					changeFunc: function(value, self) {
						if (value) {
							self.searchItem.status = value;
						} else {
							delete self.searchItem.status;
						};
						self.initMainData();
					},
				},
				{
					key: 'create_time',
					label: '创建时间'
				},
			],

			// 需要给分页组件传的信息
			pagination: {
				current_page: 1,
				total: 0,
				page_sizes: [3, 9, 12, 24],
				layout: 'total, sizes, prev, pager, next, jumper',
				pagesize: 10,
				is_page: true,
			},

			// 按钮配置
			btn_info: [

				{
					type: 'info',
					icon: 'edit',
					size: 'mini',
					position: 'footer',
					text: function(data, self) {
						return '添加'
					},
					func: {
						apiName: function(data) {
							return "api_label_add"
						},
						formData: function(data, self) {
							self.resetChecked();
							var data = {
								title: '',
								mainImg: [],
								description: '',
							};
							return data;
						},
						postData: function(data, self) {
							var postData = {
								data: data
							};
							postData.data.type = 3;
							return postData;
						}
					},
				},
				{
					type: 'info',
					icon: 'edit',
					size: 'mini',
					position: 'footer',
					text: function(data, self) {
						console.log(data);
						return '编辑'
					},
					func: {
						apiName: function(data) {
							return "api_label_update"
						},
						formData: function(data, self, func) {
							var res = self.getCheckedNodes();
							if (res) {
								var data = {
									parentid: res.parentid,
									title: res.title,
									title_f: res.title_f,
									title_e: res.title_e,
									mainImg: res.mainImg,
									mainImg_f: res.mainImg_f,
									mainImg_e: res.mainImg_e,
									description: res.description,
									description_f: res.description_f,
									description_e: res.description_e,
									listorder: res.listorder,
									url: res.url,
									status: res.status
								};
							} else {
								return {
									error: '请选择一个菜单'
								}
							};
							return data || {};
						},
						postData: function(data, self) {
							var res = self.getCheckedNodes();
							if (res.id == data.parentid) {
								return false;
							};
							if (res) {
								var postData = {
									searchItem: {
										id: res.id
									},
									data: data
								};
							} else {
								var postData = {}
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
							return "api_label_update"
						},
						postData: function(data, self, func) {
							if (self.$refs.tree.getCheckedNodes().length > 0) {
								var deleteArray = [];
								for (var i = self.$refs.tree.getCheckedNodes().length - 1; i >= 0; i--) {
									if (self.$refs.tree.getCheckedNodes()[i].type == 7) {
										func.notify('不可删除', 'warning');
										return;
									}
									deleteArray.push(self.$refs.tree.getCheckedNodes()[i].id)
								};
							} else {
								func.notify('请选择选项', 'warning');
								return;
							};
							var postData = {
								searchItem: {
									id: ['in', deleteArray],
								},
								data: {
									status: -1,
								}
							};
							return postData;
						}
					},
				}
			],


			search_data: {
				fields: [{
					key: 'title',
					label: '标题'
				}],
				default_value: {
					title: ''
				}
			},

			paginate: {
				count: 0,
				currentPage: 1,
				pagesize: 10,
				is_page: true,
				page_sizes: [10, 30, 60, 90],
				layout: 'total, sizes, prev, pager, next, jumper',
			},
			searchItem: {
				type: 3
			},
			optionData: {
				labelOptions: []
			},
			defaultProps: {
				children: 'child',
				label: 'title',
				value: 'id',
			},
			otherData: {
				deleteApiName: 'api_label_update',
			}


		}

	},
	methods: {

		test() {
			this.$router.push('/function')
		},


		filtersChange(params) {
			const self = this;
			console.log(params);
			for (var key in params) {
				self.searchItem[key] = params[key][0]
			}
			self.initMainData();
		},

		pageChange(val) {
			console.log(val);
			const self = this;
			self.paginate[val[0]] = val[1];
			self.initMainData();
		},

		async initMainData() {
			const self = this;
			const postData = {};

			postData.searchItem = self.$$cloneForm(self.searchItem);
			postData.token = self.$store.getters.getToken;
			postData.order = {
				listorder: 'asc'
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
				self.mainData = res.info.data;
				self.optionData.labelOptions = res.info.data;
			};
		},


		async onSubmit(data) {
			console.log(data)
		},

		/**
		 * 点击删除按钮
		 */
		onClickBtnDelete(opts) {
			this.$confirm('删除后不可恢复', '确认删除？').then(() => {
				this.$$api_article_deleteArticle({
					data: {
						id: opts.data.id
					},
					fn: data => {
						this.onGetList()
					}
				})
			})
		},


		onClickBtn(val) {
			console.log(val)
		},

		/**
		 * 添加文章
		 */
		onClickBtnAdd() {
			this.$router.push('/adv/article/edit')
		},

		onClickBtnSelect(opts) {
			console.log(opts)
			this.$message('查看自己处理吧')
		},

		/**
		 * 修改按钮
		 * @param opts
		 */
		onClickBtnUpdate(opts) {
			this.$router.push({
				path: '/adv/article/edit',
				query: {
					id: opts.data.id
				}
			})
		},

		/**
		 * 改变页码事件
		 * @param current_page    当前页码
		 */
		onChangeCurPage(currentPage) {
			var path = this.$route.path
			var query = Object.assign({}, this.$route.query)
			query.current_page = currentPage
			this.$router.push({
				path,
				query
			})
		},

		/**
		 * 改变每页显示数量事件
		 * @param page_size    每页显示的数量
		 */
		onChangePageSize(pageSize) {
			var path = this.$route.path
			var query = Object.assign({}, this.$route.query)
			query.page_size = pageSize
			this.$router.push({
				path,
				query
			})
		},

		/**
		 * 更新参数
		 */
		onUpdateParams() {
			if (this.$route.query.current_page) {
				this.paginations.current_page = parseInt(this.$route.query.current_page)
			}
			if (this.$route.query.page_size) {
				this.paginations.page_size = parseInt(this.$route.query.page_size)
			}

			this.search_data.default_value.title = this.$route.query.title
		},

		/**
		 * 搜索事件
		 * @param data    表单数据
		 * @param info    其他有用的数据
		 */
		onSearch({
			data,
			info
		}) {
			console.log(data)
			console.log(info)

			var path = this.$route.path
			var query = Object.assign({}, this.$route.query, data)

			this.$router.push({
				path,
				query
			})
		},

		// 批量选择改变CheckBox事件
		onSelectionChange({
			ids,
			datas
		}) {
			// console.log(ids);
			// console.log(datas);
		},

		/**
		 * 批量删除
		 * @param ids 选中的ids
		 * @param datas  选中的数据集合
		 */
		onClickBtnBatchDelete({
			ids,
			datas
		}) {
			this.$confirm('删除的数据：' + ids.join(','), '确认删除？').then(() => {
				this.$$api_article_deleteArticle({
					data: {
						id: ids.join(',')
					},
					fn: data => {
						this.onGetList()
					}
				})
			})
		},

		/**
		 * 初始化
		 */
		init() {
			console.log('init')
			this.onUpdateParams()
			this.initMainData()
			//this.initMenuData()
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
	}

}
