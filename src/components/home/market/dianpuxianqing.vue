<template>
  <div class="box">
    <div class="box-container">
      <!-- 头部-->
      <div class="nav">
        <div class="nav-top">
          <img
            src="../../../assets/fanbai.png"
            @click="fh()"
            style="margin-top: 0.1rem;height: 0.45rem;"
            alt
          />
          <img
            src="../../../assets/more.png"
            @click="back =!back"
            style="height: 0.45rem;float: right;margin-right: 0.55rem;margin-top: 0.1rem"
            alt
          />
		  <img 
			src="../../../assets/sear.png"
			style="height: 0.45rem; float:right;margin-right: 0.1rem;margin-top: 0.1rem"
			 @click="Search()"
			alt=""
		  />
        </div>
        <div v-show="back" class="nav-top-back">
          <p @click="xiaoxi">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem"
              src="../../../assets/shangjiaye_wuxiaoxi.png"
              alt
            />
            <span>消息</span>
          </p>
          <p @click="shop">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem"
              src="../../../assets/shangjaiyetanchuang_gouwuche.png"
              alt
            />
            <span>购物车</span>
          </p>
          <p @click="homm">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
              src="../../../assets/shangjiayetanchuang_shouyee.png"
              alt
            />
            <span>首页</span>
          </p>
          <p>
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem"
              src="../../../assets/shangjaiye_fenxiang.png"
              alt
            />
            <span>分享</span>
          </p>
          <p @click="jubao()">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
              src="../../../assets/shangjiaye_jubao.png"
              alt
            />
            <span>举报</span>
          </p>
        </div>
      </div>

      <div class="nav-bottom">
        <div class="nav-bottom-img">
          <img alt :src="top.shoplogo" />
        </div>
        <div>
          <p>{{top.name}}</p>
          <p>
            {{top.province + top.city + top.area + top.address}}
            <span>< {{top.distance}}</span>
          </p>
          <div class="nav-bottom-div">
            <div v-if="top.quality==''?false:true">
              商品评价：
              <span>{{top.quality}}</span>
            </div>
            <div v-if="top.service==''?false:true">
              服务评价：
              <span>{{top.service}}</span>
            </div>
            <div v-if="top.description==''?false:true">
              物流评价：
              <span>{{top.description}}</span>
            </div>
          </div>
          <div class="nav-bottom-two">
            <div v-if="shou == 1 ? true : false" @click=" collect()">
              <van-icon size="0.3rem" style="position: relative;top: 0.05rem" name="star-o" />
              <span>已收藏</span>
            </div>
            <div
              v-if="shou == 0 ? true : false"
              style="border: 1px solid #EF0600"
              @click=" collect()"
            >
              <van-icon
                size="0.3rem"
                style="position: relative;top: 0.05rem"
                name="star-o"
                color="#EF0600"
              />
              <span style="color:#EF0600 ">加收藏</span>
            </div>
            <div>
              <van-icon
                size="0.3rem"
                style="position: relative;top: 0.05rem"
                color="#EF0600"
                name="service-o"
              />
              <span @click="lianxi">联系客服</span>
            </div>
          </div>
        </div>
      </div>
      <!-- table切换-->
      <van-tabs title-active-color="#EF0A05" v-model="active" @click="onClick">
        <van-tab title="最新">
          <div class="concat">
            <div :key="index" v-for="(item ,index) in leftBottom">
              <div @click="wuping(item.id)" class="ph">
                <img :src="item.headimg" alt />
                <div class="ph-rei" v-show="false">
                  <img alt src="../../../assets/jiaobiao.png" />
                  <span>热</span>
                </div>
              </div>
              <p class="concat-title">{{item.title}}</p>
              <p class="concat-money">
                ￥
                <span>{{item.price}}</span>
                <!-- <van-icon
                  color="#EF0600"
                  name="shopping-cart-o"
                  size="0.4rem"
                  @click="cart(item.id)"
                /> -->
              </p>
              <!-- <p class="concat-browes" @click="shoucang(index)">
                <van-icon
                  color="#777777"
                  name="star-o"
                  size="0.25rem"
                  style="position: relative;:0top.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==0"
                />
                <van-icon
                  color="#E8A400"
                  name="star"
                  size="0.25rem"
                  style="position: relative;top:0.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==1"
                />
                {{item.collectiongoods}}
              </p> -->
            </div>
          </div>
        </van-tab>
        <van-tab title="全部">
          <div class="concat">
            <div :key="index" v-for="(item ,index) in bottom">
              <div @click="wuping(item.id)" class="ph">
                <img :src="item.headimg" alt />
                <div class="ph-rei" v-show="false">
                  <img alt src="../../../assets/jiaobiao.png" />
                  <span>热</span>
                </div>
              </div>
              <p class="concat-title">{{item.title}}</p>

              <p class="concat-money">
                ￥
                <span>{{item.price}}</span>
                <!-- <van-icon
                  color="#EF0600"
                  name="shopping-cart-o"
                  size="0.4rem"
                  style="float: right"
                  @click="cart(item.id)"
                /> -->
              </p>
              <!-- <p class="concat-browes" @click="shoucang(index)">
                <van-icon
                  color="#777777"
                  name="star-o"
                  size="0.25rem"
                  style="position: relative;:0top.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==0"
                />
                <van-icon
                  color="#E8A400"
                  name="star"
                  size="0.25rem"
                  style="position: relative;top:0.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==1"
                />
                {{item.collectiongoods}}
              </p> -->
            </div>
          </div>
        </van-tab>
        <van-tab title="价格">
          <div class="concat">
            <div :key="index" v-for="(item ,index) in rightBottom">
              <div @click="wuping(item.id)" class="ph">
                <img :src="item.headimg" alt />
                <div class="ph-rei" v-show="false">
                  <img alt src="../../../assets/jiaobiao.png" />
                  <span>热</span>
                </div>
              </div>
              <p class="concat-title">{{item.title}}</p>

              <p class="concat-money">
                ￥
                <span>{{item.price}}</span>
                <!-- <van-icon
                  color="#EF0600"
                  name="shopping-cart-o"
                  size="0.4rem"
                  style="float: right"
                  @click="cart(item.id)"
                /> -->
              </p>
              <!-- <p class="concat-browes" @click="shoucang(index)">
                <van-icon
                  color="#777777"
                  name="star-o"
                  size="0.25rem"
                  style="position: relative;:0top.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==0"
                />
                <van-icon
                  color="#E8A400"
                  name="star"
                  size="0.25rem"
                  style="position: relative;top:0.03rem;margin-left: 0.15rem"
                  v-if="item.is_collectiongoods==1"
                />
                {{item.collectiongoods}}
              </p> -->
            </div>
          </div>
        </van-tab>
        <div v-show="a" class="sanjiao">
          <img src="../../../assets/shangjiaye_jiage.png" alt />
        </div>
        <div v-show="b" class="sanjiao">
          <img src="../../../assets/gao.png" alt />
        </div>
        <div v-show="c" class="sanjiao">
          <img src="../../../assets/shangjiaye_jiagedi.png" alt />
        </div>
      </van-tabs>


      
      <div style="height: 2rem"></div>
      <!-- 底部-->
      <div class="footer">
        <p @click="shops()">
          <span>商家信息</span>
        </p>
        <p @click="dphd">
          <span>活动专区</span>
        </p>
        <p>
          <span>会员卡</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import request from "../../utils/request";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "dianpuxianqing",
  data() {
    return {
      active: 1,
      list: [],
      back: false,
      shop_id: "", //商家编号
      top: "", //头部信息
      bottom: "", //全部底部信息
      shou: "", // 收藏
      leftBottom: "", //最新商品信息
      rightBottom: "", //价格商品信息
      array: 4,
      a: true,
      b: false,
      c: false,
      token: "",
      goods_id: "",
      z: [],
      x: [],
      mo: ""
    };
  },
  methods: {
    onClick(index, title) {
      var that = this;
      if (index == 2) {
        if (this.array == 4) {
          this.jiage();
          that.a = false;
          that.b = false;
          that.c = true;
        }
        if (this.array == 3) {
          this.jiage();
          setTimeout(function() {
            that.array = 4;
            that.a = false;
            that.b = true;
            that.c = false;
          }, 1000);
        }
      } else if (index == 0) {
        that.a = true;
        that.b = false;
        that.c = false;
      } else if (index == 1) {
        that.a = true;
        that.b = false;
        that.c = false;
      }
    },
    wuping(i) {
      this.$router.push({
        name: "wpxq",
        query: {
          goods_id: i
        }
      });
    },
    fh() {
      var DDP = window.sessionStorage.getItem("DDP");
      if (this.token == 1) {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: this.goods_id,
            token: this.token
          }
        });
      } else if (this.token == 2) {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: this.goods_id,
            token: this.token
          }
        });
      } else if (this.token == 3) {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: this.goods_id,
            token: this.token,
            dataList: this.z,
            arrayList: this.x
          }
        });
      } else if (DDP == 36) {
        this.$router.push({
          name: "ph",
          query: {
            mo: this.mo
          }
        });
      } else if (this.token == 7) {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: this.goods_id,
            token: this.token,
            dataList: this.z,
            arrayList: this.x
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    jubao() {
      if (this.$store.state.username == null) {
        this.$router.push({
          name: "regi"
        });
      } else {
        this.$router.push({
          name: "jb",
          query: {
            id: this.shop_id
          }
        });
      }
    },
    shops() {
      this.$router.push({
        name: "shops",
        query:{
          shop_id: this.shop_id
        }
      });
    },
    collect() {
      if (this.shou == 0) {
        request({
          url: "api/users/collectionshp",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            shop_id: this.shop_id
          }
        })
          .then(res => {
            //console.log(res)
            if (res.data.code == 200) {
              Toast("收藏成功");
              this.shou = !this.shou;

              this.Shop();
            } else {
              Toast("收藏失败");
            }
          })
          .catch(err => {
            Toast("网络连接中断");
          });
      }
      if (this.shou == 1) {
        request({
          url: "api/users/delcshop",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            shop_id: this.shop_id
          }
        })
          .then(res => {
            //console.log(res)
            if (res.data.code == 200) {
              Toast("取消收藏");
              this.shou = !this.shou;
              this.Shop();
            } else {
              Toast("取消收藏失败");
            }
          })
          .catch(err => {
            Toast("网络连接中断");
          });
      }
    },
    Search() {
      this.$router.push({
        name: "seek"
      });
    },
    Shop() {
      request({
        url: "api/shop/index",
        method: "post",
        data: {
          shop_id: this.shop_id,
          user_id: this.$store.state.username.id,
          type: 2,
          lat: window.localStorage.getItem("lat"),
          lng: window.localStorage.getItem("lng")
        }
      }).then(res => {
        console.log(res);
        this.top = res.data.data.shop;
        this.bottom = res.data.data.goods;
        this.shou = res.data.data.shop.is_collectionshop;
        console.log(this.top);
      });
    },
    zuixin() {
      request({
        url: "api/shop/index",
        method: "post",
        data: {
          shop_id: this.shop_id,
          user_id: this.$store.state.username.id,
          type: 1,
          lat: window.localStorage.getItem("lat"),
          lng: window.localStorage.getItem("lng")
        }
      }).then(res => {
        console.log(res);
        this.leftBottom = res.data.data.goods;
      });
    },
    jiage() {
      request({
        url: "api/shop/index",
        method: "post",
        data: {
          shop_id: this.shop_id,
          user_id: this.$store.state.username.id,
          type: this.array,
          lat: window.localStorage.getItem("lat"),
          lng: window.localStorage.getItem("lng")
        }
      }).then(res => {
        this.rightBottom = res.data.data.goods;
        this.array = 3;
      });
    },
    xiaoxi() {
      if (this.$store.state.username == null) {
        this.$router.push({
          name: "regi"
        });
      } else {
        this.$router.push({
          name: "news"
        });
      }
    },
    shop() {
      this.$router.push({
        name: "Shop"
      });
    },
    homm() {
      this.$router.push({
        name: "home"
      });
    },
    lianxi() {
      console.log(top.name);
      this.$router.push({
        name: "kf",
        query: {
          sid: this.shop_id,
          token: 90,
          name: this.top.name
        }
      });
    },
    cart(Sid) {
      console.log(Sid);
      request({
        url: "api/goods/addcart",
        method: "post",
        data: {
          user_id: this.$store.state.username.id,
          goods_id: Sid,
          num: 1,
          sku_id: 0
        }
      }).then(res => {
        if (res.data.code == 200) {
          Toast("加入购物车成功");
        }
        if (res.data.code == 0) {
          Toast("库存不足");
        }
      });
    },
    shoucang(index) {
      console.log(index);
      if (this.bottom[index].is_collectiongoods == 0) {
        request({
          url: "api/users/collectiongoods",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            goods_id: this.bottom[index].id
          }
        })
          .then(res => {
            //consoleog(res)
            if (res.data.code == 200) {
              // debugger;
              Toast("收藏成功");
              this.Shop();
            } else {
              Toast("收藏失败");
            }
          })
          .catch(err => {
            Toast("网络连接中断");
          });
      }
      if (this.bottom[index].is_collectiongoods == 1) {
        request({
          url: "api/users/delcgoods",
          method: "post",
          data: {
            user_id: this.$store.state.username.id,
            goods_id: this.bottom[index].id
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              Toast("取消收藏");
              this.Shop();
            } else {
              Toast("取消收藏失败");
            }
          })
          .catch(err => {
            Toast("网络连接中断");
          });
      }
    },
    dphd() {
      this.$router.push({
        name: "dphd"
      });
    }
  },
  components: {
    Tab,
    Tabs
  },
  mounted() {
    this.shop_id =
      JSON.parse(window.localStorage.getItem("DP")) ||
      this.$route.query.shop_id;
    console.log(this.$route.query);
    this.token = this.$route.query.token;
    if (this.token == 36) {
      window.sessionStorage.setItem("DDP", 36);
    }
    this.goods_id = this.$route.query.goods_id;
    this.z = this.$route.query.a;
    this.x = this.$route.query.b;
    this.mo = this.$route.query.mo;
    this.Shop();
    this.zuixin();
  }
};
</script>

<style lang="less" scoped>
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
}

.box .box-container::-webkit-scrollbar {
  display: none;
}

.nav {
  background-image: url(../../../assets/shangchang_beijingg.png);
  width: 7.5rem;
  height: 2.8rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.nav-top {
  width: 100%;
  height: 0.8rem;
  line-height: 1rem;
  text-align: left;
  padding: 0.2rem 0.2rem 0 0.2rem;
}

.nav-top div {
  display: inline-block;
  width: 5rem;
  height: 0.66rem;
  background: white;
  border-radius: 30px;
  margin-left: 0.2rem;
  position: relative;
  bottom: 0.05rem;
  margin-right: 0.4rem;
}

.nav-top div span {
  color: #777777;
  position: relative;
  font-size: 0.28rem;
  bottom: 0.15rem;
  left: 0.2rem;
}

.nav-top-back {
  background-image: url(../../../assets/shangjiaye_xialakuang.png);
  width: 2.9rem;
  height: 4.11rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0.4rem;
  z-index: 999;
  padding-top: 0.4rem;
}

.nav-top-back p {
  width: 2.5rem;
  height: 0.76rem;
  line-height: 0.76rem;
  font-size: 0.3rem;
  color: #ffffff;
}

.nav-bottom {
  width: 7.5rem;
  color: black;
  position: relative;
  background-color: white;
  padding-bottom: 0.15rem;
  margin-bottom: 0.2rem;
}

.nav-bottom-img {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  left: 50%;
  margin-left: -0.6rem;
  top: -0.6rem;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.29);
  border-radius: 5px;
  border-radius: 0.15rem;
  overflow: hidden;
  background-color: white;
}

.nav-bottom div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.nav-bottom > div:nth-child(2) {
  padding-top: 0.8rem;
}

.nav-bottom div:nth-child(2) p:nth-child(1) {
  font-size: 0.36rem;
  font-weight: 500;
  text-align: center;
}

.nav-bottom div:nth-child(2) p:nth-child(2) {
  font-size: 0.2rem;
  font-weight: 500;
  text-align: center;
  color: #333333;
  margin-top: 0.1rem;
}

.nav-bottom div:nth-child(2) p:nth-child(2) span {
  margin-left: 0.15rem;
}

.nav-bottom-div {
  width: 6.5rem;
  // height: 0.3rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  margin-top: 0.29rem;
}

.nav-bottom-div span {
  color: #ef0600;
}

.nav-bottom-two {
  width: 4.5rem;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem auto;
}

.nav-bottom-two div:nth-child(1) {
  width: 1.6rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.24rem;
  border: 1px solid rgba(119, 119, 119, 1);
  color: #777777;
}

.nav-bottom-two div:nth-child(2) {
  width: 1.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.24rem;
  color: #ef0600;
  border: 1px solid rgba(239, 6, 0, 1);
}

.van-tab__pane {
  position: relative;
  top: 0.1rem;
}

.concat {
  width: 7.5rem;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

.concat > div {
  width: 3.47rem;
  height: 5rem;
  border-radius: 10px;
  background: #ffffff;
  margin: 0.15rem 0.14rem;
  text-align: left;
  position: relative;
  box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
}

.ph {
  width: 3.46rem !important;
  height: 3.46rem !important;
  display: table-cell;
  vertical-align: middle;
  position: relative;
}

.ph img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}

.concat-title {
  margin-top: 0.15rem;
  padding: 0 0.15rem;
  font-size: 0.26rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
}

.concat-name {
  display: inline-block;
  padding: 0 0.15rem;
  background: rgba(255, 188, 186, 1);
  font-size: 0.22rem;
  color: #ef0600;
  margin-left: 0.15rem;
  margin-top: 0.2rem;
}

.concat-money {
  height: 0.5rem;
  width: 2.7rem;
  line-height: 0.8rem;
  padding: 0 0.2rem;
  color: #ef0600;
  position: absolute;
  bottom: 0.32rem;
}

.concat-money span {
  line-height: 0.6rem;
  font-size: 0.28rem;
  color: #ef0600;
  font-weight: bold;
}
/deep/.concat-money i {
  position: absolute;
  right: 0rem;
  bottom: 0.1rem;
}
.concat-browes {
  padding: 0 0.2rem;
  font-size: 0.2rem;
  color: #777777;
  height: 0.5rem;
  line-height: 0.5rem;
  position: absolute;
  bottom: 0rem;
  left: -0.13rem;
}
/deep/ .concat-browes i {
}
.concat-browes span {
  float: right;
  height: 0.5rem;
  line-height: 0.5rem;
}

.ph-rei {
  width: 0.5rem !important;
  height: 0.5rem !important;
  position: absolute;
  top: -0.15rem;
  left: 0;
  background: rgba(0, 0, 0, 0) !important;
}

.ph-rei span {
  position: absolute;
  top: 0;
  left: 0.05rem;
  color: white;
}

.footer {
  width: 7.5rem;
  height: 0.88rem;
  position: fixed;
  bottom: 0;
  background: white;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.26);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer p {
  height: 0.6rem;
  display: inline-block;
  font-size: 0.3rem;
  margin-top: 0.08rem;
}

.footer p span {
  position: relative;
  top: 0.1rem;
}

.sanjiao {
  position: absolute;
  top: 0.33rem;
  right: 0.8rem;
  z-index: 9999;
}

.sanjiao img {
  width: 0.13rem;
  height: 0.2rem;
}
</style>
