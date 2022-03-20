export default {
    name: 'picManage',
    components: {},
    data() {
      return {
        currentDate: new Date(),
        mainData:[],
        paginate: {
          count: 0,
          currentPage: 1,
          pagesize:18,
          is_page:true,
          page_sizes: [10, 30, 60, 90],
          layout: 'total, sizes, prev, pager, next, jumper',
        },
        getBefore:{}
      };
    },
    mounted () {
      this.init()
    },
    methods:{
      async delImg(e){
        console.log(e);
        const self = this;
        const postData  = {};
        var id = e.target.dataset.id;
        postData.searchItem = {
          id:id,
        };
        var res = await self.$$api_system_delImg({data: postData});
        if (res.solely_code==100000) {
          self.getMainData();
        }
      },

      async init(){
        const self = this;
        self.getMainData();
      },

      async getMainData(){
        const self = this;
        const postData  = {};
        
        postData.paginate = self.$$cloneForm(self.paginate);        
        postData.token = self.$store.getters.getToken; 
        if (self.searchItem) {
          postData.searchItem = self.$$cloneForm(self.searchItem)
        };
        if(JSON.stringify(self.getBefore) != "{}"){
          postData.getBefore = self.$$cloneForm(self.getBefore);
        };
        postData.order ={
          create_time:'desc'
        };
        
        var res = await self.$$api_file_get({data: postData});
        self.mainData = res.info.data;
        self.paginate.count = res.info.total;
      },
      handleSizeChange(val) {
        const self = this;
        self.paginate.pagesize = val;
        self.getMainData();

      },
      handleCurrentChange(val) {
        const self = this;
        self.paginate.currentPage = val;
        self.getMainData();
      }

    }
}