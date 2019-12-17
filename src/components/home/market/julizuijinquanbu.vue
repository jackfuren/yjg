<template>
  <div  class="box">
    <div class="box-container">
      <div id="n" ></div>
      <div class="nav" @click="fh()">
		  <img src="../../../assets/img/fan.png" @click="fh()" class="nav-left" alt="">
        <p>附近店铺</p>     
      </div>
    </div>
	<div class="juli">
		<dl class="pu" v-for="(item,index) in puu" :key="index">
			<dt><img :src="item.shoplogo" alt=""></dt>
			<dd>
				<p>{{item.name}}</p>
				<p>{{item.address}}<span>{{item.distance}}</span></p>
			</dd>
		</dl>
	</div>
  </div>
</template>
<script>
	import { Tab, Tabs } from "vant";
  export default {
    name: "pinpaixq",
    data() {
      return {
		  id:this.$route.query.brandid,
		  token:this.$route.query.token,
		  page:1,
		  rows:10,
		  puu:[]
      }
    },
    methods: {
      fh() {
		  console.log(this.token)
			  this.$router.push({
			    name: 'pinpaixq',
				query:{
					brandid: this.id,
					token:this.token
				}
			  })
      },
	  pu(){
		  this.request({
		    url: "api/brand/brandshoplist",
		    method: "post",
		    data: {
		      brandid: this.$route.query.brandid,
		  	lat:window.sessionStorage.getItem('lat'),
		  	lng:window.sessionStorage.getItem('lng'),
		  	p: this.page,
		  	rows:this.rows,
		    }
		  }).then(res => {
		    console.log(res)
		    this.puu=res.data.data
		  })  
	  }
    },
    mounted() {
		this.pu()
     console.log(this.$route.query.brandid)
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
</style>
