// ==UserScript==
// @name        SimExtended
// @namespace   https://kejith.de/
// @version     0.0.3
// @author      kejith <anti@fren.de>
// @source      https://github.com/kejith/SimExtended/raw/gh-pages/index.prod.user.js
// @match       https://*.pr0game.com/*
// @require     https://cdn.jsdelivr.net/npm/jquery@^3.6.0/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/toastify-js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM.xmlHttpRequest
// @grant       GM_info
// @icon64      https://kejith.de/images/spylard.png
// @run-at      document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/zipson/lib/compress.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var any_1 = __webpack_require__("./node_modules/zipson/lib/compressor/any.js");

var array_1 = __webpack_require__("./node_modules/zipson/lib/compressor/array.js");

var string_1 = __webpack_require__("./node_modules/zipson/lib/compressor/string.js");

var number_1 = __webpack_require__("./node_modules/zipson/lib/compressor/number.js");

var object_1 = __webpack_require__("./node_modules/zipson/lib/compressor/object.js");

var date_1 = __webpack_require__("./node_modules/zipson/lib/compressor/date.js");

var object_2 = __webpack_require__("./node_modules/zipson/lib/compressor/template/object.js");

var compressors = {
  any: any_1.compressAny,
  array: array_1.compressArray,
  object: object_1.compressObject,
  string: string_1.compressString,
  date: date_1.compressDate,
  number: number_1.compressNumber,
  template: {
    Object: object_2.TemplateObject
  }
};
/**
 * Create a new compression context
 */

function makeCompressContext() {
  return {
    arrayItemWriters: [],
    arrayLevel: 0
  };
}

exports.makeCompressContext = makeCompressContext;
/**
 * Create an inverted index for compression
 */

function makeInvertedIndex() {
  return {
    stringMap: {},
    integerMap: {},
    floatMap: {},
    dateMap: {},
    lpDateMap: {},
    stringCount: 0,
    integerCount: 0,
    floatCount: 0,
    dateCount: 0,
    lpDateCount: 0
  };
}

exports.makeInvertedIndex = makeInvertedIndex;
/**
 * Compress all data onto a provided writer
 */

function compress(context, obj, invertedIndex, writer, options) {
  compressors.any(compressors, context, obj, invertedIndex, writer, options);
}

exports.compress = compress;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/any.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");
/**
 * Compress any data type to writer
 */


function compressAny(compressors, context, obj, invertedIndex, writer, options) {
  var type = typeof obj;

  if (type === 'number') {
    compressors.number(compressors, context, obj, invertedIndex, writer, options);
  } else if (type === 'string') {
    compressors.string(compressors, context, obj, invertedIndex, writer, options);
  } else if (type === 'boolean') {
    writer.write(obj ? constants_1.BOOLEAN_TRUE_TOKEN : constants_1.BOOLEAN_FALSE_TOKEN);
  } else if (obj === null) {
    writer.write(constants_1.NULL_TOKEN);
  } else if (obj === undefined) {
    writer.write(constants_1.UNDEFINED_TOKEN);
  } else if (Array.isArray(obj)) {
    compressors.array(compressors, context, obj, invertedIndex, writer, options);
  } else if (obj instanceof Date) {
    compressors.date(compressors, context, obj.getTime(), invertedIndex, writer, options);
  } else {
    compressors.object(compressors, context, obj, invertedIndex, writer, options);
  }
}

exports.compressAny = compressAny;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/array.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var writer_1 = __webpack_require__("./node_modules/zipson/lib/compressor/writer.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/util.js");
/**
 * Compress array to writer
 */


function compressArray(compressors, context, array, invertedIndex, writer, options) {
  // Increase context array level and create a new element writer if needed
  context.arrayLevel++;

  if (context.arrayLevel > context.arrayItemWriters.length) {
    context.arrayItemWriters.push(new writer_1.ZipsonStringWriter());
  } // Get the element and parent writer


  var arrayItemWriter = context.arrayItemWriters[context.arrayLevel - 1];
  var parentWriter = context.arrayItemWriters[context.arrayLevel - 2] || writer;
  parentWriter.write(constants_1.ARRAY_START_TOKEN);
  var previousItem = '';
  var repeatedTimes = 0;
  var repeatManyCount = 0; // Create a template object for first two keys in object

  var templateObject = new compressors.template.Object(array[0], array[1]); // Compress template is templating

  if (templateObject.isTemplating) {
    templateObject.compressTemplate(compressors, context, invertedIndex, parentWriter, options);
  }

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    arrayItemWriter.value = ''; // Make undefined elements into null values

    if (item === undefined) {
      item = null;
    } // Determine if still templating after the two first elements


    if (i > 1 && templateObject.isTemplating) {
      templateObject.isNextTemplateable(array[i], parentWriter);
    }

    if (templateObject.isTemplating) {
      // Compress template values if templating
      templateObject.compressTemplateValues(compressors, context, invertedIndex, arrayItemWriter, options, array[i]);
    } else {
      // Compress any element otherwise
      compressors.any(compressors, context, item, invertedIndex, arrayItemWriter, options);
    } // Check if we wrote an identical elements


    if (arrayItemWriter.value === previousItem) {
      // Count repetitions and see if we repeated enough to use a many token
      repeatedTimes++;

      if (repeatedTimes >= constants_1.ARRAY_REPEAT_COUNT_THRESHOLD) {
        // Write a many token if needed and count how many "many"-times we repeated
        if (repeatManyCount === 0) {
          parentWriter.write(constants_1.ARRAY_REPEAT_MANY_TOKEN);
        }

        repeatManyCount++;
      } else {
        // Default to standard repeat token
        parentWriter.write(constants_1.ARRAY_REPEAT_TOKEN);
      }
    } else {
      repeatedTimes = 0;

      if (repeatManyCount > 0) {
        // If we repeated many times, write the count before the next element
        parentWriter.write(util_1.compressInteger(repeatManyCount));
        repeatManyCount = 0;
      }

      parentWriter.write(arrayItemWriter.value);
      previousItem = arrayItemWriter.value;
    }
  } // If still repeating may, write the final repeat count


  if (repeatManyCount > 0) {
    parentWriter.write(util_1.compressInteger(repeatManyCount));
  } // Finalize template object if still templating


  if (templateObject.isTemplating) {
    templateObject.end(parentWriter);
  }

  parentWriter.write(constants_1.ARRAY_END_TOKEN);
  context.arrayLevel--;
}

exports.compressArray = compressArray;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/date.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/util.js");
/**
 * Compress date (as unix timestamp) to writer
 */


function compressDate(compressors, context, obj, invertedIndex, writer, options) {
  var foundRef;
  /**
   * Determine if we should represent the date with low precision
   */

  var lowPrecisionDate = obj / constants_1.DATE_LOW_PRECISION;
  var isLowPrecision = lowPrecisionDate % 1 === 0;

  if (isLowPrecision) {
    if ((foundRef = invertedIndex.lpDateMap[lowPrecisionDate]) !== void 0) {
      writer.write("" + constants_1.REF_LP_DATE_TOKEN + foundRef);
    } else {
      var ref = util_1.compressInteger(invertedIndex.lpDateCount);
      var compressedDate = util_1.compressInteger(lowPrecisionDate);
      var newRef = "" + constants_1.LP_DATE_TOKEN + compressedDate;

      if (ref.length + constants_1.REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.lpDateMap[lowPrecisionDate] = ref;
        invertedIndex.lpDateCount++;
        writer.write(newRef);
      } else {
        writer.write("" + constants_1.UNREFERENCED_LP_DATE_TOKEN + compressedDate);
      }
    }
  } else {
    if ((foundRef = invertedIndex.dateMap[obj]) !== void 0) {
      writer.write("" + constants_1.REF_DATE_TOKEN + foundRef);
    } else {
      var ref = util_1.compressInteger(invertedIndex.dateCount);
      var compressedDate = util_1.compressInteger(obj);
      var newRef = "" + constants_1.DATE_TOKEN + compressedDate;

      if (ref.length + constants_1.REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.dateMap[obj] = ref;
        invertedIndex.dateCount++;
        writer.write(newRef);
      } else {
        writer.write("" + constants_1.UNREFERENCED_DATE_TOKEN + compressedDate);
      }
    }
  }
}

exports.compressDate = compressDate;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/number.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/util.js");
/**
 * Compress number (integer or float) to writer
 */


function compressNumber(compressors, context, obj, invertedIndex, writer, options) {
  var foundRef;

  if (obj % 1 === 0) {
    // CHeck if the value is a small integer
    if (obj < constants_1.INTEGER_SMALL_EXCLUSIVE_BOUND_UPPER && obj > constants_1.INTEGER_SMALL_EXCLUSIVE_BOUND_LOWER) {
      writer.write(constants_1.INTEGER_SMALL_TOKENS[obj + constants_1.INTEGER_SMALL_TOKEN_ELEMENT_OFFSET]);
    } else if ((foundRef = invertedIndex.integerMap[obj]) !== void 0) {
      writer.write("" + constants_1.REF_INTEGER_TOKEN + foundRef);
    } else {
      var ref = util_1.compressInteger(invertedIndex.integerCount);
      var compressedInteger = util_1.compressInteger(obj);
      var newRef = "" + constants_1.INTEGER_TOKEN + compressedInteger;

      if (ref.length + constants_1.REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.integerMap[obj] = ref;
        invertedIndex.integerCount++;
        writer.write(newRef);
      } else {
        writer.write("" + constants_1.UNREFERENCED_INTEGER_TOKEN + compressedInteger);
      }
    }
  } else {
    // Compress float prior to lookup to reuse for "same" floating values
    var compressedFloat = util_1.compressFloat(obj, options.fullPrecisionFloats);

    if ((foundRef = invertedIndex.floatMap[compressedFloat]) !== void 0) {
      writer.write("" + constants_1.REF_FLOAT_TOKEN + foundRef);
    } else {
      var ref = util_1.compressInteger(invertedIndex.floatCount);
      var newRef = "" + constants_1.FLOAT_TOKEN + compressedFloat;

      if (ref.length + constants_1.REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.floatMap[compressedFloat] = ref;
        invertedIndex.floatCount++;
        writer.write(newRef);
      } else {
        writer.write("" + constants_1.UNREFERENCED_FLOAT_TOKEN + compressedFloat);
      }
    }
  }
}

exports.compressNumber = compressNumber;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/object.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");
/**
 * Compress object to writer
 */


function compressObject(compressors, context, obj, invertedIndex, writer, options) {
  writer.write(constants_1.OBJECT_START_TOKEN);
  var keys = Object.keys(obj); // Create a template object for first two keys in object

  var templateObject = new compressors.template.Object(obj[keys[0]], obj[keys[1]]); // Compress template is templating

  if (templateObject.isTemplating) {
    templateObject.compressTemplate(compressors, context, invertedIndex, writer, options);
  }

  for (var i = 0; i < keys.length; i++) {
    // Determine if still templating after the two first keys
    if (i > 1 && templateObject.isTemplating) {
      templateObject.isNextTemplateable(obj[keys[i]], writer);
    }

    if (templateObject.isTemplating) {
      // Compress id and template values if templating
      compressors.string(compressors, context, keys[i], invertedIndex, writer, options);
      templateObject.compressTemplateValues(compressors, context, invertedIndex, writer, options, obj[keys[i]]);
    } else {
      // Compress object key and value if not templating
      var key = keys[i];
      var val = obj[key];

      if (val !== undefined) {
        compressors.string(compressors, context, key, invertedIndex, writer, options);
        compressors.any(compressors, context, val, invertedIndex, writer, options);
      }
    }
  }

  ; // Finalize template object if still templating

  if (templateObject.isTemplating) {
    templateObject.end(writer);
  }

  writer.write(constants_1.OBJECT_END_TOKEN);
}

exports.compressObject = compressObject;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/string.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/util.js");
/**
 * Compress string to
 */


function compressString(compressors, context, obj, invertedIndex, writer, options) {
  var foundRef; //

  var stringIdent = constants_1.STRING_IDENT_PREFIX + obj; // Detect if string is utc timestamp if enabled

  if (options.detectUtcTimestamps && obj[obj.length - 1] === 'Z' && obj.match(constants_1.DATE_REGEX)) {
    var date = Date.parse(obj);
    compressors.date(compressors, context, date, invertedIndex, writer, options);
  } else if ((foundRef = invertedIndex.stringMap[stringIdent]) !== void 0) {
    writer.write("" + constants_1.REF_STRING_TOKEN + foundRef);
  } else {
    var ref = util_1.compressInteger(invertedIndex.stringCount);
    var newRef = "" + constants_1.STRING_TOKEN + obj.replace(constants_1.REGEX_ESCAPE_CHARACTER, constants_1.ESCAPE_CHARACTER + constants_1.ESCAPE_CHARACTER).replace(constants_1.REGEX_STRING_TOKEN, constants_1.ESCAPED_STRING_TOKEN) + constants_1.STRING_TOKEN;

    if (ref.length + constants_1.REFERENCE_HEADER_LENGTH + 1 < newRef.length) {
      invertedIndex.stringMap[stringIdent] = ref;
      invertedIndex.stringCount++;
      writer.write(newRef);
    } else {
      writer.write("" + constants_1.UNREFERENCED_STRING_TOKEN + obj.replace(constants_1.REGEX_ESCAPE_CHARACTER, constants_1.ESCAPE_CHARACTER + constants_1.ESCAPE_CHARACTER).replace(constants_1.REGEX_UNREFERENCED_STRING_TOKEN, constants_1.ESCAPED_UNREFERENCED_STRING_TOKEN) + constants_1.UNREFERENCED_STRING_TOKEN);
    }
  }
}

exports.compressString = compressString;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/template/object.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/compressor/util.js");

var TemplateObject =
/** @class */
function () {
  /**
   * Create a new template object starting with two initial object that might have a shared structure
   */
  function TemplateObject(a, b) {
    this.isTemplating = false;
    this.struct = [];

    if (a != null && b != null) {
      this.isTemplating = buildTemplate(a, b, this.struct);
    }
  }
  /**
   * Compress template to writer
   */


  TemplateObject.prototype.compressTemplate = function (compressors, context, invertedIndex, writer, options) {
    compresObjectTemplate(compressors, context, invertedIndex, writer, options, this.struct);
  };
  /**
   * Compress object values according to structure to writer
   */


  TemplateObject.prototype.compressTemplateValues = function (compressors, context, invertedIndex, writer, options, obj) {
    compressObjectValues(compressors, context, invertedIndex, writer, options, this.struct, obj);
  };
  /**
   * Determine if object is templateable according to existing structure
   * If not the an ending token will be written to writer
   */


  TemplateObject.prototype.isNextTemplateable = function (obj, writer) {
    this.isTemplating = conformsToStructure(this.struct, obj);

    if (!this.isTemplating) {
      writer.write(constants_1.TEMPLATE_OBJECT_FINAL);
    }
  };
  /**
   * Finalize template object and write ending token
   */


  TemplateObject.prototype.end = function (writer) {
    writer.write(constants_1.TEMPLATE_OBJECT_FINAL);
  };

  return TemplateObject;
}();

exports.TemplateObject = TemplateObject;
/**
 * Build a shared template structure for two objects, returns true if they strictly share a structre
 * or false if not and a shared template structure could not be built
 */

function buildTemplate(a, b, struct, level) {
  if (level === void 0) {
    level = 0;
  } // Do not check deeper than 6 levels


  if (level > 6) {
    return false;
  }

  var keysA = Object.keys(a);
  var keysB = Object.keys(b); // If they do not have the same amount of keys, it is not a shared structure

  if (keysA.length !== keysB.length) {
    return false;
  } // Do not try to find a shared structure if there is more than 10 keys for one level


  if (keysA.length > 10) {
    return false;
  } // Sort keys to assert structural equality


  keysA.sort(function (a, b) {
    return a.localeCompare(b);
  });
  keysB.sort(function (a, b) {
    return a.localeCompare(b);
  }); // Check each key for structural equality

  for (var i = 0; i < keysA.length; i++) {
    var keyA = keysA[i];
    var keyB = keysB[i]; // If the keys do not share the same identifier, they are not structurally equal

    if (keyA !== keyB) {
      return false;
    }

    var valueA = a[keyA];
    var valueB = b[keyB]; // Check if the key is an object

    if (util_1.isObject(valueA)) {
      if (!util_1.isObject(valueB)) {
        // If a is an object a b is not, they are not structurally equal
        return false;
      } // Create a substructure for nested object


      var nextStruct = []; // Add key and substructure to parent structure

      struct.push([keyA, nextStruct]); // Check nested objects for structural equality

      if (!buildTemplate(valueA, valueB, nextStruct, level + 1)) {
        return false;
      }
    } else if (util_1.isObject(valueB)) {
      // If a is not an object and b is, they are not structurally equal
      return false;
    } else {
      struct.push([keyA]);
    }
  } // If not on root level or root level is structurally equal objects they are considered structurally equal


  return level > 0 || util_1.isObject(a);
}
/**
 * Check if an object conforms to an existing structure
 */


function conformsToStructure(struct, obj) {
  if (!obj) {
    return false;
  }

  if (Object.keys(obj).length !== struct.length) {
    return false;
  }

  for (var i = 0; i < struct.length; i++) {
    var key = struct[i][0];
    var isNested = struct[i].length > 1;

    if (obj[key] === void 0) {
      return false;
    }

    if (isNested) {
      var x = struct[i];
      var y = x[1];

      if (!conformsToStructure(struct[i][1], obj[key])) {
        return false;
      }
    } else {
      if (util_1.isObject(obj[key])) {
        return false;
      }
    }
  }

  return true;
}
/**
 * Compress an object template to writer
 */


function compresObjectTemplate(compressors, context, invertedIndex, writer, options, struct) {
  writer.write(constants_1.TEMPLATE_OBJECT_START);

  for (var i = 0; i < struct.length; i++) {
    var key = struct[i][0];
    var isNested = struct[i].length > 1;
    compressors.string(compressors, context, key, invertedIndex, writer, options);

    if (isNested) {
      compresObjectTemplate(compressors, context, invertedIndex, writer, options, struct[i][1]);
    }
  }

  ;
  writer.write(constants_1.TEMPLATE_OBJECT_END);
}
/**
 * Compress object values according to provided structure to writer
 */


function compressObjectValues(compressors, context, invertedIndex, writer, options, struct, obj) {
  for (var i = 0; i < struct.length; i++) {
    var key = struct[i][0];
    var value = obj[key];
    var isNested = struct[i].length > 1;

    if (isNested) {
      compressObjectValues(compressors, context, invertedIndex, writer, options, struct[i][1], value);
    } else {
      compressors.any(compressors, context, value, invertedIndex, writer, options);
    }
  }

  ;
}

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/util.js":
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * Determine if obj is an object according to serialization
 */

function isObject(obj) {
  var type = typeof obj;

  if (type === 'number') {
    return false;
  } else if (type === 'string') {
    return false;
  } else if (type === 'boolean') {
    return false;
  } else if (obj === null) {
    return false;
  } else if (Array.isArray(obj)) {
    return false;
  } else if (obj instanceof Date) {
    return false;
  } else if (obj === void 0) {
    return false;
  } else {
    return true;
  }
}

exports.isObject = isObject;

/***/ }),

/***/ "./node_modules/zipson/lib/compressor/writer.js":
/***/ (function(__unused_webpack_module, exports) {



var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * A zipson writer takes a piece of zipson compression output as a string
 */

var ZipsonWriter =
/** @class */
function () {
  function ZipsonWriter() {}

  return ZipsonWriter;
}();

exports.ZipsonWriter = ZipsonWriter;
/**
 * Writes zipson compression outupt in full to a string
 */

var ZipsonStringWriter =
/** @class */
function (_super) {
  __extends(ZipsonStringWriter, _super);

  function ZipsonStringWriter() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.value = '';
    return _this;
  }

  ZipsonStringWriter.prototype.write = function (data) {
    this.value += data;
  };

  ZipsonStringWriter.prototype.end = function () {};

  return ZipsonStringWriter;
}(ZipsonWriter);

exports.ZipsonStringWriter = ZipsonStringWriter;

/***/ }),

/***/ "./node_modules/zipson/lib/constants.js":
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * Precision constants
 */

exports.FLOAT_COMPRESSION_PRECISION = 1000;
exports.DATE_LOW_PRECISION = 100000;
/**
 * Floating point delimiters
 */

exports.FLOAT_FULL_PRECISION_DELIMITER = ',';
exports.FLOAT_REDUCED_PRECISION_DELIMITER = '.';
/**
 * Data type tokens
 */

exports.INTEGER_TOKEN = '¢';
exports.FLOAT_TOKEN = '£';
exports.STRING_TOKEN = '¨';
exports.DATE_TOKEN = 'ø';
exports.LP_DATE_TOKEN = '±';
exports.UNREFERENCED_INTEGER_TOKEN = '¤';
exports.UNREFERENCED_FLOAT_TOKEN = '¥';
exports.UNREFERENCED_STRING_TOKEN = '´';
exports.UNREFERENCED_DATE_TOKEN = '¿';
exports.UNREFERENCED_LP_DATE_TOKEN = 'ÿ';
exports.REF_INTEGER_TOKEN = 'º';
exports.REF_FLOAT_TOKEN = 'Ý';
exports.REF_STRING_TOKEN = 'ß';
exports.REF_DATE_TOKEN = '×';
exports.REF_LP_DATE_TOKEN = 'ü';
exports.NULL_TOKEN = '§';
exports.UNDEFINED_TOKEN = 'µ';
exports.BOOLEAN_TRUE_TOKEN = '»';
exports.BOOLEAN_FALSE_TOKEN = '«';
/**
 * String escape tokens
 */

exports.ESCAPE_CHARACTER = '\\';
exports.ESCAPED_STRING_TOKEN = "" + exports.ESCAPE_CHARACTER + exports.STRING_TOKEN;
exports.ESCAPED_UNREFERENCED_STRING_TOKEN = "" + exports.ESCAPE_CHARACTER + exports.UNREFERENCED_STRING_TOKEN;
/**
 * Regex lookups
 */

exports.REGEX_ESCAPE_CHARACTER = new RegExp(exports.ESCAPE_CHARACTER.replace("\\", "\\\\"), 'g');
exports.REGEX_ESCAPED_ESCAPE_CHARACTER = new RegExp(exports.ESCAPE_CHARACTER.replace("\\", "\\\\") + exports.ESCAPE_CHARACTER.replace("\\", "\\\\"), 'g');
exports.REGEX_STRING_TOKEN = new RegExp(exports.STRING_TOKEN, 'g');
exports.REGEX_ESCAPED_STRING_TOKEN = new RegExp(exports.ESCAPE_CHARACTER + exports.ESCAPED_STRING_TOKEN, 'g');
exports.REGEX_UNREFERENCED_STRING_TOKEN = new RegExp(exports.UNREFERENCED_STRING_TOKEN, 'g');
exports.REGEX_UNREFERENCED_ESCAPED_STRING_TOKEN = new RegExp(exports.ESCAPE_CHARACTER + exports.ESCAPED_UNREFERENCED_STRING_TOKEN, 'g');
exports.DATE_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z/;
/**
 * Structural tokens
 */

exports.OBJECT_START_TOKEN = '{';
exports.OBJECT_END_TOKEN = '}';
exports.TEMPLATE_OBJECT_START = '¦';
exports.TEMPLATE_OBJECT_END = '‡';
exports.TEMPLATE_OBJECT_FINAL = '—';
exports.ARRAY_START_TOKEN = '|';
exports.ARRAY_END_TOKEN = '÷';
exports.ARRAY_REPEAT_TOKEN = 'þ';
exports.ARRAY_REPEAT_MANY_TOKEN = '^';
exports.ARRAY_REPEAT_COUNT_THRESHOLD = 4;
/**
 * General tokenization constants
 */

exports.REFERENCE_HEADER_LENGTH = 1;
exports.DELIMITING_TOKENS_THRESHOLD = 122;
exports.STRING_IDENT_PREFIX = '$';
/**
 * Small integer tokens
 */

exports.INTEGER_SMALL_EXCLUSIVE_BOUND_LOWER = -10;
exports.INTEGER_SMALL_EXCLUSIVE_BOUND_UPPER = 10;
exports.INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_LOWER = 191;
exports.INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_UPPER = 211;
exports.INTEGER_SMALL_TOKEN_OFFSET = -201;
exports.INTEGER_SMALL_TOKEN_ELEMENT_OFFSET = 9;
exports.INTEGER_SMALL_TOKENS = ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò'];

/***/ }),

/***/ "./node_modules/zipson/lib/decompress.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var common_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/common.js");

var stages_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/stages.js");
/**
 * Create an ordered index for decompression
 */


function makeOrderedIndex() {
  return {
    strings: [],
    integers: [],
    floats: [],
    dates: [],
    lpDates: []
  };
}

exports.makeOrderedIndex = makeOrderedIndex;
/**
 * Create a new cursor with a root target for specified drain mode
 */

function makeCursor(drain) {
  var rootTarget = {
    type: common_1.TargetType.SCALAR,
    value: void 0
  };
  var stack = new Array(10);
  stack[0] = rootTarget;
  return {
    index: 0,
    rootTarget: rootTarget,
    stack: stack,
    currentTarget: rootTarget,
    pointer: 0,
    drain: drain
  };
}
/**
 * Decompress data string with provided ordered index
 */


function decompress(data, orderedIndex) {
  var cursor = makeCursor(true);
  stages_1.decompressStages(cursor, data, orderedIndex);
  return cursor.rootTarget.value;
}

exports.decompress = decompress;
/**
 * Decompress zipson data incrementally by providing each chunk of data in sequence
 */

function decompressIncremental(orderedIndex) {
  var cursor = makeCursor(false); // Keep an internal buffer for any unterminated chunks of data

  var buffer = '';

  function increment(data) {
    if (data === null) {
      // Move cursor to drain mode if we got the last chunk of data
      cursor.drain = true;
    } else if (data.length === 0) {
      return;
    } else {
      buffer += data;
    } // Decompress an determine amount of buffer that was parsed


    var cursorIndexBefore = cursor.index;
    stages_1.decompressStages(cursor, buffer, orderedIndex);
    var movedAmount = cursor.index - cursorIndexBefore; // Rotate parsed data out of buffer and move cursor back to next parsing position

    if (movedAmount > 0) {
      buffer = buffer.substring(movedAmount);
      cursor.index -= movedAmount;
    }
  }

  return {
    increment: increment,
    cursor: cursor
  };
}

exports.decompressIncremental = decompressIncremental;

/***/ }),

/***/ "./node_modules/zipson/lib/decompressor/common.js":
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SKIP_SCALAR = {};
/**
 * Target type differentiators
 */

var TargetType;

(function (TargetType) {
  TargetType["ARRAY"] = "ARRAY";
  TargetType["OBJECT"] = "OBJECT";
  TargetType["SCALAR"] = "SCALAR";
  TargetType["TEMPLATE_OBJECT"] = "TEMPLATE_OBJECT";
  TargetType["TEMPLATE_OBJECT_PROPERTIES"] = "TEMPLATE_OBJECT_PROPERTIES";
  TargetType["TEMPLATE_OBJECT_ELEMENTS"] = "TEMPLATE_OBJECT_ELEMENTS";
})(TargetType = exports.TargetType || (exports.TargetType = {}));

/***/ }),

/***/ "./node_modules/zipson/lib/decompressor/element.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var common_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/common.js");

var scalar_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/scalar.js");

var template_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/template.js");

function decompressElement(c, cursor, data, orderedIndex) {
  var targetValue;

  if (c === constants_1.ARRAY_END_TOKEN || c === constants_1.OBJECT_END_TOKEN) {
    targetValue = cursor.currentTarget.value;
    cursor.currentTarget = cursor.stack[cursor.pointer - 1];
    cursor.pointer--;
  } else {
    targetValue = scalar_1.decompressScalar(c, data, cursor, orderedIndex);

    if (targetValue === common_1.SKIP_SCALAR) {
      return false;
    }
  }

  if (cursor.currentTarget.type === common_1.TargetType.SCALAR) {
    cursor.currentTarget.value = targetValue;
  } else if (cursor.currentTarget.type === common_1.TargetType.ARRAY) {
    cursor.currentTarget.value[cursor.currentTarget.value.length] = targetValue;
  } else if (cursor.currentTarget.type === common_1.TargetType.OBJECT) {
    if (cursor.currentTarget.key != null) {
      cursor.currentTarget.value[cursor.currentTarget.key] = targetValue;
      cursor.currentTarget.key = void 0;
    } else {
      cursor.currentTarget.key = targetValue;
    }
  } else if (cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT) {
    cursor.currentTarget.currentToken = targetValue;
    cursor.currentTarget.currentTokens.push(targetValue);
  } else if (cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT_PROPERTIES) {
    template_1.appendTemplateObjectPropertiesValue(cursor.currentTarget, targetValue);
  } else if (cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT_ELEMENTS) {
    template_1.appendTemplateObjectElementsValue(cursor.currentTarget, targetValue);
  }

  return true;
}

exports.decompressElement = decompressElement;

/***/ }),

/***/ "./node_modules/zipson/lib/decompressor/scalar.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var common_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/common.js");

var util_1 = __webpack_require__("./node_modules/zipson/lib/util.js");

function decompressScalar(token, data, cursor, orderedIndex) {
  var startIndex = cursor.index;
  var endIndex = cursor.index + 1; // Find end index of token value

  var foundStringToken;

  if (token === constants_1.STRING_TOKEN && (foundStringToken = constants_1.STRING_TOKEN) || token === constants_1.UNREFERENCED_STRING_TOKEN && (foundStringToken = constants_1.UNREFERENCED_STRING_TOKEN)) {
    var escaped = true;

    while (escaped && endIndex < data.length) {
      endIndex = data.indexOf(foundStringToken, endIndex);
      var iNumEscapeCharacters = 1;
      escaped = false;

      while (data[endIndex - iNumEscapeCharacters] === constants_1.ESCAPE_CHARACTER) {
        escaped = iNumEscapeCharacters % 2 === 1;
        iNumEscapeCharacters++;
      }

      endIndex++;
    }

    if (endIndex <= startIndex) {
      endIndex = data.length;
    }
  } else {
    while (!(data.charCodeAt(endIndex) > constants_1.DELIMITING_TOKENS_THRESHOLD) && endIndex < data.length) {
      endIndex++;
    }
  }

  if (!cursor.drain && endIndex === data.length) {
    return common_1.SKIP_SCALAR;
  } // Update cursor end index


  cursor.index = endIndex - 1;
  var tokenCharCode = token.charCodeAt(0); // Decompress the token value

  if (tokenCharCode > constants_1.INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_LOWER && tokenCharCode < constants_1.INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_UPPER) {
    return tokenCharCode + constants_1.INTEGER_SMALL_TOKEN_OFFSET;
  } else if (token === constants_1.ARRAY_REPEAT_MANY_TOKEN) {
    return util_1.decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if (token === constants_1.REF_STRING_TOKEN) {
    return orderedIndex.strings[util_1.decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if (token === constants_1.REF_INTEGER_TOKEN) {
    return orderedIndex.integers[util_1.decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if (token === constants_1.REF_FLOAT_TOKEN) {
    return orderedIndex.floats[util_1.decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if (token === constants_1.REF_DATE_TOKEN) {
    return orderedIndex.dates[util_1.decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if (token === constants_1.REF_LP_DATE_TOKEN) {
    return orderedIndex.lpDates[util_1.decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if (token === constants_1.STRING_TOKEN) {
    return orderedIndex.strings[orderedIndex.strings.length] = data.substring(startIndex + 1, endIndex - 1).replace(constants_1.REGEX_ESCAPED_ESCAPE_CHARACTER, constants_1.ESCAPE_CHARACTER).replace(constants_1.REGEX_ESCAPED_STRING_TOKEN, constants_1.STRING_TOKEN);
  } else if (token === constants_1.INTEGER_TOKEN) {
    return orderedIndex.integers[orderedIndex.integers.length] = util_1.decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if (token === constants_1.FLOAT_TOKEN) {
    return orderedIndex.floats[orderedIndex.floats.length] = util_1.decompressFloat(data.substring(startIndex + 1, endIndex));
  } else if (token === constants_1.DATE_TOKEN) {
    return orderedIndex.dates[orderedIndex.dates.length] = new Date(util_1.decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if (token === constants_1.LP_DATE_TOKEN) {
    return orderedIndex.lpDates[orderedIndex.lpDates.length] = new Date(constants_1.DATE_LOW_PRECISION * util_1.decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if (token === constants_1.UNREFERENCED_STRING_TOKEN) {
    return data.substring(startIndex + 1, endIndex - 1).replace(constants_1.REGEX_ESCAPED_ESCAPE_CHARACTER, constants_1.ESCAPE_CHARACTER).replace(constants_1.REGEX_UNREFERENCED_ESCAPED_STRING_TOKEN, constants_1.UNREFERENCED_STRING_TOKEN);
  } else if (token === constants_1.UNREFERENCED_INTEGER_TOKEN) {
    return util_1.decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if (token === constants_1.UNREFERENCED_FLOAT_TOKEN) {
    return util_1.decompressFloat(data.substring(startIndex + 1, endIndex));
  } else if (token === constants_1.UNREFERENCED_DATE_TOKEN) {
    return new Date(util_1.decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if (token === constants_1.UNREFERENCED_LP_DATE_TOKEN) {
    return new Date(constants_1.DATE_LOW_PRECISION * util_1.decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if (token === constants_1.BOOLEAN_TRUE_TOKEN) {
    return true;
  } else if (token === constants_1.BOOLEAN_FALSE_TOKEN) {
    return false;
  } else if (token === constants_1.NULL_TOKEN) {
    return null;
  } else if (token === constants_1.UNDEFINED_TOKEN) {
    return undefined;
  }

  throw new Error("Unexpected scalar " + token + " at " + startIndex + "-" + endIndex);
}

exports.decompressScalar = decompressScalar;

/***/ }),

/***/ "./node_modules/zipson/lib/decompressor/stages.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var common_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/common.js");

var scalar_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/scalar.js");

var element_1 = __webpack_require__("./node_modules/zipson/lib/decompressor/element.js");

function decompressStages(cursor, data, orderedIndex) {
  for (; cursor.index < data.length; cursor.index++) {
    var c = data[cursor.index];

    if (c === constants_1.ARRAY_START_TOKEN) {
      cursor.currentTarget = {
        type: common_1.TargetType.ARRAY,
        value: []
      };
      cursor.stack[++cursor.pointer] = cursor.currentTarget;
    } else if (c === constants_1.OBJECT_START_TOKEN) {
      cursor.currentTarget = {
        type: common_1.TargetType.OBJECT,
        value: {}
      };
      cursor.stack[++cursor.pointer] = cursor.currentTarget;
    } else if (c === constants_1.ARRAY_REPEAT_TOKEN && (cursor.currentTarget.type === common_1.TargetType.ARRAY || cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT_ELEMENTS)) {
      var repeatedItem = cursor.currentTarget.value[cursor.currentTarget.value.length - 1];
      cursor.currentTarget.value.push(repeatedItem);
    } else if (c === constants_1.ARRAY_REPEAT_MANY_TOKEN && (cursor.currentTarget.type === common_1.TargetType.ARRAY || cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT_ELEMENTS)) {
      var repeatCount = scalar_1.decompressScalar(data[cursor.index], data, cursor, orderedIndex);

      if (repeatCount === common_1.SKIP_SCALAR) {
        return;
      }

      var repeatedItem = cursor.currentTarget.value[cursor.currentTarget.value.length - 1];

      for (var i = 0; i < repeatCount; i++) {
        cursor.currentTarget.value.push(repeatedItem);
      }
    } else if (c === constants_1.TEMPLATE_OBJECT_START && (cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT || cursor.currentTarget.type === common_1.TargetType.OBJECT || cursor.currentTarget.type === common_1.TargetType.ARRAY)) {
      if (cursor.currentTarget.type !== common_1.TargetType.TEMPLATE_OBJECT) {
        var parentTarget = cursor.currentTarget;
        cursor.currentTarget = {
          type: common_1.TargetType.TEMPLATE_OBJECT,
          value: void 0,
          currentTokens: [],
          currentRoute: [],
          paths: [],
          level: 0,
          parentTarget: parentTarget
        };
        cursor.stack[++cursor.pointer] = cursor.currentTarget;
      } else {
        // Add any found tokens prior to next nested as separate paths
        for (var i = 0; i < cursor.currentTarget.currentTokens.length - 1; i++) {
          var currentToken = cursor.currentTarget.currentTokens[i];
          cursor.currentTarget.paths[cursor.currentTarget.paths.length] = cursor.currentTarget.currentRoute.concat(currentToken);
        } // Add most recent token as part of next path


        if (cursor.currentTarget.currentToken != null) {
          cursor.currentTarget.currentRoute.push(cursor.currentTarget.currentToken);
        } // Clear tokens for nested object


        cursor.currentTarget.currentTokens = [];
        cursor.currentTarget.level++;
      }
    } else if (c === constants_1.TEMPLATE_OBJECT_END && cursor.currentTarget.type === common_1.TargetType.TEMPLATE_OBJECT) {
      for (var i = 0; i < cursor.currentTarget.currentTokens.length; i++) {
        var currentToken = cursor.currentTarget.currentTokens[i];
        cursor.currentTarget.paths[cursor.currentTarget.paths.length] = cursor.currentTarget.currentRoute.concat(currentToken);
      }

      cursor.currentTarget.currentTokens = [];
      cursor.currentTarget.currentRoute = cursor.currentTarget.currentRoute.slice(0, -1);
      cursor.currentTarget.level--;

      if (cursor.currentTarget.level < 0) {
        var paths = cursor.currentTarget.paths;
        var parentTarget = cursor.currentTarget.parentTarget;
        cursor.pointer--;

        if (parentTarget.type === common_1.TargetType.ARRAY) {
          cursor.currentTarget = {
            type: common_1.TargetType.TEMPLATE_OBJECT_ELEMENTS,
            value: parentTarget.value,
            paths: paths,
            currentPathIndex: 0,
            expectedPaths: paths.length,
            currentObject: {}
          };
        } else if (parentTarget.type === common_1.TargetType.OBJECT) {
          cursor.currentTarget = {
            type: common_1.TargetType.TEMPLATE_OBJECT_PROPERTIES,
            value: parentTarget.value,
            paths: paths,
            currentPathIndex: -1,
            expectedPaths: paths.length,
            currentObject: {}
          };
        }

        cursor.stack[++cursor.pointer] = cursor.currentTarget;
      }
    } else if (c === constants_1.TEMPLATE_OBJECT_FINAL) {
      cursor.currentTarget = cursor.stack[--cursor.pointer];
    } else {
      if (!element_1.decompressElement(c, cursor, data, orderedIndex)) {
        return;
      }
    }
  }
}

exports.decompressStages = decompressStages;

/***/ }),

/***/ "./node_modules/zipson/lib/decompressor/template.js":
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

function appendTemplateObjectValue(templateObjectTarget, targetValue) {
  var currentPath = templateObjectTarget.paths[templateObjectTarget.currentPathIndex];
  var i = 0;
  var targetObject = templateObjectTarget.currentObject;

  for (; i < currentPath.length - 1; i++) {
    var fragment = currentPath[i];
    targetObject = targetObject[fragment] = targetObject[fragment] || {};
  } // Undefined values are tokenized for templated object in order to keep field order
  // so we filter them in parsing to avoid including them in parsed result


  if (targetValue !== void 0) {
    targetObject[currentPath[i]] = targetValue;
  }
}
/**
 * Append a parsed value to template object by properties
 */


function appendTemplateObjectPropertiesValue(templateObjectElementsTarget, targetValue) {
  // If we have a negative path index that is the root identifier for a new object
  if (templateObjectElementsTarget.currentPathIndex === -1) {
    templateObjectElementsTarget.value[targetValue] = templateObjectElementsTarget.currentObject = {};
  } else {
    appendTemplateObjectValue(templateObjectElementsTarget, targetValue);
  } // If we got all path values, rotate to negative 1 for the next object


  if (++templateObjectElementsTarget.currentPathIndex === templateObjectElementsTarget.expectedPaths) {
    templateObjectElementsTarget.currentPathIndex = -1;
  }
}

exports.appendTemplateObjectPropertiesValue = appendTemplateObjectPropertiesValue;
/**
 * Append a parsed value to template object by elements
 */

function appendTemplateObjectElementsValue(templateObjectPropertiesTarget, targetValue) {
  // If we have the first path value create a new element
  if (templateObjectPropertiesTarget.currentPathIndex === 0) {
    templateObjectPropertiesTarget.currentObject = {};
    templateObjectPropertiesTarget.value.push(templateObjectPropertiesTarget.currentObject);
  }

  appendTemplateObjectValue(templateObjectPropertiesTarget, targetValue); // If we got all path values, rotate to 0 for the next element

  if (++templateObjectPropertiesTarget.currentPathIndex === templateObjectPropertiesTarget.expectedPaths) {
    templateObjectPropertiesTarget.currentPathIndex = 0;
  }
}

exports.appendTemplateObjectElementsValue = appendTemplateObjectElementsValue;

/***/ }),

/***/ "./node_modules/zipson/lib/index.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var compress_1 = __webpack_require__("./node_modules/zipson/lib/compress.js");

var writer_1 = __webpack_require__("./node_modules/zipson/lib/compressor/writer.js");

var decompress_1 = __webpack_require__("./node_modules/zipson/lib/decompress.js");

__export(__webpack_require__("./node_modules/zipson/lib/compressor/writer.js"));

__export(__webpack_require__("./node_modules/zipson/lib/decompressor/common.js"));
/**
 * Parse a zipson data string
 */


function parse(data) {
  var orderedIndex = decompress_1.makeOrderedIndex();
  return decompress_1.decompress(data, orderedIndex);
}

exports.parse = parse;
/**
 * Incrementally parse a zipson data string in chunks
 */

function parseIncremental() {
  var orderedIndex = decompress_1.makeOrderedIndex();

  var _a = decompress_1.decompressIncremental(orderedIndex),
      cursor = _a.cursor,
      increment = _a.increment;

  return function (data) {
    increment(data);

    if (data === null) {
      return cursor.rootTarget.value;
    }
  };
}

exports.parseIncremental = parseIncremental;
/**
 * Stringify any data to a zipson writer
 */

function stringifyTo(data, writer, options) {
  if (options === void 0) {
    options = {};
  }

  var invertedIndex = compress_1.makeInvertedIndex();
  var context = compress_1.makeCompressContext();
  compress_1.compress(context, data, invertedIndex, writer, options);
  writer.end();
}

exports.stringifyTo = stringifyTo;
/**
 * Stringify any data to a string
 */

function stringify(data, options) {
  var writer = new writer_1.ZipsonStringWriter();
  stringifyTo(data, writer, options);
  return writer.value;
}

exports.stringify = stringify;

/***/ }),

/***/ "./node_modules/zipson/lib/util.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__("./node_modules/zipson/lib/constants.js");

var maxInteger = 2147483648;
var minInteger = -2147483649;
var base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
/**
 * Convert number to base62 string
 */

function compressInteger(number) {
  if (number === 0) {
    return '0';
  }

  var result = '';
  var carry = number < 0 ? -number : number;
  var current = 0;
  var fraction;

  while (carry > 0) {
    carry = carry / 62;
    fraction = carry % 1;
    current = fraction * 62 + 0.1 << 0;
    carry -= fraction;
    result = base62[current] + result;
  }

  result = number < 0 ? '-' + result : result;
  return result;
}

exports.compressInteger = compressInteger;
/**
 * Convert base62 string to number
 */

function decompressInteger(compressedInteger) {
  var value = 0;

  if (compressedInteger[0] === '0') {
    return value;
  } else {
    var negative = compressedInteger[0] === '-';
    var multiplier = 1;
    var leftBound = negative ? 1 : 0;

    for (var i = compressedInteger.length - 1; i >= leftBound; i--) {
      var code = compressedInteger.charCodeAt(i);
      var current = code - 48;

      if (code >= 97) {
        current -= 13;
      } else if (code >= 65) {
        current -= 7;
      }

      value += current * multiplier;
      multiplier *= 62;
    }

    return negative ? -value : value;
  }
}

exports.decompressInteger = decompressInteger;
/**
 * Convert float to base62 string for integer and fraction
 */

function compressFloat(float, fullPrecision) {
  if (fullPrecision === void 0) {
    fullPrecision = false;
  }

  if (fullPrecision) {
    var _a = float.toString().split('.'),
        integer = _a[0],
        fraction = _a[1];

    var operator = integer === '-0' ? '-' : '';
    return "" + operator + compressInteger(parseInt(integer)) + constants_1.FLOAT_FULL_PRECISION_DELIMITER + fraction;
  } else {
    var integer = float >= maxInteger ? Math.floor(float) : float <= minInteger ? Math.ceil(float) : float << 0;
    var fraction = Math.round(constants_1.FLOAT_COMPRESSION_PRECISION * (float % 1));
    return "" + compressInteger(integer) + constants_1.FLOAT_REDUCED_PRECISION_DELIMITER + compressInteger(fraction);
  }
}

exports.compressFloat = compressFloat;
/**
 * Convert base62 integer and fraction to float
 */

function decompressFloat(compressedFloat) {
  if (compressedFloat.indexOf(constants_1.FLOAT_FULL_PRECISION_DELIMITER) > -1) {
    var _a = compressedFloat.split(constants_1.FLOAT_FULL_PRECISION_DELIMITER),
        integer = _a[0],
        fraction = _a[1];

    var mult = integer === '-0' ? -1 : 1;
    var uncompressedInteger = decompressInteger(integer);
    return mult * parseFloat(uncompressedInteger + '.' + fraction);
  } else {
    var _b = compressedFloat.split(constants_1.FLOAT_REDUCED_PRECISION_DELIMITER),
        integer = _b[0],
        fraction = _b[1];

    var uncompressedInteger = decompressInteger(integer);
    var uncompressedFraction = decompressInteger(fraction);
    return uncompressedInteger + uncompressedFraction / constants_1.FLOAT_COMPRESSION_PRECISION;
  }
}

exports.decompressFloat = decompressFloat;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// UNUSED EXPORTS: findGetParameter, isPage

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less
var main = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less");
;// CONCATENATED MODULE: ./src/style/main.less

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(main/* default */.Z, options);




       /* harmony default export */ const style_main = (main/* default */.Z && main/* default.locals */.Z.locals ? main/* default.locals */.Z.locals : undefined);

// EXTERNAL MODULE: ./node_modules/zipson/lib/index.js
var lib = __webpack_require__("./node_modules/zipson/lib/index.js");
;// CONCATENATED MODULE: ./src/index.js

/**
 * Find a specific GET-Parameter in the current Location
 * @date 2022-03-25
 * @param {string} parameterName
 * @returns {string}
 */

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search.substr(1).split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}
/**
 * Checks if the current location has a specific page query parameter
 * @date 2022-03-25
 * @param {string} pageQuery
 * @returns {boolean}
 */

function isPage(pageQuery) {
  return findGetParameter("page") == pageQuery;
}

function base64Encode(str) {
  return window.btoa(str);
}

function base64Decode(str) {
  return window.atob(str);
}

class BattleEngineStateObject {
  constructor() {
    this.attackers = [];
    this.defenders = [];
    this.slots = 2;
  }

  addField(participantId, type, fieldKey, fieldValue) {
    if (type === "attacker") {
      if (!this.attackers[participantId]) this.attackers.push({});
      this.attackers[participantId][fieldKey] = fieldValue;
    } else if (type === "defender") {
      if (!this.defenders[participantId]) this.defenders.push({});
      this.defenders[participantId][fieldKey] = fieldValue;
    } else {
      throw new Error("Unknown type: " + type);
    }
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  toObject() {
    return {
      attackers: this.attackers,
      defenders: this.defenders,
      slots: this.slots
    };
  }

  toApiString() {
    return base64Encode((0,lib.stringify)(this.toObject()));
  }

}



(function () {
  console.log(isPage("battleSimulator"));
  if (!isPage("battleSimulator")) return;
  $(`#form`).last().after(
  /*html*/
  `
    <table style="width:80%">
        <tbody>
                <tr>
                    <td colspan="">
                        <textarea id="import-string" name="import-string" rows="8" ></textarea>
                        <input id="import" type="button" value="Importieren" />
                        <input id="generate" type="button" value="Erstellen" />
                    </td>
                </tr>
        </tbody>
    </table>
    `);
  var ele = $('#generate').on("click", e => {
    $(this).children('#import-string').remove();
    var formStr = $('#form').serialize();
    var formData = new URLSearchParams(formStr);
    var formDataArray = Array.from(formData);
    var formDataObject = {};
    var state = new BattleEngineStateObject();
    formDataArray.forEach(item => {
      var key = item[0];
      var value = item[1];
      var types = ["attacker", "defender"];

      if (key !== 'slots') {
        var bracketRegex = /\[(.+?)\]/g;
        var matches = [...key.matchAll(bracketRegex)];
        var [participantId, type, fieldKey] = matches.map(match => match[1]);
        var key = `${participantId}_${type}_${fieldKey}`;
        state.addField(participantId, types[type], fieldKey, value);
      } else {
        state.slots = parseInt(value);
      }

      formDataObject[key] = value;
    });
    $('#import-string').val(base64Encode((0,lib.stringify)(state.toObject())));
  });
  $('#import').on("click", e => {
    var importString = $('#import-string').val();
    var importObject = (0,lib.parse)(base64Decode(importString));
    var state = new BattleEngineStateObject();
    state.attackers = importObject.attackers;
    state.defenders = importObject.defenders;
    state.slots = importObject.slots;
    var formData = new URLSearchParams();
    var formObject = {};
    var types = ["attacker", "defender"];

    var parseParticipant = (participant, index, type) => {
      Object.keys(participant).forEach(fieldKey => {
        var key = `battleinput[${index}][${type}][${fieldKey}]`;
        var value = participant[fieldKey];
        formData.append(key, value);
        formObject[key] = value;
      });
    };

    state.attackers.forEach((attacker, index) => {
      parseParticipant(attacker, index, 0);
    });
    state.defenders.forEach((defender, index) => {
      parseParticipant(defender, index, 1);
    });
    formData.append("slots", state.slots);
    formObject["slots"] = state.slots - 1;
    var form = $("<form action='game.php?page=battleSimulator' name='battlesim' method='post' id='import-form'></form>"); // loop over formObject and add each element to the form

    for (var key in formObject) {
      form.append(`<input type="hidden" name="${key}" value="${formObject[key]}" />`);
    } // add the form to the page before submitting it


    $("body").append(form); // submit the form

    $("#import-form").submit();
  });
})();
})();

/******/ })()
;