<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="main"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>论文与简历</template>
						<el-menu-item index="paper">论文代办</el-menu-item>
						<el-menu-item index="resume">简历维护与投递</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-star-on"></i>信息展播与交流广场</template>
						<el-menu-item index="infodistribute">信息展播</el-menu-item>
            <el-menu-item index="plaza">交流广场</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-edit"></i>个人信息</template>
						<el-menu-item index="edit">编辑个人信息</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
export default {
  data: function() {
    return {
      access_token: this.$store.getters.access_token
    };
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
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
    }
  },
  async mounted() {
    //token失效
    if (this.access_token == "") {
      await this.controlFullscreen(
        "您的登陆账户已过期,正在跳转至登陆页...",
        2000
      );
      this.$router.push("/");
    }
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
.manage_page {
}
</style>
