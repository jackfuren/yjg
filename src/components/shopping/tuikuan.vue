<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <img src="../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
        <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem"/> -->
        <p>退款/售后</p>
      </div>
      <div class="concat-there" v-if="listData.length == 0 ? true : false">
        <img src="../../assets/liulamjilukong.png" alt />
        <p>当前暂无退款商品</p>
      </div>
      <div class="concat" v-for="(item ,index) in listData " :key="index">
        <div class="concat-div" @click="dpLink(index)">
          <img src="../../assets/gouwuche_icon.png" alt />
          <span>{{item.name}}</span>
          <van-icon name="arrow" />
        </div>
        <div class="concat-div-one">
          <div class="concat-div-two" @click="wpLink(index)">
            <div class="concat-div-there">
              <img :src="item.headimg" alt />
            </div>
            <div class="concat-div-five">
              <p>{{item.title}}</p>
              <p>{{item.specification}}</p>
              <span>x{{item.num}}</span>
            </div>
          </div>
          <div class="concat-div-six">
            <img src="../../assets/tuikuanx.png" alt />
            <span>{{item.add_time}}</span>
          </div>
        </div>
        <p class="concat-p" v-show="item.status == 0 ? true:false">等待审核</p>
        <p class="concat-p" v-show="item.status == 1 ? true:false">审核失败</p>
        <p class="concat-p" v-show="item.status == 2 ? true:false">审核通过</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tuikuan",
  data() {
    return {
      listData: []
    };
  },
  methods: {
    fh() {
      this.$router.push({
        name: "My"
      });
    },
    Gain() {
      this.request({
        url: "api/order/aftersale",
        method: "post",
        data: {
          user_id: this.$store.state.username.id
        }
      }).then(res => {
        console.log(res);
        this.listData = res.data.data;
      });
    },
    wpLink(i) {
      this.$router.push({
        name: "wpxq",
        query: {
          goods_id: this.listData[i].gid,
          price: this.listData[i].price,
          token: 100
        }
      });
    },
    dpLink(i) {
      this.$router.push({
        name: "dpxq",
        query: {
          token: this.token,
          shop_id: this.listData[i].sid
        }
      });
    }
  },
  mounted() {
    this.Gain();
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
.concat-there {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 0.28rem;
  color: #333333;
}

.concat-there img {
  width: 3.4rem;
  height: 2.2rem;
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
  width: 0.55rem;
  position: absolute;
  left: 0.25rem;
  top: 0.2rem;
}

.concat {
  width: 6.5rem;
  height: 2.9rem;
  background: #ffffff;
  margin: 0.2rem auto;
  border-radius: 10px;
  padding: 0.2rem;
}

.concat-div {
  width: 6.5rem;
  height: 0.28rem;
  text-align: left;
  line-height: 0.28rem;
  font-size: 0.24rem;
}

.concat-div img {
  width: 0.3rem;
  height: 0.28rem;
}

.concat-div span {
  margin-bottom: 0.1rem;
  position: relative;
  top: -0.03rem;
}

.concat-div-one {
  height: 1.8rem;
  padding-top: 0.2rem;
  width: 6.5rem;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
}

.concat-div-two {
  display: flex;
}

.concat-div-there {
  width: 1rem;
  height: 1rem;
  display: table-cell;
  vertical-align: middle;
  position: relative;
}

.concat-div-there img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}

.concat-div-five {
  width: 5.3rem;
  height: 1rem;
  margin-left: 0.2rem;
  text-align: left;
  position: relative;
}

.concat-div-five p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 0.24rem;
  width: 4.4rem;
}

.concat-div-five span {
  position: absolute;
  right: 0.2rem;
  top: 0.15rem;
  font-size: 0.24rem;
  color: #777777;
}

.concat-div-five p:nth-child(2) {
  color: #777777;
  font-size: 0.24rem;
  margin-top: 0.1rem;
}

.concat-div-six {
  width: 6.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: left;
  margin-top: 0.15rem;
}

.concat-div-six img {
  width: 0.35rem;
  height: 0.35rem;
  position: relative;
  top: 0.075rem;
}

.concat-div-six span {
  font-size: 0.24rem;
  color: #333333;
}

.concat-p {
  font-size: 0.3rem;
  color: #ef0600;
  margin-top: 0.16rem;
}
</style>
