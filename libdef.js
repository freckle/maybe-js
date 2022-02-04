// @flow

declare module '@freckle/maybe' {
  declare export function maybe<I, O>(defaultValue: () => O, f: (v: I) => O, v: ?I): O
  declare export function fromJust<A>(a: ? A, error : string): A
  declare export function fromMaybe<T>(defaultValue: () => T, t: ?T): T
  declare export function catMaybes<T>(array: Array<?T>): Array<T>
  declare export function mapMaybes<A, B>(
	array: Array<A>,
	callback: (value: A, index: number, array: $ReadOnlyArray<A>) => ?B
  ): Array<B>
  declare export function mmap<I, O>(f: (v: I) => O, v: ?I): ?O
  declare export function mthen<I, O>(v: ?I, f: (v: I) => ?O): ?O
  declare export function mEffect<V>(v: ?V, effect: (v: V) => void): void
  declare export function asHTMLAttributeValue<T>(value: ?T): T | typeof undefined
}
