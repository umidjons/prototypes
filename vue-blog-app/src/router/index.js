import Vue from 'vue'
import Router from 'vue-router'
import addBlog from '@/components/addBlog'
import showBlog from '@/components/showBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: showBlog
    },
    {
      path: '/add',
      component: addBlog
    }
  ]
})
