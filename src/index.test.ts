import {
  asHTMLAttributeValue,
  catMaybes,
  fromJust,
  fromMaybe,
  mapMaybes,
  maybe,
  mEffect,
  mmap,
  mObj,
  mthen
} from './index.js'

describe('@freckle/maybe', () => {
  describe('maybe', () => {
    test('applies the function given non-null, non-undefined', () => {
      expect(
        maybe(
          () => 0,
          (v: number) => v + 1,
          41
        )
      ).toEqual(42)
    })

    test('returns the default given null', () => {
      expect(
        maybe(
          () => 0,
          (v: number) => v + 1,
          null
        )
      ).toEqual(0)
    })

    test('returns the default given undefined', () => {
      expect(
        maybe(
          () => 0,
          (v: number) => v + 1,
          undefined
        )
      ).toEqual(0)
    })
  })

  describe('fromJust', () => {
    test('returns the value given non-null, non-undefined', () => {
      expect(fromJust(42, 'boom')).toEqual(42)
    })

    test('throws the given error on null', () => {
      expect(() => fromJust(null, 'boom')).toThrow('boom')
    })

    test('throws the given error on undefined', () => {
      expect(() => fromJust(undefined, 'boom')).toThrow('boom')
    })
  })

  describe('fromMaybe', () => {
    test('returns the value given non-null, non-undefined', () => {
      expect(fromMaybe(() => 0, 42)).toEqual(42)
    })

    test('returns the default given null', () => {
      expect(fromMaybe(() => 0, null)).toEqual(0)
    })

    test('returns the default given undefined', () => {
      expect(fromMaybe(() => 0, undefined)).toEqual(0)
    })
  })

  describe('asHTMLAttributeValue', () => {
    test('returns the value given non-null, non-undefined', () => {
      expect(asHTMLAttributeValue('a')).toEqual('a')
    })

    test('returns undefined given null', () => {
      expect(asHTMLAttributeValue(null)).toEqual(undefined)
    })

    test('returns undefined given undefined', () => {
      expect(asHTMLAttributeValue(undefined)).toEqual(undefined)
    })
  })

  describe('mapMaybes', () => {
    test('should return empty if the argument always return null', () => {
      const result = mapMaybes([1, 2, 3, 4], _x => null)
      expect(result).toEqual([])
    })

    test('should return the same length if the argument never returns null', () => {
      const result = mapMaybes([1, 2, 3, 4], x => x)
      expect(result.length).toEqual(4)
    })

    test('should ignore both null and undefined', () => {
      const result = mapMaybes([1, 2, 3, 4], x => (x % 2 === 0 ? null : undefined))
      expect(result).toEqual([])
    })

    test('should keep non-null, non-undefined values', () => {
      const result = mapMaybes([1, 2, 3, 4], x => (x % 2 === 0 ? null : x))
      expect(result).toEqual([1, 3])
    })
  })

  describe('catMaybes', () => {
    test('rejects values that are null or undefined', () => {
      const result = catMaybes([undefined, 1, undefined, null, 2, 3, null, 4, undefined, 5, null])
      expect(result).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('mmap', () => {
    test('returns undefined given undefined', () => {
      //@ts-expect-error: ts is too smart and knows that v is undefined
      const result = mmap(v => v + 1, undefined)
      expect(result).toEqual(undefined)
    })

    test('returns null given null', () => {
      //@ts-expect-error: ts is too smart and knows that v is null
      const result = mmap(v => v + 1, null)
      expect(result).toEqual(null)
    })

    test('modifies the value given non-null, non-undefined', () => {
      const result = mmap(v => v + 1, 41)
      expect(result).toEqual(42)
    })
  })

  describe('mthen', () => {
    test('returns undefined given undefined', () => {
      //@ts-expect-error: ts is too smart and knows that v is undefined
      const result = mthen(undefined, v => v + 1)
      expect(result).toEqual(undefined)
    })

    test('returns null given null', () => {
      //@ts-expect-error: ts is too smart and knows that v is null
      const result = mthen(null, v => v + 1)
      expect(result).toEqual(null)
    })

    test('modifies the value given non-null, non-undefined', () => {
      const result = mthen(41, v => v + 1)
      expect(result).toEqual(42)
    })

    test('bubbles null returns', () => {
      const result = mthen(41, _ => null)
      expect(result).toEqual(null)
    })

    test('bubbles undefined returns', () => {
      const result = mthen(41, _ => undefined)
      expect(result).toEqual(undefined)
    })
  })

  describe('mEffect', () => {
    test('should call fn when value is not null/undefined', () => {
      const fn = vi.fn()

      const returned = mEffect('a', fn)
      mEffect(0, fn)
      mEffect([], fn)
      mEffect({}, fn)

      expect(fn).toHaveBeenCalledTimes(4)
      expect(fn).toHaveBeenNthCalledWith(1, 'a')
      expect(fn).toHaveBeenNthCalledWith(2, 0)
      expect(fn).toHaveBeenNthCalledWith(3, [])
      expect(fn).toHaveBeenNthCalledWith(4, {})
      expect(returned).toEqual(undefined)
    })

    test('should NOT call fn when value is null/undefined', () => {
      const fn = vi.fn()

      const returned1 = mEffect(null, fn)
      const returned2 = mEffect(undefined, fn)

      expect(fn).toHaveBeenCalledTimes(0)
      expect(returned1).toEqual(undefined)
      expect(returned2).toEqual(undefined)
    })
  })

  describe('mObj', () => {
    test('refines to a more specific type', () => {
      const _ex1: {foo?: number} = mObj('foo', 42)
      const mkNullNumber = (): null | number => null
      const _ex2: {bar?: number} = mObj('bar', mkNullNumber())
      const _ex3: {spam?: number} = mObj('spam', undefined)
    })

    test('returns an object with the given prop/value pair when the value is present', () => {
      expect(mObj('eggs', 42)).toEqual({eggs: 42})
      expect(mObj('fish', ['hi'])).toEqual({fish: ['hi']})
    })

    test('returns an empty object given null', () => {
      expect(mObj('404', null)).toEqual({})
    })

    test('returns an empty object given undefined', () => {
      expect(mObj('nope', undefined)).toEqual({})
    })
  })
})
