//import './bootstrap';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLink, faArrowUpRightFromSquare, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faLink)
library.add(faArrowUpRightFromSquare)
library.add(faXmark)
library.add(faPlus)

import { createApp } from 'vue';

import router from './router';

import App from './App.vue'

createApp(App)
.use(router) 
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app');