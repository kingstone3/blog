import Vue from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '',
      component: import(
        /* webpackChunkName: "website_admin_layout" */
        '../pages/layout'
      ),
    }
  ]
});
