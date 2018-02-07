<template>
<div>
    <headTop></headTop>
    <el-row style="margin-top: 20px;">
        <el-col :span="12" :offset="4">
            <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="formData.sex">
                        <el-radio label="1">纯爷们</el-radio>
                        <el-radio label="2">程序媛</el-radio>
                        <el-radio label="3">LGBT(放心,保密~~)</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload class="upload-demo" ref="upload" action="" :auto-upload="false" :show-file-list="false" :on-change="onChange"
                        :limit="1">
                        <img :src="formData.img" class="avatar">
                        <el-button slot="trigger" size="small" type="primary">选取头像</el-button>
                        <div slot="tip" class="el-upload__tip" style="color:#909399;">只能上传jpg/png/gif文件，且不超过1MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item v-show="false" label="头像2">
                    <el-upload class="upload-demo" ref="temp_upload" :headers="tmp_upload_header" :data="tmp_upload_param" :action="temp_upload_url" :auto-upload="false" :show-file-list="false" :limit="1" :on-error="tempUploadError">
                    </el-upload>
                </el-form-item>
                <el-form-item label="民族" prop="nation">
                    <el-select v-model="formData.nation" filterable placeholder="可输入民族拼音搜索" :filter-method="nationFilter" no-data-text="无匹配数据">
                        <el-option v-for="item in nationArray" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.pinyin }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="籍贯" prop="home">
                    <el-input v-model="formData.home"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌" prop="political">
                    <el-select v-model="formData.political" placeholder="请选择您的政治面貌">
                        <el-option label="群众" value="1"></el-option>
                        <el-option label="共青团员" value="2"></el-option>
                        <el-option label="预备党员(含积极分子)" value="3"></el-option>
                        <el-option label="正式党员" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作单位" prop="workstation">
                    <el-input v-model="formData.workstation"></el-input>
                </el-form-item>
                <el-form-item label="职务" prop="job">
                    <el-input v-model="formData.job"></el-input>
                </el-form-item>
                <el-form-item label="本科毕业院校" prop="undergraduate">
                    <el-input v-model="formData.undergraduate"></el-input>
                </el-form-item>
                <el-form-item label="本科专业" prop="speciality">
                    <el-input v-model="formData.speciality"></el-input>
                </el-form-item>
                <el-form-item label="本科毕业" prop="date1">
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="研究生毕业" prop="date2">
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="formData.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="isNewUser" type="primary" @click="submitForm('formData')" icon="el-icon-edit">提交</el-button>
                    <el-button v-show="!isNewUser" type="primary" @click="updateForm('formData')" icon="el-icon-edit">更改信息</el-button>
                    <el-button v-show="!isNewUser" type="danger" @click="resetModify()" icon="el-icon-refresh">撤销全部改动</el-button>
                    <el-button type="danger" @click="resetFormDialog('formData')" icon="el-icon-delete">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
import headTop from "./header/headTop.vue";
import nationJsonArray from "../util/jsonfile/nation.js";
import appconfig from "../util/config/application";
import cookie from "../util/cookie";
import bus from "../util/bus";

export default {
  data: function() {
    return {
      matcharray: [/^([\u4e00-\u9fa5\·]{1,10})$/, /^.{1,30}$/],
      formData: {
        name: "",
        sex: "",
        img: "/static/img/default.jpg",
        imgurl: "",
        nation: "",
        home: "",
        political: "",
        workstation: "",
        job: "",
        undergraduate: "",
        speciality: "",
        date1: "",
        date2: ""
      },
      //民族数组
      nationArray: [],
      //民族数组备份，用于拼音搜索
      backUpNationArray: [],
      rules: {
        name: [
          { required: true, validator: this.validateName, trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别别忘了。。", trigger: "change" }],
        nation: [
          { required: true, message: "民族是必选项", trigger: "change" }
        ],
        home: [
          {
            required: true,
            validator: this.validateHome,
            trigger: "blur"
          }
        ],
        political: [
          { required: true, message: "政治面貌要搞清啊", trigger: "change" }
        ],
        workstation: [{ validator: this.validateWorker, trigger: "blur" }],
        job: [{ validator: this.validateJob, trigger: "blur" }],
        undergraduate: [
          {
            required: true,
            validator: this.validateUndergraduate,
            trigger: "blur"
          }
        ],
        speciality: [
          {
            required: true,
            validator: this.validateSpeciality,
            trigger: "blur"
          }
        ],
        date1: [
          {
            required: true,
            message: "毕业时间不记得了吗？",
            trigger: "change"
          }
        ],
        date2: [
          {
            required: true,
            message: "毕业时间不记得了吗？",
            trigger: "change"
          }
        ]
      },
      tmp_upload_param: {
        name: ""
      }
    };
  },
  computed: {
    backUpformData: function() {
      return this.$store.getters.formData;
    },
    isNewUser: function() {
      return this.$store.getters.isNewUser;
    },
    temp_upload_url: function() {
      return appconfig.TEMPUPLOADRUL;
    },
    access_token: function() {
      return this.$store.getters.access_token;
    },
    tmp_upload_header: function() {
      return { authorization: this.$store.getters.access_token };
    }
  },
  components: {
    headTop
  },
  methods: {
    validateName(rule, value, callback) {
      if (value === "") {
        callback(new Error("姓名不能为空!"));
      } else if (this.matcharray[0].test(value)) {
        callback();
      } else {
        callback(new Error("姓名格式不正确!"));
      }
    },
    validateHome(rule, value, callback) {
      if (value === "") {
        callback(new Error("籍贯不能为空!"));
      } else if (this.matcharray[1].test(value)) {
        callback();
      } else {
        callback(new Error("请将输入控制在30个字符以内!"));
      }
    },
    validateWorker(rule, value, callback) {
      if (value == "" || this.matcharray[1].test(value)) {
        callback();
      } else {
        callback(new Error("请将输入控制在30个字符以内!"));
      }
    },
    validateJob(rule, value, callback) {
      if (value == "" || this.matcharray[1].test(value)) {
        callback();
      } else {
        callback(new Error("请将输入控制在30个字符以内!"));
      }
    },
    validateUndergraduate(rule, value, callback) {
      if (value === "") {
        callback(new Error("本科院校不能为空!"));
      } else if (this.matcharray[1].test(value)) {
        callback();
      } else {
        callback(new Error("请将输入控制在30个字符以内!"));
      }
    },
    validateSpeciality(rule, value, callback) {
      if (value === "") {
        callback(new Error("本科专业不能为空!"));
      } else if (this.matcharray[1].test(value)) {
        callback();
      } else {
        callback(new Error("请将输入控制在30个字符以内!"));
      }
    },
    nationFilter(val) {
      if (val) {
        //val存在
        this.nationArray = this.backUpNationArray.filter(item => {
          if (item.pinyin.indexOf(val) > -1) {
            return true;
          }
        });
      } else {
        //val为空时，还原数组
        this.nationArray = this.backUpNationArray;
      }
    },
    modifyImg() {
      var self = this;
      return new Promise(function(resolve, error) {
        if (
          self.$refs.upload.uploadFiles[0].size / 1024 / 1024 < 1 &&
          (self.$refs.upload.uploadFiles[0].raw.type == "image/jpeg" ||
            self.$refs.upload.uploadFiles[0].raw.type == "image/png" ||
            self.$refs.upload.uploadFiles[0].raw.type == "image/gif")
        ) {
          let r = new FileReader(); //本地预览
          r.readAsDataURL(self.$refs.upload.uploadFiles[0].raw); //Base64
          r.onload = function() {
            self.formData.img = r.result;
            self.$refs.temp_upload.uploadFiles[0] =
              self.$refs.upload.uploadFiles[0];
            self.$refs.upload.clearFiles();
            resolve();
          };
        } else {
          self.$refs.upload.clearFiles();
          error();
        }
      });
    },
    async updateForm(formName) {
      try {
        await this.$confirm("确定提交您的修改吗?", "提示", {
          confirmButtonText: "确定",
          type: "info",
          center: true
        });
        if (!this.checkIsChange()) {
          this.$message.error("请先修改信息后再提交!");
        } else {
          this.$refs[formName].validate(async valid => {
            if (valid) {
              let formjson = this.newFormJson();
              //如果头像没有更换
              if (this.formData["img"] == this.backUpformData["img"]) {
                formjson.img = this.formData.imgurl;
              } else {
                formjson.img = this.getValidImgUrl(
                  this.$refs.temp_upload.uploadFiles[0]
                );
              }
              // 以服务的方式调用的 Loading
              var loadingInstance = this.serviceFullscreen(
                "正在提交您的更新...."
              );
              try {
                var res = await this.$store.dispatch(
                  "UpdatePfoController",
                  formjson
                );
              } catch (error) {
                await this.serviceCloseFullscreen(loadingInstance, 1000);
                console.error("UpdatePfoController失败!");
                this.$notify.error({
                  title: "错误",
                  message: "服务器异常或者您的网络异常!"
                });
              }
              if (res.code == 200) {
                await this.serviceCloseFullscreen(loadingInstance, 1000);
                this.tmp_upload_param.name = this.getValidImgUrl(
                  this.$refs.temp_upload.uploadFiles[0]
                );
                this.$refs.temp_upload.submit();
                this.$message({
                  message: "更新成功!",
                  type: "success"
                });
                this.$store.commit("setuserinfocontroller", {
                  obj: this.newFormJson()
                });
                this.resetModify();
              } else if (res.code == 402) {
                await this.serviceCloseFullscreen(loadingInstance, 1000);
                try {
                  await this.$confirm(
                    "您的用户登陆信息已失效!点击确定跳转至登陆页",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      showCancelButton: false,
                      type: "info",
                      center: true
                    }
                  );
                } catch (e) {}
                cookie.delete("access_token", this.access_token);
                this.$store.commit("clearInfomation");
                await this.controlFullscreen("即将跳转至登陆页...", 1000);
                this.$router.push("/");
              }
            } else {
              return false;
            }
          });
        }
      } catch (e) {}
    },
    getValidImgUrl(fileimg) {
      if (fileimg != null && fileimg.hasOwnProperty("raw")) {
        if (fileimg.raw.type.indexOf("png") != -1) {
          return (
            "/static/usericon/" +
            JSON.parse(atob(this.access_token.split(".")[0])).user_id +
            ".png"
          );
        } else if (fileimg.raw.type.indexOf("jpeg") != -1) {
          return (
            "/static/usericon/" +
            JSON.parse(atob(this.access_token.split(".")[0])).user_id +
            ".jpeg"
          );
        } else if (fileimg.raw.type.indexOf("jpg") != -1) {
          return (
            "/static/usericon/" +
            JSON.parse(atob(this.access_token.split(".")[0])).user_id +
            ".jpg"
          );
        } else if (fileimg.raw.type.indexOf("gif") != -1) {
          return (
            "/static/usericon/" +
            JSON.parse(atob(this.access_token.split(".")[0])).user_id +
            ".gif"
          );
        }
      }
      return "/static/img/default.jpg";
    },
    newFormJson() {
      return {
        date1: Date.parse(new Date(this.formData.date1)),
        date2: Date.parse(new Date(this.formData.date2)),
        home: this.formData.home,
        job: this.formData.job,
        name: this.formData.name,
        nation: this.formData.nation,
        political: Number.parseInt(this.formData.political),
        sex: Number.parseInt(this.formData.sex),
        speciality: this.formData.speciality,
        undergraduate: this.formData.undergraduate,
        workstation: this.formData.workstation,
        img: this.formData.img
      };
    },
    tempUploadError(err, file, fileList) {
      console.error(err);
    },
    async submitForm(formName) {
      try {
        await this.$confirm("确定提交您的修改吗?", "提示", {
          confirmButtonText: "确定",
          type: "info",
          center: true
        });
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let formjson = this.newFormJson();
            formjson.img = this.getValidImgUrl(
              this.$refs.temp_upload.uploadFiles[0]
            );
            // 以服务的方式调用的 Loading
            var loadingInstance = this.serviceFullscreen(
              "正在提交您的信息...."
            );
            try {
              var res = await this.$store.dispatch(
                "SubmitPfoController",
                formjson
              );
            } catch (error) {
              await this.serviceCloseFullscreen(loadingInstance, 1000);
              console.error("SubmitPfoController失败!");
              this.$notify.error({
                title: "错误",
                message: "服务器异常或者您的网络异常!"
              });
            }
            if (res.code == 200) {
              await this.serviceCloseFullscreen(loadingInstance, 1000);
              this.tmp_upload_param.name = this.getValidImgUrl(
                this.$refs.temp_upload.uploadFiles[0]
              );
              this.$refs.temp_upload.submit();
              this.$message({
                message: "提交成功!",
                type: "success"
              });
              this.$store.commit("setuserinfocontroller", {
                obj: this.newFormJson()
              });
              this.resetModify();
              this.$store.commit("changeIsNewUser", false);
            }
          } else {
            return false;
          }
        });
      } catch (error) {
        //此处error是对话框选择叉号的时候需要执行的内容
      }
    },
    resetModify() {
      this.resetForm("formData");
      for (var prop in this.backUpformData) {
        if (this.formData.hasOwnProperty(prop)) {
          this.formData[prop] = this.backUpformData[prop];
        }
      }
    },
    async resetFormDialog(formName) {
      try {
        await this.$confirm("确定清空所有选项吗?", "提示", {
          confirmButtonText: "确定",
          type: "info",
          center: true
        });
        this.$refs[formName].resetFields();
      } catch (e) {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async onChange(file, fileList) {
      try {
        await this.modifyImg();
      } catch (error) {
        this.$message.error(
          "上传头像图片只能是 JPG/PNG/GIF 格式且大小必须小于1MB!"
        );
      }
    },
    checkIsChange() {
      var tmpkey = false;
      for (var prop in this.backUpformData) {
        if (this.formData.hasOwnProperty(prop)) {
          if (this.formData[prop] != this.backUpformData[prop]) {
            tmpkey = true;
          }
        }
      }
      return tmpkey;
    }
  },
  async mounted() {
    // 检查浏览器是否支持File API
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    } else {
      try {
        await this.$confirm(
          "您的浏览器不支持File API,建议您更换新版本的浏览器,以免影响你的使用体验",
          "提示",
          {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "error",
            center: true
          }
        );
      } catch (error) {
        //此处error是对话框选择叉号的时候需要执行的内容
      }
    }

    //浅复制
    this.nationArray = nationJsonArray;
    this.backUpNationArray = nationJsonArray;

    this.resetModify();

    var self = this;
    // 监听组件main.vue载入数据事件
    bus.$on("dataready", function() {
      self.resetModify();
    });
  }
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
.button_submit {
  text-align: center;
}
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
