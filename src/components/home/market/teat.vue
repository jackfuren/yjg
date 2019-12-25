<template>
  <div class="home">
    <h1 @click="handleclick()">开始录音</h1>
    <h1 @click="handleclickl()">继续录音</h1>
    <h1 @click="handleclicks()">结束录音</h1>
    <h1 @click="handleclickp()">录音播放</h1>
    <h1 @click="a">a</h1>
    <h1 @click="b">b</h1>
  </div>
</template>

<script>
import Recorder from "js-audio-recorder";
let recorder = new Recorder({
  sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
  sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
  numChannels: 1, // 声道，支持 1 或 2， 默认是1
  compiling: true
});
export default {
  name: "home",

  data() {
    return {
      c: ""
    };
  },
  methods: {
    handleclick() {
      console.log(1);
      recorder.start(); // 开始录音
    },
    handleclickl() {
      console.log(2);
      recorder.resume(); // 继续录音
    },
    handleclicks() {
      console.log(3);
      recorder.stop(); // 结束录音
    },
    handleclickp() {
      console.log(4);
      recorder.play(); // 录音播放
    },
    a() {
      console.log(1);
      recorder.onprogress = function(params) {
        console.log("当前录音的总数据([DataView, DataView...])", params.data);
        this.c = params.data;
      };
    },
    b() {
      Recorder.playAudio(this.c);
    }
  }
};
</script>