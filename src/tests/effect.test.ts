import { describe, expect, it } from 'vitest';
import { effect, stop } from '@/effect'
import { reactive } from '@/reactive';

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
      sex: 'male'
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })

    user.age = user.age + 1
    user.age++
    expect(nextAge).toBe(12)
    expect(user.age).toBe(12)
  })
  it('stop', () => {
    const user = reactive({
      age: 28
    })
    let nextAge
    const runner = effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(29)
    // stop(runner)
    user.age += 1
    expect(nextAge).toBe(30)
  })
})
