import * as Vue from 'vue';
export var vueVersion = Vue['default']['version'], vue2 = vueVersion.charAt(0) === '2';
export function vm(self) {
    return self;
}
function createFnActivateV1(fnActivate) {
    return function () {
        return fnActivate(this);
    };
}
function createFnDeactivateV1(fnDeactivate) {
    return function () {
        return fnDeactivate(this);
    };
}
function createFnActivateV2(fnActivate) {
    return function (route, redirect, next) {
        return next(fnActivate);
    };
}
function createFnDeactivateV2(fnDeactivate) {
    return function (route, redirect, next) {
        return fnDeactivate(this) && next();
    };
}
function fillHookOpts(opts, cls, fnActivate, fnDeactivate) {
    cls.component = opts;
    if (!fnActivate && !fnDeactivate)
        return opts;
    var route = vue2 ? opts : (opts.route || (opts.route = {}));
    if (fnActivate) {
        if (vue2)
            route.beforeRouteEnter = createFnActivateV2(fnActivate);
        else
            route.activate = createFnActivateV1(fnActivate);
    }
    if (fnDeactivate) {
        if (vue2)
            route.beforeRouteLeave = createFnDeactivateV2(fnDeactivate);
        else
            route.canDeactivate = createFnDeactivateV1(fnDeactivate);
    }
    return opts;
}
function fillOpts(opts, cls) {
    var methods = opts.methods, pt = cls.prototype;
    if (!methods)
        opts.methods = methods = {};
    for (var key in pt) {
        if (key !== 'constructor')
            methods[key] = pt[key];
    }
    //Object.assign(methods, pt)
    opts.data = function () { return new cls(); };
    opts.name = cls.name;
    return opts;
}
export function component(opts, clazz, fnActivate, fnDeactivate) {
    if (clazz)
        return fillHookOpts(fillOpts(opts || {}, clazz), clazz, fnActivate, fnDeactivate);
    return function (cls) { return Vue.extend(fillOpts(opts || {}, cls)); };
}
//# sourceMappingURL=index.js.map