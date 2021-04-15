<template>
  <div id="app-box">
    <div>
      <div class="content">
        <span>子应用Action通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>actionToken: {{ actionToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroActionToken">设置actionToken为microActionToken</el-button>
      </div>
      <div class="content">
        <span>子应用Props(vuex)通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>vuexToken: {{ vuexToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroVuexToken">设置vuexToken为microVuexToken</el-button>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import actions from '@/shared/actions'
export default {
  name: 'app',
  data () {
    return {
      actionToken: ''
    }
  },
  computed: {
    vuexToken () {
      return this.$store.state.token
    }
  },
  mounted () {
    console.log(this.$store)
    console.log('window.__POWERED_BY_QIANKUN__', window.__POWERED_BY_QIANKUN__)
    if (window.__POWERED_BY_QIANKUN__) {
      actions.onGlobalStateChange((state, prevState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log('子应用观察者：token 改变前的值为 ', prevState.token)
        console.log('子应用观察者：改变后的 token 的值为 ', state.token)

        const { token } = state
        this.actionToken = token
      }, true)
    }
  },
  methods: {
    setMicroActionToken () {
      actions.setGlobalState({ token: 'microActionToken' })
    },

    setMicroVuexToken () {
      this.$store.commit('setToken', 'microVuexToken')
    }
  },
  watch: {
    vuexToken (val, oldVal) {
      console.log('子应用vuex中token值改变前的值为 ', oldVal)
      console.log('子应用vuex中token值改变后的值为 ', val)
    }
  }
}
</script>

<style scoped lang="scss">
#app-box {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .content {
    text-align: left;
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
