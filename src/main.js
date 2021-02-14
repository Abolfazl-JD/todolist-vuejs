import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueResource from "vue-resource"

Vue.use(VueResource)

export const bus = new Vue()

new Vue({
    el: '#app',
    render: h => h(App)
})