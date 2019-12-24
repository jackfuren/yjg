<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>发货时间</p>
    </div>
    <div class="concat">
      <div>发货时间根据商家的选择,承诺会在48或者68小时内发货</div>
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
