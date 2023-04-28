//import './bootstrap';
const isProd = false;

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

import { createPinia } from 'pinia';
const pinia = createPinia()
import { useUserStore } from './store/userStore.js';

import { createApp } from 'vue';

import router from './router';

import App from './App.vue'


createApp(App)
.use(pinia)
.use(router) 
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');

const userStore = useUserStore(pinia)

router.beforeEach(async  (to) => {
    console.log(to)
    if (!userStore.getIsLog && to.name !== 'login' && isProd) {
        return { name: 'login' }
    }
})