<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    label-width="80px"
    :rules="rules"
    status-icon
    class="registerForm sign-up-form"
    hide-required-asterisk
    show-message
  >
    <el-form-item label="账号" prop="userName">
      <el-input
        v-model="ruleForm.userName"
        placeholder="请输入账号"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="userEmail">
      <el-autocomplete
        v-model="ruleForm.userEmail"
        :fetch-suggestions="querySearchEmail"
        :trigger-on-focus="false"
        placeholder="请输入邮箱"
        clearable
        type="email"
      >
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="密码" prop="userPassword">
      <el-input
        v-model="ruleForm.userPassword"
        placeholder="请输入密码"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码:" prop="checkPassword">
      <el-input
        v-model="ruleForm.checkPassword"
        placeholder="请再次输入您的密码"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('ruleForm')"
        >确认</el-button
      >
      <el-button>取消</el-button>
    </el-form-item>
    <!-- <el-form-item>
      <el-button @click="gologin">登录</el-button>
    </el-form-item> -->
  </el-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import queryEmail from '@/utils/queryEmail'
export default defineComponent({
  name: 'RegistForm',
  setup () {
    const ruleFormRef = ref()
    const ruleForm = reactive({
      userName: '',
      userEmail: '',
      userPassword: '',
      userPassword2: ''
    })
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    const rules = reactive({
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      userEmail: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' },
        { required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ],
      userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '长度至少为6', trigger: 'blur' }
      ],
      checkPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' }
      ]
    })
    const querySearchEmail = (queryString, callback) => {
      const results = queryEmail(queryString)
      callback(results)
    }
    const submitForm = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    return {
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      querySearchEmail
    }
  }
})
</script>
<style lang="less">
.registerForm {
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  margin-bottom: 200px;
}
:root {
  --el-component-size: 40px;
}
.el-form-item {
  margin-bottom: 22px;
}
.el-autocomplete {
  width: 100%
}
form {
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
}
form.sign-up-form {
  opacity: 0;
  z-index: 1;
}
</style>
