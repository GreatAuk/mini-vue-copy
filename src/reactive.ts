import { track, trigger } from '@/effect'

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      track(target, key)
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      trigger(target, key)
      const res = Reflect.set(target, key, value)
      return res
    }
  })
}

export { reactive };