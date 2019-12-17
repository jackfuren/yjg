<template>
  <div  class="box">
    <div class="box-container">
      <div id="n" ></div>
      <div class="nav" @click="fh()">
		  <img src="../../../assets/img/fan.png" @click="fh()" class="nav-left" alt="">
        <p >品牌详情</p>     
      </div>
    </div>
	<div class="juli" v-if="dianpu.length!=0?true:false">
		<p @click="juli()" style="padding: 0.2rem;">距离最近店铺<span><van-icon size="0.3rem"  name="arrow" /></span></p>
		<dl class="pu" v-for="(item,index) in dianpu" :key="index">
			<dt><img :src="item.shoplogo" alt=""></dt>
			<dd>
				<p>{{item.name}}</p>
				<p>{{item.address}}<span>{{item.distance}}</span></p>
			</dd>
		</dl>
	</div>
	<div style="width: 100%;height: 0.3rem;"></div>
	<div>
		<van-tabs v-model="active">
		  <van-tab title="活动">
		    <div class="nav-tj-bottom">
				<div class="nav-tj-bottom-div" @click="xq(item.id)" v-for="(item,index) in huo" :key="index">
				  <div class="nav-tj-bottom-div-div-img">
				    <img alt="" class="nav-tj-bottom-div-img" :src="item.headimg">
				  </div>
				  <p class="nav-tj-bottom-div-p">{{item.title}}</p>
				  <p class="nav-tj-bottom-div-pp">{{item.zk_price}}折</p>
				  <p class="nav-tj-bottom-div-ppp"><span>￥</span><span>{{item.zk_price}}</span> <s>￥{{item.price}}</s><img src="../../../assets/tab_gouwuche_press.png" alt=""></p>
				</div>
			</div>
		  </van-tab>
		  <van-tab title="最新">
		    <div class="nav-tj-bottom">
		    	<div class="nav-tj-bottom-div" v-for="(item,index) in xin" :key="index">
		    	  <div class="nav-tj-bottom-div-div-img">
		    	    <img alt="" class="nav-tj-bottom-div-img" :src="item.headimg">
		    	  </div>
		    	  <p class="nav-tj-bottom-div-p">{{item.title}}</p>
		    	  <p class="nav-tj-bottom-div-pp">{{item.zk_price}}折</p>
		    	  <p class="nav-tj-bottom-div-ppp"><span>￥</span><span>{{item.zk_price}}</span> <s>￥{{item.price}}</s><img src="../../../assets/tab_gouwuche_press.png" alt=""></p>
		    	</div>
		    </div>
		  </van-tab>
		  <van-tab title="全部">
		    <div class="nav-tj-bottom">
		    	<div class="nav-tj-bottom-div" v-for="(item,index) in quan" :key="index">
		    	  <div class="nav-tj-bottom-div-div-img">
		    	    <img alt="" class="nav-tj-bottom-div-img" :src="item.headimg">
		    	  </div>
		    	  <p class="nav-tj-bottom-div-p">{{item.title}}</p>
		    	  <p class="nav-tj-bottom-div-pp">{{item.zk_price}}折</p>
		    	  <p class="nav-tj-bottom-div-ppp"><span>￥</span><span>{{item.zk_price}}</span> <s>￥{{item.price}}</s><img src="../../../assets/tab_gouwuche_press.png" alt=""></p>
		    	</div>
		    </div>
		  </van-tab>
		</van-tabs>
	</div>
  </div>
</template>
<script>
	import { Tab, Tabs } from "vant";
  export default {
    name: "pinpaixq",
    data() {
      return {
		  token:this.$route.query.token,
		  id:this.$route.query.pinpai,
		  active: 0,
		  dianpu:[],
		  huo:[],
		  xin:[],
		  quan:[],
		  page:1,
		  rows:10
      }
    },
    methods: {
      fh() {
		  console.log(this.token)
		  if(this.token==112){
			  this.$router.push({
			    name: 'reimai',
			  })
		  }else if(this.token==122){
			  this.$router.push({
			    name: 'com',
			  })
		  }
      },
	  xq(i){
		  this.$router.push({
		    name: 'wpxq',
		    query:{
		      goods_id:i,
			  brandid: this.id,
		      token:this.token
		    }
		  
		  })
	  },
	  pinpaixq(){
		this.request({
		  url: "api/brand/brandshoplist",
		  method: "post",
		  data: {
		    brandid: this.$route.query.pinpai,
			lat:window.sessionStorage.getItem('lat'),
			lng:window.sessionStorage.getItem('lng'),
			p: this.page,
			rows:this.rows,
		  }
		}).then(res => {
		  console.log(res)
		  for(var i in res.data.data){
		  		if(i<4){
		  			this.dianpu.push(res.data.data[i])
				}
		  }
		  console.log(this.dianpu)
		})  
	  },
	  shang(){
		  this.request({
		    url: "api/brand/brandgoods",
		    method: "post",
		    data: {
		      brandid: this.$route.query.pinpai,
		  	  lat:window.sessionStorage.getItem('lat'),
		  	  lng:window.sessionStorage.getItem('lng'),
		  	  p: this.page,
			  type:1,
		  	  rows:this.rows,
		    }
		  }).then(res => {
			this.huo=res.data.data
			console.log(this.huo)
		  })  
		  this.request({
		    url: "api/brand/brandgoods",
		    method: "post",
		    data: {
		      brandid: this.$route.query.pinpai,
		  	lat:window.sessionStorage.getItem('lat'),
		  	lng:window.sessionStorage.getItem('lng'),
		  	p: this.page,
		  	type:2,
		  	rows:this.rows,
		    }
		  }).then(res => {
		  			this.xin=res.data.data
		  })  
		  this.request({
		    url: "api/brand/brandgoods",
		    method: "post",
		    data: {
		      brandid: this.$route.query.pinpai,
		  	lat:window.sessionStorage.getItem('lat'),
		  	lng:window.sessionStorage.getItem('lng'),
		  	p: this.page,
		  	type:3,
		  	rows:this.rows,
		    }
		  }).then(res => {
		  		this.quan=res.data.data
		  })  
	  },
	  juli(){
		  this.$router.push({
		    name: 'fujin',
			query:{
				brandid: this.id,
				token:this.token
			}
		  })
	  }
    },
    mounted() {
		this.pinpaixq()
		this.shang()
    },
  }
</script>

<style scoped lang="less">
  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F7F7F7;
  }
.van-icon{
	color: #CCCCCC;
	float: right;
	position: relative;
	top: 0.02rem
}
  .box .box-container {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .box .box-container::-webkit-scrollbar {
    display: none;
  }

  .nav {
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    position: relative;
    background: white;
  }
.nav-left {
    position: absolute;
    left: 0.25rem;
    top: 0.1rem;
	width: 0.55rem;
    clear: both;
    z-index: 999999;
  }
  .nav p {
    font-size: 0.36rem;
    font-weight: 500;
    color: black;
    position: relative;
  }
  .juli{
	  text-align: left;
	  width: 100%;
	  font-size: 0.25rem;
  }
  .pu{
	  padding: 0.2rem;
	  background: #fff;
	  display: flex;
	  position: relative;
  }
  .pu dt{
	  flex: 1;
  }
  .pu dt img{
	  width: 80%;
  }
  .pu dd{
  	  flex: 4;
  }
  .pu dd p:first-child{
	  font-size: 0.3rem;
	  margin-bottom: 0.3rem;
  }
  .pu dd p:nth-child(2){
  	  color: #CCCCCC;
  }
  .pu dd p:nth-child(2) span{
  	  position: absolute;
	  right: 0.5rem;
  }
  .dianpu{
	  width: 100%;
  }
  .nav-tj-bottom {
    display: flex;
    width: 7.5rem;
    height: 100%;
    justify-content: left;
    flex-wrap: wrap;
  }
  .nav-tj-bottom-div {
    width: 3.5rem;
    height: 5.56rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
    border-radius: 10px;
    margin: 0.2rem 0.125rem;
    position: relative;
  }
  
  .nav-tj-bottom-div-div-img {
    width: 3.5rem;
    height: 3.5rem;
    display: table-cell;
    vertical-align: middle;
    position: relative;
  }
  
  .nav-tj-bottom-div-img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
  }
  
  .nav-tj-bottom-div-p {
    line-height: 0.35rem;
    text-align: left;
  
    width: 3rem;
    margin: 0 auto;
    font-size: 0.26rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  
  .nav-tj-bottom-div-pp {
	padding: 0.05rem 0.1rem;
    height: 0.32rem;
    background: #E4ECFF;
    color: #4D82FF;
    font-size: 0.22rem;
    margin-top: 0.2rem;
    margin-left: 0.28rem;
    position: absolute;
  }
  
  .nav-tj-bottom-div-ppp {
    margin-left: 0.28rem;
    height: 0.3rem;
    margin-top: 0.45rem;
    line-height: 0.3rem;
    position: absolute;
    bottom: 0.2rem;
  }
  
  .nav-tj-bottom-div-ppp span:nth-child(1) {
    font-size: 0.22rem;
    color: #EF0600;
    float: left;
    position: relative;
    bottom: -0.05rem;
  }
  
  .nav-tj-bottom-div-ppp span:nth-child(2) {
    font-size: 0.32rem;
    color: #EF0600;
    float: left;
  }
  
  .nav-tj-bottom-div-ppp s {
    font-size: 0.24rem;
    color: #CCCCCC;
  }
  .nav-tj-bottom-div-ppp>img {
    position: absolute;
	left: 2.5rem;
	// top: 0.05rem;
  }
</style>
