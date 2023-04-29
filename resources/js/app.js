//import './bootstrap';
const isProd = true;

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLink, faArrowUpRightFromSquare, faXmark, faPlus, faBars } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faLink)
library.add(faArrowUpRightFromSquare)
library.add(faXmark)
library.add(faPlus)
library.add(faBars);

import piniaUse  from './store/pinia.js';

import { createApp } from 'vue';

import router from './router';

import App from './App.vue'


createApp(App)
.use(piniaUse)
.use(router) 
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');

import  userStore from './store/userStore.js';

router.beforeEach(async  (to) => {
    console.log(to)
    if (!userStore.getIsLog && to.name !== 'login' && isProd) {
        return { name: 'login' }
    }
})