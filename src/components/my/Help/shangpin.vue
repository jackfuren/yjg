<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>商品错发/漏发</p>
    </div>
    <div class="concat">
      <div>1. 如果您收到的商品发现少了，为了保障您旳利益，建议您保留好相关凭证，打开手机【沿街购APP】-【我的】-【我的订单】，点击该商品，</div>
      <div>2. 把凭证发送给商家，与商家协商处理。如果联系不到商家或者商家不处理问题，您可以申请退款。</div>
      <div>3. 如果商家拒绝退款，您可以在该页面点击：要求沿街购客服客服介入，沿街购客服会在48小时内介入处理。</div>
    </div>
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
      this.$router.go(-1);
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
.nav-left {
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}

.concat {
  width: 6.9rem;
  padding: 0.3rem;
  text-align: left;
  font-size: 0.28rem;
}
.concat div {
  margin: 0.1rem 0;
}
.concat p {
  margin: 0.1rem 0;
  padding-left: 0.45rem;
}
</style>
