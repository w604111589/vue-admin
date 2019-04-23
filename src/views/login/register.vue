<template>
  <div class="register login-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">hotcoin-quanty</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>
        <el-input
          v-model="registerForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="registerForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <el-form-item prop="confirm">
        <span class="svg-container">
          <svg-icon name="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="registerForm.confirm"
          name="confirm"
          auto-complete="on"
          placeholder="confirm password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'"/>
        </span>
      </el-form-item>
      <el-form-item prop="inviter">
        <span class="svg-container">
          <svg-icon name="user"/>
        </span>
        <el-input
          v-model="registerForm.inviter"
          name="inviter"
          type="text"
          auto-complete="on"
          placeholder="inviter"
        />
      </el-form-item>
      
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleRegister"
        >register</el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: lwb_test</span>
        <span>password: good2018</span>
      </div>-->
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { registerUser } from "@/api/login";
import { isValidUsername } from "@/utils/validate";

const validateUsername = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error("密码不能小于5位"));
  } else {
    callback();
  }
};


@Component
export default class Register extends Vue {
  private registerForm = {
    username: "",
    password: "",
    confirm: "",
    inviter: "wt",
  };

  private registerRules = {
    username: [
      { required: true, trigger: "blur", validator: validateUsername }
    ],
    password: [{ required: true, trigger: "blur", validator: validatePass }],
    confirm: [
      {
        required: true,
        password: this.registerForm.password,
        trigger: "blur",
        validator: (rule: any, value: string, callback: any) => {
          if (value !== this.registerForm.password) {
            callback(new Error("密码不一致"));
          } else {
            callback();
          }
        }
      },
    ],
  };

  private loading = false;
  private pwdType = "password";
  private showPwd() {
    if (this.pwdType === "password") {
      this.pwdType = "";
    } else {
      this.pwdType = "password";
    }
  }

  private handleRegister() {
    (this.$refs.registerForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        registerUser(this.registerForm)
          .then(() => {
            this.loading = false;
            // 注册成功跳去登陆页面
            this.$router.push({ path: "/login" });
          })
          .catch((err: any) => {
            this.loading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/variables.scss";
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>