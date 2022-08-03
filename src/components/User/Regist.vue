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
      <el-button type="primary" @click="submitForm(ruleFormRef)"
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
import { ElLoading } from 'element-plus'
import { register } from '@/api/index.js'
// import { useRouter } from 'vue-router'
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
      } else if (value !== ruleForm.userPassword) {
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
        { min: 6, max: 40, message: '长度在8 到 40 个字符', trigger: 'blur' },
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
    // const router = useRouter()
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
          const loading = ElLoading.service({
            lock: true,
            text: '拼命加载中...',
            background: 'rgba(255,255,255,0.5)'
          })
          register(ruleForm.userName, ruleForm.userEmail,
            ruleForm.userPassword,
            ruleForm.userPassword2)
            .then((data) => {
              loading.close()
              alert('注册成功,注意查邮件激活账号!')
              // router.push({ path: '/login' })
            })
            .catch((err) => {
              loading.close()
              let info = '请求错误'
              try {
                info = err.response.data
              } catch {
                info = '请求错误'
              }
              alert(JSON.stringify(info))
            })
        } else {
          console.log('error submit!', fields)
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
