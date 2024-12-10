import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './index.css';
import 'bulma/css/bulma.css';

const app = createApp(App);

// Create Pinia instance and use it in the app
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
