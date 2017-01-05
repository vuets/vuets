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
export default component({
    template: `
<div>
  <h3 @click="append('!')">{{ msg }} | activate count: {{ activate }} | deactivate count: {{ deactivate }}</h3>
</div>
`
}, Home, Home.activate, Home.deactivate)
