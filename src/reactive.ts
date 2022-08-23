import { track, trigger } from '@/effect'

function reactive<T extends object>(raw: T): T {
  return new Proxy(raw, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}

export { reactive };