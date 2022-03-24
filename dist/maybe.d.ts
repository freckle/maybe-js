export declare function maybe<I, O>(defaultValue: () => O, f: (v: I) => O, v?: I | null): O;
export declare function fromJust<A>(a: A | undefined | null, error: string): A;
export declare function fromMaybe<T>(defaultValue: () => T, t?: T | null): T;
export declare const catMaybes: <T extends unknown>(array: (T | null | undefined)[]) => T[];
export declare function mapMaybes<A, B>(array: Array<A>, callback: (value: A, index: number, array: ReadonlyArray<A>) => B | undefined | null): Array<B>;
export declare const mmap: <I extends unknown, O>(f: (v: I) => O, v?: I | null | undefined) => O | null | undefined;
export declare const mthen: <I extends unknown, O>(v: I | null | undefined, f: (v: I) => O | null | undefined) => O | null | undefined;
export declare function mEffect<V>(v: V | undefined | null, effect: (v: V) => void): void;
export declare function asHTMLAttributeValue<T>(value?: T | null): T | void;
