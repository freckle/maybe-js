import map from 'lodash/map'
import flatMap from 'lodash/flatMap'

export function maybe<I, O>(defaultValue: () => O, f: (v: I) => O, v?: I | null): O {
  return v === undefined || v === null ? defaultValue() : f(v)
}

export function fromJust<A>(a: A | undefined | null, error: string): A {
  if (a === undefined || a === null) {
    throw new Error(error)
  } else {
    return a
  }
}

export function fromMaybe<T>(defaultValue: () => T, t?: T | null): T {
  return t === null || t === undefined ? defaultValue() : t
}

export const catMaybes = <T extends any>(array: Array<T | undefined | null>): Array<T> =>
  flatMap(array, x => (x === null || x === undefined ? [] : [x]))

export function mapMaybes<A, B>(
  array: Array<A>,
  callback: (value: A, index: number, array: ReadonlyArray<A>) => B | undefined | null
): Array<B> {
  return catMaybes(map(array, callback))
}

// fmap for `null | undefined`
export const mmap = <I extends any, O>(f: (v: I) => O, v?: I | null): O | undefined | null =>
  v === undefined ? undefined : v === null ? null : f(v)

// bind for `null | undefined`
// Note that `bind` and `map` have the same body in JavaScript
export const mthen = <I extends any, O>(
  v: I | undefined | null,
  f: (v: I) => O | undefined | null
): O | undefined | null => (v === undefined ? undefined : v === null ? null : f(v))

// mthen for effects (and not transformations, hence nothing is returned)
export function mEffect<V>(v: V | undefined | null, effect: (v: V) => void) {
  if (v !== null && v !== undefined) {
    effect(v)
  }
}

/* asHTMLAttributeValue is used as a way to make an HTML attribute value
 * exist in the DOM or not. React does not add in the DOM HTML attributes
 * with an "undefined" value
 * Flow does not accept the empty object for spreading.
 * eg.
 *
 * const disabled = null
 * const disabledObj = {disabled: asHTMLAttributeValue(disabled)}
 * <button {...disabledObj} />
 */

export function asHTMLAttributeValue<T>(value?: T | null): T | void {
  if (value === null || value === undefined) {
    return undefined
  }
  return value
}
