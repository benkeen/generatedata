/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/config.client.js":
/*!********************************!*\
  !*** ./build/config.client.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  \"isInDemoMode\": false,\n  \"encryptionSalt\": \"\",\n  \"errorReporting\": \"\",\n  \"maxGeneratedRows\": 100000,\n  \"defaultNumRows\": 100,\n  \"maxDemoModeRows\": 100,\n  \"maxDataSetHistorySize\": 200,\n  \"defaultLocale\": \"en\",\n  \"defaultExportType\": \"HTML\",\n  \"defaultCountryPlugins\": [],\n  \"useMinifiedResources\": false,\n  \"pluginSettings\": {},\n  \"timeout\": 300,\n  \"apiEnabled\": false,\n  \"dataTypeGroups\": [\"human_data\", \"geo\", \"credit_card_data\", \"text\", \"numeric\", \"math\", \"other\"],\n  \"continents\": [\"africa\", \"asia\", \"central_america\", \"europe\", \"north_america\", \"oceania\", \"south_america\"],\n  \"locales\": [\"en\", \"fr\", \"de\", \"es\", \"ja\", \"nl\", \"ta\"],\n  \"tabs\": [{\n    \"id\": \"generate\",\n    \"label\": \"Generate\",\n    \"file\": \"...\"\n  }, {\n    \"id\": \"about\",\n    \"label\": \"About\",\n    \"file\": \"...\"\n  }, {\n    \"id\": \"accounts\",\n    \"label\": \"Accounts\",\n    \"requiresAuth\": true\n  }, {\n    \"id\": \"settings\",\n    \"label\": \"Settings\",\n    \"requiresAuth\": true\n  }]\n});\n\n//# sourceURL=webpack:///./build/config.client.js?");

/***/ }),

/***/ "./build/dataTypes.js":
/*!****************************!*\
  !*** ./build/dataTypes.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  \"name\": \"Boolean\",\n  \"fieldGroup\": \"numeric\",\n  \"fieldGroupOrder\": 11\n}, {\n  \"name\": \"CVV\",\n  \"fieldGroup\": \"credit_card_data\",\n  \"fieldGroupOrder\": 30\n}, {\n  \"name\": \"City\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 20\n}, {\n  \"name\": \"Company\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 50\n}, {\n  \"name\": \"Composite\",\n  \"fieldGroup\": \"other\",\n  \"fieldGroupOrder\": 20\n}, {\n  \"name\": \"Computed\",\n  \"fieldGroup\": \"other\",\n  \"fieldGroupOrder\": 60\n}, {\n  \"name\": \"Constant\",\n  \"fieldGroup\": \"other\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"Country\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 50\n}, {\n  \"name\": \"CreditCard\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 110\n}, {\n  \"name\": \"Currency\",\n  \"fieldGroup\": \"numeric\",\n  \"fieldGroupOrder\": 60\n}, {\n  \"name\": \"Date\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 40\n}, {\n  \"name\": \"Email\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 30\n}, {\n  \"name\": \"Email\",\n  \"fieldGroup\": \"numeric\",\n  \"fieldGroupOrder\": 50\n}, {\n  \"name\": \"IBAN\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 100\n}, {\n  \"name\": \"Latitude / Longitude\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 100\n}, {\n  \"name\": \"Custom List\",\n  \"fieldGroup\": \"other\",\n  \"fieldGroupOrder\": 40\n}, {\n  \"name\": \"Names\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"Names, Regional\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 15\n}, {\n  \"name\": \"Standard Normal Distribution\",\n  \"fieldGroup\": \"math\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"Number Range\",\n  \"fieldGroup\": \"numeric\",\n  \"fieldGroupOrder\": 30\n}, {\n  \"name\": \"Organization Number\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 111\n}, {\n  \"name\": \"PAN\",\n  \"fieldGroup\": \"credit_card_data\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"PIN\",\n  \"fieldGroup\": \"credit_card_data\",\n  \"fieldGroupOrder\": 20\n}, {\n  \"name\": \"Personal Number\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 110\n}, {\n  \"name\": \"Phone / Fax\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 20\n}, {\n  \"name\": \"Phone / Fax, Regional\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 25\n}, {\n  \"name\": \"Postal / Zip\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 30\n}, {\n  \"name\": \"Region\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 40\n}, {\n  \"name\": \"Rut\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 105\n}, {\n  \"name\": \"SIRET\",\n  \"fieldGroup\": \"human_data\",\n  \"fieldGroupOrder\": 100\n}, {\n  \"name\": \"Street Address\",\n  \"fieldGroup\": \"geo\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"Fixed Number of Words\",\n  \"fieldGroup\": \"text\",\n  \"fieldGroupOrder\": 10\n}, {\n  \"name\": \"Random Number of Words\",\n  \"fieldGroup\": \"text\",\n  \"fieldGroupOrder\": 20\n}, {\n  \"name\": \"Track 1\",\n  \"fieldGroup\": \"credit_card_data\",\n  \"fieldGroupOrder\": 40\n}, {\n  \"name\": \"Track 2\",\n  \"fieldGroup\": \"credit_card_data\",\n  \"fieldGroupOrder\": 50\n}, {\n  \"name\": \"Tree\",\n  \"fieldGroup\": \"other\",\n  \"fieldGroupOrder\": 30\n}]);\n\n//# sourceURL=webpack:///./build/dataTypes.js?");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/footer/Footer.scss":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2!./src/components/footer/Footer.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")();\n// imports\n\n\n// module\nexports.push([module.i, \".qVZA61XXF3uqci5AByaFE {\\n  flex: 0 0 60px;\\n  border-top: 1px solid #cccccc; }\\n  .qVZA61XXF3uqci5AByaFE ul {\\n    display: flex;\\n    flex-direction: row;\\n    list-style: none; }\\n\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"footer\": \"qVZA61XXF3uqci5AByaFE\"\n};\n\n//# sourceURL=webpack:///./src/components/footer/Footer.scss?./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/grid/Grid.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2!./src/components/grid/Grid.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")();\n// imports\n\n\n// module\nexports.push([module.i, \"._3DoNke2T4wM1FlQT6MXrza {\\n  display: flex;\\n  flex-direction: row;\\n  min-height: 35px;\\n  align-items: center;\\n  border-radius: 4px;\\n  transition: background-color 0.1s ease-in-out; }\\n  ._3DoNke2T4wM1FlQT6MXrza > div {\\n    margin-right: 4px; }\\n  ._3DoNke2T4wM1FlQT6MXrza:hover {\\n    background-color: #ebf6fa; }\\n\\n._2jWJESpquRpdUxdfxpJgkw {\\n  flex: 0 0 22px;\\n  padding-left: 2px; }\\n\\n._1qA5Np3CFKS8s4ZCtC3OHU {\\n  flex: 0 0 150px; }\\n  ._1qA5Np3CFKS8s4ZCtC3OHU input {\\n    width: 100%; }\\n\\n._1Q510WpSbV05VM-ov_uz3p {\\n  flex: 0 0 200px; }\\n\\n._3zv3J6G-c9whmSjisqfi-N {\\n  flex: 1 0 80px; }\\n\\n._3bm-eDKfqhSHWT9-6JXvV {\\n  flex: 1; }\\n\\n.CROSz1auCxl0QC2Awqh0N {\\n  flex: 0 0 30px; }\\n\\n._1TQlTiLt0OwYFZhyIDo_Zh {\\n  flex: 0 0 30px;\\n  cursor: pointer;\\n  display: flex;\\n  justify-content: center; }\\n  ._1TQlTiLt0OwYFZhyIDo_Zh svg {\\n    fill: #111111; }\\n  ._1TQlTiLt0OwYFZhyIDo_Zh:hover svg {\\n    fill: #99091A; }\\n\\n._3pr_Q-5lQKe8Qi7xv-k1iC {\\n  margin-bottom: 10px; }\\n\\n._3-0AsBcgCoXXfE1t0qTxlI span, ._3-0AsBcgCoXXfE1t0qTxlI input {\\n  margin-right: 6px; }\\n\\n._3-0AsBcgCoXXfE1t0qTxlI input {\\n  width: 42px; }\\n\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"gridRow\": \"_3DoNke2T4wM1FlQT6MXrza\",\n\t\"orderCol\": \"_2jWJESpquRpdUxdfxpJgkw\",\n\t\"titleCol\": \"_1qA5Np3CFKS8s4ZCtC3OHU\",\n\t\"dataTypeCol\": \"_1Q510WpSbV05VM-ov_uz3p\",\n\t\"examplesCol\": \"_3zv3J6G-c9whmSjisqfi-N\",\n\t\"optionsCol\": \"_3bm-eDKfqhSHWT9-6JXvV\",\n\t\"helpCol\": \"CROSz1auCxl0QC2Awqh0N\",\n\t\"deleteCol\": \"_1TQlTiLt0OwYFZhyIDo_Zh\",\n\t\"grid\": \"_3pr_Q-5lQKe8Qi7xv-k1iC\",\n\t\"addRows\": \"_3-0AsBcgCoXXfE1t0qTxlI\"\n};\n\n//# sourceURL=webpack:///./src/components/grid/Grid.scss?./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/header/Header.scss":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2!./src/components/header/Header.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")();\n// imports\n\n\n// module\nexports.push([module.i, \".dTlA8tvf1zsGQcCVdfnoO {\\n  border-bottom: 1px solid #cccccc; }\\n  .dTlA8tvf1zsGQcCVdfnoO > div {\\n    width: 950px;\\n    margin: 0 auto;\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center; }\\n  .dTlA8tvf1zsGQcCVdfnoO h1 {\\n    display: inline-block;\\n    flex: 1; }\\n  .dTlA8tvf1zsGQcCVdfnoO section {\\n    float: right; }\\n  .dTlA8tvf1zsGQcCVdfnoO nav {\\n    flex: 0 0 auto; }\\n    .dTlA8tvf1zsGQcCVdfnoO nav ul {\\n      display: inline-block;\\n      list-style: none; }\\n\\n._2It3IAgZ5TOYH1qHdS-GOk {\\n  width: 130px;\\n  display: inline-block; }\\n\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"header\": \"dTlA8tvf1zsGQcCVdfnoO\",\n\t\"selectLocale\": \"_2It3IAgZ5TOYH1qHdS-GOk\"\n};\n\n//# sourceURL=webpack:///./src/components/header/Header.scss?./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/page/Page.scss":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2!./src/components/page/Page.scss ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")();\n// imports\n\n\n// module\nexports.push([module.i, \"html, body {\\n  height: 100%;\\n  padding: 0;\\n  margin: 0;\\n  font-family: 'Alegreya', serif;\\n  font-size: 13px; }\\n\\n* {\\n  box-sizing: border-box; }\\n\\n#root {\\n  height: 100%; }\\n\\n._2SzGh0Y_qepohdIF5FX5RJ {\\n  height: 100%;\\n  display: flex;\\n  flex-direction: column; }\\n  ._2SzGh0Y_qepohdIF5FX5RJ > div {\\n    height: 100%; }\\n\\n._3WM6Js9h3AQV6-2KVE_slE {\\n  flex: 1;\\n  width: 950px;\\n  margin: auto;\\n  padding: 15px;\\n  overflow: scroll; }\\n\\ninput {\\n  border-radius: 4px;\\n  border: 1px solid #cccccc;\\n  padding: 7px 6px 8px;\\n  outline: none; }\\n  input:focus {\\n    border: 1px solid #2684ff; }\\n\", \"\"]);\n\n// exports\nexports.locals = {\n\t\"page\": \"_2SzGh0Y_qepohdIF5FX5RJ\",\n\t\"content\": \"_3WM6Js9h3AQV6-2KVE_slE\"\n};\n\n//# sourceURL=webpack:///./src/components/page/Page.scss?./node_modules/css-loader??ref--5-1!./node_modules/sass-loader/dist/cjs.js??ref--5-2");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _core_init_init_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/init/init.reducer */ \"./src/core/init/init.reducer.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _components_page_Page_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/page/Page.container */ \"./src/components/page/Page.container.js\");\n/* harmony import */ var _components_grid_Grid_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/grid/Grid.container */ \"./src/components/grid/Grid.container.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core */ \"./src/core/index.js\");\n\n\n // tmp. We need at least 1 reducer registered prior to the store instantiation\n\n\n\n\n\n\n_core__WEBPACK_IMPORTED_MODULE_7__[\"init\"]();\n\nvar App = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"Provider\"], {\n  store: _store__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_page_Page_container__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n  path: \"/about\"\n}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"About\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n  path: \"/users\"\n}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Users\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n  path: \"/\"\n}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_grid_Grid_container__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null))))));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/components/dropdown/Dropdown.js":
/*!*********************************************!*\
  !*** ./src/components/dropdown/Dropdown.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ \"./node_modules/react-select/dist/react-select.browser.esm.js\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar selectStyles = {\n  control: provided => _objectSpread({}, provided, {\n    minHeight: 20\n  }),\n  indicatorsContainer: provided => _objectSpread({}, provided, {\n    height: 28\n  }),\n  indicatorContainer: provided => _objectSpread({}, provided, {\n    padding: 5\n  })\n};\n\nvar Dropdown = props => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _extends({}, props, {\n  styles: selectStyles\n}));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dropdown);\n\n//# sourceURL=webpack:///./src/components/dropdown/Dropdown.js?");

/***/ }),

/***/ "./src/components/footer/Footer.component.js":
/*!***************************************************!*\
  !*** ./src/components/footer/Footer.component.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.scss */ \"./src/components/footer/Footer.scss\");\n/* harmony import */ var _Footer_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Footer_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Footer = () => {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"footer\", {\n    className: _Footer_scss__WEBPACK_IMPORTED_MODULE_1___default.a.footer\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null, \"4.0.0\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null)));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Footer);\n\n//# sourceURL=webpack:///./src/components/footer/Footer.component.js?");

/***/ }),

/***/ "./src/components/footer/Footer.scss":
/*!*******************************************!*\
  !*** ./src/components/footer/Footer.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--5-1!../../../node_modules/sass-loader/dist/cjs.js??ref--5-2!./Footer.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/footer/Footer.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/footer/Footer.scss?");

/***/ }),

/***/ "./src/components/grid/Grid.container.js":
/*!***********************************************!*\
  !*** ./src/components/grid/Grid.container.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _core_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/generator */ \"./src/core/generator/index.js\");\n/* harmony import */ var _grid_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./grid.component */ \"./src/components/grid/grid.component.js\");\n\n\n\n\n\nvar mapStateToProps = state => ({\n  rows: _core_generator__WEBPACK_IMPORTED_MODULE_2__[\"selectors\"].getSortedRowsArray(state)\n});\n\nvar mapDispatchToProps = dispatch => ({\n  onAddRows: numRows => dispatch(_core_generator__WEBPACK_IMPORTED_MODULE_2__[\"actions\"].addRows(numRows)),\n  onRemove: id => dispatch(_core_generator__WEBPACK_IMPORTED_MODULE_2__[\"actions\"].removeRow(id)),\n  onChangeExample: (row, data) => {},\n  onChangeOptions: (row, data) => {}\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(_grid_component__WEBPACK_IMPORTED_MODULE_3__[\"default\"]));\n\n//# sourceURL=webpack:///./src/components/grid/Grid.container.js?");

/***/ }),

/***/ "./src/components/grid/Grid.scss":
/*!***************************************!*\
  !*** ./src/components/grid/Grid.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--5-1!../../../node_modules/sass-loader/dist/cjs.js??ref--5-2!./Grid.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/grid/Grid.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/grid/Grid.scss?");

/***/ }),

/***/ "./src/components/grid/grid.component.js":
/*!***********************************************!*\
  !*** ./src/components/grid/grid.component.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_icons_HighlightOff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/icons/HighlightOff */ \"./node_modules/@material-ui/icons/HighlightOff.js\");\n/* harmony import */ var _material_ui_icons_HighlightOff__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_HighlightOff__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Grid_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Grid.scss */ \"./src/components/grid/Grid.scss\");\n/* harmony import */ var _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Grid_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dropdown/Dropdown */ \"./src/components/dropdown/Dropdown.js\");\n/* harmony import */ var _utils_dataTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/dataTypes */ \"./src/utils/dataTypes.js\");\n\n\n\n\n\n\nvar Grid = (_ref) => {\n  var {\n    rows,\n    onRemove,\n    onAddRows\n  } = _ref;\n  var [numRows, setNumRows] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(1); // memoize\n\n  var dataTypes = Object(_utils_dataTypes__WEBPACK_IMPORTED_MODULE_4__[\"getSortedGroupedDataTypes\"])();\n\n  var getRows = rows => {\n    return rows.map((row, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.gridRow,\n      key: row.id\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.orderCol\n    }, index + 1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.titleCol\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      type: \"text\"\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.dataTypeCol\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      options: dataTypes\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.examplesCol\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.optionsCol\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.helpCol\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.deleteCol,\n      onClick: () => onRemove(row.id)\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_HighlightOff__WEBPACK_IMPORTED_MODULE_1___default.a, null))));\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.grid\n  }, getRows(rows)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Grid_scss__WEBPACK_IMPORTED_MODULE_2___default.a.addRows\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    onSubmit: e => e.preventDefault()\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"Add\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"number\",\n    value: numRows,\n    onChange: e => setNumRows(parseInt(e.target.value, 10)),\n    min: 1,\n    max: 1000,\n    step: 1\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: () => onAddRows(numRows)\n  }, \"Row(s)\"))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./src/components/grid/grid.component.js?");

/***/ }),

/***/ "./src/components/header/Header.component.js":
/*!***************************************************!*\
  !*** ./src/components/header/Header.component.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dropdown/Dropdown */ \"./src/components/dropdown/Dropdown.js\");\n/* harmony import */ var _Header_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header.scss */ \"./src/components/header/Header.scss\");\n/* harmony import */ var _Header_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Header_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar Header = (_ref) => {\n  var {\n    isLoggedIn\n  } = _ref;\n  var navOptions;\n\n  if (isLoggedIn) {\n    navOptions = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      id: \"gdUserAccount\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      href: \"#\"\n    }, \"Your Account\"), \" |\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      id: \"gdLogout\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      href: \"#\"\n    }, \"Logout\"), \" |\"));\n  } else {\n    navOptions = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      id: \"gdLogin\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n      href: \"#\"\n    }, \"Login\"), \" |\");\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"header\", {\n    className: _Header_scss__WEBPACK_IMPORTED_MODULE_2___default.a.header\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"generatedata.com\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null, navOptions), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dropdown_Dropdown__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    className: _Header_scss__WEBPACK_IMPORTED_MODULE_2___default.a.selectLocale,\n    options: [{\n      value: \"\",\n      label: 'Select language'\n    }, {\n      value: \"de\",\n      label: 'Deutsch'\n    }, {\n      value: \"en\",\n      label: 'English'\n    }, {\n      value: \"es\",\n      label: 'Español'\n    }, {\n      value: \"fr\",\n      label: 'Français'\n    }, {\n      value: \"nl\",\n      label: 'Nederlands'\n    }, {\n      value: \"zh\",\n      label: '中文'\n    }]\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/components/header/Header.component.js?");

/***/ }),

/***/ "./src/components/header/Header.scss":
/*!*******************************************!*\
  !*** ./src/components/header/Header.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--5-1!../../../node_modules/sass-loader/dist/cjs.js??ref--5-2!./Header.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/header/Header.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/header/Header.scss?");

/***/ }),

/***/ "./src/components/page/Page.component.js":
/*!***********************************************!*\
  !*** ./src/components/page/Page.component.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ \"./node_modules/@material-ui/core/esm/CircularProgress/index.js\");\n/* harmony import */ var _header_Header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../header/Header.component */ \"./src/components/header/Header.component.js\");\n/* harmony import */ var _footer_Footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../footer/Footer.component */ \"./src/components/footer/Footer.component.js\");\n/* harmony import */ var _Page_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Page.scss */ \"./src/components/page/Page.scss\");\n/* harmony import */ var _Page_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Page_scss__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])(theme => ({\n  progress: {\n    margin: theme.spacing(2)\n  }\n}));\n\nvar Page = (_ref) => {\n  var {\n    localeFileLoaded,\n    children\n  } = _ref;\n  var classes = useStyles();\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Page_scss__WEBPACK_IMPORTED_MODULE_5___default.a.page\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header_Header_component__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: _Page_scss__WEBPACK_IMPORTED_MODULE_5___default.a.content\n  }, localeFileLoaded ? children : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    className: classes.progress\n  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_footer_Footer_component__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./src/components/page/Page.component.js?");

/***/ }),

/***/ "./src/components/page/Page.container.js":
/*!***********************************************!*\
  !*** ./src/components/page/Page.container.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _Page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page.component */ \"./src/components/page/Page.component.js\");\n/* harmony import */ var _core_init_init_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/init/init.selectors */ \"./src/core/init/init.selectors.js\");\n\n\n\n\n\nvar mapStateToProps = state => ({\n  localeFileLoaded: _core_init_init_selectors__WEBPACK_IMPORTED_MODULE_3__[\"localeFileLoaded\"](state)\n});\n\nvar mapDispatchToProps = () => ({});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(_Page_component__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\n\n//# sourceURL=webpack:///./src/components/page/Page.container.js?");

/***/ }),

/***/ "./src/components/page/Page.scss":
/*!***************************************!*\
  !*** ./src/components/page/Page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--5-1!../../../node_modules/sass-loader/dist/cjs.js??ref--5-2!./Page.scss */ \"./node_modules/css-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/components/page/Page.scss\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\n\n//# sourceURL=webpack:///./src/components/page/Page.scss?");

/***/ }),

/***/ "./src/core/generator/generator.actions.js":
/*!*************************************************!*\
  !*** ./src/core/generator/generator.actions.js ***!
  \*************************************************/
/*! exports provided: ADD_ROWS, addRows, REMOVE_ROW, removeRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_ROWS\", function() { return ADD_ROWS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addRows\", function() { return addRows; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_ROW\", function() { return REMOVE_ROW; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeRow\", function() { return removeRow; });\nvar ADD_ROWS = 'ADD_ROWS';\nvar addRows = numRows => ({\n  type: ADD_ROWS,\n  payload: {\n    numRows\n  }\n});\nvar REMOVE_ROW = 'REMOVE_ROW';\nvar removeRow = id => ({\n  type: REMOVE_ROW,\n  payload: {\n    id\n  }\n});\n\n//# sourceURL=webpack:///./src/core/generator/generator.actions.js?");

/***/ }),

/***/ "./src/core/generator/generator.reducer.js":
/*!*************************************************!*\
  !*** ./src/core/generator/generator.reducer.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store_reducerRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/reducerRegistry */ \"./src/store/reducerRegistry.js\");\n/* harmony import */ var _generator_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator.actions */ \"./src/core/generator/generator.actions.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar rowID = 1;\n/**\n * This houses the content of the generator. The actual content of each row is dependent based on the\n * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.\n */\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    rows: {},\n    sortedRows: [],\n    dataTypes: [],\n    exportTypes: [],\n    countries: []\n  };\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _generator_actions__WEBPACK_IMPORTED_MODULE_1__[\"ADD_ROWS\"]:\n      var newRows = {};\n      var newRowIDs = [];\n\n      for (var i = 0; i < action.payload.numRows; i++) {\n        newRows[rowID] = {\n          dataType: null,\n          options: null,\n          example: null\n        };\n        newRowIDs.push(rowID);\n        rowID++;\n      }\n\n      return _objectSpread({}, state, {\n        rows: _objectSpread({}, state.rows, {}, newRows),\n        sortedRows: [...state.sortedRows, ...newRowIDs]\n      });\n\n    case _generator_actions__WEBPACK_IMPORTED_MODULE_1__[\"REMOVE_ROW\"]:\n      // const { [action.payload.id], ...remainderRows } = state.rows;\n      return _objectSpread({}, state, {\n        sortedRows: state.sortedRows.filter(i => i !== action.payload.id)\n      });\n      break;\n\n    default:\n      return state;\n  }\n};\n\n_store_reducerRegistry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register('generator', reducer);\n\n//# sourceURL=webpack:///./src/core/generator/generator.reducer.js?");

/***/ }),

/***/ "./src/core/generator/generator.selectors.js":
/*!***************************************************!*\
  !*** ./src/core/generator/generator.selectors.js ***!
  \***************************************************/
/*! exports provided: getRows, getSortedRows, getSortedRowsArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRows\", function() { return getRows; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSortedRows\", function() { return getSortedRows; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSortedRowsArray\", function() { return getSortedRowsArray; });\n/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ \"./node_modules/reselect/es/index.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar getRows = state => state.generator.rows;\nvar getSortedRows = state => state.generator.sortedRows;\nvar getSortedRowsArray = Object(reselect__WEBPACK_IMPORTED_MODULE_0__[\"createSelector\"])(getRows, getSortedRows, (rows, sorted) => sorted.map(id => _objectSpread({}, rows[id], {\n  id\n})));\n\n//# sourceURL=webpack:///./src/core/generator/generator.selectors.js?");

/***/ }),

/***/ "./src/core/generator/index.js":
/*!*************************************!*\
  !*** ./src/core/generator/index.js ***!
  \*************************************/
/*! exports provided: actions, selectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _generator_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator.actions */ \"./src/core/generator/generator.actions.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return _generator_actions__WEBPACK_IMPORTED_MODULE_0__; });\n/* harmony import */ var _generator_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator.selectors */ \"./src/core/generator/generator.selectors.js\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"selectors\", function() { return _generator_selectors__WEBPACK_IMPORTED_MODULE_1__; });\n/* harmony import */ var _generator_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generator.reducer */ \"./src/core/generator/generator.reducer.js\");\n\n\n\n\n\n//# sourceURL=webpack:///./src/core/generator/index.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: coreConfig, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"coreConfig\", function() { return coreConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony import */ var _build_config_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../build/config.client */ \"./build/config.client.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generator */ \"./src/core/generator/index.js\");\n/* harmony import */ var _init_init_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./init/init.actions */ \"./src/core/init/init.actions.js\");\n/* harmony import */ var _utils_langUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/langUtils */ \"./src/utils/langUtils.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n // just expose the entire config as is with a suitable name. No point adding separate getters, I don't think. The\n// data structure has hardly changed in 15 years and is unlikely to in the future\n\nvar coreConfig = _objectSpread({}, _build_config_client__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar init = () => {\n  loadLocaleFile('./en.js', () => {\n    _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(_generator__WEBPACK_IMPORTED_MODULE_3__[\"actions\"].addRows(5));\n    _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(_init_init_actions__WEBPACK_IMPORTED_MODULE_4__[\"setLocaleFileLoaded\"]());\n  }); // }).catch(() => {\n  // \t// TODO\n  // \tconsole.log('could not load locale file');\n  // });\n  // init language. This'll need to be async and set something in the store to prevent rendering until loaded\n  // langUtils.setLocale('en', en);\n};\n\nvar loadLocaleFile = (src, callback) => {\n  var s = document.createElement('script');\n  s.src = src;\n  document.body.appendChild(s);\n  var callbackTimer = setInterval(function () {\n    if (window.gdLocaleFileLoaded) {\n      clearInterval(callbackTimer);\n      callback();\n    }\n  }, 100);\n};\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/init/init.actions.js":
/*!***************************************!*\
  !*** ./src/core/init/init.actions.js ***!
  \***************************************/
/*! exports provided: LOCALE_FILE_LOADED, setLocaleFileLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOCALE_FILE_LOADED\", function() { return LOCALE_FILE_LOADED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLocaleFileLoaded\", function() { return setLocaleFileLoaded; });\nvar LOCALE_FILE_LOADED = 'LOCALE_FILE_LOADED';\nvar setLocaleFileLoaded = () => ({\n  type: LOCALE_FILE_LOADED\n});\n\n//# sourceURL=webpack:///./src/core/init/init.actions.js?");

/***/ }),

/***/ "./src/core/init/init.reducer.js":
/*!***************************************!*\
  !*** ./src/core/init/init.reducer.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store_reducerRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../store/reducerRegistry */ \"./src/store/reducerRegistry.js\");\n/* harmony import */ var _init_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init.actions */ \"./src/core/init/init.actions.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n/**\n * This houses the content of the generator. The actual content of each row is dependent based on the\n * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.\n */\n\nvar reducer = function reducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    localeFileLoaded: false,\n    rows: []\n  };\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case _init_actions__WEBPACK_IMPORTED_MODULE_1__[\"LOCALE_FILE_LOADED\"]:\n      return _objectSpread({}, state, {\n        localeFileLoaded: true\n      });\n\n    default:\n      return state;\n  }\n};\n\n_store_reducerRegistry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register('init', reducer);\n\n//# sourceURL=webpack:///./src/core/init/init.reducer.js?");

/***/ }),

/***/ "./src/core/init/init.selectors.js":
/*!*****************************************!*\
  !*** ./src/core/init/init.selectors.js ***!
  \*****************************************/
/*! exports provided: localeFileLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"localeFileLoaded\", function() { return localeFileLoaded; });\nvar localeFileLoaded = state => state.init.localeFileLoaded;\n\n//# sourceURL=webpack:///./src/core/init/init.selectors.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var _reducerRegistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducerRegistry */ \"./src/store/reducerRegistry.js\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\n\n\nvar initialState = {}; // preserve initial state for not-yet-loaded reducers\n\nvar combine = reducers => {\n  var reducerNames = Object.keys(reducers);\n  Object.keys(initialState).forEach(item => {\n    if (reducerNames.indexOf(item) === -1) {\n      reducers[item] = function () {\n        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n        return state;\n      };\n    }\n  });\n  return Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"combineReducers\"])(reducers);\n};\n\nfunction initStore(initialState) {\n  var middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_0__[\"default\"]];\n  var enhancers = [];\n  var composeEnhancers = redux__WEBPACK_IMPORTED_MODULE_2__[\"compose\"];\n\n  if (true) {\n    var composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;\n\n    if (typeof composeWithDevToolsExtension === 'function') {\n      composeEnhancers = composeWithDevToolsExtension;\n    }\n  }\n\n  var topLevelReducer = combine(_reducerRegistry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getReducers());\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"createStore\"])(topLevelReducer, initialState, composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_2__[\"applyMiddleware\"])(...middleware), ...enhancers));\n  store.asyncReducers = {};\n  return store;\n}\n\nvar store = initStore({}); // allows dynamically changing the redux store\n\n_reducerRegistry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setChangeListener(reducers => store.replaceReducer(combine(reducers)));\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/reducerRegistry.js":
/*!**************************************!*\
  !*** ./src/store/reducerRegistry.js ***!
  \**************************************/
/*! exports provided: ReducerRegistry, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReducerRegistry\", function() { return ReducerRegistry; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// see: http://nicolasgallagher.com/redux-modules-and-code-splitting/\nclass ReducerRegistry {\n  constructor() {\n    this._emitChange = null;\n    this._reducers = {};\n  }\n\n  getReducers() {\n    return _objectSpread({}, this._reducers);\n  }\n\n  register(name, reducer) {\n    this._reducers = _objectSpread({}, this._reducers, {\n      [name]: reducer\n    });\n\n    if (this._emitChange) {\n      this._emitChange(this.getReducers());\n    }\n  }\n\n  setChangeListener(listener) {\n    this._emitChange = listener;\n  }\n\n}\nvar reducerRegistry = new ReducerRegistry();\n/* harmony default export */ __webpack_exports__[\"default\"] = (reducerRegistry);\n\n//# sourceURL=webpack:///./src/store/reducerRegistry.js?");

/***/ }),

/***/ "./src/utils/dataTypes.js":
/*!********************************!*\
  !*** ./src/utils/dataTypes.js ***!
  \********************************/
/*! exports provided: getSortedGroupedDataTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getSortedGroupedDataTypes\", function() { return getSortedGroupedDataTypes; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ \"./src/core/index.js\");\n/* harmony import */ var _build_dataTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../build/dataTypes */ \"./build/dataTypes.js\");\n/* harmony import */ var _langUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./langUtils */ \"./src/utils/langUtils.js\");\n\n\n\nvar getSortedGroupedDataTypes = () => {\n  var i18n = Object(_langUtils__WEBPACK_IMPORTED_MODULE_2__[\"getStrings\"])();\n  console.log(i18n);\n  var groupedOptions = [];\n  _core__WEBPACK_IMPORTED_MODULE_0__[\"coreConfig\"].dataTypeGroups.map(group => {\n    var options = _build_dataTypes__WEBPACK_IMPORTED_MODULE_1__[\"default\"].filter(dataType => dataType.fieldGroup === group).map(i => ({\n      value: i.name,\n      label: i.name\n    }));\n    groupedOptions.push({\n      label: i18n.core[group],\n      options\n    });\n  });\n  return groupedOptions;\n};\n\n//# sourceURL=webpack:///./src/utils/dataTypes.js?");

/***/ }),

/***/ "./src/utils/langUtils.js":
/*!********************************!*\
  !*** ./src/utils/langUtils.js ***!
  \********************************/
/*! exports provided: setLocale, getStrings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setLocale\", function() { return setLocale; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStrings\", function() { return getStrings; });\n// standalone location for the selected locale. Keeping this out of redux lets us just import it wherever\nvar currentLocale = null;\nvar langStrings = {};\nvar setLocale = (locale, localeStrings) => {\n  currentLocale = locale;\n  langStrings[locale] = localeStrings;\n  console.log('set!!!!!', locale, localeStrings);\n};\nvar getStrings = () => langStrings[currentLocale];\n\n//# sourceURL=webpack:///./src/utils/langUtils.js?");

/***/ })

/******/ });