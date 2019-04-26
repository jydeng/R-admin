<template>
  <div class="wrapper">
    <!-- 背景视频 -->
    <video id="background_video" loop muted></video>
    <!-- 取一帧视频放在前面 -->
    <div id="video_cover"></div>
    <!-- 淡色遮罩 -->
    <div id="overlay"></div>
    <!-- 登录 -->
    <el-row class="loginPane">
      <el-col
        :md="12"
        class="left"
        title="点"
        @click.native="logoAnimate"
      ></el-col>
      <el-col :md="12" class="right">
        <div class="user">
          <el-input
            placeholder="请输入你的账号"
            clearable
            prefix-icon="fa fa-fw fa-user"
            v-model="user.username"
          ></el-input>
          <el-input
            placeholder="请输入你的密码"
            type="password"
            prefix-icon="fa fa-fw fa-key"
            clearable
            v-model="user.password"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <el-button type="primary" @click="handleLogin">
            <i class="fa fa-fw fa-power-off"></i> 登 录
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Bideo from "./bideo.js";
// import { loginByApi } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "jydeng",
        password: "123456"
      },
      redirect: this.$route.query["redirect"]
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    handleLogin() {
      if (this.user.username.trim().length === 0) {
        this.$notify({
          title: "提示",
          message: "请输入你的账号!",
          type: "warning"
        });
        return false;
      }

      if (this.user.password.trim().length === 0) {
        this.$notify({
          title: "提示",
          message: "请输入你的密码!",
          type: "warning"
        });
        return false;
      }

      this.login({
        user: { username: this.user.username, role: "admin" },
        token: "admin",
        redirect: this.redirect || "/"
      });

      // loginByApi(this.user.username, this.user.password)
      //   .then(() => {
      //     this.login({
      //       user: { username: this.user.username, role: "admin" },
      //       token: "admin",
      //       redirect: this.redirect || "/"
      //     });
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
    initBvideo() {
      let bv = new Bideo();
      bv.init({
        // Video element
        videoEl: document.querySelector("#background_video"),

        // Container element
        container: document.querySelector("body"),

        // Resize
        resize: true,

        // autoplay: false,

        isMobile: window.matchMedia("(max-width: 768px)").matches,

        // playButton: document.querySelector("#play"),
        // pauseButton: document.querySelector("#pause"),

        // Array of objects containing the src and type
        // of different video formats to add
        src: [
          {
            src: "/video/night.webm",
            type: "video/webm"
          },
          {
            src: "/video/night.mp4",
            type: "video/mp4"
          }
        ],

        // What to do once video loads (initial frame)
        onLoad: function() {
          document.querySelector("#video_cover").style.display = "none";
        }
      });
    },
    logoAnimate() {
      this.$util.animateCSS(".left", "tada");
    }
  },
  mounted() {
    this.$util.animateCSS(".loginPane", "pulse");
    this.$nextTick(() => {
      this.initBvideo();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;

  #background_video {
    @include center;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  #video_cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(~/video/video_cover.jpeg) no-repeat;
    background-size: cover;
    background-position: center;
  }

  .loginPane {
    position: relative;
    top: calc(50%);
    width: 600px;
    margin: 0 auto;
    margin-top: -130px;
    @include card;

    .left {
      height: 260px;
      background-image: url(../../assets/logo.png);
      background-position: center center;
      background-size: 80px;
      background-repeat: no-repeat;
    }

    .right {
      position: relative;
      height: 260px;

      .user {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        @include center;

        .el-input {
          line-height: 55px;
        }
        .el-button {
          width: 100%;
          margin-top: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    .loginPane {
      width: 300px;
      .left {
        height: 160px;
        border-right: none;
      }
      .right {
        height: 180px;
      }
    }
  }
}
</style>
