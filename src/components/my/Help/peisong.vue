<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>配送服务</p>
    </div>
    <div class="concat">
      <div>
        1、配送方式
        <p>
          a:凡是您在本商城订购且需要配送的商品，均会由我们指定的物流服务商（比如顺丰、中国邮政速递 EMS等）在承诺的配送时限内，为您送货上门。在配送之前，签约物流服务商将依照您订单上预留的电话和您联系。
          <br />b:本平台还有近距离的跑腿配送服务
        </p>
      </div>
      <div>
        2、配送费用
        <p>根据地方的远近来判定配送的费用。</p>
      </div>
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
.concat div{
  margin: 0.1rem 0;
}
.concat p {
  margin: 0.1rem 0;
  padding-left: 0.45rem;
}

</style>
