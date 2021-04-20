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
        <span>子应用Props(bus)通信:</span>
        <el-divider direction="vertical"></el-divider>
        <span>busToken: {{ busToken }}</span>
        <el-divider direction="vertical"></el-divider>
        <el-button size="mini" @click="setMicroBusToken">设置busToken为microBusToken</el-button>
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
    busToken () {
      return this.$store.state.tokenModule.token
    }
  },
  mounted () {
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

    this.$bus.$on('setBusToken', (val) => {
      this.$store.commit('tokenModule/setToken', val)
    })
  },
  methods: {
    setMicroActionToken () {
      if (window.__POWERED_BY_QIANKUN__) {
        actions.setGlobalState({ token: 'microActionToken' })
      }
    },

    setMicroBusToken () {
      // 防止多次commit setToken，所以将commit setToken放在eventBus中去做，此处仅emit eventBus
      // this.$store.commit('tokenModule/setToken', 'microBusToken')
      this.$bus.$emit('setBusToken', 'microBusToken')
    }
  },
  watch: {
    busToken (val, oldVal) {
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
