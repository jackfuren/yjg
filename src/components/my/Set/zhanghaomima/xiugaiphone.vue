<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
		  <img src="../../../../assets/img/fan.png" @click="fh()" class="nav-left" alt="">
        <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/> -->
        <p>修改手机号</p>
      </div>
      <div class="concat">
        <div class="concat-div">
        <div class="concat-div-div"></div>
         <p>已绑定手机号{{phone}}</p>
        </div>
        <div class="input">
          <input  type="number" v-model="valuee"  placeholder="短信验证码">
          <p @click="fasong()">{{value}}</p>
        </div>
        <p  v-show="one"  class="footer">下一步</p>
        <p  @click="next()"  v-show="two"  class="footerr">下一步</p>
      </div>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import { Toast } from 'vant';
	Vue.use(Toast);
  import  request from  "../../../utils/request"
  export default {
    name: "xiugaiphone",
    data() {
      return {
        valuee:[],
        one:true,
        two:false,
        phone:"" ,//手机号
        value:"发送",
        time: 0,
        disabled: false,
        user_id:""
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: "zh"

        })
      },
      dataNumber(){
        if (this.valuee.length == 4){
          this.one =false
          this.two =true
        } else {
          this.one =true
          this.two =false
        }
      },
      next(){

        request({
          url: "api/users/upd_mobile1",
          method: "post",
          data: {
            id:this.user_id,
            mobile: this.phone,
            code:this.valuee
          }
        }).then(res => {
         if (res.data.code == 200){
           this.$router.push({
             name: "xgpt"
           })
         }
          if (res.data.code == 0){
           Toast("验证码错误")
          }
        })

      },
      fasong() {
          this.time = 60;
          this.disabled = true;
          this.timer();
          request({
            url: "api/users/sendsms",
            method: "post",
            data: {
              mobile: this.phone,
            }
          }).then(res => {
            //console.log(res)
          })


      },
      timer() {
        if (this.time > 0) {
          this.time--;
          this.value = this.time + "s"
          //+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.value = "重发";
          this.disabled = false;
        }
      },
    },
    updated() {
     this.dataNumber()
    },
    mounted() {
       this.phone = this.$store.state.username.mobile
      this.user_id =this.$store.state.username.id
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F7F7F7;
  }

  .box .box-container {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background: white;
  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #F7F7F7;
  }

  .nav p {
    font-size: 0.36rem;

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
	  width: 0.55rem;
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
  }

  .concat {
    width: 6.9rem;
    margin: 0 auto;
  }
  .concat-div{
    height: 1.9rem;
    line-height: 1.9rem;
    font-size: 0.3rem;
    text-align: left;
    text-indent: 0.3rem;
    position: relative;
  }
  .concat-div-div{
    width:0.06rem;
    height:0.06rem;
    background:rgba(51,51,51,1);
    border-radius:50%;
    position: absolute;
    top: 50%;
    margin-top: -0.03rem;
    left: 0.15rem;
  }
  .input{
    width: 6.9rem;
    height: 1rem;
    border-bottom: 1px solid #E7E7E7;
    text-align: left;
    clear: both;
  }
  .input input{
    width: 3.85rem;
    height: 1rem;
    border: 0;
     font-size: 0.3rem;
    color: #DDDDDD;
  }
  .input p{
    float: right;
    width: 1.3rem;
    display: inline-block;
    text-align: center;
    font-size: 0.28rem;
    color: #EF0600;
    border-left: 1px solid #E7E7E7;
    /* text-indent: 0.2rem; */
     margin-top: 0.3rem;
  }
  .footer{
    width: 6.9rem;
    height: 1rem;
    border-radius: 50px;
    margin:  0.9rem auto;
    background: #DDDDDD;
    color: white;
    font-size: 0.36rem;
    line-height: 1rem;
  }
  .footerr{
     width: 6.9rem;
     height: 1rem;
     border-radius: 50px;
     margin:  0.9rem auto;
     background: #EF0600;
     color: white;
     font-size: 0.36rem;
     line-height: 1rem;
   }
</style>
