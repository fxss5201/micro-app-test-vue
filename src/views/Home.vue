<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import actions from '@/shared/actions'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted () {
    console.log('11111111', window.__POWERED_BY_QIANKUN__)
    if (window.__POWERED_BY_QIANKUN__) {
      // 注册观察者函数
      // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
      actions.onGlobalStateChange(state => {
        console.log('state', state)
        const { token } = state
        // 未登录 - 返回主页
        if (!token) {
          console.log('未检测到token！')
          return
        }

        // 获取用户信息
        console.log('token', token)
      }, true)

      setTimeout(() => {
        const token = 'token123456'
        actions.setGlobalState({ token })
      }, 5000)
    }
  }
}
</script>
