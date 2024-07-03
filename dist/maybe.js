"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mObj = exports.mthen = exports.mmap = exports.catMaybes = void 0;
exports.maybe = maybe;
exports.fromJust = fromJust;
exports.fromMaybe = fromMaybe;
exports.mapMaybes = mapMaybes;
exports.mEffect = mEffect;
exports.asHTMLAttributeValue = asHTMLAttributeValue;
const map_1 = __importDefault(require("lodash/map"));
const flatMap_1 = __importDefault(require("lodash/flatMap"));
function maybe(defaultValue, f, v) {
    return v === undefined || v === null ? defaultValue() : f(v);
}
function fromJust(a, error) {
    if (a === undefined || a === null) {
        throw new Error(error);
    }
    else {
        return a;
    }
}
function fromMaybe(defaultValue, t) {
    return t === null || t === undefined ? defaultValue() : t;
}
const catMaybes = (array) => (0, flatMap_1.default)(array, x => (x === null || x === undefined ? [] : [x]));
exports.catMaybes = catMaybes;
function mapMaybes(array, callback) {
    return (0, exports.catMaybes)((0, map_1.default)(array, callback));
}
// fmap for `null | undefined`
const mmap = (f, v) => v === undefined ? undefined : v === null ? null : f(v);
exports.mmap = mmap;
// bind for `null | undefined`
// Note that `bind` and `map` have the same body in JavaScript
const mthen = (v, f) => (v === undefined ? undefined : v === null ? null : f(v));
exports.mthen = mthen;
// mthen for effects (and not transformations, hence nothing is returned)
function mEffect(v, effect) {
    if (v !== null && v !== undefined) {
        effect(v);
    }
}
// create an object with the given property/value, when the value is present
const mObj = (p, v) => v === null || v === undefined ? {} : { [p]: v };
exports.mObj = mObj;
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
function asHTMLAttributeValue(value) {
    if (value === null || value === undefined) {
        return undefined;
    }
    return value;
}
