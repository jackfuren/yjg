<template>
  <div class="box">
    <div class="box-container">
      <div class="nav-top">
        <div class="nav">
          <img src="../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
          <!-- <van-icon @click="fh()" class="nav-left" color="#FFFFFF" name="arrow-left" size="0.5rem"/> -->
        </div>
        <p>评价成功</p>
        <p>感谢您的评价</p>
        <p @click="home()">返回首页</p>
        <p @click="dingdan">查看订单</p>
      </div>
      <tuijie></tuijie>
    </div>
  </div>
</template>

<script>
import tuijie from "../gongyongzujian/tuijian";

export default {
  name: "shouhuochenggong",
  data() {
    return {};
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push({
        name: "home"
      });
    },
    pingjia() {
      this.$router.push({
        name: "ddd",
        query: {
          id: 4
        }
      });
    },
    dingdan() {
      this.$router.push({
        name: "sqsh",
        query: {
          id: 794
        }
      });
    }
  },
  components: {
    tuijie
  }
};
</script>

<style scoped>
.nav-top {
  width: 100%;
  height: 4.63rem;
  background-image: url(../../assets/ccccc.png);
  background-repeat: no-repeat;
  background-size: cover;

  position: relative;
}

.nav {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  position: relative;
}

.nav p {
  font-size: 0.36rem;
  font-weight: 500;
}

.nav-left {
  width: 0.55rem;
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}

.box .box-container {
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f9f9f8;
}

.box .box-container::-webkit-scrollbar {
  display: none;
}

.nav-top p:nth-child(2) {
  font-size: 0.5rem;
  color: white;
  margin-top: 0.7rem;
}

.nav-top p:nth-child(3) {
  font-size: 0.24rem;
  color: white;
  margin-top: 0.2rem;
}

.nav-top p:nth-child(4) {
  width: 1.8rem;
  height: 0.6rem;
  font-size: 0.24rem;
  line-height: 0.6rem;
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 30px;
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
}

.nav-top p:nth-child(5) {
  width: 1.8rem;
  height: 0.6rem;
  font-size: 0.24rem;
  line-height: 0.6rem;
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 30px;
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
}
</style>
