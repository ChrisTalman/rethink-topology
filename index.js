(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@bluecewe/config/index.js":
/*!************************************************!*\
  !*** ./node_modules/@bluecewe/config/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function webpackUniversalModuleDefinition(root, factory) {\r\n\tif(true)\r\n\t\tmodule.exports = factory();\r\n\telse { var i, a; }\r\n})(global, function() {\r\nreturn /******/ (function(modules) { // webpackBootstrap\r\n/******/ \t// The module cache\r\n/******/ \tvar installedModules = {};\r\n/******/\r\n/******/ \t// The require function\r\n/******/ \tfunction __webpack_require__(moduleId) {\r\n/******/\r\n/******/ \t\t// Check if module is in cache\r\n/******/ \t\tif(installedModules[moduleId]) {\r\n/******/ \t\t\treturn installedModules[moduleId].exports;\r\n/******/ \t\t}\r\n/******/ \t\t// Create a new module (and put it into the cache)\r\n/******/ \t\tvar module = installedModules[moduleId] = {\r\n/******/ \t\t\ti: moduleId,\r\n/******/ \t\t\tl: false,\r\n/******/ \t\t\texports: {}\r\n/******/ \t\t};\r\n/******/\r\n/******/ \t\t// Execute the module function\r\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\r\n/******/\r\n/******/ \t\t// Flag the module as loaded\r\n/******/ \t\tmodule.l = true;\r\n/******/\r\n/******/ \t\t// Return the exports of the module\r\n/******/ \t\treturn module.exports;\r\n/******/ \t}\r\n/******/\r\n/******/\r\n/******/ \t// expose the modules object (__webpack_modules__)\r\n/******/ \t__webpack_require__.m = modules;\r\n/******/\r\n/******/ \t// expose the module cache\r\n/******/ \t__webpack_require__.c = installedModules;\r\n/******/\r\n/******/ \t// define getter function for harmony exports\r\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\r\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\r\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\r\n/******/ \t\t}\r\n/******/ \t};\r\n/******/\r\n/******/ \t// define __esModule on exports\r\n/******/ \t__webpack_require__.r = function(exports) {\r\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\r\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\r\n/******/ \t\t}\r\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\r\n/******/ \t};\r\n/******/\r\n/******/ \t// create a fake namespace object\r\n/******/ \t// mode & 1: value is a module id, require it\r\n/******/ \t// mode & 2: merge all properties of value into the ns\r\n/******/ \t// mode & 4: return value when already ns object\r\n/******/ \t// mode & 8|1: behave like require\r\n/******/ \t__webpack_require__.t = function(value, mode) {\r\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\r\n/******/ \t\tif(mode & 8) return value;\r\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\r\n/******/ \t\tvar ns = Object.create(null);\r\n/******/ \t\t__webpack_require__.r(ns);\r\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\r\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\r\n/******/ \t\treturn ns;\r\n/******/ \t};\r\n/******/\r\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\r\n/******/ \t__webpack_require__.n = function(module) {\r\n/******/ \t\tvar getter = module && module.__esModule ?\r\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\r\n/******/ \t\t\tfunction getModuleExports() { return module; };\r\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\r\n/******/ \t\treturn getter;\r\n/******/ \t};\r\n/******/\r\n/******/ \t// Object.prototype.hasOwnProperty.call\r\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\r\n/******/\r\n/******/ \t// __webpack_public_path__\r\n/******/ \t__webpack_require__.p = \"\";\r\n/******/\r\n/******/\r\n/******/ \t// Load entry module and return exports\r\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/index.ts\");\r\n/******/ })\r\n/************************************************************************/\r\n/******/ ({\r\n\r\n/***/ \"./src/index.ts\":\r\n/*!**********************!*\\\r\n  !*** ./src/index.ts ***!\r\n  \\**********************/\r\n/*! exports provided: default, ConfigError */\r\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\r\n\r\n\"use strict\";\r\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"default\\\", function() { return Store; });\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"ConfigError\\\", function() { return ConfigError; });\\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \\\"fs\\\");\\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\\n\\r\\n\\r\\n;\\r\\nclass Store {\\r\\n    constructor() {\\r\\n        this.initialised = false;\\r\\n    }\\r\\n    get data() {\\r\\n        if (this.initialised) {\\r\\n            return this._data;\\r\\n        }\\r\\n        else {\\r\\n            ConfigError.throw({ message: 'Config not initialised.', code: 'notInitialised' });\\r\\n        }\\r\\n        ;\\r\\n    }\\r\\n    ;\\r\\n    initialise() {\\r\\n        if (this.initialised) {\\r\\n            return this._data;\\r\\n        }\\r\\n        ;\\r\\n        let file;\\r\\n        try {\\r\\n            file = fs__WEBPACK_IMPORTED_MODULE_0__[\\\"readFileSync\\\"]('./config.json', { encoding: 'utf8' });\\r\\n        }\\r\\n        catch (error) {\\r\\n            ConfigError.throw(error);\\r\\n            return;\\r\\n        }\\r\\n        ;\\r\\n        let object;\\r\\n        try {\\r\\n            object = JSON.parse(file);\\r\\n        }\\r\\n        catch (error) {\\r\\n            ConfigError.throw({ message: 'Failed to parse config file as JSON.', code: 'parseFailure' });\\r\\n            return;\\r\\n        }\\r\\n        ;\\r\\n        this._data = object;\\r\\n        this.initialised = true;\\r\\n        return this._data;\\r\\n    }\\r\\n    ;\\r\\n}\\r\\n;\\r\\nclass ConfigError extends Error {\\r\\n    static throw(parameters) {\\r\\n        throw new this(parameters);\\r\\n    }\\r\\n    ;\\r\\n    constructor(parameters) {\\r\\n        super(parameters.message);\\r\\n        this.message = parameters.message;\\r\\n        this.code = parameters.code;\\r\\n    }\\r\\n    ;\\r\\n}\\r\\n;\\r\\n\\n\\n//# sourceURL=webpack:///./src/index.ts?\");\r\n\r\n/***/ }),\r\n\r\n/***/ \"fs\":\r\n/*!*********************!*\\\r\n  !*** external \"fs\" ***!\r\n  \\*********************/\r\n/*! no static exports found */\r\n/***/ (function(module, exports) {\r\n\r\neval(\"module.exports = require(\\\"fs\\\");\\n\\n//# sourceURL=webpack:///external_%22fs%22?\");\r\n\r\n/***/ })\r\n\r\n/******/ });\r\n});\n\n//# sourceURL=webpack:///./node_modules/@bluecewe/config/index.js?");

/***/ }),

/***/ "./src/Modules/Config.ts":
/*!*******************************!*\
  !*** ./src/Modules/Config.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bluecewe/config */ \"./node_modules/@bluecewe/config/index.js\");\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bluecewe_config__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst config = new _bluecewe_config__WEBPACK_IMPORTED_MODULE_0___default.a();\r\ntry {\r\n    config.initialise();\r\n}\r\ncatch (error) {\r\n    console.error('Failed to initialise config:', error.message);\r\n}\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\r\n\n\n//# sourceURL=webpack:///./src/Modules/Config.ts?");

/***/ }),

/***/ "./src/Modules/Retrieve.ts":
/*!*********************************!*\
  !*** ./src/Modules/Retrieve.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\r\n    let file;\r\n    try {\r\n        file = fs__WEBPACK_IMPORTED_MODULE_0__[\"readFileSync\"]('topology.json', 'utf8');\r\n    }\r\n    catch (error) {\r\n        console.error('Topology not found:', error.message);\r\n        return;\r\n    }\r\n    ;\r\n    let topology;\r\n    try {\r\n        topology = JSON.parse(file);\r\n    }\r\n    catch (error) {\r\n        console.error('Topology parse error:', error.message);\r\n        return;\r\n    }\r\n    ;\r\n    return topology;\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Retrieve.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_Modules_Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Config */ \"./src/Modules/Config.ts\");\n/* harmony import */ var src_Modules_Retrieve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Retrieve */ \"./src/Modules/Retrieve.ts\");\n\r\n\r\n\r\ninitialise();\r\nfunction initialise() {\r\n    console.log(src_Modules_Config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].data);\r\n    const topology = Object(src_Modules_Retrieve__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n    if (!topology) {\r\n        return;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });
});