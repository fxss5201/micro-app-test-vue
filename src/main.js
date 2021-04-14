import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import microStore from './store'
import actions from '@/shared/actions'

Vue.config.productionTip = false

let router = null
let instance = null
function render (props = {}) {
  console.log('micro-app-test-vue')
  console.log(props)
  const { container, store = microStore } = props

  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/',
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}
export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
