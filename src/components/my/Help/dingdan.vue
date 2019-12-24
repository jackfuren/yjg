<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>订单查询</p>
    </div>
    <div class="concat">
      <div>1.首先，需要您登陆中人商城，点击导航头左上角的“登陆”按钮，在新窗口中键入您有效的登录账号和密码并提交；</div>
      <div>2.第二步，点击下方的“我的”即进入到用户中心，在此，可以看到订单列表</div>
      <div>3.选择进入“我的订单”菜单，在这里，您可以查看到历史和正在处理的全部订单信息；</div>
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
