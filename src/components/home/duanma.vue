<template>
  <div class="box">
    <div class="box-container">
      <div id="n"></div>
      <div class="nav">
        <img src="../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
        <!-- <van-icon @click="fh()" class="nav-left" color="#333333" name="arrow-left" size="0.5rem"/> -->
        <p>断码清仓</p>
        <img src="../../assets/img/cai.png" @click="dd()" class="nav-van" alt />
        <!-- <van-icon @click="dd()" name="wap-nav" size="0.4rem" class="nav-van"/> -->
        <div v-show="rapid" class="nav-top-back">
          <p @click="xiaoxi">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.09rem;right: 0.3rem"
              src="../../assets/shangjiaye_wuxiaoxi.png"
              alt
            />
            <span>消息</span>
          </p>
          <p @click="shop">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.2rem"
              src="../../assets/shangjaiyetanchuang_gouwuche.png"
              alt
            />
            <span style="position: relative;left: 0.14rem">购物车</span>
          </p>
          <p @click="homm">
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.3rem"
              src="../../assets/shangjiayetanchuang_shouyee.png"
              alt
            />
            <span>首页</span>
          </p>
          <p>
            <img
              style="width: 0.4rem;height: 0.4rem;position: relative;top: 0.05rem;right: 0.26rem"
              src="../../assets/shangjaiye_fenxiang.png"
              alt
            />
            <span style="position: relative;left: -0.02rem;bottom: 0.04rem">分享</span>
          </p>
        </div>
      </div>
      <div class="all">
        <div>
          <p :class="{p : 1 ===num}" @click="skip(1)">单品</p>
        </div>
        <div>
          <p :class="{p : 2 ===num}" @click="skip(2)">品牌</p>
        </div>
      </div>

      <div v-if="left" class="all-div">
        <div class="product">
          <div
            class="product-div"
            v-for="(item,index) in dataList"
            :key="index"
            @click="details(item.id)"
          >
            <div>
              <img :src="item.headimg" alt />
            </div>
            <p>{{item.title}}</p>
            <p>品牌名称</p>
            <div class="price">
              <p>
                ￥
                <span>{{item.price}}</span>
              </p>
              <p>￥{{item.original_price}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="right" class="all-div-two">
        <div class="all-div-two-two" v-for="(item,index) in arrList" :key="index">
          <div class="all-div-two-one">
            <div class="dianpuD">
              <div class="all-div-two-one-div">
                <img :src="item.pic" alt />
              </div>
              <span>{{item.title}}</span>
            </div>
            <div class="enterD">进店</div>
          </div>
          <div class="brand-div-div-one">
            <div
              style="width: 2.2rem;margin-bottom:0 0.05rem 0.2rem 0.05rem"
              v-for="(ite,index) in item.goods"
              :key="index"
              @click="details(ite.id)"
            >
              <div class="brand-div-div-div">
                <img :src="ite.headimg" alt />
              </div>
              <p>{{ite.title}}</p>
              <p>
                ￥
                <span>{{ite.price}}</span>
                <span>￥{{ite.original_price}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "duanma",
  data() {
    return {
      num: 1,
      left: true,
      right: false,
      dataList: [],
      arrList: [],
      mo: 1,
      rapid: false
    };
  },
  methods: {
    fh() {
      this.$router.push({
        name: "home"
      });
    },
    skip(i) {
      //console.log(i)
      if (i == 1) {
        this.mo = 1;
        this.left = true;
        this.right = false;
      }
      if (i == 2) {
        this.mo = 2;
        this.left = false;
        this.right = true;
      }
      this.num = i;
    },
    brand() {
      this.request({
        url: "api/brand/dmgoods", //清仓商品
        method: "post"
      }).then(res => {
        //consoleog(res)
        this.dataList = res.data.data;
        //consoleog(res.data.data)
      });
      this.request({
        url: "api/brand/dmbrandgoods", //清仓品牌
        method: "post"
      }).then(res => {
        //consoleog(res)
        this.arrList = res.data.data;
        console.log(res.data.data);
      });
    },
    details(i) {
      this.$router.push({
        name: "wpxq",
        query: {
          goods_id: i,
          token: 34,
          mo: this.mo
        }
      });
    },
    xiaoxi() {
      if (this.$store.state.username == null) {
        this.$router.push({
          name: "regi"
        });
      } else {
        this.$router.push({
          name: "news",
          query: {
            token: this.token,
            id: this.goods_id
          }
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
    dd() {
      this.rapid = !this.rapid;
    }
  },
  mounted() {
    this.brand();

    this.mo = this.$route.query.mo;
    if (this.mo == null) {
      this.skip(1);
    } else {
      this.skip(this.mo);
    }
  }
};
</script>

<style scoped>
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
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  position: fixed;
  background: white;
  top: 0;
  z-index: 99999;
}

.nav p {
  font-size: 0.36rem;
  font-weight: 500;
  color: black;
}

.nav-left {
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
  clear: both;
  width: 0.55rem;
  z-index: 99999;
}

.nav-van {
  position: absolute;
  right: 0.3rem;
  top: 0.25rem;
  width: 0.4rem;
}
.nav-top-back {
  background-image: url(../../assets/shangjiaye_xialakuang.png);
  width: 2.9rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed;
  right: 0.26rem;
  top: 0.6rem;
  padding: 0.35rem 0 0.2rem;
}

.nav-top-back p {
  width: 2.5rem;
  height: 0.76rem;
  line-height: 0.76rem;
  font-size: 0.3rem;
  color: #ffffff;
}
.all {
  width: 7.5rem;
  display: flex;
  background: white;
  position: fixed;
  top: 0.88rem;
  z-index: 999;
}

.all div {
  width: 3.75rem;
  height: 0.6rem;
  text-align: center;
}

.all p {
  display: inline-block;
  font-size: 0.28rem;
  height: 0.6rem;
  line-height: 0.6rem;
}

.p {
  border-bottom: 1.5px solid #ef0600;
  color: #ef0600;
}

.all-div {
  width: 7.1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f7f7f7;
}

.product {
  width: 7.1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  top: 1.5rem;
}

.product-div {
  width: 3.46rem;
  height: 5.44rem;
  box-shadow: 0px 0px 9px 0px rgba(51, 51, 51, 0.22);
  border-radius: 0.1rem;
  position: relative;
  margin-bottom: 0.2rem;
}

.product-div>div:nth-child(1) {
  width: 3.46rem;
  height: 3.46rem;
  display: table-cell;
  vertical-align: middle;
}

.product-div img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}

.product-div>p:nth-child(2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 0.63rem;
  font-size: 0.28rem;
  line-height: 0.35rem;
  width: 3.2rem;
  position: absolute;
  bottom: 1.25rem;
  left: 0.15rem;
}

.product-div p:nth-child(3) {
  font-size: 0.24rem;
  color: #ffa32a;
  border: 1px solid #ffa32a;
  height: 0.32rem;
  line-height: 0.32rem;
  padding: 0 0.05rem;
  position: absolute;
  left: 0.2rem;
  bottom: 0.75rem;
}
.price{
  width: 100%;
  height: 0.55rem;
  display: flex;
  align-items: flex-end;
  padding: 0 0.12rem;
  box-sizing: border-box;
  position: relative;
  top: 1.3rem;
}

.price p:nth-child(1) {
  font-size: 0.24rem;
  color: #ef0600;
  margin-right: 0.05rem;
}

.price>p:nth-child(1) span {
  font-size: 0.36rem;
}

.price>p:nth-child(2) {
  font-size: 0.2rem;
  color: #777777;
  text-decoration: line-through;
}

.all-div-two {
  width: 7.5rem;
  position: relative;
  top: 1.7rem;
}

.all-div-two-two {
  width: 7.5rem;
  height: 4.3rem;
  margin-bottom: 0.2rem;
  background: white;
}

.all-div-two-one {
  width: 6.9 rem;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.2rem 0.3rem;
  text-align: left;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.dianpuD {
  display: flex;
  align-items: center;
}
.enterD {
  width: 0.9rem;
  border: 1px solid rgba(239, 6, 0, 1);
  border-radius: 20px;
  font-size: 0.25rem;
  color: #ef0600;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
}

.all-div-two-one img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}

.all-div-two-one-div {
  width: 0.6rem;
  height: 0.6rem;
  display: table-cell;
  vertical-align: middle;
  background: #f7f7f7;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.08);
  margin-right: 0.2rem;
}

.all-div-two-one span {
  font-size: 0.28rem;
  color: #333333;
}

.brand-div-div-one {
  padding: 0 0.3rem;
  width: 6.9rem;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.brand-div-div-one > div {
  margin: 0 0.05rem;
}

.brand-div-div-div {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.1rem;
  display: table-cell;
  vertical-align: middle;
  position: relative;
}

.brand-div-div-div img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  border-radius: 0.1rem;
}

.brand-div-div-one p:nth-child(2) {
  width: 2.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.24rem;
  margin-top: 0.13rem;
}

.brand-div-div-one p:nth-child(3) {
  font-size: 0.24rem;
  color: #ef0600;
  text-align: center;
  margin-top: 0.1rem;
}

.brand-div-div-one p:nth-child(3) span:nth-child(1) {
  font-size: 0.3rem;
}

.brand-div-div-one p:nth-child(3) span:nth-child(2) {
  font-size: 0.2rem;
  color: #cccccc;
  text-decoration: line-through;
}
</style>
