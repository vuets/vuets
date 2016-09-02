Vue components using typescript 2.0 with compatibility layer between version [1](https://vuets.github.io/vuets/vue1/) and [2](https://vuets.github.io/vuets/vue2/) of vue and vue-router

[Examples](https://vuets.github.io/vuets/)

Unline other integrations, this does not rely on annotations (runtime introspection overhead) but instead encourages keeping it simple and light like writing components in es6/es2015 (WYSIWYG).

For simple components, one can simple take advantage of this [typescript 2.0 feature](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#specifying-the-type-of-this-for-functions) where you can specify the type of ```this``` for functions.

```ts
interface MyModel {
     msg: string
}

export default {
    name: 'Foo', // specify the component name
    data(): MyModel {
        return {
            msg: 'hello'
        }
    },
    // we get all the type-safety of using a class with this paradigm
    methods: {
        append(this: MyModel, suffix: string) {
            this.msg += suffix
        }
    },
    template: `<div @click="append('!')">{{ msg }}</div>`
}
```

Here's a sample component with inheritance ([live demo](https://vuets.github.io/vuets/vue1/#!/hello)):
```ts
import { component } from 'vuets'

abstract class HasMsg {
    msg: string = 'Hello, world!'
    append(suffix: string) {
        this.msg += suffix
    }
}

export class Hello extends HasMsg {
    activate = 0
    deactivate = 0
    constructor() {
        super()
    }
    static activate(self: Hello) {
        self.activate++
    }
    static deactivate(self: Hello): boolean {
        self.deactivate++
        return true
    }
    append(suffix: string) {
        super.append('?' + suffix)
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
}, Hello, Hello.activate, Hello.deactivate) // v1/v2 router hooks compatibility mode
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
new Vue(
    Vue.util.extend({ router: new Router(config) }, require('./App.vue'))
).$mount('#app')
```

