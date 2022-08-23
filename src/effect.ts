class ReactiveEffect<T = any> {
  constructor(
    public fn: () => T
  ) {}
  run() {
    activeEffect = this
    this.fn()
  }
}

let activeEffect: ReactiveEffect | undefined

type Dep = Set<ReactiveEffect>
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()
export function track(target, key) {
  if (!activeEffect) return
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
  const deps = targetMap.get(target)?.get(key)
  if (!deps) return
  for (const dep of deps) {
    dep.run()
  }
}
export function stop() {

}

export function effect(fn) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
