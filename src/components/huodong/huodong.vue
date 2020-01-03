<template>
  <div class="box">
    <div class="box-container">
      <!--轮播图-->
      <div class="swiper-container index_carsel" style="padding:15px;background: #FFFFFF">
        <div class="swiper-wrapper">
          <div :key="index" class="swiper-slide swiper_ses" v-for="(item,index) in carselist">
            <img :src="item.pic" class="main-img" />
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper_dot" id="pagination"></div>
      <div class="allow"></div>
      <div class="category_list">
        <section class="wai">
          <ul>
            <li
              :class="{active:index === num}"
              :key="index"
              @click="tab(item.title,item.code,index)"
              v-for="(item,index) in titleItem"
            >
              <p>
                <span>{{item.title}}</span>
              </p>
            </li>
          </ul>
          <div id="acti"></div>
        </section>
        <div class="category_list_items">
          <div class="category_list_items-div">
            <div class="category_list_content">
              <div class="category_list_content1">
                <div
                  :key="index"
                  class="category_list_item"
                  v-for="(content,index) in contents"
                  @click="xiangqing(content.id)"
                >
                  <div class="category_list_items_left">
                    <img :src="content.headimg" alt />
                  </div>
                  <div class="category_list_items_right">
                    <p class="category_title">{{content.title}}</p>
                    <p class="category_adress">{{content.name}}</p>
                    <p class="category_price">
                      <span>
                        ￥
                        <span style="font-size: 0.3rem;font-weight: bold">{{content.price}}</span>
                        <a href="#">￥{{content.original_price}}</a>
                      </span>
                      <span>&lt;{{content.distance}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
import Swiper from "swiper";
import request from "../utils/request";
export default {
  name: "huodong",
  data() {
    return {
      title: "热销",
      num: 0, //活动下标
      active4: 1,
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
      carselist: [],
      titleItem: [
        { title: "新品", code: 2 },
        { title: "热销", code: 3 },
        { title: "促销", code: 5 },
        { title: "清仓", code: 7 }
      ],
      contents: [],
      code: 1
    };
  },
  methods: {
    tab(item, code, index) {
      document.getElementById("acti").style.left = 0.68 + index * 1.885 + "rem";
      this.num = index;
      this.code = code;
      this.title = item.title;
      request({
        url: "api/activity/index",
        method: "post",
        data: {
          type: this.code,
          lat: window.localStorage.getItem("lat"),
          lng: window.localStorage.getItem("lng")
        }
      }).then(res => {
        this.contents = res.data.data;
        console.log(res);
      });
    },
    swiper() {
      this.swiper = new Swiper(".swiper-container", {
        slidesPerView: "1.01",
        /**设置slider容器能够同时显示的slides数量,可以设置为数字（可为小数，小数不可loop），               或者 'auto'则自动根据slides的宽度来设定数量。 */
        centeredSlides: true,
        /**活动块会居中 */
        // 　　　　　　spaceBetween:10, /**slide之间的距离 */
        //autoplay:true,
        loop: true,
        autoAdditionalSlides: 20,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    },
    xiangqing(i) {
      if (this.$store.state.username == null) {
        this.$router.push({
          name: "regi"
        });
      } else {
        this.$router.push({
          name: "wpxq",
          query: {
            goods_id: i,
            token: 1
          }
        });
      }
    }
  },
  mounted() {
    request({
      url: "api/activity/index",
      method: "post",
      data: {
        type: 1,
        lat: window.localStorage.getItem("lat"),
        lng: window.localStorage.getItem("lng")
      }
    }).then(res => {
      this.contents = res.data.data;
      console.log(this.contents);
    });
    request({
      url: "api/index/adv",
      method: "get"
    }).then(res => {
      this.carselist = res.data.data;
      //consoleog(res.data.data)
      this.$nextTick(() => {
        this.swiper();
      });
    });
  }
};
</script>

<style lang="less" scoped>
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

.index .index_carsel {
  background: #fff;
  position: relative;
  padding: 0.3rem;
  top: 0.88rem;
  padding-bottom: 0.52rem;
}

.swiper_ses {
  text-align: center;
  height: 3.2rem;
  border-radius: 5px;
  overflow: hidden;
}

.swiper-slide-active {
  transform: scale(1.08);
}

.swiper_ses .main-img {
  width: 6.4rem;
  height: 3.2rem;
  box-shadow: 0 0 6px 1px rgb(253, 230, 230);
  border-radius: 5px;
  overflow: hidden;
}

.swiper_dot {
  position: absolute;
  text-align: center;
  top: 3.2rem;
  right: 0.6rem;
}

.swiper-pagination-bullet {
  margin: 0 1px;
  background: none;
  border: 1px solid #ef0600;
  opacity: 0.6;
}

.swiper-pagination-bullet-active {
  background: #ef0600;
}

.swiper-wrapper {
  margin: 6px 0 !important;
}

.allow {
  width: 100%;
  height: 10px;
  background: #f7f7f7;
}

.category_list {
  width: 100%;
  background: #f7f7f7;
}
.wai {
  height: 0.8rem;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 9999;
  border-bottom: 2px solid rgb(247, 247, 247);
  background-color: white;
  width: 100%;
  padding-bottom: 0.1rem;
}
.category_list ul {
  width: 100%;
  height: 100%;
  display: flex;
}

.category_list ul li {
  height: 100%;
  width: 2rem;
  text-align: center;
}

.category_list ul li p {
  vertical-align: -webkit-baseline-middle;
  line-height: 0.8rem;
  width: 100%;
  height: 100%;
}
.category_list ul li p span {
  display: inline-block;
  vertical-align: -webkit-baseline-middle;
  margin-top: -5px;
  font-size: 0.25rem;
}
#acti {
  width: 0.5rem;
  height: 0.03rem;
  position: absolute;
  background-color: red;
  bottom: 0rem;
  left: 0.68rem;
  transition: all 0.2s;
}
.category_list ul li.active {
  color: red !important;
  background: #fff;
}

.category_list_items {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.category_list_items-div {
  width: 100%;
  margin-bottom: 1rem;
}
.category_list_items-div::-webkit-scrollbar {
  display: none;
}

.category_list_content {
  width: 100%;
}

.category_list_content > div {
  width: 100%;
}
.category_list_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 10px;
  position: relative;
}

.category_list_items_left {
  width: 1.6rem;
  height: 1.6rem;
  background: #f7f7f7;
  margin-right: 10px;
  display: table-cell;
  vertical-align: middle;
  position: relative;
}

.category_list_items_left img {
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
}

.category_list_items_right {
  width: 60%;
  position: absolute;
  right: 0.9rem;
  text-align: left;
}

.category_title {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.category_adress {
  display: inline-block;
  background: #ffbcba;
  font-size: 0.22rem;
  color: #ef0600;
  height: 0.32rem;
  line-height: 0.35rem;
  margin-bottom: 0.4rem;
  margin-top: 0.19rem;
}

.category_price {
  display: flex;
  justify-content: space-between;
  margin: 0px;
}

.category_price span:first-child {
  font-size: 0.24rem;
  color: #ef0600;
}
.category_price span:first-child a {
  font-size: 0.24rem;
  color: #ccc;
  margin-left: 4px;
  text-decoration: line-through;
}

.category_price span:last-child {
  font-size: 0.24rem;
  color: #777;
}

.van-tabbar--fixed {
  bottom: -0.05rem;
}
/deep/ .swiper-pagination-bullet {
  width: 0.098rem !important;
  height: 0.098rem !important;
  margin: 0 0.1rem;
}

/deep/ .swiper-pagination-bullet-active {
  background: #ef0600;
}

.van-tabbar-item__icon img{
	height: auto;
}
</style>
