<template>
  <div class="box">
    <!-- 807033967690403176 -->
    <div class="nav">
      <img src="../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
      <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/> -->
      <p>物流详情</p>
    </div>
    <div class="dz">
      <div class="dz-a">
        <p>{{name}}快递</p>
        <p>
          {{name}}快递 {{hao}}
          <button
            class="fz"
            type="button"
            v-clipboard:copy="message"
            v-clipboard:error="onError"
            v-clipboard:success="onCopy"
          >复制</button>
        </p>
      </div>
    </div>
    <div class="concat">
      <el-steps :active="1" class="concat-a" direction="vertical">
        <el-step
          v-for="(item,index) in wuliu"
          :key="index"
          :description="item.context"
          icon="el-icon-circle-check"
          :title="item.status"
        ></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import request from "../utils/request";
export default {
  name: "wuliu",
  data() {
    return {
      message: "11111111111",
      user_id: "", //用户编码
      expresscom: this.$route.query.expresscom,
      expresssn: this.$route.query.dan,
      wuliu: "",
      hao: "",
      name: ""
    };
  },
  created() {
    request({
      url: "api/activity/getExpress",
      method: "post",
      data: {
        expresscom: this.expresscom,
        expresssn: this.expresssn,
        user_id: this.$store.state.username.id
      }
    }).then(res => {
      console.log(res);
      this.wuliu = res.data.data.data;
      this.hao = res.data.data.nu;
      this.name = res.data.data.name;
    });
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    onCopy: function(e) {
      Toast("复制成功");
    },
    onError: function(e) {
      Toast("复制失败");
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  min-height: 100vh;
  background: #f7f7f7;
}

.nav {
  width: 100%;
  height: 0.88rem;
  background: #ffffff;
  line-height: 0.88rem;
  text-align: center;
  position: relative;
}

.nav p {
  font-size: 0.36rem;

  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.nav-left {
  width: 0.55rem;
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}

.dz {
  width: 6.9rem;
  height: 1.3rem;
  margin: 0.2rem auto 0.2rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
}

.dz img:nth-child(1) {
  width: 0.8rem;
  height: 0.8rem;
  float: left;
  margin-top: 0.25rem;
  margin-left: 0.2rem;
}

.dz-a {
  width: 5.9rem;
  height: 1.4rem;
  padding-top: 0.2rem;
  margin-top: 0.15rem;
  text-align: left;
}

.dz-a p:nth-child(1) {
  font-size: 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-left: 0.2rem;
}

.dz-a p:nth-child(1) span {
  font-size: 0.24rem;
  color: #333333;
  margin-left: 0.15rem;
}

.dz-a p:nth-child(2) {
  width: 5.2rem;
  font-size: 0.24rem;
  color: #777777;
  line-height: 0.28rem;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}

.fz {
  width: 0.6rem;
  height: 0.35rem;
  border-radius: 10px;
  line-height: 0.3rem;
  background: #ef0600;
  color: white;
  font-size: 0.28px;
  list-style: none;
  border: 0;
  padding: 0.01rem;
  margin-right: 0.5rem;
  box-sizing: border-box;
}

.concat {
  width: 6.9rem;
  height: 100%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0.5rem 0 1rem 0;
}

.concat-a {
  width: 5rem;
  text-align: left;
  margin-left: 1.3rem;
  font-size: 0.24rem;
}
</style>
