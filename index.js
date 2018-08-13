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

/***/ "./src/Modules/Config.ts":
/*!*******************************!*\
  !*** ./src/Modules/Config.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bluecewe/config */ \"@bluecewe/config\");\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bluecewe_config__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst config = new _bluecewe_config__WEBPACK_IMPORTED_MODULE_0___default.a();\r\ntry {\r\n    config.initialise();\r\n}\r\ncatch (error) {\r\n    console.error('Failed to initialise config:', error.message);\r\n}\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\r\n\n\n//# sourceURL=webpack:///./src/Modules/Config.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/GenerateConnection.ts":
/*!****************************************************!*\
  !*** ./src/Modules/Evaluate/GenerateConnection.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_Modules_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Config */ \"./src/Modules/Config.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let connection;\r\n        try {\r\n            connection = yield rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.connect(src_Modules_Config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].data.rethink);\r\n        }\r\n        catch (error) {\r\n            console.error('RethinkDB connection failure:', error.message);\r\n            return;\r\n        }\r\n        ;\r\n        return connection;\r\n    });\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/GenerateConnection.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/GuaranteeIndex.ts":
/*!************************************************!*\
  !*** ./src/Modules/Evaluate/GuaranteeIndex.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (index, indexList, table, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexName = generateIndexName(index);\r\n        const indexFunction = generateIndexFunction(index);\r\n        const exists = indexList.includes(indexName);\r\n        if (exists) {\r\n            log('Exists.', indexName, table);\r\n            return true;\r\n        }\r\n        ;\r\n        const query = rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a\r\n            .table(table.name)\r\n            .indexCreate(indexName, indexFunction);\r\n        log('Creating...', indexName, table);\r\n        try {\r\n            yield query.run(connection);\r\n        }\r\n        catch (error) {\r\n            logError('Creation failed: ' + error.message, indexName, table);\r\n            return;\r\n        }\r\n        ;\r\n        log('Created.', indexName, table);\r\n        return true;\r\n    });\r\n});\r\n;\r\nfunction generateIndexName(index) {\r\n    if (typeof index === 'string') {\r\n        return index;\r\n    }\r\n    else {\r\n        const name = index.compound.join('_');\r\n        return name;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateIndexFunction(index) {\r\n    if (typeof index === 'string') {\r\n        return rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row(index);\r\n    }\r\n    else {\r\n        const indexFunction = index.compound.map(element => rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.row(element));\r\n        return indexFunction;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction log(message, indexName, table) {\r\n    console.log(generateMessage(message, indexName, table));\r\n}\r\n;\r\nfunction logError(message, indexName, table) {\r\n    console.error(generateMessage(message, indexName, table));\r\n}\r\n;\r\nfunction generateMessage(message, indexName, table) {\r\n    const generated = '[Table][' + table.name + ']' + '[Index][' + indexName + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/GuaranteeIndex.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/GuaranteeIndexes.ts":
/*!**************************************************!*\
  !*** ./src/Modules/Evaluate/GuaranteeIndexes.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeTable */ \"./src/Modules/Evaluate/GuaranteeTable.ts\");\n/* harmony import */ var _GuaranteeIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeIndex */ \"./src/Modules/Evaluate/GuaranteeIndex.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (table, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexList = yield getIndexList(table, connection);\r\n        if (!indexList) {\r\n            return;\r\n        }\r\n        ;\r\n        const promises = [];\r\n        for (let index of table.indexes) {\r\n            const promise = Object(_GuaranteeIndex__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(index, indexList, table, connection);\r\n            promises.push(promise);\r\n        }\r\n        ;\r\n        yield Promise.all(promises);\r\n        return true;\r\n    });\r\n});\r\n;\r\nfunction getIndexList(table, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a\r\n            .table(table.name)\r\n            .indexList();\r\n        let list;\r\n        try {\r\n            list = yield query.run(connection);\r\n        }\r\n        catch (error) {\r\n            Object(_GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__[\"logError\"])('Failed index list retrieval:', error.message);\r\n            return;\r\n        }\r\n        ;\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/GuaranteeIndexes.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/GuaranteeTable.ts":
/*!************************************************!*\
  !*** ./src/Modules/Evaluate/GuaranteeTable.ts ***!
  \************************************************/
/*! exports provided: default, logError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logError\", function() { return logError; });\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeIndexes */ \"./src/Modules/Evaluate/GuaranteeIndexes.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (table, tableList, topology, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const tableGuaranteed = yield guarantee(table, tableList, topology, connection);\r\n        if (!tableGuaranteed) {\r\n            return;\r\n        }\r\n        ;\r\n        const indexesGuaranteed = yield Object(_GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(table, connection);\r\n        if (!indexesGuaranteed) {\r\n            return;\r\n        }\r\n        ;\r\n        return true;\r\n    });\r\n});\r\n;\r\nfunction guarantee(table, tableList, topology, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const exists = tableList.includes(table.name);\r\n        if (exists) {\r\n            log('Exists.', table);\r\n        }\r\n        else {\r\n            log('Creating...', table);\r\n            const query = rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a\r\n                .tableCreate(table.name, { shards: topology.shards, replicas: topology.replicas });\r\n            try {\r\n                yield query.run(connection);\r\n            }\r\n            catch (error) {\r\n                logError('Creation failed: ' + error.message, table);\r\n                return;\r\n            }\r\n            ;\r\n            log('Created.', table);\r\n        }\r\n        ;\r\n        return true;\r\n    });\r\n}\r\n;\r\nfunction log(message, table) {\r\n    console.log(generateMessage(message, table));\r\n}\r\n;\r\nfunction logError(message, table) {\r\n    console.error(generateMessage(message, table));\r\n}\r\n;\r\nfunction generateMessage(message, table) {\r\n    const generated = '[Table][' + table.name + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/GuaranteeTable.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/GuaranteeTables.ts":
/*!*************************************************!*\
  !*** ./src/Modules/Evaluate/GuaranteeTables.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ValidateDatabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidateDatabase */ \"./src/Modules/Evaluate/ValidateDatabase.ts\");\n/* harmony import */ var _GuaranteeTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeTable */ \"./src/Modules/Evaluate/GuaranteeTable.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (topology, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const list = yield getTableList(connection);\r\n        if (!list) {\r\n            return;\r\n        }\r\n        ;\r\n        const promises = [];\r\n        for (let table of topology.tables) {\r\n            const promise = Object(_GuaranteeTable__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(table, list, topology, connection);\r\n            promises.push(promise);\r\n        }\r\n        ;\r\n        yield Promise.all(promises);\r\n    });\r\n});\r\n;\r\nfunction getTableList(connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.tableList();\r\n        let list;\r\n        try {\r\n            list = yield query.run(connection);\r\n        }\r\n        catch (error) {\r\n            Object(_ValidateDatabase__WEBPACK_IMPORTED_MODULE_1__[\"logError\"])('Failed table list retrieval: ' + error.message);\r\n            return;\r\n        }\r\n        ;\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/GuaranteeTables.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/ValidateDatabase.ts":
/*!**************************************************!*\
  !*** ./src/Modules/Evaluate/ValidateDatabase.ts ***!
  \**************************************************/
/*! exports provided: default, logError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logError\", function() { return logError; });\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb */ \"rethinkdb\");\n/* harmony import */ var rethinkdb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var src_Modules_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Config */ \"./src/Modules/Config.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let list;\r\n        try {\r\n            list = yield rethinkdb__WEBPACK_IMPORTED_MODULE_0___default.a.dbList().run(connection);\r\n        }\r\n        catch (error) {\r\n            console.error(error.message);\r\n            return;\r\n        }\r\n        ;\r\n        const valid = list.includes(src_Modules_Config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].data.rethink.db);\r\n        if (valid) {\r\n            log('Exists.');\r\n        }\r\n        else {\r\n            logError('Doesn\\'t exist.');\r\n        }\r\n        ;\r\n        return valid;\r\n    });\r\n});\r\n;\r\nfunction log(message) {\r\n    console.log(generateMessage(message));\r\n}\r\n;\r\nfunction logError(message) {\r\n    console.error(generateMessage(message));\r\n}\r\n;\r\nfunction generateMessage(message) {\r\n    const generated = '[Database][' + src_Modules_Config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].data.rethink.db + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/ValidateDatabase.ts?");

/***/ }),

/***/ "./src/Modules/Evaluate/index.ts":
/*!***************************************!*\
  !*** ./src/Modules/Evaluate/index.ts ***!
  \***************************************/
/*! exports provided: default, run */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"run\", function() { return run; });\n/* harmony import */ var _GenerateConnection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GenerateConnection */ \"./src/Modules/Evaluate/GenerateConnection.ts\");\n/* harmony import */ var _ValidateDatabase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ValidateDatabase */ \"./src/Modules/Evaluate/ValidateDatabase.ts\");\n/* harmony import */ var _GuaranteeTables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeTables */ \"./src/Modules/Evaluate/GuaranteeTables.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (topology) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        console.log('Connecting...');\r\n        const connection = yield Object(_GenerateConnection__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n        if (!connection) {\r\n            return;\r\n        }\r\n        ;\r\n        console.log('Connected.');\r\n        yield run(topology, connection);\r\n        console.log('Disconnecting...');\r\n        yield connection.close();\r\n        console.log('Disconnect.');\r\n    });\r\n});\r\n;\r\nfunction run(topology, connection) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const databaseValid = yield Object(_ValidateDatabase__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(connection);\r\n        if (!databaseValid) {\r\n            return;\r\n        }\r\n        ;\r\n        yield Object(_GuaranteeTables__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(topology, connection);\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Evaluate/index.ts?");

/***/ }),

/***/ "./src/Modules/Retrieve.ts":
/*!*********************************!*\
  !*** ./src/Modules/Retrieve.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nconst FILE_NAME = 'topology.config.js';\r\nconst SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.object({\r\n    shards: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().required(),\r\n    replicas: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().required(),\r\n    tables: joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n        .array()\r\n        .items({\r\n        name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),\r\n        indexes: joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n            .array()\r\n            .items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), {\r\n            name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().optional(),\r\n            compound: joi__WEBPACK_IMPORTED_MODULE_0___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string()).min(1).optional()\r\n        })\r\n            .default([])\r\n    })\r\n        .min(1)\r\n        .required()\r\n})\r\n    .required();\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\r\n    let file;\r\n    try {\r\n        file = fs__WEBPACK_IMPORTED_MODULE_1__[\"readFileSync\"](FILE_NAME, 'utf8');\r\n    }\r\n    catch (error) {\r\n        console.error('Topology not found:', error.message);\r\n        return;\r\n    }\r\n    ;\r\n    let topology;\r\n    try {\r\n        topology = eval(file);\r\n    }\r\n    catch (error) {\r\n        console.error('Topology evaluation error:', error.message);\r\n        return;\r\n    }\r\n    ;\r\n    const validated = joi__WEBPACK_IMPORTED_MODULE_0___default.a.validate(topology, SCHEMA);\r\n    if (validated.error) {\r\n        console.error('Topology validation error:', validated.error.message);\r\n        return;\r\n    }\r\n    ;\r\n    topology = validated.value;\r\n    return topology;\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Retrieve.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_Modules_Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Config */ \"./src/Modules/Config.ts\");\n/* harmony import */ var src_Modules_Retrieve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Retrieve */ \"./src/Modules/Retrieve.ts\");\n/* harmony import */ var src_Modules_Evaluate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/Modules/Evaluate */ \"./src/Modules/Evaluate/index.ts\");\n\r\n\r\n\r\n\r\ninitialise();\r\nfunction initialise() {\r\n    if (!src_Modules_Config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initialised) {\r\n        return;\r\n    }\r\n    ;\r\n    const topology = Object(src_Modules_Retrieve__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n    if (!topology) {\r\n        return;\r\n    }\r\n    ;\r\n    Object(src_Modules_Evaluate__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(topology);\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "@bluecewe/config":
/*!***********************************!*\
  !*** external "@bluecewe/config" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@bluecewe/config\");\n\n//# sourceURL=webpack:///external_%22@bluecewe/config%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "rethinkdb":
/*!****************************!*\
  !*** external "rethinkdb" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rethinkdb\");\n\n//# sourceURL=webpack:///external_%22rethinkdb%22?");

/***/ })

/******/ });
});