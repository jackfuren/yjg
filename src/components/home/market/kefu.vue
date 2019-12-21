<template>
  <div class="box">
    <div class="nav">
      <img src="../../../assets/img/fan.png" @click="fh()" class="nav-left" alt />
      <!-- <van-icon @click="fh()" class="nav-left" name="arrow-left" size="0.5rem" /> -->
      <p class="name">{{name}}</p>
      <p class="pu" @click="dianpuLink">店铺</p>
    </div>

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :class="{'showF':show,'showH':showH}"
      id="chatContent"
    >
      <!-- 下拉刷新 -->
      <section>
        <div id="chattingWord " style="text-align: left;background: #F7F7F7;margin-bottom:0.6rem;">
          <!--  商品信息->发送给客服  -->
          <section>
            <section>
              <div class="masg" style="width:100%;">
                <div class="masgDiv" v-for="(item, index) in chatS" :key="index">
                  <p class="time" v-if="item.showTime==true">{{item.add_time}}</p>
                  <!-- 自己 -->
                  <div v-if="item.uid == uid" class>
                    <van-row>
                      <van-col span="4">&nbsp;</van-col>
                      <van-col span="16">
                        <div
                          v-if="item.type === 0 && item.content!=infooUid"
                          class="masgContent masgContentMy"
                        >
                          <p>{{item.content}}</p>
                        </div>
                        <div v-if="item.type === 1" class="masgContent masgContentMyImg">
                          <img :src="item.content" alt @click="yulan(item.yuLanInd)" />
                        </div>
                        <div v-if="item.content===infooUid" @click="link">
                          <div class="comm">
                            <img :src="img" alt />
                            <div>
                              <p class="ti">{{title}}</p>
                              <p class="money">￥{{money}}</p>
                            </div>
                          </div>
                        </div>
                      </van-col>
                      <van-col span="4">
                        <div class="touXiang">
                          <img :src="tou" alt />
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <!-- 对方 -->
                  <div v-else class>
                    <van-row>
                      <van-col span="4">
                        <div class="touXiang">
                          <img src="../../../assets/gggggg.png" alt />
                        </div>
                      </van-col>
                      <van-col span="16">
                        <div
                          v-if="item.type===0"
                          class="masgContent masgContentYou"
                        >{{item.content}}</div>
                        <div v-if="item.type===1" class="masgContent masgContentYouImg">
                          <img :src="item.content" alt @click="yulan(item.yuLanInd)" />
                        </div>
                      </van-col>
                      <van-col span="4">&nbsp;</van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section>
            <section v-if="token==90 ? false : true ">
              <div v-if="productShow==true">
                <p class="time">今天 {{enterTime}}</p>
                <div class="commodity">
                  <dt>
                    <img :src="img" alt />
                  </dt>
                  <dd>
                    <div>
                      <p class="ti">{{title}}</p>
                      <p class="money">￥{{money}}</p>
                    </div>

                    <p class="send" @click="song()">发给商家</p>
                  </dd>
                </div>
              </div>
            </section>
            <section>
              <div class="masg" style="width:100%;">
                <div class="masgDiv" v-for="(item, index) in chatB" :key="index">
                  <p class="time" v-if="item.showTime==true">{{item.add_time}}</p>
                  <!-- 自己 -->
                  <div v-if="item.uid == uid" class>
                    <van-row>
                      <van-col span="4">&nbsp;</van-col>
                      <van-col span="16">
                        <div
                          v-if="item.type === 0 && item.content!=infooUid"
                          class="masgContent masgContentMy"
                        >
                          <p>{{item.content}}</p>
                        </div>
                        <div v-if="item.type === 1" class="masgContent masgContentMyImg">
                          <img :src="item.content" alt @click="yulan(item.yuLanInd)" />
                        </div>
                        <div v-if="item.content===infooUid" @click="link">
                          <div class="comm">
                            <img :src="img" alt />
                            <div>
                              <p class="ti">{{title}}</p>
                              <p class="money">￥{{money}}</p>
                            </div>
                          </div>
                        </div>
                      </van-col>
                      <van-col span="4">
                        <div class="touXiang">
                          <img :src="tou" alt />
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <!-- 对方 -->
                  <div v-else class>
                    <van-row>
                      <van-col span="4">
                        <div class="touXiang">
                          <img src="../../../assets/gggggg.png" alt />
                        </div>
                      </van-col>
                      <van-col span="16">
                        <div
                          v-if="item.type===0"
                          class="masgContent masgContentYou"
                        >{{item.content}}</div>
                        <div v-if="item.type===1" class="masgContent masgContentYouImg">
                          <img :src="item.content" alt @click="yulan(item.yuLanInd)" />
                        </div>
                      </van-col>
                      <van-col span="4">&nbsp;</van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </section>
    </van-pull-refresh>

    <div class="tabBar">
      <van-row class="shu" type="flex" justify="center">
        <!-- 此处如果需要左侧语音输入按钮，将此处注释解开，把输入框中18改为15，换掉中间图标 -->

        <van-col span="3" class="flexBox" id="yuyin">
          <img @click="yu()" v-if="yuyin==0?true:false" src="../../../assets/yuyin.png" alt />
          <img @click="jian()" v-if="yuyin==1?true:false" src="../../../assets/jianpan.png" alt />
        </van-col>
        <van-col v-if="text === ''" span="20" class="inputTxt">
          <div @touchstart="luzhi()" @touchend="jieshu()" class="an" v-if="yuyin==1?true:false">按住说话</div>
          <div id="text" v-if="yuyin==0?true:false">
            <textarea type="text" v-model="text" @focus="huoqu" rows="1"></textarea>
          </div>
          <img src="../../../assets/biaoq.png" @click="faceContent()" alt />
        </van-col>
        <van-col v-else span="18" class="inputTxt">
          <div id="text">
            <textarea type="text" v-model="text" rows="1" id="as" @input="as" @focus="huoqu"></textarea>
          </div>

          <img src="../../../assets/biaoq.png" @click="faceContent()" alt />
        </van-col>
        <van-col v-if="text === ''" span="3" class="flexBox">
          <van-uploader :after-read="onRead" :before-read="beforeRead">
            <img class="flexBoxImg" src="../../../assets/iiii.png" alt />
          </van-uploader>
        </van-col>
        <van-col v-else span="5" class="flexBox">
          <div>
            <van-button plain type="info" @click="send()" size="mini">发送</van-button>
          </div>
        </van-col>
      </van-row>
      <!-- 小表情弹出层 -->
      <transition name="show">
        <div class="browBox" v-if="show">
          <ul>
            <li v-for="(item,index) in faceList" :key="index" @click="getBrow(index)">{{item}}</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Recorderx, { ENCODE_TYPE } from "recorderx";
const rc = new Recorderx();
import Vue from "vue";
import { Toast, ImagePreview } from "vant";
Vue.use(ImagePreview);
const appData = require("../../utils/emojis.json");
import { getNowTime } from "../../utils/getNowTime";
import request from "../../utils/request";
export default {
  data() {
    return {
      user_id: this.$store.state.username.id,
      yuyin: 0, //判断麦克风的显示
      name: this.$route.query.name,
      path: "ws://121.199.17.119:8282",
      socket: "",
      text: "",
      tou: this.$store.state.username.avatar,
      mag: [], //用户发的消息
      title: this.$route.query.title,
      money: this.$route.query.money,
      img: this.$route.query.img,
      msag: "",
      token: this.$route.query.token,
      maag: [], //商家会的消息
      uid: "user" + this.$store.state.username.id,
      infoUid: this.$route.query.sid,
      infooUid: "shop" + this.$route.query.sid,
      show: false, // 小表情显示区域显示与隐藏
      faceList: [], // json返回数据，即为表情区域展示小表情
      num: 10, // 页面初次展示聊天条数
      isLoading: false, // 下拉刷新,
      goods_id: this.$route.query.goods_id,
      productShow: true,
      enterTime: "",
      chatS: [],
      chatB: [],
      fen: {},
      listId: "",
      showH: false,
      upload: "",
      yulanImg: []
    };
  },
  mounted() {
    this.init();
    this.token = this.$route.query.token;
    if (this.token == 90) {
      this.clear();
    }
    // 进入客服页面的时间
    this.enterTime = getNowTime()
      .split(" ")[2]
      .substring(0, 5);
    this.face();
    // 进入时滚动到底部
    setTimeout(
      function() {
        this.hos();
        setTimeout(
          function() {
            this.scrollBottom();
          }.bind(this),
          400
        );
      }.bind(this),
      800
    );
    // 每个5秒调用一次,用来获取商家发送的消息
    // setInterval(
    //   function() {
    //     this.msglog(this.num);
    //   }.bind(this),
    //   5000
    // );
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    yu() {
      this.yuyin = 1;
      console.log(this.yuyin);
    },
    jian() {
      this.yuyin = 0;
    },
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      var data = eval("(" + msg.data + ")");
      if (data.type == "init") {
        request({
          url: "api/char/bind", //绑定成功
          method: "post",
          data: {
            client_id: data.data.client_id,
            uid: "user" + this.$store.state.username.id
          }
        }).then(res => {
          if (res.status === 200) {
            // console.log(res);
          } else {
            Toast("连接失败，请联系管理员");
          }
        });
        this.msglog(this.num);
      }
      if (data.type == "message") {
        var qq = {
          ct: "",
          ud: ""
        };
        qq.ct = data.msg;
        qq.ud = "shop" + this.infoUid;
        this.mag.push(qq);
      }
    },
    //录制语音
    luzhi() {
      console.log("1111");
      let that = this;
      // that.news_img = !that.news_img
      rc.start()
        .then(() => {
          that.news_img = !that.news_img;
          console.log("start recording");
        })
        .catch(error => {
          Toast("获取麦克风失败");
          console.log("Recording failed.", error);
        });
    },
    //录制结束发送语音
    jieshu() {
      let that = this;
      var wav = rc.getRecord({
        encodeTo: ENCODE_TYPE.WAV,
        compressible: true
      });
      var uuid = this.uuid;
      if (this.chatList != "") {
        var end_time = this.chatList[this.chatList.length - 1].addtime;
      }
      var formData = new FormData();
      // formData.append('file',wav);
      formData.append("topic_id", uuid);
      formData.append("last_time", end_time);
      formData.append("type", 4);
      formData.append("file", wav, Date.parse(new Date()) + ".wav");
      let headers = { headers: { "Content-Type": "multipart/form-data" } };
      axios.defaults.withCredentials = true;
      this.$request({
        url: "api/base/base64video",
        method: "post",
        data: {
          file: formData
        },
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log(res);
          that.news_img = !that.news_img;
          this.content = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取历史就聊天记录
    msglog(num) {
      request({
        url: "api/char/msglog", //历史记录
        method: "post",
        data: {
          num: num,
          page: 1,
          infouid: "shop" + this.infoUid,
          uid: "user" + this.$store.state.username.id
        }
      }).then(res => {
        // uid  我得id infouid  对方id
        if (res.status === 200) {
          for (var i in res.data.data) {
            // 聊天小表情解码
            res.data.data[i].content = this.uncodeUtf16(
              res.data.data[i].content
            );
            // 聊天图片拼接地址
            if (res.data.data[i].type === 1) {
              res.data.data[i].content =
                "http://svn.yanjiegou.com" + res.data.data[i].content;
            }
            // 时间的修改
            if (
              res.data.data[i].add_time.split(" ")[0] ===
              getNowTime().split(" ")[0]
            ) {
              res.data.data[i].add_time = res.data.data[i].add_time.split(
                " "
              )[1];
            }
          }
          this.msag = res.data.data;
          if (this.msag.length > 10) {
            this.productShow = false;
          }
          // 屏幕滚动
          this.scrollBottom();
          // 时间戳判断 超过5分钟 时间戳出现
          if (this.msag.length > 0) {
            //无记录时
            this.msag[0].showTime = true;
          }
          for (var i = 0; i < this.msag.length - 1; i++) {
            var qian = this.msag[i].add_time;
            var hou = this.msag[i + 1].add_time;
            var Qtime = {};
            var Htime = {};
            if (qian.split(" ").length > 1) {
              Qtime = {
                day: qian.split(" ")[0],
                hour: qian.split(" ")[1]
              };
            } else {
              Qtime = {
                day: "jin",
                hour: qian.split(" ")[0]
              };
            }
            if (hou.split(" ").length > 1) {
              Htime = {
                day: hou.split(" ")[0],
                hour: hou.split(" ")[1]
              };
            } else {
              Htime = {
                day: "jin",
                hour: hou.split(" ")[0]
              };
            }

            if (Qtime.day == Htime.day) {
              //日期相同
              if (
                Qtime.hour.split(":")[0] * 1 ===
                Htime.hour.split(":")[0] * 1
              ) {
                //小时相同
                if (
                  Htime.hour.split(":")[1] * 1 - Qtime.hour.split(":")[1] * 1 >=
                  5
                ) {
                  this.msag[i + 1].showTime = true;
                }
              } else if (
                Htime.hour.split(":")[0] * 1 - Qtime.hour.split(":")[0] * 1 <=
                1
              ) {
                // 小时差小于1小时
                if (
                  Htime.hour.split(":")[1] * 1 +
                    60 -
                    Qtime.hour.split(":")[1] * 1 >=
                  5
                ) {
                  // 时间差小于1小时大于5分钟
                  this.msag[i + 1].showTime = true;
                }
              } else {
                // 小时差大于1小时
                this.msag[i + 1].showTime = true;
              }
            } else {
              // 日期不同
              this.msag[i + 1].showTime = true;
            }
          }
          this.scrollBottom();
          this.chatHos();
          // 预览图集合
          var yuLanInd = 1;
          this.yulanImg = [];
          for (var i = 0; i < this.msag.length; i++) {
            console.log(this.msag[i].type);
            if (this.msag[i].type == 1) {
              this.yulanImg.push(this.msag[i].content);
              this.msag[i].yuLanInd = yuLanInd;
              console.log(this.msag[i]);
              yuLanInd++;
            }
          }
          console.log(this.msag);
        }
      });
    },
    send: function() {
      if (this.text === "") {
        Toast({
          message: "输入内容不能为空",
          duration: 800 // 显示毫秒值
        });
      } else {
        this.sendmsg(this.utf16toEntities(this.text), 0);
      }
      this.text = "";
    },
    // 发送消息
    sendmsg(msg, type) {
      request({
        url: "api/char/sendmsg",
        method: "post",
        data: {
          type: type,
          msg: msg,
          infouid: "shop" + this.infoUid,
          uid: "user" + this.$store.state.username.id
        }
      }).then(res => {
        this.socket.send(this.text);
        this.msglog(this.num);
        this.jieshou = !this.jieshou;
      });
    },
    // 下拉刷新，数据待修改
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.num += 10;
        this.msglog(this.num);
      }, 1000);
    },
    // 上传图片之前检测图片格式,大小及类型
    beforeRead(file) {
      var image = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      var flag = false;
      for (var i = 0; i < image.length; i++) {
        if (file.type == image[i]) {
          flag = true;
        }
      }
      if (flag) {
        return flag;
      } else {
        Toast("请上传 jpeg/jpg/png/gif 格式图片");
        return flag;
      }
    },
    onRead(file) {
      var that = this;
      // 图片大小超过1M进行压缩
      if (file.file.size > 1000000) {
        let canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        let context = canvas.getContext("2d");
        // 创建新的图片对象
        let img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        // 指定canvas画布大小，该大小为最后生成图片的大小

        img.onload = () => {
          canvas.width = 300;
          canvas.height = 400;
          context.drawImage(img, 0, 0, 300, 400);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          that.upload = canvas.toDataURL(file.file.type, 0.8);
          that.up();
        };
      } else {
        this.upload = file.content;
        that.up();
      }
    },
    // 上传图片到图片服务器
    up() {
      request({
        url: "api/base/base64imgupload",
        method: "post",
        data: {
          file: this.upload
        }
      }).then(res => {
        if (res.data.code == 200) {
          // 拿到图片路径，将图片路径当成消息发送出去，添加类型
          this.sendmsg(res.data.data.filepath, 1);
        } else {
          Toast("图片上传失败");
        }
      });
    },
    // 表情
    faceContent() {
      this.show = !this.show;
      setTimeout(
        function() {
          this.scrollBottom();
        }.bind(this),
        300
      );
    },
    huoqu() {
      this.show = false;
      setTimeout(
        function() {
          this.scrollBottom();
        }.bind(this),
        300
      );
    },
    face() {
      for (let i in appData) {
        this.faceList.push(appData[i].char);
      }
    },
    // 获取用户点击图标之后 ，存放到输入框内
    getBrow(index) {
      for (let i in this.faceList) {
        if (index == i) {
          this.text += this.faceList[i];
        }
      }
    },
    // 点击遮罩层关闭弹窗
    overLay() {
      this.faceList = [];
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
    },
    // 发送商品链接给客服
    song: function() {
      this.productShow = false;
      this.sendmsg(this.utf16toEntities(this.infooUid), 0);
    },
    close: function() {
      console.log("socket已经关闭");
    },
    // 链接跳转
    link: function() {
      this.$router.push({
        name: "wpxq",
        query: {
          goods_id: this.goods_id,
          token: 45
        }
      });
    },
    dianpuLink() {
      this.$router.push({
        name: "dpxq",
        query: {
          token: 37,
          s_id: this.$route.query.sid
        }
      });
    },
    // 进入时滚动到底部
    scrollBottom: function() {
      var content = document.getElementById("chatContent");
      content.scrollTop = content.scrollHeight + 600;
      console.log(content.scrollHeight);
      console.log(content.scrollTop);
    },
    hos() {
      if (this.msag.length > 0) {
        this.fen = this.msag[this.msag.length - 1];
      } else {
        this.fen = null;
      }
      this.chatHos();
    },
    chatHos() {
      if (this.fen == null) {
        this.chatB = this.msag;
        this.chatB[0].showTime = false;
      } else {
        var i = this.msag.length - 1;
        console.log(this.chatB);
        console.log(this.msag);
        for (var index = i; index >= 0; index--) {
          if (this.msag[index].id == this.fen.id) {
            this.chatS = this.msag.slice(0, index + 1);
            this.chatB = this.msag.slice(index + 1);
            if (this.chatB.length != 0) {
              this.chatB[0].showTime = false;
            }
            //判断聊天记录中是否存在商品链接
            for (var i in this.chatB) {
              if (
                this.chatB[i].uid == this.uid &&
                this.chatB[i].content === this.infooUid
              ) {
                this.productShow = false;
                break;
              } else {
                this.productShow = true;
              }
            }
            break;
          }
        }
      }
    },
    // 将未读消息清空
    clear() {
      request({
        url: "api/char/yesread", //历史记录
        method: "post",
        data: {
          id: this.listId
        }
      }).then(res => {});
    },
    as() {
      var a = 0;
      var wordList = this.text.split("");
      var z = /\w/;
      var da = /[A-Z]/;
      var size = 1;
      var as = document.getElementById("as");
      var txt = document.getElementsByClassName("inputTxt")[0];
      for (var i in wordList) {
        if (z.test(wordList[i]) && !da.test(wordList[i])) {
          a += 1;
        } else if (da.test(wordList[i])) {
          a += 1.4;
        } else {
          a += 2;
        }
      }
      if (a >= 35) {
        size += 1;
        z = 0;
      }
      var height = size * 0.4;
      as.style.height = height + "rem";
      if (height > 0.4) {
        txt.style.height = "auto";
        this.showH = true;
      } else {
        txt.style.height = "0.6rem";
        this.showH = false;
      }
    },
    yulan(ind) {
      console.log(ind);
      console.log(this.yulanImg);
      const instance = ImagePreview({
        images: this.yulanImg,
        asyncClose: true,
        startPosition: ind - 1,
        showIndex: false,
        onClose() {
          instance.close();
        }
      });
    }
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 99vh;
  background: #f7f7f7;
}

#yuyin {
  width: 0.5rem;
  margin-left: 0.15rem;
  margin-right: 0.15rem;
}
#yuyin img {
  width: 100%;
}
.nav {
  z-index: 100;
  width: 100vw;
  height: 0.88rem;
  background: #ffffff;
  position: fixed;
  top: 0;
  text-align: center;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.name {
  line-height: 0.88rem;
  font-size: 0.36rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.nav-left {
  width: 0.55rem;
}
.an {
  width: 100%;
  text-align: center;
  font-size: 0.25rem;
}
.pu {
  display: inline-block;
  font-size: 0.25rem;
  background: linear-gradient(
    90deg,
    rgba(252, 107, 88, 1),
    rgba(253, 67, 63, 1)
  );
  color: #ffffff;
  border-radius: 0.3rem;
  padding: 0.06rem 0.14rem;
}
.time {
  background: #cccccc;
  color: #ffffff;
  width: 1.5rem;
  font-size: 0.19rem;
  text-align: center;
  margin: 0.3rem auto 0.3rem auto;
  padding: 0.05rem 0 0.05rem 0;
  border-radius: 0.2rem;
}
.commodity {
  position: relative;
  margin: 0.2rem;
  height: 2.4rem;
  display: flex;
  text-align: left;
  font-size: 0.3rem;
  background: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;
}

.commodity dt {
  flex: 2;
  margin-right: 0.2rem;
}
.commodity dt img {
  width: 100%;
  border-radius: 0.15rem;
}
.commodity dd {
  flex: 5;
}
.commodity dd .ti {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.comm {
  position: relative;
  margin: 0.2rem;
  text-align: left;
  font-size: 0.3rem;
  background: #fff;
  border-radius: 0.2rem;
  padding: 0.15rem;
}
.comm img {
  width: 100%;
  border-radius: 0.15rem;
}

.money {
  color: #ef0600;
  margin: 0.1rem 0 0.1rem 0;
}
.send {
  background: linear-gradient(
    90deg,
    rgba(252, 107, 88, 1),
    rgba(253, 67, 63, 1)
  );
  color: #ffffff;
  width: auto;
  padding: 0.08rem 0.17rem;
  border-radius: 0.3rem;
  position: absolute;
  right: 0.46rem;
  font-size: 0.28rem;
}
/* 小表情部分样式 */
.browBox {
  width: 100%;
  height: 2.8rem;
  background: #e6e6e6;
  overflow: scroll;
}
.browBox ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.1rem;
}
.browBox > ul li {
  width: 14%;
  font-size: 26px;
  list-style: none;
  text-align: center;
  margin: 0.1rem 0;
}
.show-enter-active,
.show-leave-active {
  transition: all 0.3s;
  height: 2.8rem;
}
.show-enter,
.show-leave-to {
  height: 0rem;
}
/* 发送消息部分样式 */
.tabBar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.shu {
  width: 100%;
  background: #eeeeee;
  padding: 0.1rem 0;
  box-sizing: border-box;
}
.inputTxt {
  background-color: #fff;
  width: 100%;
  height: 0.6rem;
  margin: auto 0;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem;
  box-sizing: border-box;
}
#text {
  width: 90%;
  overflow: hidden;
}
.inputTxt textarea {
  width: 100.5%;
  font-size: 0.3rem;
  float: left;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0.05rem 0 0 0.1rem;
  outline: none;
  border: none;
  resize: none;
  padding-right: 0.1rem;
  box-sizing: border-box;
}
.inputTxt img {
  float: left;
  display: block;
  margin: 0.05rem 0.1rem 0 0.1rem;
  height: 0.4rem;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexBoxImg {
  width: auto;
  height: 0.4rem;
  margin: 0.05rem 0.1rem 0 0.1rem;
}
/* 聊天框部分样式 */
#chattingWord {
  width: 100%;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
}
#chattingWord > div {
  width: 100%;
}

.masgDiv {
  width: 94%;
  font-size: 0.3rem;
  margin: 0.12rem auto 0.53rem auto;
}
.masg img {
  display: block;
  width: 100%;
}
.touXiang {
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem;
}
.touXiang img {
  width: 100%;
}

.masgContent {
  margin: 0 auto;
  width: auto;
  max-width: 4rem;
  height: 100%;
  text-align: left;
  margin-top: 0.04rem;
  display: inline-block;
}
.masgContentMy {
  min-height: 0.4rem;
  background-color: #fc6957;
  max-width: 4rem;
  padding: 0.2rem;
  border-radius: 0.5rem 0 0.5rem 0.5rem;
  color: #fee7e5;
  float: right;
  margin-right: 0.1rem;
  word-wrap: break-word;
}

.masgContentMyImg {
  float: right;
  margin-right: 0.1rem;
  width: auto;
  max-height: 5rem;
}
.masgContentMyImg img {
  width: auto;
  height: auto;
  max-width: 4rem;
  max-height: 5rem;
}
.masgContentYou {
  min-height: 0.4rem;
  background-color: #fff;
  padding: 0.2rem;
  border-radius: 0 0.4rem 0.4rem 0.4rem;
  color: #000;
  margin-left: 0.1rem;
}
.masgContentYouImg {
  margin-left: 0.1rem;
}
.linkTit {
  font-size: 0.3rem;
  width: 5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
#chatContent {
  width: 100%;
  height: 88vh;
  overflow-y: scroll;
  padding-top: 0.88rem;
}
.showF {
  height: 68vh !important;
}
.showH {
  height: 87vh !important;
}
</style>
