import Vue from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';
import '@/styles/index.scss';
import '@/icons/components';
import '@/permission';
// import '@/icons'; // icon

/**
 * This project originally used easy-mock to simulate data requests,
 * but its official service is not stable.
 * So here We use Mock.js for a local emulation,
 * it will intercept your request and you won't see the request in the network.
 * If you remove `import '../mock'` it will automatically request easy-mock data.
 */
// import '../mock'; // simulation data requests

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import '@/registerServiceWorker';
// import i18n from '@/lang';

import Session from '@/utils/session';
import VueI18n from 'vue-i18n';
import enLocale from '@/lang/en';
import zhLocale from '@/lang/zh';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

Vue.config.productionTip = false;

// window.BaseUploadUrl = 'http://localhost:9091/upload';

// import util from '@/utils/session';
// util.set('category', 'home');
Vue.use(VueI18n);
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
};

const i18n = new VueI18n({
  locale: Session.get('language') || 'zh',
  messages,
});

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
