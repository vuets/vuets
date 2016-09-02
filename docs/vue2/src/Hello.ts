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
// workaround for current vue-router bug 
// that calls activate before the component is created
let $self: Hello|null = null
function activate(self: Hello) { if ($self || ($self = self)) Hello.activate($self) }
export default component({
    mounted(this: Hello) { if ($self === undefined) { Hello.activate($self = this) } },
    template: `
<div>
  <h3 @click="append('!')">{{ msg }}</h3>
  <div>
    activate count: {{ activate }}
  </div>
</div>
`
}, Hello, activate/*, Hello.deactivate*/)