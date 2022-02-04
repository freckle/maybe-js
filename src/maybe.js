/* @flow */

import map from 'lodash/map'
import flatMap from 'lodash/flatMap'

export function maybe<I, O>(defaultValue: () => O, f: (v: I) => O, v: ?I): O {
  return v === undefined || v === null ? defaultValue() : f(v)
}

export function fromJust<A>(a: ?A, error: string): A {
  if (a === undefined || a === null) {
    throw new Error(error)
  } else {
    return a
  }
}

export function fromMaybe<T>(defaultValue: () => T, t: ?T): T {
  return t === null || t === undefined ? defaultValue() : t
}

export const catMaybes = <T>(array: Array<?T>): Array<T> =>
  flatMap(array, x => (x === null || x === undefined ? [] : [x]))

export function mapMaybes<A, B>(
  array: Array<A>,
  callback: (value: A, index: number, array: $ReadOnlyArray<A>) => ?B
): Array<B> {
  return catMaybes(map(array, callback))
}

// fmap for `null | undefined`
export const mmap = <I, O>(f: (v: I) => O, v: ?I): ?O =>
  v === undefined ? undefined : v === null ? null : f(v)

// bind for `null | undefined`
// Note that `bind` and `map` have the same body in JavaScript
export const mthen = <I, O>(v: ?I, f: (v: I) => ?O): ?O =>
  v === undefined ? undefined : v === null ? null : f(v)

// mthen for effects (and not transformations, hence nothing is returned)
export function mEffect<V>(v: ?V, effect: (v: V) => void) {
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
export function asHTMLAttributeValue<T>(value: ?T): T | typeof undefined {
  if (value === null || value === undefined) {
    return undefined
  }
  return value
}
