import { describe, expect, it } from 'vitest'

import { reactive } from '@/reactive'
describe('reactive', () => {
  it('happy', () => {
    expect(true).toBe(true);
    const originObj = {id: 1}
    const observed = reactive(originObj)
    expect(originObj).not.toBe(observed)
    expect(observed.id).toBe(1)
  })
})