"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "asHTMLAttributeValue", {
  enumerable: true,
  get: function get() {
    return _maybe.asHTMLAttributeValue;
  }
});
Object.defineProperty(exports, "catMaybes", {
  enumerable: true,
  get: function get() {
    return _maybe.catMaybes;
  }
});
Object.defineProperty(exports, "fromJust", {
  enumerable: true,
  get: function get() {
    return _maybe.fromJust;
  }
});
Object.defineProperty(exports, "fromMaybe", {
  enumerable: true,
  get: function get() {
    return _maybe.fromMaybe;
  }
});
Object.defineProperty(exports, "mEffect", {
  enumerable: true,
  get: function get() {
    return _maybe.mEffect;
  }
});
Object.defineProperty(exports, "mapMaybes", {
  enumerable: true,
  get: function get() {
    return _maybe.mapMaybes;
  }
});
Object.defineProperty(exports, "maybe", {
  enumerable: true,
  get: function get() {
    return _maybe.maybe;
  }
});
Object.defineProperty(exports, "mmap", {
  enumerable: true,
  get: function get() {
    return _maybe.mmap;
  }
});
Object.defineProperty(exports, "mthen", {
  enumerable: true,
  get: function get() {
    return _maybe.mthen;
  }
});

var _maybe = require("./maybe");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asHTMLAttributeValue = asHTMLAttributeValue;
exports.catMaybes = void 0;
exports.fromJust = fromJust;
exports.fromMaybe = fromMaybe;
exports.mEffect = mEffect;
exports.mapMaybes = mapMaybes;
exports.maybe = maybe;
exports.mthen = exports.mmap = void 0;

var _map = _interopRequireDefault(require("lodash/map"));

var _flatMap = _interopRequireDefault(require("lodash/flatMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function maybe(defaultValue, f, v) {
  return v === undefined || v === null ? defaultValue() : f(v);
}

function fromJust(a, error) {
  if (a === undefined || a === null) {
    throw new Error(error);
  } else {
    return a;
  }
}

function fromMaybe(defaultValue, t) {
  return t === null || t === undefined ? defaultValue() : t;
}

var catMaybes = function catMaybes(array) {
  return (0, _flatMap["default"])(array, function (x) {
    return x === null || x === undefined ? [] : [x];
  });
};

exports.catMaybes = catMaybes;

function mapMaybes(array, callback) {
  return catMaybes((0, _map["default"])(array, callback));
} // fmap for `null | undefined`


var mmap = function mmap(f, v) {
  return v === undefined ? undefined : v === null ? null : f(v);
}; // bind for `null | undefined`
// Note that `bind` and `map` have the same body in JavaScript


exports.mmap = mmap;

var mthen = function mthen(v, f) {
  return v === undefined ? undefined : v === null ? null : f(v);
}; // mthen for effects (and not transformations, hence nothing is returned)


exports.mthen = mthen;

function mEffect(v, effect) {
  if (v !== null && v !== undefined) {
    effect(v);
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


function asHTMLAttributeValue(value) {
  if (value === null || value === undefined) {
    return undefined;
  }

  return value;
}
