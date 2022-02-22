import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
//import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vueInsomnia from "vue-insomnia";
library.add(fas);
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(vueInsomnia);
app.use(store);
app.use(router);
app.mount('#app');
