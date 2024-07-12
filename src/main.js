import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './routes/routes.js'; // Adjust the import path based on your project structure
import { setUp } from './utils/hearing.js'; 

createApp(App)
  .use(router)
  .mount('#app');
setUp()
