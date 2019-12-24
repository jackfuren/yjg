<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>帮助中心</p>
    </div>
    <div class="concat">
      <p @click="dingdan">
        订单查询
        <van-icon
          size="0.3rem"
          style="float: right;position: relative;top: 0.35rem;color:#CCCCCC;"
          name="arrow"
        />
      </p>
      <p @click="peisong">
        配送服务
        <van-icon
          size="0.3rem"
          style="color:#CCCCCC;float: right;position: relative;top: 0.35rem"
          name="arrow"
        />
      </p>
      <p @click="shijian">
        发货时间
        <van-icon size="0.3rem" style="float: right;position: relative;top: 0.35rem" name="arrow" />
      </p>
      <p @click="tuihuo">
        如何退货
        <van-icon size="0.3rem" style="float: right;position: relative;top: 0.35rem" name="arrow" />
      </p>
      <p @click="wenti">
        问题商品
        <van-icon size="0.3rem" style="float: right;position: relative;top: 0.35rem" name="arrow" />
      </p>
      <p @click="shangpinH">
        商品错发/漏发
        <van-icon size="0.3rem" style="float: right;position: relative;top: 0.35rem" name="arrow" />
      </p>
      <p @click="jiahuo">
        假货投诉
        <van-icon size="0.3rem" style="float: right;position: relative;top: 0.35rem" name="arrow" />
      </p>
    </div>
    <p class="box-p" @click="kefu">联系客服</p>
  </div>
</template>






<script>
export default {
  name: "Helpp",
  data() {
    return {};
  },
  methods: {
    fh() {
      this.$router.push({
        name: "My"
      });
    },
    dingdan() {
      this.$router.push({
        name: "dingdan"
      });
    },
    peisong() {
      console.log("aaaaaaaa");
      this.$router.push({
        name: "peisong"
      });
    },
    shijian() {
      this.$router.push({
        name: "shijian"
      });
    },
    tuihuo() {
      this.$router.push({
        name: "tuihuo"
      });
    },
    wenti() {
      this.$router.push({
        name: "wenti"
      });
    },
    shangpinH() {
      this.$router.push({
        name: "shangpinH"
      });
    },
    jiahuo() {
      this.$router.push({
        name: "jiahuo"
      });
    },
    kefu() {
      if (this.$store.state.username == null) {
        this.$router.push({
          name: "regi"
        });
      } else {
        this.$router.push({
          name: "kf",
          query: {
            sid: 5,
            name: "沿街购",
            token: 91
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  position: relative;
}

.nav {
  width: 100%;
  height: 0.88rem;
  background: #ffffff;
  line-height: 0.88rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #f7f7f7;
}

.nav p {
  font-size: 0.36rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.concat .van-icon {
  color: #cccccc;
}
.nav-left {
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}

.concat {
  width: 6.9rem;
  padding: 0 0.3rem;
}

.concat p {
  width: 6.9rem;
  height: 1rem;
  line-height: 1rem;
  text-align: left;
  font-size: 0.3rem;
  border-bottom: 1px solid #f7f7f7;
}

.box-p {
  width: 6.9rem;
  height: 0.98rem;
  background: linear-gradient(
    0deg,
    rgba(239, 6, 0, 1) 0%,
    rgba(255, 72, 0, 1) 100%
  );
  border-radius: 0.5rem;
  position: fixed;
  bottom: 0.8rem;
  left: 50%;
  margin-left: -3.45rem;
  font-size: 0.36rem;
  color: white;
  line-height: 0.98rem;
}
</style>
