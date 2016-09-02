export declare const vueVersion: any, vue2: boolean;
export interface Vm extends vuejs.Vue {
}
export declare function vm(self: any): Vm;
export declare function component(opts: any, clazz?: any, fnActivate?: (self) => any, fnDeactivate?: (self) => boolean): any;
