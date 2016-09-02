declare function require(path: string): any;
import * as Vue from 'vue'
import * as Router from 'vue-router'
import Home from './home/'
import Hello from './Hello'

Vue.use(Router)
var router = new Router({ linkActiveClass: 'active' })
router.map({
    '/home': { component: Home },
    '/hello': { component: Hello }
})
router.redirect({
    '*': '/home'
})
router.beforeEach(function () {
    window.scrollTo(0, 0)
})
router.start(require('./App.vue'), '#app')
