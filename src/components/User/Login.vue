<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="80px"
    :rules="rules"
    status-icon
    class="loginForm sign-in-form"
    hide-required-asterisk
    show-message
  >
    <el-form-item label="您的邮箱:" prop="userEmail">
      <el-autocomplete
        v-model="ruleForm.userEmail"
        :fetch-suggestions="querySearchEmail"
        :trigger-on-focus="false"
        placeholder="请输入您的邮箱"
        clearable
        type="email"
      >
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="您的密码:" prop="userPassword">
      <el-input
        v-model="ruleForm.userPassword"
        placeholder="请输入您的密码"
        show-password
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form-item>
    <div class="tiparea">
      <p>
        忘记密码
      </p>
    </div>
  </el-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import queryEmail from '@/utils/queryEmail'
export default defineComponent({
  name: 'loginForm',
  setup () {
    const ruleForm = reactive({ userEmail: '', userPassword: '' })
    const ruleFormRef = ref()
    const rules = {
      userEmail: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' },
        { required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ],
      userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6', trigger: 'blur' }
      ]
    }
    const querySearchEmail = (queryString, callback) => {
      const results = queryEmail(queryString)
      callback(results)
    }
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      ruleForm,
      rules,
      submitForm,
      ruleFormRef,
      querySearchEmail
    }
  }
})
</script>
<style lang="less" scoped>
.loginForm {
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  position: relative;
  top: 300px;
  .submit-btn {
    width: 100%;
  }
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
    p a {
      color: #409eff;
    }
  }
}
/* 控制login & register显示 */
form {
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
}
form.sign-in-form {
  z-index: 2;
}
</style>
