import { createApp } from 'vue';
import App from './App.vue';
import CrmlUI from '../src/index';

const app = createApp(App);
app.use(CrmlUI);
app.mount('#app');
