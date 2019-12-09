<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/>
        <p>消息</p>
      </div>
       <div style="height: 0.88rem"></div>
     <dl class="xi" @click="xiaoxi()">
		 <dt>
			<img src="../../assets/xitong.png" alt="">
		 </dt>
		 <dd>
			 <p><span style="font-weight: bold;font-size: 0.29rem;">系统消息</span><span class="time">{{time}}</span></p>
			 <p style="width: 4.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{dataList.title}}</p>
			 <p></p>
		 </dd>
	 </dl>
	 <div style="width: 100%;height: 0.4rem;background: #F9F9F8;"></div>
	 <dl class="xi" v-for="(item,index) in resList" @click="xi(index)">
	 		<dt>
				<p><img :src=item.shoplogo alt=""></p>
	 		</dt>
	 		<dd>
	 			<p><span style="font-weight: bold;font-size: 0.29rem;">{{item.name}}</span><span class="time">{{item.add_time}}</span></p>
	 			<p style="width: 4.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.msg}}</p>
	 			<p v-show="item.no_read!=0"></p>
	 		</dd>
	 </dl>

    </div>
  </div>
</template>

<script>
  import  request from '../utils/request'
    export default {
        name: "news",
      data(){
          return{
           dataList:[],
		   resList:[],
		   timelist:[],
            token:'',
            id:'',
			time:''
          }
      },
      methods:{
          fh(){
            if (this.token == 1){
              this.$router.push({
                name:"mar"
              })
            } else if (this.token == 2){
              this.$router.push({
                name:"wpxq",
                query:{
                  goods_id:this.id,
                  token:this.token
                }
              })
            } else {
              this.$router.push({
                name:"My"
              })
            }
          },
		  xiaoxi(){
			  this.$router.push({
			    name:"xiaoxi"
			  })
		  },
		  xi(index){
			  this.$router.push({
			    name: "kf",
			    query: {
			      sid: this.resList[index].id,
				  token:90,
				  name: this.resList[index].name
			    }
			  });
		  }
      },
      mounted() {
        request({
          url: "api/information/index", //系统消息的接口 
          data:{ 
            user_id:this.$store.state.username.id 
          },
          method: "post"
        }).then(res => {
			console.log(res)
          if (res.data.code == 200){
            this.dataList = res.data.data[0]
			this.time = res.data.data[0].add_time
			//今天
			var day2=new Date()
			day2.setTime(day2.getTime());
			var ri=day2.getDate()
			if(ri<10){
				ri="0"+ri
			}else{
				ri=ri
			}
			var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + ri;
			//昨天
			var day1 = new Date();
			day1.setTime(day1.getTime()-24*60*60*1000);
			var riq=day1.getDate()
			if(riq<10){
				riq="0"+ri
			}else{
				riq=riq
			}
			var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + riq;
			if(this.time.substring(0,10)===s2){
				this.time="今天"+this.time.substring(10)
			}else if(this.time.substring(0,10)===s1){
				this.time="昨天"+this.time.substring(10)
			}else{
				this.time=this.time.substring(5)
			}
          }
        })
		request({
		  url: "api/char/user_log",//商家消息的接口
		  data:{
		    userid:this.$store.state.username.id
		  },
		  method: "post"
		}).then(res => {
			console.log(res)
		  if (res.data.code == 200){
		    this.resList = res.data.data
		  }
		})
        this.token =this.$route.query.token
        this.id =this.$route.query.id
      }
    }
</script>

<style lang="less"  scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
  }

  .box .box-container {
    position: relative;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
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
    position: fixed;
    border-bottom: 1px solid #F7F7F7;
    top: 0rem;
    z-index: 8888;
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
  }
  .hint{
    margin-top: 4rem;
    font-size: 0.28rem;
    position: relative;
    top: 0.88rem;
  }
  .hint img{
    width: 3.4rem;
    height: 2rem;

  }
  .concat{
    width: 6.9rem;
    border-bottom: 1px solid #EEEEEE;
    margin:  0rem auto;
  }
  .concat p{
    font-size: 0.3rem;
    color: #333333;
    text-align: left;
    height: 0.7rem;
    line-height: 0.7rem;
  }
  .concat p:nth-child(2){
    font-size: 0.24rem;
    color:#777777;
    text-align: left;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .concat p:nth-child(3){
    font-size: 0.24rem;
    color:#333333;
    text-align: right;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .xi{
	  font-size: 0.25rem;
	  display: flex;
	  text-align: left;
	  margin-top: 0.15rem;
  }
  .xi dt{
	  flex: 1;
	  margin-right: 0.15rem;
  }
  .xi dt img{
	  width: 100%;
	  padding: 0.1rem;
  }
  .xi dd{
	  flex: 4;
	  padding: 0.27rem 0.15rem 0rem 0.15rem;
	  position: relative;
  }
  .xi dd p{
	  margin-bottom: 0.25rem;
  }
  .xi dd>p:last-child{
	  width: 0.1rem;
	  height: 0.1rem;
	  border-radius: 50%;
	  background: red;
	  position: absolute;
	  right: 0.2rem;
	  // position: relative;
	  top: 1.1rem;
  }
  .time{
	  position: absolute;
	  right: 0.1rem;
  }
</style>
