Typescript-based components with compatibility layer between version 1 and 2 of vue and vue-router

### Component
```ts
import { component } from 'vuets'

export class Hello {
    msg = 'Hello, world!'
    activate = 0
    deactivate = 0
    static activate(self: Hello) {
        self.activate++
    }
    static deactivate(self: Hello): boolean {
        self.deactivate++
        return true
    }
    append(suffix: string) {
        this.msg += suffix
    }
}
export default component({
    template: `
<div>
  <h3 @click="append('!')">{{ msg }}</h3>
  <div>
    activate count: {{ activate }}
  </div>
  <div>
    deactivate count: {{ deactivate }}
  </div>
</div>
`
}, Hello, Hello.activate, Hello.deactivate)
```

### main.ts (vue 1.0.x)
```ts
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
```

### main.ts (vue 2.0.x)
```ts
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
new Vue(Vue.util.extend(
    { router: new Router(config) },
    require('./App.vue'))
).$mount('#app')
```

