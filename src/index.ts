import * as Vue from 'vue'

export const vueVersion = Vue['default']['version'],
    vue2 = vueVersion.charAt(0) === '2'

function createFnActivateV1(fnActivate: (vm) => any): () => any {
    return function (this: any) {
        return fnActivate(this)
    }
}

function createFnDeactivateV1(fnDeactivate: (vm) => boolean): () => any {
    return function (this: any) {
        return fnDeactivate(this)
    }
}

function createFnActivateV2(fnActivate: (vm) => any): (route, redirect, next) => any {
    return function (route, redirect, next) {
        return next(fnActivate)
    }
}

function createFnDeactivateV2(fnDeactivate: (vm) => boolean): (route, redirect, next) => any {
    return function(this: any, route, redirect, next) {
        return fnDeactivate(this) && next()
    }
}

function fillHookOpts(opts: any, cls: any, fnActivate?: (vm) => any, fnDeactivate?: (self) => boolean): any {
    cls.component = opts

    if (!fnActivate && !fnDeactivate)
        return opts

    const route = vue2 ? opts : (opts.route || (opts.route = {}))
    
    if (fnActivate) {
        if (vue2)
            route.beforeRouteEnter = createFnActivateV2(fnActivate)
        else
            route.activate = createFnActivateV1(fnActivate)
    }

    if (fnDeactivate) {
        if (vue2)
            route.beforeRouteLeave = createFnDeactivateV2(fnDeactivate)
        else
            route.canDeactivate = createFnDeactivateV1(fnDeactivate)
    }

    return opts
}

function fillOpts(opts: any, cls: any): any {
    var methods = opts.methods,
        pt = cls.prototype
    
    if (!methods) opts.methods = methods = {}
    
    for (var key in pt) {
        if (key !== 'constructor') methods[key] = pt[key]
    }
    //Object.assign(methods, pt)
    
    opts.data = () => new cls()
    opts.name = cls.name

    return opts
}

export function component(opts: any, clazz?: any, fnActivate?: (self) => any, fnDeactivate?: (self) => boolean): any {
    if (clazz)
        return fillHookOpts(fillOpts(opts || {}, clazz), clazz, fnActivate, fnDeactivate)
    
    return (cls: any): any => Vue.extend(fillOpts(opts || {}, cls))
}
