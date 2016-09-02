vue typescript

### Component example:
```ts
import { component, vm } from 'vuets'

@component(`
<div class="hello">
  <h1 @click="append('!')">{{ msg }}</h1>
</div>
`, {})
export default class {
  msg: string = "Hello World!"
  append(suffix: string) {
    this.msg += suffix
  }
}
```

### Use the component:
```ts
import { component, vm } from 'vuets'
import Hello from './Hello'

@component(`
<div id="app">
  <div style="cursor:pointer" @click="foo(1)">Clicked: {{bar}}</div>
  <hello></hello>
</div>
`, {
  components: {
    Hello
  }
})
export default class {

  bar: number = 0

  foo(n: number) {
    this.bar += n
  }
}
```

### main.ts
```ts
import * as Vue from 'vue'

import App from './App'

new Vue({
  el: 'body',
  components: { App }
})
```

Dependencies:
```sh
npm install -g remap-istanbul
```
