<template>
  <div class="box">
    <div class="concat">
      <img class="concat-img" src="../../assets/loog.png" alt />
      <input
        class="input-top"
        type="tel"
        oninput="if(value.length>11) value=value.slice(0,11)"
        v-model="phone"
        @input="changeCount()"
        placeholder="请输入手机号码"
      />
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input type="number" id="input-bottom" v-model="code" placeholder="请输入验证码" />
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <input
        type="password"
        class="input-bottom"
        id="input-botto"
        maxlength="20"
        v-model="password"
        placeholder="请输入密码(6-12字母数字组合)"
        @change="yanzheng"
      />

      <div style="width: 5rem;height:1px;background: #EEEEEE;margin: 0 auto"></div>
      <input
        type="password"
        class="input-bottom"
        id="input-bott"
        maxlength="20"
        v-model="password_confirm"
        placeholder="请确认密码(6-12字母数字组合)"
      />
      <div class="check">
        <input type="checkbox" @click="check" /> 我已认真阅读并同意
        <router-link to="/xieyi">《沿街购注册协议》</router-link>
      </div>
      <div style="width: 5rem;height: 0.5px;background: #EEEEEE;margin: 0 auto"></div>
      <p v-show="show1" class="concat-p" @click="panduan()">注册</p>
      <p v-show="show" class="concat-pp">注册</p>
      <button
        type="button"
        :disabled="disabled"
        v-show="zhen"
        @click="fasong()"
        id="concat-p"
      >{{value}}</button>
      <button
        type="button"
        :disabled="disabled"
        v-show="jia"
        @click="fasong()"
        id="concat-pp"
      >{{value}}</button>
      <img id="eye" v-show="eye" @click="zheng()" src="../../assets/mimakejain.png" alt />
      <img id="eye-bottom" v-show="eyetwo" @click="bi()" src="../../assets/mimayingcang.png" alt />
      <img id="eyee" v-show="eyee" @click="zhengg()" src="../../assets/mimakejain.png" alt />
      <img id="eye-bottomm" v-show="eyetwoo" @click="bii()" src="../../assets/mimayingcang.png" alt />
    </div>
    <div class="yzmm" v-if="yzmm">密码必须为6-12位字母或数字</div>
    <div class="back"></div>
    <img @click="fh()" class="box-img" src="../../assets/left.png" alt />
  </div>
</template>

<script>
import request from "../utils/request";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "yanzhengma",
  data() {
    return {
      value: "发送",
      disabled: false,
      time: 0,
      phone: "",
      password: "",
      password_confirm: "",
      code: "",
      eye: false,
      eyetwo: true,
      eyee: false,
      eyetwoo: true,
      zhen: true,
      jia: false,
      show: true,
      show1: false,
      yzmm: false,
      tongY: false
    };
  },
  methods: {
    changeCount: function() {
      if (this.phone.length >= 11) {
        request({
          url: "api/users/reg",
          method: "post",
          data: {
            mobile: this.phone
          }
        }).then(res => {
          //console.log(res)
          if (res.data.msg == "手机号已经存在") {
            Toast("该手机号已经注册过");
            this.zhen = false;
            this.jia = true;
            this.disabled = true;
          } else if (res.data.msg == "请传过来密码") {
            this.zhen = true;
            this.jia = false;
          }
        });
      }
    },
    zheng() {
      this.eye = false;
      this.eyetwo = true;
      var pass = document.getElementById("input-botto");
      pass.type = "password";
    },
    bi() {
      this.eye = true;
      this.eyetwo = false;
      var pass = document.getElementById("input-botto");
      pass.type = "text";
    },
    zhengg() {
      this.eyee = false;
      this.eyetwoo = true;
      var pass = document.getElementById("input-bott");
      pass.type = "password";
    },
    bii() {
      this.eyee = true;
      this.eyetwoo = false;
      var pass = document.getElementById("input-bott");
      pass.type = "text";
    },
    yan() {
      this.$router.push({
        name: "regi"
      });
    },
    zhuche() {
      this.$router.push({
        name: "zcyh"
      });
    },
    fh() {
      this.$router.push({
        name: "regi"
      });
    },
    fasong() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.phone == "") {
        Toast("请输入手机号码");
      } else if (!reg.test(this.phone)) {
        Toast("手机格式不正确");
      } else {
        this.time = 60;
        this.disabled = true;
        this.timer();
        request({
          url: "api/users/sendsms",
          method: "post",
          data: {
            mobile: this.phone
          }
        }).then(res => {});
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.value = this.time + "s";
        //+"s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.value = "重发";
        this.disabled = false;
      }
    },
    panduan() {
      if (this.tongY == true) {
        if (this.password == this.password_confirm) {
          request({
            url: "api/users/reg",
            method: "post",
            data: {
              mobile: this.phone,
              password: this.password,
              password_confirm: this.password_confirm,
              code: this.code
            }
          }).then(res => {
            if (res.data.code == 200) {
              Toast("注册成功");
              this.$store.dispatch("UserName", res.data.data);
              this.$router.push({
                name: "regi"
              });
            }
          });
        } else {
          Toast("两次密码不一致");
        }
      } else {
        Toast("请勾选协议");
      }
    },
    yanzheng() {
      var reg = /^[a-zA-Z0-9]{6,12}$/;
      console.log(!reg.test(this.password));
      if (!reg.test(this.password)) {
        this.yzmm = true;
      } else {
        this.yzmm = false;
      }
    },
    check() {
      this.tongY = !this.tongY;
    }
  },
  updated() {
    if (this.phone && this.code && this.password && this.password_confirm) {
      this.show = false;
      this.show1 = true;
    } else if (
      !this.phone ||
      !this.code ||
      this.password ||
      this.password_confirm
    ) {
      this.show = true;
      this.show1 = false;
    }
  }
};
</script>

<style scoped>
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #cccccc;
  /* placeholder字体大小  */
  font-size: 0.26rem;
}
/* 消除输入内容后的背景色 */
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #fff inset !important;
}
.box {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
}

.concat {
  width: 6rem;
  height: 7.7rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 15px 32px 0px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  position: absolute;
  top: 2.44rem;
  left: 50%;
  margin-left: -3rem;
  z-index: 2;
}

.concat-img {
  width: 2.26rem;
  height: 2.26rem;
  position: absolute;
  top: -1.13rem;
  left: 50%;
  margin-left: -1.13rem;
}

.back {
  width: 5.4rem;
  height: 4.25rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 15px 32px 0px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  position: absolute;
  top: 6rem;
  left: 50%;
  margin-left: -2.7rem;
  z-index: 1;
}

.concat-p {
  width: 3rem;
  height: 0.9rem;
  /* padding: 0.2rem; */
  background: linear-gradient(
    0deg,
    rgba(239, 6, 0, 1) 0%,
    rgba(253, 101, 86, 1) 100%
  );
  box-shadow: 0px 5px 13px 0px rgba(242, 20, 0, 0.24);
  border-radius: 0.45rem;
  line-height: 0.9rem;
  font-size: 0.36rem;
  color: white;
  position: absolute;
  bottom: -0.45rem;
  left: 50%;
  margin-left: -1.5rem;
}
.concat-pp {
  width: 3rem;
  height: 0.9rem;
  background: #cccccc !important;
  box-shadow: 0px 5px 13px 0px rgba(51, 51, 51, 0.24) !important;
  border-radius: 0.45rem;
  line-height: 0.9rem;
  font-size: 0.36rem;
  color: white;
  position: absolute;
  bottom: -0.45rem;
  left: 50%;
  margin-left: -1.5rem;
}

.box-left img {
  width: 0.85rem;
  height: 0.85rem;
}

.box-left p {
  font-size: 0.24rem;
  color: #cccccc;
}

.box-right img {
  width: 0.85rem;
  height: 0.85rem;
}

.box-right p {
  font-size: 0.24rem;
  color: #cccccc;
}

.input-top {
  width: 5rem;
  height: 1rem;
  border: 0rem;
  text-align: center;
  font-size: 0.28rem;
  margin: 1.3rem auto 0;
}

#input-bottom {
  width: 5rem;
  height: 1rem;
  border: 0rem;
  text-align: center;
  font-size: 0.28rem;
  margin: 0 auto;
}

.input-bottom {
  width: 5rem;
  height: 1rem;
  border: 0rem;
  text-align: center;
  font-size: 0.28rem;
  margin: 0 auto;
}

#concat-p {
  /* width: 0.98rem;
    height: 0.4rem; */
  padding: 0.05rem 0.2rem 0.05rem 0.2rem;
  background: white;
  border: 1px solid rgba(240, 16, 11, 1);
  border-radius: 20px;
  line-height: 0.3rem;
  font-size: 0.24rem;
  color: #f72500;
  position: absolute;
  top: 2.6rem;
  right: 0.5rem;
}
#concat-pp {
  /* width: 0.98rem;
    height: 0.4rem; */
  padding: 0.05rem 0.2rem 0.05rem 0.2rem;
  background: white;
  border: 1px solid #777777;
  border-radius: 20px;
  line-height: 0.3rem;
  font-size: 0.24rem;
  color: #777777;
  position: absolute;
  top: 2.6rem;
  right: 0.5rem;
}
.box-img {
  width: 0.6rem;
  height: 0.6rem;
  position: relative;
  right: 3.2rem;
  top: 2vh;
}
#eye {
  width: 0.4rem;
  height: 0.28rem;
  position: absolute;
  top: 3.7rem;
  right: 0.5rem;
  z-index: 3;
}

#eye-bottom {
  width: 0.35rem;
  height: 0.17rem;
  position: absolute;
  top: 3.77rem;
  right: 0.53rem;
  z-index: 3;
}
#eyee {
  width: 0.4rem;
  height: 0.28rem;
  position: absolute;
  top: 4.7rem;
  right: 0.5rem;
  z-index: 3;
}

#eye-bottomm {
  width: 0.35rem;
  height: 0.17rem;
  position: absolute;
  top: 4.77rem;
  right: 0.53rem;
  z-index: 3;
}
.yzmm {
  width: 100%;
  font-size: 0.26rem;
  color: red;
  position: absolute;
  bottom: 2.2rem;
  text-align: center;
}
.check {
  display: flex;
  align-items: center;
  width: 5rem;
  margin: 0 auto;
  font-size: 0.25rem;
}
.check a {
  color: red;
}
.check input[type="checkbox"] {
  width: 0.25rem;
  height: 0.25rem;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 18px;
  position: relative;
  margin-right: 0.1rem;
}
.check input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(204, 204, 204);
}
.check input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid #e50232;
  color: #e50232;
  font-size: 0.3rem;
  font-weight: bold;
}
</style>
