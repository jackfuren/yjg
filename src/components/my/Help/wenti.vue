<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>问题商品</p>
    </div>
    <div class="concat">
      <div>1、买家可以先联系卖家客服，并提供实物图片确认问题是否属实。</div>
      <div>2、如果确认商品问题，或无法说明商品是否合格，卖家应与买家协商解决；</div>
      <div>3. 若因商品问题商家拒绝处理，可以要求沿街购客服介入处理。</div>
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
