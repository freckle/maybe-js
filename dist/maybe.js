"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asHTMLAttributeValue = exports.mEffect = exports.mthen = exports.mmap = exports.mapMaybes = exports.catMaybes = exports.fromMaybe = exports.fromJust = exports.maybe = void 0;
const map_1 = __importDefault(require("lodash/map"));
const flatMap_1 = __importDefault(require("lodash/flatMap"));
function maybe(defaultValue, f, v) {
    return v === undefined || v === null ? defaultValue() : f(v);
}
exports.maybe = maybe;
function fromJust(a, error) {
    if (a === undefined || a === null) {
        throw new Error(error);
    }
    else {
        return a;
    }
}
exports.fromJust = fromJust;
function fromMaybe(defaultValue, t) {
    return t === null || t === undefined ? defaultValue() : t;
}
exports.fromMaybe = fromMaybe;
const catMaybes = (array) => (0, flatMap_1.default)(array, x => (x === null || x === undefined ? [] : [x]));
exports.catMaybes = catMaybes;
function mapMaybes(array, callback) {
    return (0, exports.catMaybes)((0, map_1.default)(array, callback));
}
exports.mapMaybes = mapMaybes;
// fmap for `null | undefined`
const mmap = (f, v) => v === undefined ? undefined : v === null ? null : f(v); // bind for `null | undefined`
exports.mmap = mmap;
// Note that `bind` and `map` have the same body in JavaScript
const mthen = (v, f) => (v === undefined ? undefined : v === null ? null : f(v)); // mthen for effects (and not transformations, hence nothing is returned)
exports.mthen = mthen;
function mEffect(v, effect) {
    if (v !== null && v !== undefined) {
        effect(v);
    }
}
exports.mEffect = mEffect;
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
exports.asHTMLAttributeValue = asHTMLAttributeValue;