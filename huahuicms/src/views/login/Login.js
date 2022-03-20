/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
  name: 'login',
  data () {
    return {
      winSize: {
        width: '',
        height: ''
      },

      formOffset: {
        position: 'absolute',
        left: '',
        top: ''
      },

      remumber: this.$store.state.user.remumber,

      register: false,

      login_actions: {
        disabled: false
      },

      data: {
        login_name: '',
        password: ''
      },

      rule_data: {
        login_name: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'))
            } else {
              callback()
              /*if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
                callback()
              } else {
                callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'))
              }*/
            }
          },
          trigger: 'blur'
        }],
        password: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
                callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'))
              } else {
                if (this.register === true) {
                  if (this.data.repassword !== '') {
                    this.$refs.data.validateField('repassword')
                  }
                }
                callback()
              }
            }
          },
          trigger: 'blur'
        }],
        repassword: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.data.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    setSize () {
      this.winSize.width = this.$$lib_$(window).width() + 'px'
      this.winSize.height = this.$$lib_$(window).height() + 'px'
      this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px'
      this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px'
    },

    async onLogin (ref, type) {

      
      if (type && this.register === true) {
        this.$message.error('请输入确认密码');
        return;
      };
      this.$refs[ref].validate(async (valid) => {
        if (valid) {
          this.login_actions.disabled = true;
          console.log(this[ref]);
          var res =  await this.$$api_user_login({
            data: this[ref]});
          if(res&&this.$$sCallBack(res)){
            
            console.log(res.info.default_web_routers)
            if (this.remumber.remumber_flag === true) {
              this.$store.dispatch('update_remumber', {
                remumber_flag: this.remumber.remumber_flag,
                remumber_login_info: {
                  login_name: this[ref].login_name,
                  password: this[ref].password
                }
              });
            } else {
              this.$store.dispatch('remove_remumber');
            };
            this.$store.dispatch('update_userinfo', {
              userinfo:res.info,
              token:res.token
            }).then(() => {
              this.login_actions.disabled = false;
              //this.$router.push('/function')
              if (res.info.default_web_routers) {
                console.log('nb'+res.info.default_web_routers);
                //this.$router.push(res.info.default_web_routers)
              } else {

                var routes = this.$router.options.routes

                for (var i = 0; i < routes.length; i++) {
                  if (this.$store.state.user.userinfo.auth.indexOf(routes[i].id)>=0) {
                    this.$router.push(routes[i].path);
                    console.log(99809)
                    return;
                  };
                };
                this.$$notify('无权限','error');
                
              }
            });
          };
          this.login_actions.disabled = false;
        }
      })
    },

    onRegister (ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.login_actions.disabled = true
          this.$$api_user_register({
            data: this[ref],
            fn: data => {
              this.login_actions.disabled = false;
              this.$message.success('注册成功，请登录。');
              this.toggleStatus(false);
            },
            errFn: () => {
              this.login_actions.disabled = false
            },
            tokenFlag: true
          })
        }
      })
    },

    resetForm (ref) {
      this.$router.push('/function')
      //this.$refs[ref].resetFields()
    },

    toggleStatus (type) {
      this.register = type
      if (this.register === true) {
        this.$set(this.data, 'repassword', '')
      } else {
        this.$delete(this.data, 'repassword')
      }
    }

  },

  created () {

    this.setSize()
    this.$$lib_$(window).resize(() => {
      this.setSize()
    })

  },

  mounted () {

    // this.toggleStatus(true);
    // console.log(this.remumber);
    // 如果上次登录选择的是记住密码并登录成功，则会保存状态，用户名以及token
    if (this.remumber.remumber_flag === true) {
      this.data.login_name = this.remumber.remumber_login_info.login_name
      this.data.password = this.remumber.remumber_login_info.password
      this.$set(this.data)
    }

  }

}
