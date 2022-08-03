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
    <el-form-item label="用户名:" prop="userName">
      <el-input
        v-model="ruleForm.userName"
        placeholder="请输入用户名"
        clearable
      >
      </el-input>
    </el-form-item>
    <el-form-item label="密码:" prop="userPassword">
      <el-input
        v-model="ruleForm.userPassword"
        placeholder="请输入密码"
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
import { login, getUser } from '@/api/index.js'
import { ElLoading } from 'element-plus'
import store from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'loginForm',
  setup () {
    const ruleForm = reactive({ userName: '', userPassword: '' })
    const ruleFormRef = ref()
    const router = useRouter()
    const rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      userPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6', trigger: 'blur' }
      ]
    }
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
          login(ruleForm.userName, ruleForm.userPassword)
            .then(async (res) => {
              store.commit('SetJwt', res.data)
              const info = await getUser()
              store.commit('SetUser', info.data)
              loading.close()
              alert('登录成功')
              router.push('/')
            })
            .catch((err) => {
              loading.close()
              console.log(err)
              alert('登录失败，请检查您的账号及密码信息......')
            })
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      ruleForm,
      rules,
      submitForm,
      ruleFormRef
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
