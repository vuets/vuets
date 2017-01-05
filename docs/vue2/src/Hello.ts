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
}, Hello, Hello.activate, Hello.deactivate)
