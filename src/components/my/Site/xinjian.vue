<template>
  <div class="box">
    <div class="nav">
		<img src="../../../assets/img/fan.png" @click="fh()" class="nav-left" alt="">
      <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/> -->
      <p>新建收货地址</p>
    </div>
	<div class="navm">
		<div class="name"><p>收货人</p><input type="text" placeholder="请填写收货人姓名" v-model="name"></div>
		<div class="name"><p>手机号码</p><input type="text" placeholder="请填写收货人手机号" v-model="tel"></div>
		<div class="name"><p>所在区域</p><input @click="sho=0" type="text" placeholder="请选择所在区域" v-model="dizhi"></div>
		<div class="name"><p>详细地址</p><input type="text" placeholder="请填写详细地址,街道楼牌号等" v-model="addressDetail"></div>
		<van-area v-show="sho==0?true:false" :area-list="areaList" @cancel="sho=1" @confirm="confirm"/>
	</div>
	<div style="text-align: left;margin-top: 0.5rem;">
		<van-cell-group>
		  <van-switch-cell @change="change" v-model="checked" title="设为默认" />
		</van-cell-group>
	</div>
	<!-- <button style="background: #CCCCCC;" v-if="po==1?true:false">保存</button> v-if="po==0?true:false"-->
	<button @click="bao()" style="background: #F1150F;">保存</button>
  </div>
</template>

<script>
  import areaList from '../../../../config/area';
  import  request from "../../utils/request";
  import Vue from 'vue'
  import { Area } from 'vant';
  Vue.use(Area);
  import { SwitchCell } from 'vant';
  Vue.use(SwitchCell);
  import { Toast } from 'vant';
  Vue.use(Toast);
  export default {
    name: "xinjianshou",
    data() {
      return {
        areaList,
		checked: false,//默认地址
        searchResult: [],
        user_id:"",//用户编号
        name:"",//姓名
		province:"",//省
		city:"",//市
		county:"",//区
        tel:"",//手机号
		dizhi:'',//所在区域
        addressDetail:"", //详细地址
		sho:1,//区域列表的显示隐藏
      }
    },
    methods: {
      fh() {
        this.$router.push({
          name: 'sho',
        })
      },
	  confirm(e){
		 console.log(e) 
		 this.dizhi=e[0].name+e[1].name+e[2].name
		 this.province=e[0].name
		 this.city=e[1].name
		 this.county=e[2].name
		 this.sho=1
	  },
	  change(e){
		  console.log(e)
		  this.checked=e
	  },
	  bao(){
			let tel = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
			if(tel.test(this.tel)){
				request({
				  url: "api/users/addaddr",
				  method: "post",
				  data: {
				    user_id:this.user_id,
				    consignee:this.name,
				    phone:this.tel,
				    province:this.province,
				    city:this.city,
				    area:this.county,
				    address:this.addressDetail,
				    is_default:this.checked
				  }
				}).then(res => {
				  console.log(res)
				  if (res.data.code == 200){
				    Toast('保存成功')
				    this.timer = setTimeout(()=>{   //设置延迟执行
				      this.$router.push({
				        name: "sho"
				      })
				    },1000);
				  }
				})
			}else{
				Toast('手机号格式不正确');
				this.tel = ''
			}
		  
	  }
    },
    mounted() {
      this.user_id = this.$store.getters.userName.id
    }

  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
  }

  .nav {
    width: 100%;
    height: 0.88rem;
    background: #FFFFFF;
    line-height: 0.88rem;
    text-align: center;
    position: relative;
  }

  .nav p {
    font-size: 0.36rem;

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.2rem;
	width: 0.55rem;
  }
  .van-area{
	  width: 100%;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
  }
  .navm{
	  text-align: left;
	  font-size: 0.3rem;
	  background: #fff;
	  padding: 0.2rem 0.2rem 0.1rem 0.3rem;
  }
  .navm input{
	  background:none;  
	  outline:none;  
	  border:none;
  }
  .name{
	  display: flex;
	  border-bottom: 2px #F7F7F7;
	  padding-top: 0.2rem;
	  padding-bottom: 0.4rem;
  }
  .name p {
	  flex: 1;
  }
  .name input{
	  flex: 4;
  }
  button{
	  width: 80%;
	  border: 0;
	  font-size: 0.3rem;
	  
	  border-radius: 0.2rem;
	  color: #fff;
	  height: 1rem;
	  position: absolute;
	  bottom: 1rem;
	  left: 10%;
  }
</style>
