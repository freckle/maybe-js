declare module '@freckle/maybe' { 
declare export function maybe<I, O>(
  defaultValue: () => O,
  f: (v: I) => O,
  v?: I | null
): O;
declare export function fromJust<A>(a: A | void | null, error: string): A;
declare export function fromMaybe<T>(defaultValue: () => T, t?: T | null): T;
declare export var catMaybes: <T: mixed>(array: (T | null | void)[]) => T[];
declare export function mapMaybes<A, B>(
  array: Array<A>,
  callback: (
    value: A,
    index: number,
    array: $ReadOnlyArray<A>
  ) => B | void | null
): Array<B>;
declare export var mmap: <I: mixed, O>(
  f: (v: I) => O,
  v?: I | null | void
) => O | null | void;
declare export var mthen: <I: mixed, O>(
  v: I | null | void,
  f: (v: I) => O | null | void
) => O | null | void;
declare export function mEffect<V>(
  v: V | void | null,
  effect: (v: V) => void
): void;
declare export function asHTMLAttributeValue<T>(value?: T | null): T | void;
}
