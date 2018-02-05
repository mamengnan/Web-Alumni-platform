<template>
<div>
    <div class="regist_header clearfix">
        <div class="wrap">
            <a href="javascript:void(0);" @click="back2Home" class="logo">
                <img src="/static/img/logo.png" height="55" alt="校友平台" />
            </a>
            <div class="regist_header_right clearfix">
                <!--<a href="#" class="english_edition" id="edition" style="display:none">English</a>-->
                <div class="help_wrap">
                    <a class="hd_menu" href="javascript:void(0);" @click="unSupportNow()">
                        <s class="help_ico"></s>
                        <span class="fonttype">帮助中心</span>
                    </a>
                </div>
                <span class="fr fonttype">您好，欢迎登陆中科大软院校友平台！</span>
            </div>
        </div>
    </div>
    <input type="hidden" id="validateSig" />
    <input type="hidden" name="returnUrl" value="http://www.yhd.com" id="returnUrl">
    <input id="p" type="hidden" value="" />
    <input type="password" style="display:none">
    <div class="y_regist_wrap">
        <!--背景小图标 -->
        <div class="r_icon1"></div>
        <div class="r_icon2"></div>
        <div class="r_icon3"></div>
        <div class="r_icon4"></div>
        <div class="r_icon5"></div>
        <div class="y_regist_model">

            <h4 class="y_regist_tit">软院校友注册</h4>

            <div class="y_regist_form">
                <ul class="clearfix">
                    <li v-bind:class="liclassobjAry[0][1]">
                        <div class="y_same_item">
                            <input v-model="username" class="ysame_input" type="text" id="userName" @click="selectLi(0)" />    
                              <span class="y_same_label" v-bind:style="liclassobjAry[0][2]">用户名</span>
                        </div>

                        <div class="y_regist_tips" v-bind:style="liclassobjAry[0][0]" v-bind:class="liclassobjAry[0][3]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words">{{infocontentArray[0]}}</div>
                            </div>
                        </div>

                        <div class="y_regist_right"></div>
                        <!--提示信息end -->
                    </li>

                    <li v-bind:class="liclassobjAry[1][1]">
                        <div class="y_same_item">
                            <input v-model="phone" class="ysame_input" type="text" id="phone" @click="selectLi(1)" @keyup.tab="selectLi(1)" />
                            <span class="y_same_label" v-bind:style="liclassobjAry[1][2]">手机号</span>

                        </div>
                        <div class="y_regist_tips" v-bind:style="liclassobjAry[1][0]" v-bind:class="liclassobjAry[1][3]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words">
                                    {{infocontentArray[1]}}
                                </div>
                            </div>
                        </div>

                        <div class="y_regist_right"></div>
                    </li>

                    <li v-bind:class="liclassobjAry[2][1]">
                        <div class="y_same_item">
                            <input v-model="password" class="ysame_input y_set_password" type="password" oncopy="return false;" oncut="return false;"
                                onpaste="return false;" autocomplete="off" id="password" @click="selectLi(2)" @keyup="inputpassword"
                                @keyup.tab="selectLi(2)" />
                            <span class="y_same_label" v-bind:style="liclassobjAry[2][2]">设置密码</span>
                        </div>
                        <div class="y_regist_tips" v-bind:style="liclassobjAry[2][0]" v-bind:class="liclassobjAry[2][3]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words">
                                    {{infocontentArray[2]}}
                                </div>
                            </div>
                        </div>

                        <div class="y_regist_tips_keywords strength_l" v-bind:style="safetylevel[0]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words y_tips_words_key">
                                    <em class="em_redA"></em>
                                    <em></em>
                                    <em></em>
                                    <b class="em_words">低</b>
                                </div>
                            </div>
                        </div>

                        <div class="y_regist_tips_keywords strength_m" v-bind:style="safetylevel[1]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words y_tips_words_key">
                                    <em class="em_yellowA1"></em>
                                    <em class="em_yellowA1"></em>
                                    <em></em>
                                    <b class="em_words">中</b>
                                </div>
                            </div>
                        </div>

                        <div class="y_regist_tips_keywords strength_h" v-bind:style="safetylevel[2]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words y_tips_words_key">
                                    <em class="em_greenA1"></em>
                                    <em class="em_greenA1"></em>
                                    <em class="em_greenA1"></em>
                                    <b class="em_words">高</b>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li v-bind:class="liclassobjAry[3][1]">
                        <div class="y_same_item">
                            <input v-model="twicepassword" class="ysame_input" type="password" oncopy="return false;" oncut="return false;" onpaste="return false;"
                                id="password2" @click="selectLi(3)" @keyup="twiceinputpassword" @keyup.tab="selectLi(3)" />
                            <span class="y_same_label" v-bind:style="liclassobjAry[3][2]">确认密码</span>
                        </div>

                        <div class="y_regist_tips" v-bind:style="liclassobjAry[3][0]" v-bind:class="liclassobjAry[3][3]">
                            <div class="y_regtip_rel">
                                <i></i>
                                <div class="y_tips_words">
                                    {{infocontentArray[3]}}
                                </div>
                            </div>
                        </div>

                        <div class="y_regist_right"></div>
                    </li>
                    <li>
                        <div class="y_agreement_word">点击注册，加入科大软院的校友平台,为软院发展尽一份力!</div>
                        <a class="y_agreement_btn" href="javascript:void(0);" @click="submit" @dblclick="dblsubmit">注册</a>
                    </li>
                </ul>
            </div>
            <!-- // y_regist_form ending -->
        </div>
    </div>
    <!--// y_regist_wrap ending -->
    <div id="simplefooter">
        <p class="fonttype">Copyright © 中科大软院校友平台 2018，All Rights Reserved</p>
    </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      //手机号正则和账户正则
      othermatch: [
        /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/,
        /^[A-Za-z0-9]{6,15}$/
      ],
      //密码正则
      // 弱： 8-16位数字，字母，字符其中两种
      // 中 8-14位    数字，字母，字符其中三种
      // 强 14-16位    数字，字母，字符其中三种
      passwordmatch: [
        /^(?!\d+$)(?![a-zA-Z]+$)[\dA-Za-z]{8,16}$/,
        /^(?!((?=[\x21-\x7e]+)[^A-Za-z0-9])+$)(?![a-zA-Z]+$)[^\u4e00-\u9fa5\d]{8,16}$/,
        /^(?!((?=[\x21-\x7e]+)[^A-Za-z0-9])+$)(?!\d+$)[^\u4e00-\u9fa5a-zA-Z]{8,16}$/,
        /^(?=.*((?=[\x21-\x7e]+)[^A-Za-z0-9]))(?=.*[a-zA-Z])(?=.*[0-9])[^\u4e00-\u9fa5]{8,13}$/,
        /^(?=.*((?=[\x21-\x7e]+)[^A-Za-z0-9]))(?=.*[a-zA-Z])(?=.*[0-9])[^\u4e00-\u9fa5]{14,16}$/
      ],
      twicepassword: "",
      username: "",
      phone: "",
      password: "",
      beforelastchoose: null,
      infocontentArray: ["", "", "", ""],
      infocontentconstantAry: [
        "数字和字母，且长度要在6-15位之间",
        "请填写正确的手机号码，以便 接收订单通知，找回密码等",
        "同时含有数字和字母，且长度要在6-16位之间",
        "请再次输入密码"
      ],
      safetylevel: [
        {
          display: "none"
        },
        {
          display: "none"
        },
        {
          display: "none"
        }
      ],
      liclassobjAry: [
        [
          {
            top: "16px"
          },
          {
            ifocus: false,
            ipt_wrong: false,
            ipt_right: false
          },
          {
            left: null
          },
          {
            y_regist_tips_black: true,
            y_regist_tips_red: false
          }
        ],
        [
          {
            top: "-4px"
          },
          {
            ifocus: false,
            ipt_wrong: false,
            ipt_right: false
          },
          {
            left: null
          },
          {
            y_regist_tips_black: true,
            y_regist_tips_red: false
          }
        ],
        [
          {
            top: "6px"
          },
          {
            ifocus: false,
            ipt_wrong: false,
            ipt_right: false
          },
          {
            left: null
          },
          {
            y_regist_tips_black: true,
            y_regist_tips_red: false
          }
        ],
        [
          {
            top: "6px"
          },
          {
            ifocus: false,
            ipt_wrong: false,
            ipt_right: false
          },
          {
            left: null
          },
          {
            y_regist_tips_black: true,
            y_regist_tips_red: false
          }
        ]
      ]
    };
  },
  computed: {
    access_token: function() {
      return this.$store.getters.access_token;
    }
  },
  methods: {
    // 以服务的方式调用的 Loading
    serviceFullscreen(text) {
      return ELEMENT.Loading.service({
        lock: true,
        text: text,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    serviceCloseFullscreen(loadingInstance, time) {
      return new Promise(function(resolve) {
        setTimeout(() => {
          loadingInstance.close();
          resolve();
        }, time);
      });
    },
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
    clearblock() {
      this.liclassobjAry[2][0].display = "none";
      this.safetylevel[0].display = "none";
      this.safetylevel[1].display = "none";
      this.safetylevel[2].display = "none";
    },
    inputpassword() {
      this.clearblock();
      if (this.passwordmatch[0].test(this.password)) {
        this.safetylevel[0].display = "block";
      } else if (this.passwordmatch[1].test(this.password)) {
        this.safetylevel[0].display = "block";
      } else if (this.passwordmatch[2].test(this.password)) {
        this.safetylevel[0].display = "block";
      } else if (this.passwordmatch[3].test(this.password)) {
        this.safetylevel[1].display = "block";
      } else if (this.passwordmatch[4].test(this.password)) {
        this.safetylevel[2].display = "block";
      } else {
        this.liclassobjAry[2][0].display = "block";
      }
    },
    changeState(
      id,
      ifocus,
      ipt_wrong,
      ipt_right,
      display,
      top,
      y_regist_tips_red,
      y_regist_tips_black,
      left
    ) {
      ifocus != null ? (this.liclassobjAry[id][1].ifocus = ifocus) : null;
      ipt_wrong != null
        ? (this.liclassobjAry[id][1].ipt_wrong = ipt_wrong)
        : null;
      ipt_right != null
        ? (this.liclassobjAry[id][1].ipt_right = ipt_right)
        : null;
      display != null ? (this.liclassobjAry[id][0].display = display) : null;
      top != null ? (this.liclassobjAry[id][0].top = top) : null;
      y_regist_tips_red != null
        ? (this.liclassobjAry[id][3].y_regist_tips_red = y_regist_tips_red)
        : null;
      y_regist_tips_black != null
        ? (this.liclassobjAry[id][3].y_regist_tips_black = y_regist_tips_black)
        : null;
      left != null ? (this.liclassobjAry[id][2].left = left) : null;
    },
    twiceinputpassword() {
      if (this.password != "" && this.password == this.twicepassword) {
        this.changeState(
          3,
          false,
          false,
          true,
          "none",
          "6px",
          null,
          null,
          "-62px"
        );
      } else if (this.password != "") {
        this.changeState(
          3,
          true,
          true,
          false,
          "block",
          "-4px",
          true,
          false,
          "-62px"
        );
        this.infocontentArray[3] = "两次输入的密码不一致!";
      } else {
        this.changeState(
          3,
          true,
          false,
          false,
          "block",
          "-4px",
          false,
          true,
          "-62px"
        );
        this.infocontentArray[3] = this.infocontentconstantAry[3];
      }
    },
    checklastselect(id) {
      if (id == 0) {
        if (this.othermatch[1].test(this.username)) {
          this.changeState(
            0,
            false,
            false,
            true,
            null,
            "16px",
            null,
            null,
            null
          );
        } else {
          this.changeState(
            0,
            true,
            true,
            false,
            null,
            "-4px",
            true,
            false,
            null
          );
          if (this.username == "") {
            this.infocontentArray[0] = "用户名不能为空!";
          } else {
            this.infocontentArray[0] = "用户名格式错误!";
          }
        }
      } else if (id == 1) {
        if (this.othermatch[0].test(this.phone)) {
          this.changeState(
            1,
            false,
            false,
            true,
            null,
            "-4px",
            null,
            null,
            null
          );
        } else {
          this.changeState(
            1,
            true,
            true,
            false,
            null,
            "-4px",
            true,
            false,
            null
          );
          if (this.phone == "") {
            this.infocontentArray[1] = "手机号不能为空!";
          } else {
            this.infocontentArray[1] = "手机号格式错误!";
          }
        }
      } else if (id == 2) {
        if (
          this.passwordmatch[0].test(this.password) ||
          this.passwordmatch[1].test(this.password) ||
          this.passwordmatch[3].test(this.password) ||
          this.passwordmatch[4].test(this.password)
        ) {
          this.changeState(2, false, false, null, null, null, null, null, null);
        } else {
          this.changeState(
            2,
            true,
            true,
            null,
            null,
            "-4px",
            true,
            false,
            null
          );
          if (this.password == "") {
            this.infocontentArray[2] = "密码不能为空!";
          } else {
            this.infocontentArray[2] = "密码格式错误!";
          }
        }
      } else if (id == 3) {
        if (this.password != "" && this.password != this.twicepassword) {
          this.changeState(
            3,
            true,
            true,
            false,
            "block",
            "-4px",
            true,
            false,
            null
          );
          this.infocontentArray[3] = "两次输入的密码不一致!";
        } else if (this.password == "") {
          this.changeState(
            3,
            false,
            false,
            false,
            "none",
            "6px",
            null,
            null,
            null
          );
        }
      }
    },
    dblsubmit() {
      this.submit();
    },
    //注册
    async submit() {
      if (!this.othermatch[1].test(this.username)) {
        this.checklastselect(0);
      } else if (!this.othermatch[0].test(this.phone)) {
        this.checklastselect(1);
      } else if (
        this.password == "" ||
        this.twicepassword == "" ||
        this.password != this.twicepassword
      ) {
        if (this.password == "") {
          this.checklastselect(2);
        } else {
          this.checklastselect(2);
          this.checklastselect(3);
        }
      } else {
        // 以服务的方式调用的 Loading
        var loadingInstance = this.serviceFullscreen("正在注册中....");
        try {
          var res = await this.$store.dispatch("RegisterController", {
            user_name: this.username,
            password: this.password,
            phone: this.phone
          });
        } catch (error) {
          await this.serviceCloseFullscreen(loadingInstance, 1000);
          console.error("RegisterController失败!");
          this.$notify.error({
            title: "错误",
            message: "服务器异常或者您的网络异常!"
          });
        }
        // success
        if (res.code == 200) {
          await this.serviceCloseFullscreen(loadingInstance, 1000);
          try {
            await this.$confirm("注册成功!点击确定后将跳转至登陆界面", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "success",
              center: true
            });
          } catch (error) {
            //此处error是对话框选择叉号的时候需要执行的内容
          }
          await this.controlFullscreen("正在跳转至登陆界面...", 1000);
          this.$router.push("/");
        } else {
          await this.serviceCloseFullscreen(loadingInstance, 1000);
          this.changeState(
            0,
            true,
            true,
            false,
            null,
            "-4px",
            true,
            false,
            null
          );
          this.infocontentArray[0] = "用户名" + this.username + "已存在!";
        }
      }
    },
    back2Home() {
      this.$router.push("/");
    },
    unSupportNow() {
      this.$notify.error({
        title: "提示",
        message: "暂不支持该功能!敬请期待!"
      });
    },
    selectLi(id) {
      if (id == 3) {
        this.twiceinputpassword();
      } else {
        if (this.liclassobjAry[id][1].ipt_right != true) {
          this.changeState(
            id,
            true,
            false,
            null,
            null,
            "-4px",
            false,
            true,
            "-62px"
          );
          this.infocontentArray[id] = this.infocontentconstantAry[id];
        }
      }
      if (this.beforelastchoose != null && this.beforelastchoose != id) {
        this.checklastselect(this.beforelastchoose);
      }
      this.beforelastchoose = id;
    }
  },
  created() {
    //本地存有accesstoken并且token没有过期
    if (this.access_token != "") {
      this.$router.push("/main");
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../style/register";
</style>