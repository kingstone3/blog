import Vue from 'vue';
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '',
      component: import(
        /* webpackChunkName: "website_account_layout" */
        '../pages/layout'
      ),
    }
  ]
});
