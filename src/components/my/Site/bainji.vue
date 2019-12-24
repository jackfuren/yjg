<template>
  <div class="box">
    <div class="nav">
      <img src="../../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
      <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/> -->
      <p>编辑收货地址</p>
      <span @click="show2 = true;" class="nav-sc">删除</span>
    </div>
    <div class="navm">
      <div class="name">
        <p>收货人</p>
        <input type="text" placeholder="请填写收货人姓名" v-model="name" />
      </div>
      <div class="name">
        <p>手机号码</p>
        <input type="text" placeholder="请填写收货人手机号" v-model="tel" />
      </div>
      <div class="name">
        <p>所在区域</p>
        <input @click="sho=0" type="text" placeholder="请选择所在区域" v-model="dizhi" />
      </div>
      <div class="name">
        <p>详细地址</p>
        <input type="text" placeholder="请填写详细地址,街道楼牌号等" v-model="addressDetail" />
      </div>
      <van-area
        v-show="sho==0?true:false"
        :area-list="areaList"
        @cancel="sho=1"
        @confirm="confirm"
      />
    </div>
    <div style="text-align: left;margin-top: 0.5rem;">
      <van-cell-group>
        <van-switch-cell @change="change" v-model="checked" title="设为默认" />
      </van-cell-group>
    </div>
    <van-popup class="popup" position="bottom" v-model="show2">
      <p>是否确定删除此收货地址</p>
      <p @click="que()">确认</p>
      <p @click="show2 = false;">取消</p>
    </van-popup>
    <div class="cg" v-show="show3">
      <img alt src="../../../assets/dizhi_shanchuchenggong.png" />
      <p>删除成功</p>
    </div>
    <!-- <button style="background: #CCCCCC;" v-if="po==1?true:false">保存</button> v-if="po==0?true:false"-->
    <button @click="bao()" style="background: #F1150F;">保存</button>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { Area } from "vant";
Vue.use(Area);
import { SwitchCell } from "vant";
Vue.use(SwitchCell);
import areaList from "../../../../config/area";
import request from "../../utils/request";
export default {
  name: "bainji",
  data() {
    return {
      areaList,
      show2: false,
      show3: false,
      dataList: "",
      name: "",
      tel: "",
      dizhi: "",
      checked: false, //默认地址
      addressDetail: "",
      sho: 1, //区域列表的显示隐藏
      user_id: "", //用户编号
      addrid: ""
    };
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    confirm(e) {
      console.log(e);
      this.dizhi = e[0].name + e[1].name + e[2].name;
      this.province = e[0].name;
      this.city = e[1].name;
      this.county = e[2].name;
      this.sho = 1;
    },
    change(e) {
      console.log(e);
      this.checked = e;
    },
    bao() {
      let tel = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (tel.test(this.tel)) {
        request({
          url: "api/users/updaddr",
          method: "post",
          data: {
            user_id: this.user_id,
            addrid: this.addrid,
            consignee: this.name,
            phone: this.tel,
            province: this.province,
            city: this.city,
            area: this.county,
            address: this.addressDetail,
            is_default: this.checked
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              Toast("修改地址成功");
              this.$router.go(-1);
            } else {
              Toast("修改地址失败");
            }
          })
          .catch(err => {
            Toast("网络连接中断");
          });
      } else {
        Toast("手机号格式不正确");
        this.tel = "";
      }
    },
    que() {
      request({
        url: "api/users/deladdr",
        method: "post",
        data: {
          user_id: this.user_id,
          addrid: this.addrid
        }
      })
        .then(res => {
          //console.log(res)
          if (res.data.code == 200) {
            this.show3 = true;
            this.show2 = false;
            setTimeout(() => {
              this.fh();
            }, 1000);
          } else {
            Toast("删除地址失败");
          }
        })
        .catch(err => {
          Toast("网络连接中断");
        });
    }
  },
  mounted() {
    this.dataList = this.$route.params.arrList;
    this.name = this.dataList.consignee;
    this.tel = this.dataList.phone;
    this.addressDetail = this.dataList.address;
    this.dizhi =
      this.dataList.province + this.dataList.city + this.dataList.area;
    if (this.dataList.is_default == 1) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    console.log(this.dataList);
    this.addrid = this.$route.params.id;
    this.user_id = this.$store.state.username.id;
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
  position: relative;
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
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
  width: 0.55rem;
}

.nav-sc {
  float: right;
  position: absolute;
  top: 0;
  right: 4%;
  font-size: 0.3rem;
  color: #777777;
}

.van-area {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.navm {
  text-align: left;
  font-size: 0.3rem;
  background: #fff;
  padding: 0.2rem 0.2rem 0.1rem 0.3rem;
}
.navm input {
  background: none;
  outline: none;
  border: none;
}
.name {
  display: flex;
  border-bottom: 2px #f7f7f7;
  padding-top: 0.2rem;
  padding-bottom: 0.4rem;
}
.name p {
  flex: 1;
}
.name input {
  flex: 4;
}
button {
  width: 80%;
  border: 0;
  font-size: 0.3rem;

  border-radius: 0.2rem;
  color: #fff;
  height: 1rem;
  position: absolute;
  bottom: 1rem;
  left: 10%;
}
.popup {
  margin: 0 auto;
}

.popup p:nth-child(1) {
  height: 0.8rem;
  font-size: 0.28rem;
  line-height: 0.8rem;
  text-align: center;
}

.popup p:nth-child(2) {
  height: 0.8rem;
  font-size: 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  color: #ef0600;
}

.popup p:nth-child(3) {
  height: 0.8rem;
  font-size: 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  color: #00a0e9;
}
.cg {
  width: 2.74rem;
  height: 2.02rem;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  margin-top: -1.01rem;
  left: 50%;
  margin-left: -1.37rem;
}

.cg img {
  width: 0.7rem;
  height: 0.7rem;
  margin-top: 0.4rem;
}

.cg p {
  font-size: 0.3rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 0.1rem;
}
</style>
