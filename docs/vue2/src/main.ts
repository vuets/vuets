declare function require(path: string): any;
import * as Vue from 'vue'
import * as Router from 'vue-router'
import Home from './home/'
import Hello from './Hello'

Vue.use(Router)
const config = {
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        { path: '/home', component: Home },
        { path: '/hello', component: Hello },
        { path: '*', redirect: '/home' }
    ]
}
let app = require('./App.vue')
app.router = new Router(config)
new Vue(app).$mount('#app')
