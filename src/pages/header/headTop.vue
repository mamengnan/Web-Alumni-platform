<template>
    <div class="header_container">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="defaultimg" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
export default {
  data() {
    return {
      access_token: this.$store.getters.access_token,
      defaultimg: "/static/img/default.jpg"
    };
  },
  created() {},
  methods: {
    controlFullscreen(text, time) {
      var self = this;
      return new Promise(function(resolve) {
        const loading = self.$loading({
          lock: true,
          text: text,
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          loading.close();
          resolve();
        }, time);
      });
    },
    deleteaccesstoken() {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      window.document.cookie =
        "access_token" +
        "=" +
        this.access_token +
        ";expires=" +
        exp.toGMTString();
    },

    async handleCommand(command) {
      if (command == "home") {
        // this.$router.push("/main");
      } else if (command == "singout") {
        this.deleteaccesstoken();
        await this.controlFullscreen("您已成功注销,即将跳转至登陆页...", 1000);
        this.$store.commit("clearaccesstoken");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
