import { createApp } from 'vue'
import App from './App.vue'
import VueToast from "vue-toast-notification";

//import router
import router from './router'

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)
// const app = createApp({
//     render: () => h(App),
// });

//use vue router
app.use(router)
app.use(VueToast);

app.mount('#app')