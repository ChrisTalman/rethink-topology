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

/***/ "./src/Modules/Depoly/GuaranteeDatabase.ts":
/*!*************************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeDatabase.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeTables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeTables */ \"./src/Modules/Depoly/GuaranteeTables.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield guarantee(database, deployment);\r\n        yield Object(_GuaranteeTables__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(database, deployment);\r\n    });\r\n});\r\n;\r\nfunction guarantee(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const exists = yield doesExist(database, deployment);\r\n        if (exists) {\r\n            log('Exists.', database, deployment);\r\n            return;\r\n        }\r\n        ;\r\n        log('Creating...', database, deployment);\r\n        yield create(database, deployment);\r\n        log('Created.', database, deployment);\r\n    });\r\n}\r\n;\r\nfunction doesExist(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .dbList()\r\n            .filter(name => name.eq(database.name))\r\n            .count()\r\n            .gt(0);\r\n        const exists = yield query.run(deployment.connection);\r\n        return exists;\r\n    });\r\n}\r\n;\r\nfunction create(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .dbCreate(database.name);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction log(message, database, deployment) {\r\n    const generated = generateMessage(message, database);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, database) {\r\n    const generated = '[' + database.name + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeDatabase.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/GuaranteeDatabases.ts":
/*!**************************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeDatabases.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GuaranteeDatabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuaranteeDatabase */ \"./src/Modules/Depoly/GuaranteeDatabase.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield Promise.all(deployment.topology.databases.map(database => Object(_GuaranteeDatabase__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(database, deployment)));\r\n    });\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeDatabases.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/GuaranteeIndex.ts":
/*!**********************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeIndex.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (index, indexList, table, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexName = generateIndexName(index);\r\n        const indexFunction = generateIndexFunction({ index });\r\n        const exists = indexList.includes(indexName);\r\n        let updated = false;\r\n        if (exists) {\r\n            const different = yield isIndexDifferent({ name: indexName, indexFunction, table, deployment });\r\n            if (different) {\r\n                yield dropIndex(table, indexName, deployment);\r\n                updated = true;\r\n            }\r\n            else {\r\n                log('Exists.', indexName, table, deployment);\r\n                return;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        log(updated ? 'Updating... ' : 'Creating...', indexName, table, deployment);\r\n        yield createIndex(table, indexName, indexFunction, deployment);\r\n        log((updated ? 'Updated' : 'Created') + '.', indexName, table, deployment);\r\n    });\r\n});\r\n;\r\nfunction dropIndex(table, indexName, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexDrop(indexName);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction createIndex(table, indexName, indexFunction, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexCreate(indexName, indexFunction);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction generateIndexName(index) {\r\n    if (typeof index === 'string') {\r\n        return index;\r\n    }\r\n    else if ('name' in index) {\r\n        return generateNameIndexName(index);\r\n    }\r\n    else {\r\n        const name = index.compound.map(mapCompoundIndexName).join('_');\r\n        return name;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateNameIndexName(index) {\r\n    let type;\r\n    if ('convert' in index && index.convert === Number)\r\n        type = 'number';\r\n    const name = type ? index.name + '=>' + type : index.name;\r\n    return name;\r\n}\r\n;\r\nfunction mapCompoundIndexName(field) {\r\n    if (typeof field === 'string') {\r\n        return field;\r\n    }\r\n    else {\r\n        if ('convert' in field && field.convert === Number) {\r\n            return generateNameIndexName(field);\r\n        }\r\n        else {\r\n            return field.name;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateIndexFunction({ index }) {\r\n    let indexFunction;\r\n    if (typeof index === 'string') {\r\n        indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index);\r\n    }\r\n    else if ('name' in index) {\r\n        if ('convert' in index) {\r\n            indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index.name).coerceTo('number');\r\n        }\r\n        else if ('arbitrary' in index) {\r\n            indexFunction = index.arbitrary(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row);\r\n        }\r\n        else {\r\n            indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index.name);\r\n        }\r\n        ;\r\n    }\r\n    else {\r\n        indexFunction = document => index.compound.map(field => mapCompoundIndexFunction({ field, document }));\r\n    }\r\n    ;\r\n    return indexFunction;\r\n}\r\n;\r\nfunction mapCompoundIndexFunction({ field, document }) {\r\n    if (typeof field === 'string') {\r\n        return document(field);\r\n    }\r\n    else {\r\n        if ('convert' in field) {\r\n            return document(field.name).coerceTo('number');\r\n        }\r\n        else if ('arbitrary' in field) {\r\n            return field.arbitrary(document);\r\n        }\r\n        else {\r\n            return document(field.name);\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction isIndexDifferent({ name, indexFunction, table, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield createComparisonIndex({ name, indexFunction, deployment });\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .ne(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexStatus(name)('function'), rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(deployment.indexComparisonTable.database)\r\n            .table(deployment.indexComparisonTable.name)\r\n            .indexStatus(name)('function'));\r\n        const different = yield query.run(deployment.connection);\r\n        return different;\r\n    });\r\n}\r\n;\r\nfunction createComparisonIndex({ name, indexFunction, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(deployment.indexComparisonTable.database)\r\n            .table(deployment.indexComparisonTable.name)\r\n            .indexCreate(name, indexFunction);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction log(message, indexName, table, deployment) {\r\n    const generated = generateMessage(message, indexName, table);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, indexName, table) {\r\n    const generated = '[' + table.database.name + '][' + table.name + ']' + '[' + indexName + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeIndex.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/GuaranteeIndexes.ts":
/*!************************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeIndexes.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeIndex */ \"./src/Modules/Depoly/GuaranteeIndex.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (table, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexList = yield getIndexList(table, deployment);\r\n        yield Promise.all(table.indexes.map(index => Object(_GuaranteeIndex__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(index, indexList, table, deployment)));\r\n    });\r\n});\r\n;\r\nfunction getIndexList(table, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexList();\r\n        const list = yield query.run(deployment.connection);\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeIndexes.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/GuaranteeTable.ts":
/*!**********************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeTable.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeIndexes */ \"./src/Modules/Depoly/GuaranteeIndexes.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (table, tableList, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield guarantee(table, tableList, deployment);\r\n        yield Object(_GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(table, deployment);\r\n    });\r\n});\r\n;\r\nfunction guarantee(table, tableList, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const exists = tableList.includes(table.name);\r\n        if (exists)\r\n            log('Exists.', table, deployment);\r\n        else\r\n            yield create(table, deployment);\r\n    });\r\n}\r\n;\r\nfunction create(table, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        log('Creating...', table, deployment);\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .tableCreate(table.name, {\r\n            shards: getClusterConfig('shards', table, deployment),\r\n            replicas: getClusterConfig('replicas', table, deployment)\r\n        });\r\n        yield query.run(deployment.connection);\r\n        log('Created.', table, deployment);\r\n    });\r\n}\r\n;\r\nfunction getClusterConfig(parameter, table, deployment) {\r\n    const value = (parameter in table && table[parameter]) || (parameter in table.database && table.database[parameter]) || deployment.topology[parameter];\r\n    return value;\r\n}\r\n;\r\nfunction log(message, table, deployment) {\r\n    const generated = generateMessage(message, table);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, table) {\r\n    const generated = '[' + table.database.name + '][' + table.name + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeTable.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/GuaranteeTables.ts":
/*!***********************************************!*\
  !*** ./src/Modules/Depoly/GuaranteeTables.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeTable */ \"./src/Modules/Depoly/GuaranteeTable.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n;\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const list = yield getTableList(database, deployment);\r\n        yield Promise.all(database.tables.map(table => Object(_GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(table, list, deployment)));\r\n    });\r\n});\r\n;\r\nfunction getTableList(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(database.name)\r\n            .tableList();\r\n        const list = yield query.run(deployment.connection);\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/GuaranteeTables.ts?");

/***/ }),

/***/ "./src/Modules/Depoly/index.ts":
/*!*************************************!*\
  !*** ./src/Modules/Depoly/index.ts ***!
  \*************************************/
/*! exports provided: default, deploy, Deployment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deploy\", function() { return deploy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Deployment\", function() { return Deployment; });\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ulid */ \"ulid\");\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ulid__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var src_Modules_Load__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Modules/Load */ \"./src/Modules/Load.ts\");\n/* harmony import */ var _GuaranteeDatabases__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GuaranteeDatabases */ \"./src/Modules/Depoly/GuaranteeDatabases.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\n\r\n;\r\n;\r\nconst OPTIONS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]({\r\n    options: joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]({\r\n        log: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().default(false),\r\n        rethink: joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]({\r\n            host: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n            port: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            server: joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]().optional(),\r\n            db: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n            user: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n            password: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n            discovery: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n            pool: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n            buffer: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            max: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            timeout: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            pingInterval: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            timeoutError: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            timeoutGb: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            maxExponent: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n            silent: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n            log: joi__WEBPACK_IMPORTED_MODULE_2__[\"func\"]().optional()\r\n        })\r\n            .pattern(/\\w/, joi__WEBPACK_IMPORTED_MODULE_2__[\"any\"]())\r\n            .required()\r\n    })\r\n        .required()\r\n})\r\n    .required();\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ options } = { options: {} }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const topology = yield Object(src_Modules_Load__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\r\n        const deployment = new Deployment({ topology, options });\r\n        yield deployment.initialise();\r\n        let deploymentError;\r\n        try {\r\n            yield deploy(deployment);\r\n        }\r\n        catch (error) {\r\n            deploymentError = error;\r\n        }\r\n        ;\r\n        yield deployment.finish();\r\n        if (deploymentError)\r\n            throw deploymentError;\r\n    });\r\n});\r\n;\r\nfunction deploy(deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield Object(_GuaranteeDatabases__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(deployment);\r\n    });\r\n}\r\n;\r\nclass Deployment {\r\n    constructor({ topology, options }) {\r\n        this.topology = topology;\r\n        this.options = this.validateOptions({ options });\r\n    }\r\n    ;\r\n    validateOptions({ options }) {\r\n        const validated = joi__WEBPACK_IMPORTED_MODULE_2__[\"validate\"](arguments[0], OPTIONS_SCHEMA);\r\n        if (validated.error)\r\n            throw new Error(validated.error.message);\r\n        options = validated.value.options;\r\n        return options;\r\n    }\r\n    ;\r\n    initialise() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.log('Connecting...');\r\n            const connection = yield rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].connect(this.options.rethink);\r\n            this.connection = connection;\r\n            this.log('Connected.');\r\n            yield this.initialiseIndexComparisonTable();\r\n        });\r\n    }\r\n    ;\r\n    initialiseIndexComparisonTable() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const id = Object(ulid__WEBPACK_IMPORTED_MODULE_1__[\"ulid\"])();\r\n            const name = 'Topology_IndexComparison_' + id;\r\n            const database = this.topology.databases[0];\r\n            yield this.guaranteeIndexComparisonDatabase({ database });\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .db(database.name)\r\n                .tableCreate(name);\r\n            this.log('Initialising index comparison table...');\r\n            yield query.run(this.connection);\r\n            this.log('Initialised index comparison table.');\r\n            this.indexComparisonTable =\r\n                {\r\n                    database: database.name,\r\n                    name\r\n                };\r\n        });\r\n    }\r\n    ;\r\n    guaranteeIndexComparisonDatabase({ database }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .branch(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .dbList()\r\n                .contains(database.name)\r\n                .eq(false), rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .dbCreate(database.name), true);\r\n            yield query.run(this.connection);\r\n        });\r\n    }\r\n    ;\r\n    finish() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.deleteIndexComparisonTable();\r\n            this.log('Disconnecting...');\r\n            yield this.connection.close();\r\n            this.log('Disconnect.');\r\n        });\r\n    }\r\n    ;\r\n    deleteIndexComparisonTable() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .db(this.indexComparisonTable.database)\r\n                .tableDrop(this.indexComparisonTable.name);\r\n            this.log('Deleting index comparison table...');\r\n            yield query.run(this.connection);\r\n            this.log('Deleted index comparison table.');\r\n        });\r\n    }\r\n    ;\r\n    log(...messages) {\r\n        if (!this.options.log)\r\n            return;\r\n        console.log(...messages);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Depoly/index.ts?");

/***/ }),

/***/ "./src/Modules/Load.ts":
/*!*****************************!*\
  !*** ./src/Modules/Load.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nconst { readFile } = fs__WEBPACK_IMPORTED_MODULE_1__[\"promises\"];\r\nconst FILE_NAME = 'topology.config.js';\r\nconst ARBITRARY_INDEX_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.func().optional();\r\nconst NAME_INDEX_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.object({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),\r\n    convert: joi__WEBPACK_IMPORTED_MODULE_0___default.a.valid(Number).optional(),\r\n    arbitrary: ARBITRARY_INDEX_SCHEMA\r\n})\r\n    .without('convert', ['arbitrary']);\r\nconst INDEXES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n    .array()\r\n    .items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), NAME_INDEX_SCHEMA, {\r\n    compound: joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n        .array()\r\n        .items(joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), NAME_INDEX_SCHEMA)\r\n        .min(1)\r\n        .optional()\r\n})\r\n    .default([]);\r\nconst SHARDS_LIMIT = 64;\r\nconst SHARDS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().greater(0).less(SHARDS_LIMIT - 1);\r\nconst REPLICAS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().integer().greater(0);\r\nconst TABLES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n    .array()\r\n    .items({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),\r\n    shards: SHARDS_SCHEMA.optional(),\r\n    replicas: REPLICAS_SCHEMA.optional(),\r\n    indexes: INDEXES_SCHEMA\r\n})\r\n    .min(1)\r\n    .required();\r\nconst DATABASES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a\r\n    .array()\r\n    .items({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(),\r\n    shards: SHARDS_SCHEMA.optional(),\r\n    replicas: REPLICAS_SCHEMA.optional(),\r\n    tables: TABLES_SCHEMA\r\n});\r\nconst SCHEMA = joi__WEBPACK_IMPORTED_MODULE_0___default.a.object({\r\n    shards: SHARDS_SCHEMA.default(1),\r\n    replicas: REPLICAS_SCHEMA.default(1),\r\n    databases: DATABASES_SCHEMA\r\n})\r\n    .required();\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let source;\r\n        try {\r\n            source = yield readFile(FILE_NAME, 'utf8');\r\n        }\r\n        catch (error) {\r\n            throw new TopologyFileError(error);\r\n        }\r\n        ;\r\n        let topology;\r\n        try {\r\n            topology = eval(source);\r\n        }\r\n        catch (error) {\r\n            throw new TopologyEvaluationError(error.message);\r\n        }\r\n        ;\r\n        const validated = joi__WEBPACK_IMPORTED_MODULE_0___default.a.validate(topology, SCHEMA);\r\n        if (validated.error)\r\n            throw new TopologySchemaError(validated.error.message);\r\n        topology = validated.value;\r\n        for (let database of topology.databases) {\r\n            for (let table of database.tables) {\r\n                table.database = database;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        return topology;\r\n    });\r\n});\r\n;\r\nclass TopologyFileError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass TopologyEvaluationError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass TopologySchemaError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Load.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: deploy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_Modules_Depoly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Depoly */ \"./src/Modules/Depoly/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"deploy\", function() { return src_Modules_Depoly__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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

/***/ "rethinkdb-ts":
/*!*******************************!*\
  !*** external "rethinkdb-ts" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rethinkdb-ts\");\n\n//# sourceURL=webpack:///external_%22rethinkdb-ts%22?");

/***/ }),

/***/ "ulid":
/*!***********************!*\
  !*** external "ulid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ulid\");\n\n//# sourceURL=webpack:///external_%22ulid%22?");

/***/ })

/******/ });
});