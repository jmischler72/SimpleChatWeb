import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './assets/main.css'
import {clickOutside} from "@/directives/ClickOutsideDirective";
import 'vue-gif-emoji-picker/dist/style.css';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

createApp(App)
    .directive("click-outside", clickOutside)
    .use(router)
    .mount("#app");