(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dlxlib"] = factory();
	else
		root["dlxlib"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/columnObject.js":
/*!*****************************!*\
  !*** ./src/columnObject.js ***!
  \*****************************/
/*! exports provided: ColumnObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColumnObject\", function() { return ColumnObject; });\n/* harmony import */ var _dataObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataObject */ \"./src/dataObject.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\nvar ColumnObject =\n/*#__PURE__*/\nfunction (_DataObject) {\n  _inherits(ColumnObject, _DataObject);\n\n  function ColumnObject() {\n    var _this;\n\n    _classCallCheck(this, ColumnObject);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColumnObject).call(this, null, -1));\n    _this.previousColumnObject = _assertThisInitialized(_this);\n    _this.nextColumnObject = _assertThisInitialized(_this);\n    _this.numberOfRows = 0;\n    return _this;\n  }\n\n  _createClass(ColumnObject, [{\n    key: \"appendColumnHeader\",\n    value: function appendColumnHeader(columnObject) {\n      this.previousColumnObject.nextColumnObject = columnObject;\n      columnObject.nextColumnObject = this;\n      columnObject.previousColumnObject = this.previousColumnObject;\n      this.previousColumnObject = columnObject;\n    }\n  }, {\n    key: \"unlinkColumnHeader\",\n    value: function unlinkColumnHeader() {\n      this.nextColumnObject.previousColumnObject = this.previousColumnObject;\n      this.previousColumnObject.nextColumnObject = this.nextColumnObject;\n    }\n  }, {\n    key: \"relinkColumnHeader\",\n    value: function relinkColumnHeader() {\n      this.nextColumnObject.previousColumnObject = this;\n      this.previousColumnObject.nextColumnObject = this;\n    }\n  }, {\n    key: \"addDataObject\",\n    value: function addDataObject(dataObject) {\n      this.appendToColumn(dataObject);\n      this.numberOfRows++;\n    }\n  }, {\n    key: \"unlinkDataObject\",\n    value: function unlinkDataObject(dataObject) {\n      dataObject.unlinkFromColumn();\n      this.numberOfRows--;\n    }\n  }, {\n    key: \"relinkDataObject\",\n    value: function relinkDataObject(dataObject) {\n      dataObject.relinkIntoColumn();\n      this.numberOfRows++;\n    }\n  }, {\n    key: \"loopNext\",\n    value: function loopNext(fn) {\n      for (var next = this.nextColumnObject; next !== this; next = next.nextColumnObject) {\n        fn(next);\n      }\n    }\n  }]);\n\n  return ColumnObject;\n}(_dataObject__WEBPACK_IMPORTED_MODULE_0__[\"DataObject\"]);\n\n//# sourceURL=webpack://dlxlib/./src/columnObject.js?");

/***/ }),

/***/ "./src/dataObject.js":
/*!***************************!*\
  !*** ./src/dataObject.js ***!
  \***************************/
/*! exports provided: DataObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataObject\", function() { return DataObject; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar DataObject =\n/*#__PURE__*/\nfunction () {\n  function DataObject(listHeader, rowIndex) {\n    _classCallCheck(this, DataObject);\n\n    this.listHeader = listHeader;\n    this.rowIndex = rowIndex;\n    this.up = this;\n    this.down = this;\n    this.left = this;\n    this.right = this;\n\n    if (listHeader) {\n      listHeader.addDataObject(this);\n    }\n  }\n\n  _createClass(DataObject, [{\n    key: \"appendToRow\",\n    value: function appendToRow(dataObject) {\n      this.left.right = dataObject;\n      dataObject.right = this;\n      dataObject.left = this.left;\n      this.left = dataObject;\n    }\n  }, {\n    key: \"appendToColumn\",\n    value: function appendToColumn(dataObject) {\n      this.up.down = dataObject;\n      dataObject.down = this;\n      dataObject.up = this.up;\n      this.up = dataObject;\n    }\n  }, {\n    key: \"unlinkFromColumn\",\n    value: function unlinkFromColumn() {\n      this.down.up = this.up;\n      this.up.down = this.down;\n    }\n  }, {\n    key: \"relinkIntoColumn\",\n    value: function relinkIntoColumn() {\n      this.down.up = this;\n      this.up.down = this;\n    }\n  }, {\n    key: \"loopUp\",\n    value: function loopUp(fn) {\n      this.loop(fn, 'up');\n    }\n  }, {\n    key: \"loopDown\",\n    value: function loopDown(fn) {\n      this.loop(fn, 'down');\n    }\n  }, {\n    key: \"loopLeft\",\n    value: function loopLeft(fn) {\n      this.loop(fn, 'left');\n    }\n  }, {\n    key: \"loopRight\",\n    value: function loopRight(fn) {\n      this.loop(fn, 'right');\n    }\n  }, {\n    key: \"loop\",\n    value: function loop(fn, propName) {\n      for (var next = this[propName]; next !== this; next = next[propName]) {\n        fn(next);\n      }\n    }\n  }]);\n\n  return DataObject;\n}();\n\n//# sourceURL=webpack://dlxlib/./src/dataObject.js?");

/***/ }),

/***/ "./src/dlx.js":
/*!********************!*\
  !*** ./src/dlx.js ***!
  \********************/
/*! exports provided: solve, solutionGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solve\", function() { return solve; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solutionGenerator\", function() { return solutionGenerator; });\n/* harmony import */ var _dataObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataObject */ \"./src/dataObject.js\");\n/* harmony import */ var _columnObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./columnObject */ \"./src/columnObject.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _marked =\n/*#__PURE__*/\nregeneratorRuntime.mark(search);\n\n\n\n/**\n * @typedef {number[]} PartialSolution The indices of the matrix rows that comprise a partial solution.\n */\n\n/**\n * @typedef {number[]} Solution The indices of the matrix rows that comprise a complete solution.\n */\n\n/**\n * This callback is invoked for each step of the algorithm.\n * @callback searchStepCallback\n * @param {PartialSolution} partialSolution The partial solution that represents this step of the algorithm.\n */\n\n/**\n * This callback is invoked for each solution found.\n * @callback solutionFoundCallback\n * @param {Solution} solution A complete solution to the matrix being solved.\n */\n\n/**\n * @typedef {*} MatrixValue Matrix values can be of any time. Anything truthy is treated as a 1. Anything falsy is treated as a 0.\n */\n\n/**\n * @typedef {MatrixValue[]} MatrixRow A matrix row is an array of {MatrixValue}.\n */\n\n/**\n * @typedef {MatrixRow[]} Matrix A matrix is an array of {MatrixRow}.\n */\n\n/**\n * Solves the matrix and returns an array of solutions.\n * @param {Matrix} matrix The matrix to be solved.\n * @param {searchStepCallback} [onSearchStep] A callback to be invoked for each step of the algorithm.\n * @param {solutionFoundCallback} [onSolutionFound] A callback to be invoked for each solution found.\n * @param {number} [n] The number of solutions to be returned. By default, all solutions are returned.\n * @returns {Solution[]} The solutions that were found.\n */\n\nvar solve = function solve(matrix, onSearchStep, onSolutionFound, n, numPrimaryColumns) {\n  var generator = solutionGenerator(matrix, onSearchStep, onSolutionFound, numPrimaryColumns);\n  var max = n || Number.MAX_VALUE;\n  var solutions = [];\n\n  for (var i = 0; i < max; i++) {\n    var iteratorResult = generator.next();\n    if (iteratorResult.done) break;\n    solutions.push(iteratorResult.value);\n  }\n\n  return solutions;\n};\n/**\n * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.\n * @param {Matrix} matrix The matrix to be solved.\n * @param {searchStepCallback} [onSearchStep] A callback to be invoked for each step of the algorithm.\n * @param {solutionFoundCallback} [onSolutionFound] A callback to be invoked for each solution found.\n * @returns {IterableIterator.<number>} An ES2015 Generator object that can be used to iterate over the solutions.\n */\n\nvar solutionGenerator =\n/*#__PURE__*/\nregeneratorRuntime.mark(function solutionGenerator(matrix, onSearchStep, onSolutionFound, numPrimaryColumns) {\n  var root, searchState;\n  return regeneratorRuntime.wrap(function solutionGenerator$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          root = buildInternalStructure(matrix, numPrimaryColumns);\n          searchState = new SearchState(root, onSearchStep, onSolutionFound);\n          return _context.delegateYield(search(searchState), \"t0\", 3);\n\n        case 3:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, solutionGenerator);\n});\n\nvar buildInternalStructure = function buildInternalStructure(matrix, numPrimaryColumns) {\n  numPrimaryColumns = numPrimaryColumns || (matrix[0] ? matrix[0].length : 0);\n  var root = new _columnObject__WEBPACK_IMPORTED_MODULE_1__[\"ColumnObject\"]();\n  var colIndexToListHeader = new Map();\n  matrix.forEach(function (row, rowIndex) {\n    var firstDataObjectInThisRow = null;\n    row.forEach(function (col, colIndex) {\n      if (rowIndex === 0) {\n        var listHeader = new _columnObject__WEBPACK_IMPORTED_MODULE_1__[\"ColumnObject\"]();\n\n        if (colIndex < numPrimaryColumns) {\n          root.appendColumnHeader(listHeader);\n        }\n\n        colIndexToListHeader.set(colIndex, listHeader);\n      }\n\n      if (col) {\n        var _listHeader = colIndexToListHeader.get(colIndex);\n\n        var dataObject = new _dataObject__WEBPACK_IMPORTED_MODULE_0__[\"DataObject\"](_listHeader, rowIndex);\n        if (firstDataObjectInThisRow) firstDataObjectInThisRow.appendToRow(dataObject);else firstDataObjectInThisRow = dataObject;\n      }\n    });\n  });\n  return root;\n};\n\nfunction search(searchState) {\n  var c, r;\n  return regeneratorRuntime.wrap(function search$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          searchState.searchStep();\n\n          if (!searchState.isEmpty()) {\n            _context2.next = 7;\n            break;\n          }\n\n          if (!searchState.currentSolution.length) {\n            _context2.next = 6;\n            break;\n          }\n\n          searchState.solutionFound();\n          _context2.next = 6;\n          return searchState.currentSolution.slice().sort();\n\n        case 6:\n          return _context2.abrupt(\"return\");\n\n        case 7:\n          c = chooseColumnWithFewestRows(searchState);\n          coverColumn(c);\n          r = c.down;\n\n        case 10:\n          if (!(r !== c)) {\n            _context2.next = 19;\n            break;\n          }\n\n          searchState.pushRowIndex(r.rowIndex);\n          r.loopRight(function (j) {\n            return coverColumn(j.listHeader);\n          });\n          return _context2.delegateYield(search(searchState), \"t0\", 14);\n\n        case 14:\n          r.loopLeft(function (j) {\n            return uncoverColumn(j.listHeader);\n          });\n          searchState.popRowIndex();\n\n        case 16:\n          r = r.down;\n          _context2.next = 10;\n          break;\n\n        case 19:\n          uncoverColumn(c);\n\n        case 20:\n        case \"end\":\n          return _context2.stop();\n      }\n    }\n  }, _marked);\n}\n\nvar chooseColumnWithFewestRows = function chooseColumnWithFewestRows(searchState) {\n  var chosenColumn = null;\n  searchState.root.loopNext(function (column) {\n    if (!chosenColumn || column.numberOfRows < chosenColumn.numberOfRows) {\n      chosenColumn = column;\n    }\n  });\n  return chosenColumn;\n};\n\nvar coverColumn = function coverColumn(c) {\n  c.unlinkColumnHeader();\n  c.loopDown(function (i) {\n    return i.loopRight(function (j) {\n      return j.listHeader.unlinkDataObject(j);\n    });\n  });\n};\n\nvar uncoverColumn = function uncoverColumn(c) {\n  c.loopUp(function (i) {\n    return i.loopLeft(function (j) {\n      return j.listHeader.relinkDataObject(j);\n    });\n  });\n  c.relinkColumnHeader();\n};\n\nvar SearchState =\n/*#__PURE__*/\nfunction () {\n  function SearchState(root, onSearchStep, onSolutionFound) {\n    _classCallCheck(this, SearchState);\n\n    this.root = root;\n    this.onSearchStep = onSearchStep;\n    this.onSolutionFound = onSolutionFound;\n    this.currentSolution = [];\n  }\n\n  _createClass(SearchState, [{\n    key: \"isEmpty\",\n    value: function isEmpty() {\n      return this.root.nextColumnObject === this.root;\n    }\n  }, {\n    key: \"pushRowIndex\",\n    value: function pushRowIndex(rowIndex) {\n      this.currentSolution.push(rowIndex);\n    }\n  }, {\n    key: \"popRowIndex\",\n    value: function popRowIndex() {\n      this.currentSolution.pop();\n    }\n  }, {\n    key: \"searchStep\",\n    value: function searchStep() {\n      if (this.onSearchStep) {\n        this.onSearchStep(this.currentSolution);\n      }\n    }\n  }, {\n    key: \"solutionFound\",\n    value: function solutionFound() {\n      if (this.onSolutionFound) {\n        this.onSolutionFound(this.currentSolution);\n      }\n    }\n  }]);\n\n  return SearchState;\n}();\n\n//# sourceURL=webpack://dlxlib/./src/dlx.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: solve, solutionGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dlx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dlx */ \"./src/dlx.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"solve\", function() { return _dlx__WEBPACK_IMPORTED_MODULE_0__[\"solve\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"solutionGenerator\", function() { return _dlx__WEBPACK_IMPORTED_MODULE_0__[\"solutionGenerator\"]; });\n\n\n\n//# sourceURL=webpack://dlxlib/./src/index.js?");

/***/ })

/******/ });
});