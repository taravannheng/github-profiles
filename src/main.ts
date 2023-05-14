import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookBookmark, faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from './App.vue'

library.add(faBookBookmark, faUser, faPaperPlane);

const app = createApp(App)

app.use(createPinia())
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
