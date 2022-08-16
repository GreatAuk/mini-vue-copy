class ReactiveEffect {
  private _fn
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}
let activeEffect
const targetMap = new Map()
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
export function trigger(target, key) {
  const deps = targetMap.get(target).get(key)
  for (const dep of deps) {
    dep.run()
  }
}
export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}