<template>
  <div class="box">
    <div class="box-container">
      <div class="nav">
        <img src="../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
        <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" /> -->
        <p>消息</p>
      </div>
      <div style="height: 0.88rem"></div>
      <section v-if="dataList.length!=0">
        <dl class="xi" @click="xiaoxi()">
          <dt>
            <div id="xTou">
              <img src="../../assets/xitong.png" alt />
            </div>
          </dt>
          <dd>
            <p>
              <span style="font-weight: bold;font-size: 0.29rem;">系统消息</span>
              <span class="time">{{time}}</span>
            </p>
            <div class="news">
              <p
                style="width: 4.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              >{{dataList.title}}</p>
              <p></p>
            </div>
          </dd>
        </dl>
        <div style="width: 100%;height: 0.4rem;background: #F9F9F8;"></div>
      </section>
      <dl class="xi" v-for="(item,index) in resList" :key="index" @click="xi(index)">
        <dt>
          <div id="sjTou">
            <img :src="item.shoplogo" alt />
          </div>
        </dt>
        <dd>
          <p>
            <span style="font-weight: bold;font-size: 0.29rem;">{{item.name}}</span>
            <span class="time">{{item.add_time}}</span>
          </p>
          <div class="news">
            <p
              style="width: 4.5rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{item.msg}}</p>
            <p v-show="item.no_read!=0"></p>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "news",
  data() {
    return {
      dataList: [],
      resList: [],
      timelist: [],
      token: this.$route.query.token,
      id: "",
      time: ""
    };
  },
  methods: {
    fh() {
      console.log(this.token);
      if (this.token == 1) {
        this.$router.push({
          name: "mar"
        });
      } else if (this.token == 2) {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: this.id,
            token: this.token
          }
        });
      } else if (this.token == 3) {
        this.$router.push({
          name: "Shop"
        });
      } else if (this.token == 4) {
        this.$router.push({
          name: "My"
        });
      } else if (this.token == 80) {
        this.$router.push({
          name: "seek"
        });
      } else {
        this.$router.go(-1);
      }
    },
    xiaoxi() {
      this.$router.push({
        name: "xiaoxi"
      });
    },
    xi(index) {
      console.log(this.resList[index].uid.split("shop")[1]);
      console.log(this.resList[index].id);

      this.$router.push({
        name: "kf",
        query: {
          sid: this.resList[index].uid.split("shop")[1],
          token: 90,
          name: this.resList[index].name,
          listId: this.resList[index].id
        }
      });
    },
    // 转码
    utf16toEntities(str) {
      var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
      str = str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
          H = char.charCodeAt(0); // 取出高位
          L = char.charCodeAt(1); // 取出低位
          code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
          return "&#" + code + ";";
        } else {
          return char;
        }
      });
      return str;
    },
    // 解码
    uncodeUtf16(str) {
      var reg = /\&#.*?;/g;
      var result = str.replace(reg, function(char) {
        var H, L, code;
        if (char.length == 9) {
          code = parseInt(char.match(/[0-9]+/g));
          H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
          L = ((code - 0x10000) % 0x400) + 0xdc00;
          return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
        } else {
          return char;
        }
      });
      return result;
    }
  },
  mounted() {
    request({
      url: "api/information/index", //系统消息的接口
      data: {
        user_id: this.$store.state.username.id
      },
      method: "post"
    }).then(res => {
      console.log(res);
      if (res.data.code == 200 && res.data.data.length > 0) {
        this.dataList = res.data.data[0];
        this.time = res.data.data[0].add_time;
        //今天
        var day2 = new Date();
        day2.setTime(day2.getTime());
        var ri = day2.getDate();
        if (ri < 10) {
          ri = "0" + ri;
        } else {
          ri = ri;
        }
        var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + ri;
        //昨天
        var day1 = new Date();
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
        var riq = day1.getDate();
        if (riq < 10) {
          riq = "0" + ri;
        } else {
          riq = riq;
        }
        var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + riq;
        if (this.time.substring(0, 10) === s2) {
          this.time = "今天" + this.time.substring(10);
        } else if (this.time.substring(0, 10) === s1) {
          this.time = "昨天" + this.time.substring(10);
        } else {
          this.time = this.time.substring(5);
        }
      }
    });
    request({
      url: "api/char/message_log", //商家消息的接口
      data: {
        userid: this.$store.state.username.id
      },
      method: "post"
    }).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        console.log(res.data.data);
        for (var i in res.data.data) {
          res.data.data[i].msg = this.uncodeUtf16(res.data.data[i].msg);
        }
        this.resList = res.data.data;
      }
    });
    this.token = this.$route.query.token;
    this.id = this.$route.query.id;
  }
};
</script>

<style lang="less"  scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
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
  background: #ffffff;
  line-height: 0.88rem;
  text-align: center;
  position: fixed;
  border-bottom: 1px solid #f7f7f7;
  top: 0rem;
  z-index: 8888;
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
.hint {
  margin-top: 4rem;
  font-size: 0.28rem;
  position: relative;
  top: 0.88rem;
}
.hint img {
  width: 3.4rem;
  height: 2rem;
}
.concat {
  width: 6.9rem;
  border-bottom: 1px solid #eeeeee;
  margin: 0rem auto;
}
.concat p {
  font-size: 0.3rem;
  color: #333333;
  text-align: left;
  height: 0.7rem;
  line-height: 0.7rem;
}
.concat p:nth-child(2) {
  font-size: 0.24rem;
  color: #777777;
  text-align: left;
  height: 0.4rem;
  line-height: 0.4rem;
}
.concat p:nth-child(3) {
  font-size: 0.24rem;
  color: #333333;
  text-align: right;
  height: 0.4rem;
  line-height: 0.4rem;
}
.xi {
  font-size: 0.25rem;
  display: flex;
  text-align: left;
  margin-top: 0.15rem;
  padding: 0 0.1rem;
}
.xi dt {
  margin: 0 0.3rem 0 0.15rem;
  
}
.xi dt img {
  width: 120%;
  height: 100%;
  position: relative;
  left: -0.1rem;
}
#sjTou {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  overflow: hidden;
}
#xTou {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.1rem;
}
#xTou img {
  width: 100%;
  height: 100%;
  left: 0;
}
.xi dd {
  flex: 4;
  position: relative;
}
.xi dd p {
  margin-bottom: 0.25rem;
}
.news {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.12rem;
}
.news > p:last-child {
  width: 0.13rem;
  height: 0.13rem;
  border-radius: 50%;
  background: red;
}
.time {
  position: absolute;
  right: 0.1rem;
}
</style>
