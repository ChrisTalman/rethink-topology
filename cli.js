#!/usr/bin/env node
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/CLI/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/Modules/Deploy/DeleteUndeclaredIndexes.ts":
/*!***********************************************************!*\
  !*** ./src/App/Modules/Deploy/DeleteUndeclaredIndexes.ts ***!
  \***********************************************************/
/*! exports provided: deleteUndeclaredIndexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteUndeclaredIndexes\", function() { return deleteUndeclaredIndexes; });\n/* harmony import */ var _GuaranteeIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuaranteeIndex */ \"./src/App/Modules/Deploy/GuaranteeIndex.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nfunction deleteUndeclaredIndexes({ table, indexList, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        if (!deployment.options.deleteUndeclaredIndexes)\r\n            return;\r\n        const declaredIndexes = new Set();\r\n        for (let index of table.indexes) {\r\n            const indexName = Object(_GuaranteeIndex__WEBPACK_IMPORTED_MODULE_0__[\"generateIndexName\"])(index);\r\n            declaredIndexes.add(indexName);\r\n        }\r\n        ;\r\n        const promises = [];\r\n        for (let indexName of indexList) {\r\n            if (!declaredIndexes.has(indexName))\r\n                return;\r\n            const promise = deleteUndeclaredIndex({ table, indexName, deployment });\r\n            promises.push(promise);\r\n        }\r\n        ;\r\n        yield Promise.all(promises);\r\n    });\r\n}\r\n;\r\nfunction deleteUndeclaredIndex({ table, indexName, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        log({ message: 'Deleting undeclared index...', indexName, table, deployment });\r\n        yield Object(_GuaranteeIndex__WEBPACK_IMPORTED_MODULE_0__[\"dropIndex\"])(table, indexName, deployment);\r\n        log({ message: 'Deleted undeclared index.', indexName, table, deployment });\r\n    });\r\n}\r\n;\r\nfunction log({ message, indexName, table, deployment }) {\r\n    const generated = '[' + table.name + '][' + table.name + '][' + indexName + '] ' + message;\r\n    deployment.log(generated);\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/DeleteUndeclaredIndexes.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/Deployment.ts":
/*!**********************************************!*\
  !*** ./src/App/Modules/Deploy/Deployment.ts ***!
  \**********************************************/
/*! exports provided: default, ConnectionConfigFileError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Deployment; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConnectionConfigFileError\", function() { return ConnectionConfigFileError; });\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ulid */ \"ulid\");\n/* harmony import */ var ulid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ulid__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bluecewe/config */ \"@bluecewe/config\");\n/* harmony import */ var _bluecewe_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_bluecewe_config__WEBPACK_IMPORTED_MODULE_3__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\nconst RETHINK_OPTIONS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]({\r\n    host: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n    port: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    server: joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]().optional(),\r\n    db: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n    user: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n    password: joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"]().optional(),\r\n    discovery: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n    pool: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n    buffer: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    max: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    timeout: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    pingInterval: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    timeoutError: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    timeoutGb: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    maxExponent: joi__WEBPACK_IMPORTED_MODULE_2__[\"number\"]().optional(),\r\n    silent: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().optional(),\r\n    log: joi__WEBPACK_IMPORTED_MODULE_2__[\"func\"]().optional()\r\n});\r\nconst OPTIONS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_2__[\"object\"]({\r\n    deleteDefaultDatabase: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().default(true),\r\n    deleteUndeclaredIndexes: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().default(false),\r\n    log: joi__WEBPACK_IMPORTED_MODULE_2__[\"boolean\"]().default(false),\r\n    rethink: joi__WEBPACK_IMPORTED_MODULE_2__[\"alternatives\"](joi__WEBPACK_IMPORTED_MODULE_2__[\"string\"](), RETHINK_OPTIONS_SCHEMA).required()\r\n})\r\n    .required()\r\n    .label('options');\r\nconst DATABASE_NOT_FOUND_ERROR_MESSAGE_EXPRESSION = /Database `.+` does not exist./;\r\nconst DEFAULT_DATABASE_NAME = 'test';\r\n;\r\n;\r\nclass Deployment {\r\n    constructor({ topology, options }) {\r\n        this.topology = topology;\r\n        this.options = this.validateOptions({ options });\r\n    }\r\n    ;\r\n    validateOptions({ options }) {\r\n        const validated = joi__WEBPACK_IMPORTED_MODULE_2__[\"validate\"](options, OPTIONS_SCHEMA);\r\n        if (validated.error)\r\n            throw new Error(validated.error.message);\r\n        options = validated.value;\r\n        return options;\r\n    }\r\n    ;\r\n    initialise() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.log('Connecting...');\r\n            let rethinkConnectionOptions;\r\n            if (typeof this.options.rethink === 'string') {\r\n                const config = new _bluecewe_config__WEBPACK_IMPORTED_MODULE_3___default.a({ initialise: false, schema: false, file: this.options.rethink });\r\n                try {\r\n                    yield config.initialise();\r\n                }\r\n                catch (error) {\r\n                    throw new ConnectionConfigFileError(error);\r\n                }\r\n                ;\r\n                const data = config.data;\r\n                rethinkConnectionOptions = data;\r\n            }\r\n            else {\r\n                rethinkConnectionOptions = this.options.rethink;\r\n            }\r\n            ;\r\n            const connection = yield rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].connect(rethinkConnectionOptions);\r\n            this.connection = connection;\r\n            this.log('Connected.');\r\n            yield this.deleteDefaultDatabase();\r\n            yield this.initialiseIndexComparisonTable();\r\n        });\r\n    }\r\n    ;\r\n    deleteDefaultDatabase() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!this.options.deleteDefaultDatabase)\r\n                return;\r\n            this.log('Deleting default database \\'tests\\'...');\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].dbDrop(DEFAULT_DATABASE_NAME);\r\n            try {\r\n                yield query.run(this.connection);\r\n            }\r\n            catch (error) {\r\n                const notFound = typeof error === 'object' && error !== null && 'msg' in error && typeof error.msg === 'string' && DATABASE_NOT_FOUND_ERROR_MESSAGE_EXPRESSION.test(error.msg);\r\n                if (notFound)\r\n                    return;\r\n                const originalErrorMessage = 'message' in error ? error.message : error;\r\n                const contextualisedErrorMessage = 'Failed to delete default database: ' + originalErrorMessage;\r\n                throw new Error(contextualisedErrorMessage);\r\n            }\r\n            ;\r\n            this.log('Deleted default database \\'tests\\'.');\r\n        });\r\n    }\r\n    ;\r\n    initialiseIndexComparisonTable() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const id = Object(ulid__WEBPACK_IMPORTED_MODULE_1__[\"ulid\"])();\r\n            const name = 'Topology_IndexComparison_' + id;\r\n            const database = this.topology.databases[0];\r\n            yield this.guaranteeIndexComparisonDatabase({ database });\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .db(database.name)\r\n                .tableCreate(name);\r\n            this.log('Initialising index comparison table...');\r\n            yield query.run(this.connection);\r\n            this.log('Initialised index comparison table.');\r\n            this.indexComparisonTable =\r\n                {\r\n                    database: database.name,\r\n                    name\r\n                };\r\n        });\r\n    }\r\n    ;\r\n    guaranteeIndexComparisonDatabase({ database }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .branch(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .dbList()\r\n                .contains(database.name)\r\n                .eq(false), rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .dbCreate(database.name), true);\r\n            yield query.run(this.connection);\r\n        });\r\n    }\r\n    ;\r\n    finish() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.deleteIndexComparisonTable();\r\n            this.log('Disconnecting...');\r\n            yield this.connection.close();\r\n            this.log('Disconnect.');\r\n        });\r\n    }\r\n    ;\r\n    deleteIndexComparisonTable() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n                .db(this.indexComparisonTable.database)\r\n                .tableDrop(this.indexComparisonTable.name);\r\n            this.log('Deleting index comparison table...');\r\n            yield query.run(this.connection);\r\n            this.log('Deleted index comparison table.');\r\n        });\r\n    }\r\n    ;\r\n    log(...messages) {\r\n        if (!this.options.log)\r\n            return;\r\n        console.log(...messages);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass ConnectionConfigFileError extends Error {\r\n    constructor(error) {\r\n        const message = 'RethinkDB connection options file error: ' + error.message;\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/Deployment.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeDatabase.ts":
/*!*****************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeDatabase.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeTables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeTables */ \"./src/App/Modules/Deploy/GuaranteeTables.ts\");\n/* harmony import */ var _GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeUsers */ \"./src/App/Modules/Deploy/GuaranteeUsers.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield guarantee(database, deployment);\r\n        const tableResults = yield Object(_GuaranteeTables__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(database, deployment);\r\n        const result = {\r\n            name: database.name,\r\n            tables: tableResults\r\n        };\r\n        return result;\r\n    });\r\n});\r\n;\r\nfunction guarantee(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const exists = yield doesExist(database, deployment);\r\n        if (exists) {\r\n            log('Exists.', database, deployment);\r\n        }\r\n        else {\r\n            log('Creating...', database, deployment);\r\n            yield create(database, deployment);\r\n            log('Created.', database, deployment);\r\n        }\r\n        ;\r\n        yield guaranteeUsers({ database, deployment });\r\n    });\r\n}\r\n;\r\nfunction doesExist(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .dbList()\r\n            .filter(name => name.eq(database.name))\r\n            .count()\r\n            .gt(0);\r\n        const exists = yield query.run(deployment.connection);\r\n        return exists;\r\n    });\r\n}\r\n;\r\nfunction create(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .dbCreate(database.name);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction guaranteeUsers({ database, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield Promise.all(database.users.map(user => guaranteeUser({ user, database, deployment })));\r\n    });\r\n}\r\n;\r\nfunction guaranteeUser({ user, database, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const permissions = Object(_GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__[\"generatePermissions\"])({ user });\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(database.name)\r\n            .grant(user.username, permissions);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction log(message, database, deployment) {\r\n    const generated = generateMessage(message, database);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, database) {\r\n    const generated = '[' + database.name + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeDatabase.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeDatabases.ts":
/*!******************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeDatabases.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GuaranteeDatabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuaranteeDatabase */ \"./src/App/Modules/Deploy/GuaranteeDatabase.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const databaseResults = yield Promise.all(deployment.topology.databases.map(database => Object(_GuaranteeDatabase__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(database, deployment)));\r\n        return databaseResults;\r\n    });\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeDatabases.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeIndex.ts":
/*!**************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeIndex.ts ***!
  \**************************************************/
/*! exports provided: default, dropIndex, generateIndexName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dropIndex\", function() { return dropIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateIndexName\", function() { return generateIndexName; });\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ index, indexList, table, tableId, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexName = generateIndexName(index);\r\n        const indexFunction = generateIndexFunction({ index });\r\n        const exists = indexList.includes(indexName);\r\n        const result = {\r\n            name: indexName\r\n        };\r\n        let updated = false;\r\n        if (exists) {\r\n            const different = yield isIndexDifferent({ name: indexName, indexFunction, table, tableId, deployment });\r\n            if (different) {\r\n                yield dropIndex(table, indexName, deployment);\r\n                updated = true;\r\n            }\r\n            else {\r\n                log('Exists.', indexName, table, deployment);\r\n                return result;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        log(updated ? 'Updating... ' : 'Creating...', indexName, table, deployment);\r\n        yield createIndex(table, indexName, indexFunction, deployment);\r\n        log((updated ? 'Updated' : 'Created') + '.', indexName, table, deployment);\r\n        return result;\r\n    });\r\n});\r\n;\r\nfunction dropIndex(table, indexName, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexDrop(indexName);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction createIndex(table, indexName, indexFunction, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexCreate(indexName, indexFunction);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction generateIndexName(index) {\r\n    if (typeof index === 'string') {\r\n        return index;\r\n    }\r\n    else if ('name' in index) {\r\n        return generateNameIndexName(index);\r\n    }\r\n    else {\r\n        const name = index.compound.map(mapCompoundIndexName).join('_');\r\n        return name;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateNameIndexName(index) {\r\n    let type;\r\n    if ('convert' in index && index.convert === Number)\r\n        type = 'number';\r\n    const name = type ? index.name + '=>' + type : index.name;\r\n    return name;\r\n}\r\n;\r\nfunction mapCompoundIndexName(field) {\r\n    if (typeof field === 'string') {\r\n        return field;\r\n    }\r\n    else {\r\n        if ('convert' in field && field.convert === Number) {\r\n            return generateNameIndexName(field);\r\n        }\r\n        else {\r\n            return field.name;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateIndexFunction({ index }) {\r\n    let indexFunction;\r\n    if (typeof index === 'string') {\r\n        indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index);\r\n    }\r\n    else if ('name' in index) {\r\n        if ('convert' in index) {\r\n            indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index.name).coerceTo('number');\r\n        }\r\n        else if ('arbitrary' in index) {\r\n            indexFunction = index.arbitrary;\r\n        }\r\n        else {\r\n            indexFunction = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"].row(index.name);\r\n        }\r\n        ;\r\n    }\r\n    else {\r\n        indexFunction = document => index.compound.map(field => mapCompoundIndexFunction({ field, document }));\r\n    }\r\n    ;\r\n    return indexFunction;\r\n}\r\n;\r\nfunction mapCompoundIndexFunction({ field, document }) {\r\n    if (typeof field === 'string') {\r\n        return document(field);\r\n    }\r\n    else {\r\n        if ('convert' in field) {\r\n            return document(field.name).coerceTo('number');\r\n        }\r\n        else if ('arbitrary' in field) {\r\n            return field.arbitrary(document);\r\n        }\r\n        else {\r\n            return document(field.name);\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction isIndexDifferent({ name, indexFunction, table, tableId, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const comparisonIndexName = yield createComparisonIndex({ name, indexFunction, tableId, deployment });\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .ne(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexStatus(name)('function'), rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(deployment.indexComparisonTable.database)\r\n            .table(deployment.indexComparisonTable.name)\r\n            .indexStatus(comparisonIndexName)('function'));\r\n        const different = yield query.run(deployment.connection);\r\n        return different;\r\n    });\r\n}\r\n;\r\nfunction createComparisonIndex({ name, indexFunction, tableId, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const comparisonIndexName = name + '-' + tableId;\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(deployment.indexComparisonTable.database)\r\n            .table(deployment.indexComparisonTable.name)\r\n            .indexCreate(comparisonIndexName, indexFunction);\r\n        yield query.run(deployment.connection);\r\n        return comparisonIndexName;\r\n    });\r\n}\r\n;\r\nfunction log(message, indexName, table, deployment) {\r\n    const generated = generateMessage(message, indexName, table);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, indexName, table) {\r\n    const generated = '[' + table.database.name + '][' + table.name + ']' + '[' + indexName + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeIndex.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeIndexes.ts":
/*!****************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeIndexes.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeIndex */ \"./src/App/Modules/Deploy/GuaranteeIndex.ts\");\n/* harmony import */ var _DeleteUndeclaredIndexes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DeleteUndeclaredIndexes */ \"./src/App/Modules/Deploy/DeleteUndeclaredIndexes.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ table, tableId, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const indexList = yield getIndexList(table, deployment);\r\n        yield Object(_DeleteUndeclaredIndexes__WEBPACK_IMPORTED_MODULE_2__[\"deleteUndeclaredIndexes\"])({ table, indexList, deployment });\r\n        const indexResults = yield Promise.all(table.indexes.map(index => Object(_GuaranteeIndex__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ index, indexList, table, tableId, deployment })));\r\n        return indexResults;\r\n    });\r\n});\r\n;\r\nfunction getIndexList(table, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .table(table.name)\r\n            .indexList();\r\n        const list = yield query.run(deployment.connection);\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeIndexes.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeTable.ts":
/*!**************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeTable.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeIndexes */ \"./src/App/Modules/Deploy/GuaranteeIndexes.ts\");\n/* harmony import */ var _GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeUsers */ \"./src/App/Modules/Deploy/GuaranteeUsers.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ table, tableList, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const tableId = yield guarantee({ table, tableList, deployment });\r\n        const indexResults = yield Object(_GuaranteeIndexes__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ table, tableId, deployment });\r\n        const result = {\r\n            id: tableId,\r\n            name: table.name,\r\n            indexes: indexResults\r\n        };\r\n        return result;\r\n    });\r\n});\r\n;\r\nfunction guarantee({ table, tableList, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let tableId;\r\n        const tableConfigItem = tableList.find(item => item.name === table.name);\r\n        if (tableConfigItem) {\r\n            log('Exists.', table, deployment);\r\n            tableId = tableConfigItem.id;\r\n        }\r\n        else {\r\n            tableId = yield create({ table, deployment });\r\n        }\r\n        ;\r\n        yield guaranteeUsers({ table, tableId, deployment });\r\n        return tableId;\r\n    });\r\n}\r\n;\r\nfunction create({ table, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        log('Creating...', table, deployment);\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.database.name)\r\n            .tableCreate(table.name, {\r\n            shards: getClusterConfig('shards', table, deployment),\r\n            replicas: getClusterConfig('replicas', table, deployment)\r\n        });\r\n        const result = yield query.run(deployment.connection);\r\n        log('Created.', table, deployment);\r\n        const id = result.config_changes[0].new_val.id;\r\n        return id;\r\n    });\r\n}\r\n;\r\nfunction getClusterConfig(parameter, table, deployment) {\r\n    const value = (parameter in table && table[parameter]) || (parameter in table.database && table.database[parameter]) || deployment.topology[parameter];\r\n    return value;\r\n}\r\n;\r\nfunction guaranteeUsers({ table, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield Promise.all(table.users.map(user => guaranteeUser({ user, table, deployment })));\r\n    });\r\n}\r\n;\r\nfunction guaranteeUser({ user, table, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const permissions = Object(_GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__[\"generatePermissions\"])({ user });\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db(table.name)\r\n            .grant(user.username, permissions);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction log(message, table, deployment) {\r\n    const generated = generateMessage(message, table);\r\n    deployment.log(generated);\r\n}\r\n;\r\nfunction generateMessage(message, table) {\r\n    const generated = '[' + table.database.name + '][' + table.name + '] ' + message;\r\n    return generated;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeTable.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeTables.ts":
/*!***************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeTables.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeTable */ \"./src/App/Modules/Deploy/GuaranteeTable.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n;\r\n;\r\n;\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const tableList = yield getTableList(database, deployment);\r\n        const tableResults = yield Promise.all(database.tables.map(table => Object(_GuaranteeTable__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ table, tableList, deployment })));\r\n        return tableResults;\r\n    });\r\n});\r\n;\r\nfunction getTableList(database, deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n            .db('rethinkdb')\r\n            .table('table_config')\r\n            .filter({ db: database.name })\r\n            .pluck('id', 'name');\r\n        const list = (yield query.run(deployment.connection));\r\n        return list;\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeTables.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/GuaranteeUsers.ts":
/*!**************************************************!*\
  !*** ./src/App/Modules/Deploy/GuaranteeUsers.ts ***!
  \**************************************************/
/*! exports provided: default, generatePermissions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generatePermissions\", function() { return generatePermissions; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nconst { readFile } = fs__WEBPACK_IMPORTED_MODULE_0__[\"promises\"];\r\n\r\n\r\n;\r\n;\r\nconst FILE_PATH = './passwords.json';\r\nconst SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1__[\"object\"]()\r\n    .pattern(/.+/, joi__WEBPACK_IMPORTED_MODULE_1__[\"string\"]())\r\n    .required()\r\n    .label('passwords');\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        validateUserDeclarations({ deployment });\r\n        if (deployment.topology.users.length === 0)\r\n            return;\r\n        const passwords = yield load();\r\n        yield Promise.all(deployment.topology.users.map(user => guaranteeUser({ user, passwords, deployment })));\r\n    });\r\n});\r\n;\r\nfunction validateUserDeclarations({ deployment }) {\r\n    const globalUsersDictionary = generateGlobalUsersDictionary({ deployment });\r\n    for (let database of deployment.topology.databases) {\r\n        for (let user of database.users) {\r\n            if (!globalUsersDictionary.hasOwnProperty(user.username))\r\n                throw new UserUndeclared({ username: user.username });\r\n        }\r\n        ;\r\n        for (let table of database.tables) {\r\n            for (let user of table.users) {\r\n                if (!globalUsersDictionary.hasOwnProperty(user.username))\r\n                    throw new UserUndeclared({ username: user.username });\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction generateGlobalUsersDictionary({ deployment }) {\r\n    const dictionary = {};\r\n    for (let user of deployment.topology.users) {\r\n        const username = typeof user === 'string' ? user : user.username;\r\n        dictionary[username] = true;\r\n    }\r\n    ;\r\n    return dictionary;\r\n}\r\n;\r\nfunction guaranteeUser({ user, passwords, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const username = typeof user === 'string' ? user : user.username;\r\n        const password = passwords[username];\r\n        if (typeof password !== 'string')\r\n            throw new PasswordNotFound({ username });\r\n        yield overwriteUser({ username, password, deployment });\r\n        yield guaranteeUserPermissions({ user, username, deployment });\r\n    });\r\n}\r\n;\r\nfunction guaranteeUserPermissions({ user, username, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const permissions = generatePermissions({ user });\r\n        if (Object.keys(permissions).length === 0)\r\n            return;\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].grant(username, permissions);\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction generatePermissions({ user }) {\r\n    let permissions = {};\r\n    if (typeof user === 'object') {\r\n        for (let permission of Object.keys(user)) {\r\n            if (permission !== 'username')\r\n                permissions[permission] = user[permission];\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n    return permissions;\r\n}\r\n;\r\nfunction overwriteUser({ username, password, deployment }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"]\r\n            .db('rethinkdb')\r\n            .table('users')\r\n            .insert({ id: username, password }, { conflict: 'replace' });\r\n        yield query.run(deployment.connection);\r\n    });\r\n}\r\n;\r\nfunction load() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let source;\r\n        try {\r\n            source = yield readFile(FILE_PATH, 'utf8');\r\n        }\r\n        catch (error) {\r\n            const nodeError = error;\r\n            if (nodeError.code === 'ENOENT')\r\n                throw new PasswordsFileNotFoundError(error);\r\n            else\r\n                throw new PasswordsFileError(error);\r\n        }\r\n        ;\r\n        let passwords;\r\n        try {\r\n            passwords = JSON.parse(source);\r\n        }\r\n        catch (error) {\r\n            throw new PasswordsJsonError(error);\r\n        }\r\n        ;\r\n        const validated = joi__WEBPACK_IMPORTED_MODULE_1__[\"validate\"](passwords, SCHEMA);\r\n        if (validated.error)\r\n            throw new PasswordsSchemaError(validated.error.message);\r\n        return passwords;\r\n    });\r\n}\r\n;\r\nclass PasswordsFileError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass PasswordsFileNotFoundError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass PasswordsJsonError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass PasswordsSchemaError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass PasswordNotFound extends Error {\r\n    constructor({ username }) {\r\n        const message = 'Password not found for \\'' + username + '\\'';\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass UserUndeclared extends Error {\r\n    constructor({ username }) {\r\n        const message = 'User undeclared for \\'' + username + '\\'';\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/GuaranteeUsers.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/Load.ts":
/*!****************************************!*\
  !*** ./src/App/Modules/Deploy/Load.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return load; });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_1__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nconst FILE_PATH = './topology.config.js';\r\nconst ABSOLUTE_FILE_PATH = Object(path__WEBPACK_IMPORTED_MODULE_0__[\"join\"])(process.cwd(), FILE_PATH).replace(/\\\\/g, '\\\\\\\\');\r\nconst ARBITRARY_INDEX_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a.func().optional();\r\nconst NAME_INDEX_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    convert: joi__WEBPACK_IMPORTED_MODULE_1___default.a.valid(Number).optional(),\r\n    arbitrary: ARBITRARY_INDEX_SCHEMA\r\n})\r\n    .without('convert', ['arbitrary']);\r\nconst INDEXES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .array()\r\n    .items(joi__WEBPACK_IMPORTED_MODULE_1___default.a.string(), NAME_INDEX_SCHEMA, {\r\n    compound: joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n        .array()\r\n        .items(joi__WEBPACK_IMPORTED_MODULE_1___default.a.string(), NAME_INDEX_SCHEMA)\r\n        .min(1)\r\n        .optional()\r\n})\r\n    .default([]);\r\nconst SHARDS_LIMIT = 64;\r\nconst SHARDS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().greater(0).less(SHARDS_LIMIT - 1);\r\nconst REPLICAS_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a.number().integer().greater(0);\r\nconst TABLE_USER_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .object({\r\n    username: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    config: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    read: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    write: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional()\r\n});\r\nconst TABLES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .array()\r\n    .items({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    shards: SHARDS_SCHEMA.optional(),\r\n    replicas: REPLICAS_SCHEMA.optional(),\r\n    users: joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(TABLE_USER_SCHEMA).default([]),\r\n    indexes: INDEXES_SCHEMA\r\n})\r\n    .min(1)\r\n    .required();\r\nconst DATABASE_USER_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .object({\r\n    username: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    config: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    read: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    write: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional()\r\n});\r\nconst DATABASES_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .array()\r\n    .items({\r\n    name: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    shards: SHARDS_SCHEMA.optional(),\r\n    replicas: REPLICAS_SCHEMA.optional(),\r\n    users: joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(DATABASE_USER_SCHEMA).default([]),\r\n    tables: TABLES_SCHEMA\r\n});\r\nconst GLOBAL_USER_SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a\r\n    .object({\r\n    username: joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required(),\r\n    config: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    connect: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    read: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional(),\r\n    write: joi__WEBPACK_IMPORTED_MODULE_1___default.a.boolean().optional()\r\n});\r\nconst SCHEMA = joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({\r\n    shards: SHARDS_SCHEMA.default(1),\r\n    replicas: REPLICAS_SCHEMA.default(1),\r\n    users: joi__WEBPACK_IMPORTED_MODULE_1___default.a.array().items(joi__WEBPACK_IMPORTED_MODULE_1___default.a.string(), GLOBAL_USER_SCHEMA).default([]),\r\n    databases: DATABASES_SCHEMA\r\n})\r\n    .required();\r\nfunction load() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let topology;\r\n        try {\r\n            topology = eval('require(\\'' + ABSOLUTE_FILE_PATH + '\\')');\r\n        }\r\n        catch (error) {\r\n            throw new TopologyFileError(error);\r\n        }\r\n        ;\r\n        const validated = joi__WEBPACK_IMPORTED_MODULE_1___default.a.validate(topology, SCHEMA);\r\n        if (validated.error)\r\n            throw new TopologySchemaError(validated.error.message);\r\n        topology = validated.value;\r\n        for (let database of topology.databases) {\r\n            for (let table of database.tables) {\r\n                table.database = database;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        return topology;\r\n    });\r\n}\r\n;\r\nclass TopologyFileError extends Error {\r\n    constructor(error) {\r\n        super(error.message);\r\n    }\r\n    ;\r\n}\r\n;\r\nclass TopologySchemaError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/Load.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/Names.ts":
/*!*****************************************!*\
  !*** ./src/App/Modules/Deploy/Names.ts ***!
  \*****************************************/
/*! exports provided: outputNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"outputNames\", function() { return outputNames; });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var js_beautify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-beautify */ \"js-beautify\");\n/* harmony import */ var js_beautify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_beautify__WEBPACK_IMPORTED_MODULE_1__);\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nconst { writeFile } = fs__WEBPACK_IMPORTED_MODULE_0__[\"promises\"];\r\n\r\n;\r\n;\r\n;\r\n;\r\n;\r\nconst FILE_PATH = './topology.names.json';\r\nconst BEAUTIFY_OPTIONS = {\r\n    brace_style: 'expand',\r\n    indent_with_tabs: true\r\n};\r\nfunction outputNames({ databaseResults }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const databaseNames = {};\r\n        for (let databaseResult of databaseResults) {\r\n            const tableNames = {};\r\n            for (let tableResult of databaseResult.tables) {\r\n                const indexNames = {};\r\n                for (let indexResult of tableResult.indexes) {\r\n                    indexNames[indexResult.name] = indexResult.name;\r\n                }\r\n                ;\r\n                tableNames[tableResult.name] =\r\n                    {\r\n                        name: tableResult.name,\r\n                        indexes: indexNames\r\n                    };\r\n            }\r\n            ;\r\n            databaseNames[databaseResult.name] =\r\n                {\r\n                    name: databaseResult.name,\r\n                    tables: tableNames\r\n                };\r\n        }\r\n        ;\r\n        const sourceUnformatted = JSON.stringify(databaseNames);\r\n        const source = Object(js_beautify__WEBPACK_IMPORTED_MODULE_1__[\"js\"])(sourceUnformatted, BEAUTIFY_OPTIONS);\r\n        yield writeFile(FILE_PATH, source);\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/Names.ts?");

/***/ }),

/***/ "./src/App/Modules/Deploy/index.ts":
/*!*****************************************!*\
  !*** ./src/App/Modules/Deploy/index.ts ***!
  \*****************************************/
/*! exports provided: default, deploy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deploy\", function() { return deploy; });\n/* harmony import */ var _Load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Load */ \"./src/App/Modules/Deploy/Load.ts\");\n/* harmony import */ var _Deployment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Deployment */ \"./src/App/Modules/Deploy/Deployment.ts\");\n/* harmony import */ var _GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GuaranteeUsers */ \"./src/App/Modules/Deploy/GuaranteeUsers.ts\");\n/* harmony import */ var _GuaranteeDatabases__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GuaranteeDatabases */ \"./src/App/Modules/Deploy/GuaranteeDatabases.ts\");\n/* harmony import */ var _Names__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Names */ \"./src/App/Modules/Deploy/Names.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (options) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const topology = yield Object(_Load__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n        const deployment = new _Deployment__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ topology, options });\r\n        yield deployment.initialise();\r\n        try {\r\n            yield deploy(deployment);\r\n        }\r\n        catch (error) {\r\n            throw error;\r\n        }\r\n        finally {\r\n            yield deployment.finish();\r\n        }\r\n        ;\r\n    });\r\n});\r\n;\r\nfunction deploy(deployment) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        yield Object(_GuaranteeUsers__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({ deployment });\r\n        const databaseResults = yield Object(_GuaranteeDatabases__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(deployment);\r\n        yield Object(_Names__WEBPACK_IMPORTED_MODULE_4__[\"outputNames\"])({ databaseResults });\r\n    });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/App/Modules/Deploy/index.ts?");

/***/ }),

/***/ "./src/CLI/index.ts":
/*!**************************!*\
  !*** ./src/CLI/index.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_App_Modules_Deploy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/App/Modules/Deploy */ \"./src/App/Modules/Deploy/index.ts\");\n\r\n\r\nObject(src_App_Modules_Deploy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({ rethink: './config.json', log: true });\r\n\n\n//# sourceURL=webpack:///./src/CLI/index.ts?");

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

/***/ "js-beautify":
/*!******************************!*\
  !*** external "js-beautify" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-beautify\");\n\n//# sourceURL=webpack:///external_%22js-beautify%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

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