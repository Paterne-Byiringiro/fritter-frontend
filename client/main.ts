import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbsUp as faThumbsUpRegular} from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpSolid} from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown as faThumbsDownRegular} from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as faThumbsDownSolid} from '@fortawesome/free-solid-svg-icons'
library.add(faThumbsUpRegular, faThumbsUpSolid,faThumbsDownRegular, faThumbsDownSolid)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
