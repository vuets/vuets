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
