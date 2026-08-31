export function maybe(defaultValue, f, v) {
    return v === undefined || v === null ? defaultValue() : f(v);
}
export function fromJust(a, error) {
    if (a === undefined || a === null) {
        throw new Error(error);
    }
    else {
        return a;
    }
}
export function fromMaybe(defaultValue, t) {
    return t === null || t === undefined ? defaultValue() : t;
}
export const catMaybes = (array) => array.filter((x) => x !== null && x !== undefined);
export function mapMaybes(array, callback) {
    return catMaybes(array.map(callback));
}
// fmap for `null | undefined`
export const mmap = (f, v) => v === undefined ? undefined : v === null ? null : f(v);
// bind for `null | undefined`
// Note that `bind` and `map` have the same body in JavaScript
export const mthen = (v, f) => (v === undefined ? undefined : v === null ? null : f(v));
// mthen for effects (and not transformations, hence nothing is returned)
export function mEffect(v, effect) {
    if (v !== null && v !== undefined) {
        effect(v);
    }
}
// create an object with the given property/value, when the value is present
export const mObj = (p, v) => v === null || v === undefined ? {} : { [p]: v };
/* asHTMLAttributeValue is used as a way to make an HTML attribute value
 * exist in the DOM or not. React does not add in the DOM HTML attributes
 * with an "undefined" value
 * eg.
 *
 * const disabled = null
 * const disabledObj = {disabled: asHTMLAttributeValue(disabled)}
 * <button {...disabledObj} />
 */
export function asHTMLAttributeValue(value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    return value;
}
