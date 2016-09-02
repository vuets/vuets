import { component } from 'vuets'

export class Home {
    msg = 'Home'
    activate = 0
    deactivate = 0
    static activate(self: Home) {
        self.activate++
    }
    static deactivate(self: Home): boolean {
        self.deactivate++
        return true
    }
    append(suffix: string) {
        this.msg += suffix
    }
}
// workaround for current vue-router bug 
// that calls activate before the component is created
let $self: Home|null = null
function activate(self: Home) { if ($self || ($self = self)) Home.activate($self) }
export default component({
    mounted(this: Home) { if ($self === undefined) { Home.activate($self = this) } },
    template: `
<div>
  <h3 @click="append('!')">{{ msg }} | activate count: {{ activate }}</h3>
</div>
`
}, Home, activate/*, Home.deactivate*/)