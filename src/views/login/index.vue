<template>
  <div class="login-container">
    <!-- 头部导航 -->
    <van-nav-bar class="page-nav-bar" title="登录/注册" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxLength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxLength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时组件 finish倒计时结束时触发 time 属性表示倒计时总时长，单位为毫秒。 format 属性设置倒计时文本的内容-->
          <van-count-down
            :time="1000 * 3"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- 获取验证码 -->
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
// 按需导入
import { login, sendSms } from "@/api/user";
export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      // 表单的验证规则
      userFormRules: {
        mobile: [
          { required: true, message: "请输入手机号码" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码" },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    // 登录按钮
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user;
      // 2.表单验证
      //   展示登陆中loading
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁用背景点击
        duration: 0, //持续时间，默认是2000，如果为0，则持续展示
      });
      // 3.提交表单请求登录
      // try 尝试执行的代码块
      try {
        const { data } = await login(user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登陆成功");
      } catch (err) {
        // catch 捕获错误的代码块
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登陆失败，请稍后重试", err);
        }
      }

      //   4.根据请求响应结果处理后续操作
    },
    // 获取表单验证码
    async onSendSms() {
      // 1.校验手机号码
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 2.校验通过，显示倒计时
      this.isCountDownShow = true;

      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast.fail("发送太频繁了，请稍后重新发送");
        } else {
          this.$toast.fail("发送失败，请稍后重新发送");
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-sms-btn {
  width: 156px;
  height: 48px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>