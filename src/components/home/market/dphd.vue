<template>
  <div class="box">
    <div class="box-container">
      <!-- 头部-->
      <div class="nav">
        <div class="nav-top">
          <img
            src="../../../assets/img/fan.png"
            @click="fh()"
            style="margin-top: 0.1rem;width: 0.55rem;"
            alt
          />
          <p>{{title}}</p>
          <div>
            <img
              src="../../../assets/img/cai.png"
              @click="back =!back"
              style="width:0.4rem;float: right;margin-right: 0.55rem;margin-top: 0.1rem"
              alt
            />
            <van-icon
              @click="Search()"
              color="#333333"
              name="search"
              size="0.6rem"
              style=" float:right;margin-right: 0.1rem;margin-top: 0.1rem"
            />
          </div>
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
      <van-tabs
        title-active-color="#EF0A05"
        v-model="active"
        @click="onClick"
        :swipe-threshold="swipe"
      >
        <van-tab title="新品">
          <div class="concat">
            <div v-for="(item,index) in spList" :key="index" @click="spLink(item.id)">
              <img :src="item.headimg" alt />
              <div class="cont">
                <p>{{item.title}}</p>
                <div class="price">
                  <div>
                    ￥
                    <span>{{item.price}}</span>
                    <s style="font-size:0.2rem;color:#777777;">{{item.original_price}}</s>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="热销">
          <div class="concat">
            <div v-for="(item,index) in spList" :key="index" @click="spLink(item.id)">
              <img :src="item.headimg" alt />
              <div class="cont">
                <p>{{item.title}}</p>
                <div class="price">
                  <div>
                    ￥
                    <span>{{item.price}}</span>
                    <s style="font-size:0.2rem;color:#777777;">{{item.original_price}}</s>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="促销">
          <div class="concat">
            <div v-for="(item,index) in spList" :key="index" @click="spLink(item.id)">
              <img :src="item.headimg" alt />
              <div class="cont">
                <p>{{item.title}}</p>
                <div class="price">
                  <div>
                    ￥
                    <span>{{item.price}}</span>
                    <s style="font-size:0.2rem;color:#777777;">{{item.original_price}}</s>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="清仓">
          <div class="concat">
            <div v-for="(item,index) in spList" :key="index" @click="spLink(item.id)">
              <img :src="item.headimg" alt />
              <div class="cont">
                <p>{{item.title}}</p>
                <div class="price">
                  <div>
                    ￥
                    <span>{{item.price}}</span>
                    <s style="font-size:0.2rem;color:#777777;">{{item.original_price}}</s>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="品牌">
          <div class="concat-p">
            <div v-for="(item,index) in spList" :key="index" @click="ppLink(item.id)">
              <img :src="item.pic" alt />
              <div class="cont-p">
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
      back: false,
      active: 0,
      swipe: 5,
      spList: [],
      type: 0,
      title: this.$route.query.title
    };
  },
  methods: {
    fh() {
      this.$router.go(-1);
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
    Search() {
      this.$router.push({
        name: "seek"
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
    onClick(index, name) {
      this.type = index;

      this.huodong();
    },
    huodong() {
      this.type = this.type + 1;
      console.log(this.type);
      request({
        url: "api/shop/shopGoodsType",
        method: "post",
        data: {
          shopid: this.$route.query.id,
          type: this.type
        }
      }).then(res => {
        console.log(res);
        this.spList = res.data.data;
      });
    },
    spLink(gid) {
      this.$router.push({
        name: "wpxq",
        query: {
          goods_id: gid
        }
      });
    },
    ppLink(pid) {
      this.$router.push({
        name: "pinpaixq",
        query: {
          pinpai: pid,
          token: 5
        }
      });
    }
  },
  mounted() {
    this.huodong();
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
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  background-color: white;
  border-bottom: 1px solid #f7f7f7;
}

.nav-top {
  width: 100%;
  height: 0.8rem;
  line-height: 1rem;
  text-align: left;
  padding: 0.2rem 0.2rem 0 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.3rem;
}
.nav-top p {
  position: relative;
  left: 0.5rem;
}
.nav-top div span {
  color: #777777;
  font-size: 0.28rem;
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

.van-tab__pane {
  position: relative;
  top: 0.2rem;
  padding: 0.15rem;
  text-align: left;
}
.concat {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.concat > div {
  width: 49%;
  box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.18rem;
  box-sizing: border-box;
}
.concat > div img {
  width: 100%;
}
.cont,
.cont-p {
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.cont > p,
.cont-p > p {
  min-width: 100%;
  font-size: 0.26rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.price {
  margin-top: 0.25rem;
  font-size: 0.2rem;
}
.price div:nth-child(1) {
  color: red;
}
.price span {
  font-size: 0.3rem;
}
.concat-p > div {
  width: 33%;
  box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.18rem;
  box-sizing: border-box;
}
.concat-p > div img {
  width: 100%;
}
</style>
