<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <img src="../../assets/backgroud.png" alt />
        <div class="nav-a">
          <img @click="xiaoxi()" alt src="../../assets/nav_xiaoxi_nomal.png" />
        </div>
        <div class="nav-ph" @click="gerei()">
          <img :src="img" alt />
        </div>
      </div>
      <p class="name" @click="register()">{{name}}</p>
      <div class="dingdan">
        <div @click="Next()" class="nav-dd">
          <span>我的订单</span>
          <span>
            查看全部订单
            <img src="../../assets/gouwuche_button_xiayibu.png" alt />
          </span>
        </div>
        <div class="xian"></div>
        <div class="nav-xx">
          <div @click="fukaun()" class="nav-con">
            <p class="shu" v-show="kuan.length>0 ? true : false">{{kuan.length}}</p>
            <img src="../../assets/wode_daifukuan@3x.png" alt />
            <p>待付款</p>
          </div>
          <div @click="fahua()" class="nav-con">
            <p class="shu" v-show="fa.length>0 ? true : false">{{fa.length}}</p>
            <img src="../../assets/wode_daifahuo@2x.png" alt />
            <p>待发货</p>
          </div>
          <div @click="shouhuo()" class="nav-con">
            <p class="shu" v-show="shou.length>0 ? true : false">{{shou.length}}</p>
            <img src="../../assets/wode_daishouhuo@3x.png" alt />
            <p>待收货</p>
          </div>
          <div @click="pingjia()" class="nav-con">
            <p class="shu" v-show="ping.length>0 ? true : false">{{ping.length}}</p>
            <img src="../../assets/wode_daipingjia@3x.png" alt />
            <p>待评价</p>
          </div>
          <div @click="shouhon()" class="nav-con">
            <img src="../../assets/wode_shouhou@3x.png" alt />
            <p>售后</p>
          </div>
        </div>
        <div class="nav-wl" v-show="wuSat.length>0 ? true : false">
          <p>最近物流</p>
          <div class="nav-qs">
            <div id="wuliuS">
              <div
                class="nav-qsp"
                v-for="(imet,index) in wuSat"
                :key="index"
                @click="wuliu(imet.expresscom,imet.expresssn)"
              >
                <img :src="imet.goods[0].headimg" alt />
                <div class="nav-right">
                  <div>
                    <van-checkbox
                      checked-color="#EF0600"
                      disabled
                      class="dian"
                      label-position="right"
                      v-model="item"
                    ></van-checkbox>
                    <span class="tit">{{imet.goods[0].gitle}}</span>
                  </div>
                  <p class="dsd">您的快件已经{{imet.wul.status}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-gj">
        <div class="nav-dd">
          <span>常用工具</span>
          <!--        <span>查看全部工具 <img src="../../assets/gouwuche_button_xiayibu.png" alt=""></span>-->
        </div>
        <div class="xian"></div>
        <div class="nav-xx">
          <div @click="shangpin()" class="nav-conn">
            <img src="../../assets/shoucang.png" alt />
            <p>我的收藏</p>
          </div>
          <div @click="youhuijian()" class="nav-conn">
            <img src="../../assets/youhuiquan (2).png" alt />
            <p>优惠券</p>
          </div>
          <div @click="help()" class="nav-conn">
            <img src="../../assets/wentifankui.png" alt />
            <p>帮助中心</p>
          </div>
          <div @click="she()" class="nav-conn">
            <img src="../../assets/shezhi.png" alt />
            <p>设置</p>
          </div>
        </div>
        <div style="height: 0.15rem;"></div>
      </div>
      <div class="nav-hy">
        <img src="../../assets/huiyuan.png" alt />
      </div>
      <tuijie v-show="this.$store.state.username == null ? false :true"></tuijie>
      <van-tabbar v-model="active4" active-color="#EF0600" inactive-color="#333333">
        <van-tabbar-item to="/">
          <span>首页</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
        </van-tabbar-item>
        <van-tabbar-item icon="hot-o" to="/hd">
          <span>活动</span>
          <img slot="icon" slot-scope="props" :src="props.active ? ico.active : ico.inactive" />
        </van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/Shop">
          <span>购物车</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icn.active : icn.inactive" />
        </van-tabbar-item>
        <van-tabbar-item icon="contact" to="/My">
          <span>我的</span>
          <img slot="icon" slot-scope="props" :src="props.active ? ion.active : ion.inactive" />
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
import tuijie from "../../components/gongyongzujian/tuijian";
export default {
  name: "myCenter",
  data() {
    return {
      item: true,
      active4: 3,
      icon: {
        active: require("../../assets/tab_shouye_press.png"),
        inactive: require("../../assets/tab_shouye_normal.png")
      },
      ico: {
        active: require("../../assets/tab_huodong_press.png"),
        inactive: require("../../assets/tab_huodong_normal.png")
      },
      icn: {
        active: require("../../assets/tab_gouwuche_press.png"),
        inactive: require("../../assets/tab_gouwuche_normal.png")
      },
      ion: {
        active: require("../../assets/tab_wode_press.png"),
        inactive: require("../../assets/tab_wode_normal.png")
      },
      name: "",
      kuan: [],
      fa: [],
      shou: [],
      ping: [],
      hou: [],
      img: require("../../assets/touxiang.png"),
      shop: 0, //商品长度
      stor: 0, //店铺长度
      coupon: 0, //优惠券
      ddd: [],
      wul: [],
      wuSat: []
    };
  },
  methods: {
    gerei() {
      this.$router.push({
        name: "pim"
      });
      window.sessionStorage.setItem("pim", 3);
    },
    help() {
      this.$router.push({
        name: "Help"
      });
    },
    she() {
      this.$router.push({
        name: "set",
        params: {}
      });
    },
    Next() {
      this.$router.push({
        name: "ddd"
      });
    },
    wuliu(expresscom, expresssn) {
      // console.log(expresscom);
      // console.log(expresssn);
      this.$router.push({
        name: "wl",
        query: {
          expresscom: expresscom,
          dan: expresssn
        }
      });
    },
    xiaoxi() {
      this.$router.push({
        name: "news",
        query: {
          token: 4
        }
      });
    },
    fukaun() {
      this.$router.push({
        //name: 'dd',
        name: "ddd",
        query: {
          id: 1
        }
      });
    },
    fahua() {
      this.$router.push({
        //name: 'fh',
        name: "ddd",
        query: {
          id: 2
        }
      });
    },
    shouhuo() {
      this.$router.push({
        //name: 'sh',
        name: "ddd",
        query: {
          id: 3
        }
      });
    },
    pingjia() {
      this.$router.push({
        //name: 'sh',
        name: "ddd",
        query: {
          id: 4
        }
      });
    },
    shouhon() {
      this.$router.push({
        name: "tk"
        // query:{
        //   id:5
        // }
      });
    },
    shangpin() {
      this.$router.push({
        name: "shangpin",
        query: {
          id: 1
        }
      });
    },
    store() {
      this.$router.push({
        name: "shangpin",
        query: {
          id: 2
        }
      });
    },
    liulan() {
      this.$router.push({
        name: "ll"
      });
    },
    youhuijian() {
      this.$router.push({
        name: "yhj"
      });
    },
    register() {
      this.$router.push({
        name: "pim"
      });
      window.sessionStorage.setItem("reg", 4);
    },
    Name() {
      // console.log(this.$store.state.username.username);
      if (this.$store.state.username == null) {
        this.name = "点击登录/注册";
      } else {
        if (this.$store.state.username.username == null) {
          this.name = "沿街购";
        } else {
          this.name = this.$store.state.username.username;
        }
      }
    },
    portrait() {
      if (this.$store.state.username == null) {
      } else {
        this.img = this.$store.state.username.avatar;
      }
    },
    dingdan() {
      var that = this;
      request({
        //我的订单
        url: "api/users/order",
        method: "post",
        data: {
          user_id: this.$store.state.username.id
        }
      }).then(res => {
        console.log(res.data.data);
        for (var i in res.data.data) {
          if (res.data.data[i].status == 1) {
            this.kuan.push(res.data.data[i]);
            console.log(this.kuan)
          } else if (res.data.data[i].status == 2) {
            this.fa.push(res.data.data[i]);
          } else if (res.data.data[i].status == 3) {
            // console.log(this.shou);
            this.shou.push(res.data.data[i]);
          } else if (res.data.data[i].status == 4) {
            this.ping.push(res.data.data[i]);
          }
        }
        console.log(this.shou);
        this.wuSatue();
      });

      this.request({
        url: "api/order/aftersale",
        method: "post",
        data: {
          user_id: this.$store.state.username.id
        }
      }).then(res => {
        // console.log(res);
        for (var n in res.data.data) {
          this.hou.push(res.data.data[n]);
        }
      });
    },
    Shopping() {
      request({
        url: "api/users/mycollectiongoods",
        method: "post",
        data: {
          user_id: this.$store.getters.userName.id
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == 200) {
          this.shop = res.data.data.length;
        }
      });
      request({
        url: "api/users/mycollectionshop",
        method: "post",
        data: {
          user_id: this.$store.getters.userName.id
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.stor = res.data.data.length;
        }
      });
      request({
        url: "api/coupon/mycoupon",
        method: "post",
        data: {
          user_id: this.$store.state.username.id,
          type_id: 2
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.coupon = res.data.data.length;
        }
      });
    },
    wuSatue() {
      console.log(this.shou);
      this.request({
        url: "api/users/logistics",
        method: "post",
        data: {
          user_id: this.$store.state.username.id
        }
      }).then(res => {
        if (res.data.msg != "[]") {
          this.wul = JSON.parse(res.data.msg);
          console.log(this.wul);
          var i = 0;
          for (var ind = this.wul.length; ind >= 0; ind--) {
            console.log(this.shou[0]);
            this.shou[i].wul = this.wul[ind];
            console.log(this.shou[i]);
            if (i < this.shou.length - 1) {
              i++;
            }
          }

          for (var inde in this.shou) {
            if (
              this.shou[inde].wul != undefined &&
              this.shou[inde].wul.areaCode != undefined &&
              this.shou[inde].expresssn != ""
            ) {
              this.wuSat.push(this.shou[inde]);
            }
          }

          this.wuSat.push(this.wuSat[0]);
          console.log(this.wuSat);
          this.scrollWu();
        }
      });
    },
    scrollWu() {
      var wuliuS = document.getElementById("wuliuS");
      var i = 0;

      var lengthS = this.wuSat.length - 1;
      console.log(lengthS);
      // setInterval(function() {
      //   i++;
      //   wuliuS.style.top = -0.8 * i + "rem";
      //   if (i > lengthS) {
      //     wuliuS.style.transition = "none";
      //     wuliuS.style.top = 0;
      //     setTimeout(function() {
      //       i = 0;
      //       wuliuS.style.transition = "all 0.5s";
      //     }, 500);
      //   }
      // }, 5000);
    }
  },
  mounted() {
    this.Name();
    this.portrait();
    this.Shopping();
    this.dingdan();
  },
  components: {
    tuijie
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
}

.box .box-container {
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f9f9f8;
}

.box .box-container::-webkit-scrollbar {
  display: none;
}

.nav img {
  width: 100%;
  height: 100%;
  position: relative;
}

.nav-a {
  position: absolute;
  top: 0.55rem;
  right: 0.3rem;
}
.nav-a img {
  width: 0.4rem;
  height: 0.4rem;
}

.nav-ph {
  position: absolute;
  top: 1.6rem;
  left: 50%;
  margin-left: -0.75rem;
  border-radius: 50%;
  overflow: hidden;
  width: 1.5rem;
  height: 1.5rem;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.nav-ph img {
  width: 1.5rem;
  height: 1.5rem;
}

.name {
  text-align: center;
  font-size: 0.36rem;
  margin-bottom: 0.4rem;
}

.dingdan {
  width: 6.9rem;
  /* height: 4rem; */
  background: #ffffff;
  margin: 0 auto;
  border-radius: 5px;
  padding-bottom: 0.1rem;
}

.nav-dd {
  padding: 0 0.2rem 0 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  display: flex;
  justify-content: space-between;
}

.nav-dd span:nth-child(1) {
  font-size: 0.3rem;
}

.nav-dd span:nth-child(2) {
  font-size: 0.24rem;
}

.nav-dd span:nth-child(2) img {
  width: 0.15rem;
  height: 0.2rem;
  margin-left: 0.1rem;
}

.xian {
  width: 6.9rem;
  height: 1px;
  background-color: #eeeeee;
}

.nav-xx {
  width: 6.24rem;
  height: 1rem;

  margin: 0.32rem auto;
  display: flex;
  justify-content: space-between;
}
.nav-xx > .nav-conn > img {
  width: 60%;
}
.nav-con {
  height: 1rem;
  font-size: 0.24rem;
  position: relative;
}
.shu {
  position: absolute;
  left: 0.5rem;
  top: -0.05rem;
  background: #fff;
  padding: 0.01rem 0.08rem 0.01rem 0.08rem;
  border: 1px solid #ef1c11;
  color: #ef1c11;
  border-radius: 10px;
}
.nav-con img {
  width: 0.44rem;
  height: 0.44rem;
  margin: 0.1rem;
}

.nav-wl {
  width: 6.5rem;
  height: 1.6rem;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  background: #f9f9f8;
}

.nav-wl > p {
  text-align: left;
  font-size: 0.2rem;
  margin: 0.2rem;
  padding-top: 0.2rem;
}

.nav-qs {
  width: 6rem;
  height: 0.8rem;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
}
#wuliuS {
  position: absolute;
  top: 0;
  transition: all 0.5s;
}
.nav-qsp {
  height: 0.8rem;
  width: 6rem;
}

.nav-qsp img {
  width: 0.8rem;
  height: 0.8rem;
  float: left;
}

.dian {
  float: left;
  margin-left: 0.25rem;
  margin-top: 0.05rem;
}

.dsd {
  text-align: left;
  color: black;
  position: relative;
  top: 0.1rem;
  left: 0.65rem;
  font-size: 0.2rem;
}

.nav-gj {
  width: 6.9rem;
  /* height: 2rem; */
  background-color: #ffffff;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.nav-conn {
  width: 1rem;
  height: 1rem;
  font-size: 0.24rem;
}
.nav-conn > img {
  margin-bottom: 0.08rem;
}
.nav-hy {
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
}

.nav-hy img {
  width: 7rem;
  height: 2rem;
}

.nav-tj-bottom-div-ppp span:nth-child(1) {
  font-size: 0.22rem;
  color: #ef0600;
  float: left;
  position: relative;
  bottom: -0.05rem;
}

.nav-tj-bottom-div-ppp span:nth-child(2) {
  font-size: 0.32rem;
  color: #ef0600;
  float: left;
}

.nav-tj-bottom-div-ppp span:nth-child(3) {
  font-size: 0.24rem;
  color: #777777;
  float: right;
  margin-right: 0.28rem;
}

/deep/ .van-checkbox__icon--disabled .van-icon {
  border-color: #ef0600;
  background-color: white;
}
/deep/ .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
  color: #ef0600;
}

/deep/ .van-checkbox__icon .van-icon {
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.24rem;
}

.nav-right > div {
  display: flex;
  align-items: center;
}
.tit {
  margin-left: 0.1rem;
  width: 4.5rem;
  display: inline-block;
  text-align: left;
  font-size: 0.28rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.van-tabbar-item__icon img{
	height: auto;
}
</style>
