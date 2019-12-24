<template>
  <div class="box">
    <div class="nav">
      <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" />
      <p>如何退货</p>
    </div>
    <div class="concat">
      <div>
        1.如何申请退款
        <p>
          1.打开沿街购首页，登录上自己的账号，点击“我的”
          <br />2.点进“我的”之后点击“我的订单”
          <br />3.在订单里找到自己想要退货的那个订单 点击那个订单
          <br />4.点进去之后就会看到退款 然后点击退款
          <br />5.直接写上退款说明 以及部分问题 ，点击提交
          <br />6.成功之后等候通知
        </p>
      </div>
      <div>
        2.卖家不退款，怎么办
        <div>
          1、如您的订单状态为“买家已付款” 从您申请退款开始，会给卖家48小时处理您的退款申请：
          <p>a、如卖家在48小时内同意退款申请，或者一直不操作，则退款成功；</p>
          <p>b、如卖家点击“发货”，您的退款会关闭，如需申请退款需要重新提交申请哦。</p>
        </div>
      </div>
      <div>
        2、如您的订单状态为卖家已发货，或交易成功状态
        您提交退款申请后，会给卖家5天时间处理您的退款申请，如卖家在超时时间内同意退款申请，或者一直不操作：
        <div>
          1、如您的订单状态为“买家已付款” 从您申请退款开始，会给卖家48小时处理您的退款申请：
          <p>
            a、您申请“仅退款”的话，此时就退款成功喽；
            <br />b、若您申请的是“退货退款”，此时会开启退货流程，给您7天时间完成退货并填写退货信息，
            您提交完退货信息后，给卖家的处理时间，会根据您退货的快递方式确定哦，如卖家在超时时间内不处理，退款就成功啦。
            <br />
          </p>
        </div>
      </div>
      <div>3. 点击沿街购的帮助反馈，直接反馈给平台，我们会给你们最大保障的</div>
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
.concat > div {
  margin: 0.1rem 0;
}
.concat div > div {
  padding-left: 0.2rem;
}
.concat p {
  margin: 0.1rem 0;
  padding-left: 0.45rem;
}
</style>
