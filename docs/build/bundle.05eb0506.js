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
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "build/" + ({"compiler":"compiler"}[chunkId]||chunkId) + "." + {"compiler":"15c52597"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./guide/Example1/disabled-step.vue":
/*!******************************************!*\
  !*** ./guide/Example1/disabled-step.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./disabled-step.vue?vue&type=template&id=2106a97e& */ \"./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e&\");\n/* harmony import */ var _disabled_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./disabled-step.vue?vue&type=script&lang=js& */ \"./guide/Example1/disabled-step.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _disabled_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/disabled-step.vue?");

/***/ }),

/***/ "./guide/Example1/disabled-step.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./guide/Example1/disabled-step.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_disabled_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./disabled-step.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/disabled-step.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_disabled_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/disabled-step.vue?");

/***/ }),

/***/ "./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e&":
/*!*************************************************************************!*\
  !*** ./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./disabled-step.vue?vue&type=template&id=2106a97e& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_disabled_step_vue_vue_type_template_id_2106a97e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/disabled-step.vue?");

/***/ }),

/***/ "./guide/Example1/global.css":
/*!***********************************!*\
  !*** ./guide/Example1/global.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!../../node_modules/postcss-loader/src??ref--7-oneOf-3-2!./global.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./guide/Example1/global.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"03befde1\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./guide/Example1/global.css?");

/***/ }),

/***/ "./guide/Example1/step-base.vue":
/*!**************************************!*\
  !*** ./guide/Example1/step-base.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-base.vue?vue&type=template&id=2a227832& */ \"./guide/Example1/step-base.vue?vue&type=template&id=2a227832&\");\n/* harmony import */ var _step_base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step-base.vue?vue&type=script&lang=js& */ \"./guide/Example1/step-base.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _step_base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/step-base.vue?");

/***/ }),

/***/ "./guide/Example1/step-base.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./guide/Example1/step-base.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step-base.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step-base.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/step-base.vue?");

/***/ }),

/***/ "./guide/Example1/step-base.vue?vue&type=template&id=2a227832&":
/*!*********************************************************************!*\
  !*** ./guide/Example1/step-base.vue?vue&type=template&id=2a227832& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step-base.vue?vue&type=template&id=2a227832& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step-base.vue?vue&type=template&id=2a227832&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step_base_vue_vue_type_template_id_2a227832___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step-base.vue?");

/***/ }),

/***/ "./guide/Example1/step1.vue":
/*!**********************************!*\
  !*** ./guide/Example1/step1.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step1.vue?vue&type=template&id=4d5fdfb3& */ \"./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3&\");\n/* harmony import */ var _step1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step1.vue?vue&type=script&lang=js& */ \"./guide/Example1/step1.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _step1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/step1.vue?");

/***/ }),

/***/ "./guide/Example1/step1.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./guide/Example1/step1.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step1.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step1.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step1_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/step1.vue?");

/***/ }),

/***/ "./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3&":
/*!*****************************************************************!*\
  !*** ./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step1.vue?vue&type=template&id=4d5fdfb3& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step1_vue_vue_type_template_id_4d5fdfb3___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step1.vue?");

/***/ }),

/***/ "./guide/Example1/step2.vue":
/*!**********************************!*\
  !*** ./guide/Example1/step2.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step2.vue?vue&type=template&id=83b75b82& */ \"./guide/Example1/step2.vue?vue&type=template&id=83b75b82&\");\n/* harmony import */ var _step2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step2.vue?vue&type=script&lang=js& */ \"./guide/Example1/step2.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _step2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/step2.vue?");

/***/ }),

/***/ "./guide/Example1/step2.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./guide/Example1/step2.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step2.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step2.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step2_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/step2.vue?");

/***/ }),

/***/ "./guide/Example1/step2.vue?vue&type=template&id=83b75b82&":
/*!*****************************************************************!*\
  !*** ./guide/Example1/step2.vue?vue&type=template&id=83b75b82& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step2.vue?vue&type=template&id=83b75b82& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step2.vue?vue&type=template&id=83b75b82&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step2_vue_vue_type_template_id_83b75b82___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step2.vue?");

/***/ }),

/***/ "./guide/Example1/step3.vue":
/*!**********************************!*\
  !*** ./guide/Example1/step3.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step3.vue?vue&type=template&id=57af98be& */ \"./guide/Example1/step3.vue?vue&type=template&id=57af98be&\");\n/* harmony import */ var _step3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./step3.vue?vue&type=script&lang=js& */ \"./guide/Example1/step3.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _step3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/step3.vue?");

/***/ }),

/***/ "./guide/Example1/step3.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./guide/Example1/step3.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step3.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step3.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step3_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/step3.vue?");

/***/ }),

/***/ "./guide/Example1/step3.vue?vue&type=template&id=57af98be&":
/*!*****************************************************************!*\
  !*** ./guide/Example1/step3.vue?vue&type=template&id=57af98be& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./step3.vue?vue&type=template&id=57af98be& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step3.vue?vue&type=template&id=57af98be&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_step3_vue_vue_type_template_id_57af98be___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step3.vue?");

/***/ }),

/***/ "./guide/Example1/transitions.css":
/*!****************************************!*\
  !*** ./guide/Example1/transitions.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!../../node_modules/postcss-loader/src??ref--7-oneOf-3-2!./transitions.css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./guide/Example1/transitions.css\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"f60541ea\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./guide/Example1/transitions.css?");

/***/ }),

/***/ "./guide/Example1/transitions.js":
/*!***************************************!*\
  !*** ./guide/Example1/transitions.js ***!
  \***************************************/
/*! exports provided: translateFade, translateFadeBackwarding, fade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"translateFade\", function() { return translateFade; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"translateFadeBackwarding\", function() { return translateFadeBackwarding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fade\", function() { return fade; });\nvar translateFade = {\n  props: {\n    name: 'translate-fade',\n    appear: true,\n    duration: 300\n  }\n};\nvar translateFadeBackwarding = {\n  props: {\n    name: 'translate-fade-backwarding',\n    appear: true,\n    duration: 300\n  }\n};\nvar fade = {\n  props: {\n    name: 'fade',\n    appear: true,\n    duration: 300\n  }\n};\n\n//# sourceURL=webpack:///./guide/Example1/transitions.js?");

/***/ }),

/***/ "./guide/Example1/wizard-container.vue":
/*!*********************************************!*\
  !*** ./guide/Example1/wizard-container.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wizard-container.vue?vue&type=template&id=707da15f& */ \"./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f&\");\n/* harmony import */ var _wizard_container_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wizard-container.vue?vue&type=script&lang=js& */ \"./guide/Example1/wizard-container.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wizard-container.vue?vue&type=style&index=0&lang=css& */ \"./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _wizard_container_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?");

/***/ }),

/***/ "./guide/Example1/wizard-container.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./guide/Example1/wizard-container.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./wizard-container.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?");

/***/ }),

/***/ "./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************!*\
  !*** ./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--7-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./wizard-container.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?");

/***/ }),

/***/ "./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f&":
/*!****************************************************************************!*\
  !*** ./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./wizard-container.vue?vue&type=template&id=707da15f& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"450c5aac-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_450c5aac_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_container_vue_vue_type_template_id_707da15f___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?");

/***/ }),

/***/ "./guide/setup.js":
/*!************************!*\
  !*** ./guide/setup.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ \"./node_modules/babel-polyfill/lib/index.js\");\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./guide/setup.js?");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/disabled-step.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/disabled-step.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-base */ \"./guide/Example1/step-base.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    StepBase: _step_base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./guide/Example1/disabled-step.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step-base.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step-base.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_entry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/entry */ \"./src/entry.js\");\n/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitions */ \"./guide/Example1/transitions.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    WizardStep: _src_entry__WEBPACK_IMPORTED_MODULE_0__[\"WizardStep\"]\n  },\n  inheritAttrs: false,\n  props: {\n    disabled: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data: function data() {\n    return {\n      forwarding: true\n    };\n  },\n  methods: {\n    getTransition: function getTransition(backwarding) {\n      if (backwarding) {\n        return _transitions__WEBPACK_IMPORTED_MODULE_1__[\"translateFadeBackwarding\"];\n      } else {\n        return _transitions__WEBPACK_IMPORTED_MODULE_1__[\"translateFade\"];\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./guide/Example1/step-base.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step1.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step1.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-base */ \"./guide/Example1/step-base.vue\");\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    StepBase: _step_base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  methods: {\n    finished: function finished() {\n      console.log('step one has finished');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./guide/Example1/step1.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step2.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step2.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-base */ \"./guide/Example1/step-base.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    StepBase: _step_base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./guide/Example1/step2.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step3.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step3.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _step_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./step-base */ \"./guide/Example1/step-base.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    StepBase: _step_base__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  methods: {\n    validate: function validate(data) {\n      if (data.age < 18) {\n        alert('You must be 18 and over');\n        return false;\n      }\n\n      return true;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./guide/Example1/step3.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/wizard-container.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: ['scope']\n});\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/wizard-manager.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/wizard-manager.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/number */ \"./src/utils/number.js\");\n/* harmony import */ var _utils_inspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/inspect */ \"./src/utils/inspect.js\");\n/* harmony import */ var _utils_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/cloneDeep */ \"./src/utils/cloneDeep.js\");\n/* harmony import */ var _utils_filters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/filters */ \"./src/utils/filters.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n/**\n * Vue Renderless Wizard component (hopefully) helps you manage the steps of your wizard easily.\n * @requires ./wizard-step.vue\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  provide: function provide() {\n    return {\n      wizardManager: this\n    };\n  },\n  props: {\n    /**\n     * Starting step index (zero-based). is 0 by default\n     */\n    value: {\n      type: Number,\n      default: 0,\n      validator: function validator(value) {\n        return value >= 0;\n      }\n    },\n\n    /**\n     * Accessed by `<wizard-step>` component. If set, all the steps are rendered lazily.\n     */\n    lazy: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\n     * The data that is used as initial data *and* **reset**\n     */\n    initialData: {\n      type: Object,\n      default: function _default() {\n        return {};\n      }\n    }\n  },\n  data: function data() {\n    return {\n      currentStep: this.value,\n      // Array of `<wizard-step>` instances, in DOM order\n      steps: [],\n      // Array of child instances registered (for triggering reactive updates)\n      registeredSteps: [],\n      wizardData: Object(_utils_cloneDeep__WEBPACK_IMPORTED_MODULE_2__[\"cloneDeep\"])(this.initialData, {}),\n      validating: false,\n      backwarding: false\n    };\n  },\n  computed: {\n    /**\n     * Count of detected steps\n     */\n    stepsCount: function stepsCount() {\n      return this.steps.length;\n    },\n\n    /**\n     * Count of available steps\n     */\n    availableSteps: function availableSteps() {\n      return this.steps.filter(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"notDisabled\"]).length;\n    },\n\n    /**\n     * Current step relative to available steps\n     */\n    availableStepProgress: function availableStepProgress() {\n      return this.steps.slice(0, this.currentStep).reverse().filter(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"notDisabled\"]).length + 1;\n    },\n    disabledBehind: function disabledBehind() {\n      return this.steps.slice(0, this.currentStep).filter(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"disabled\"]).length;\n    },\n    nextStep: function nextStep() {\n      return this.steps.slice(this.currentStep + 1).find(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"notDisabled\"]);\n    },\n    prevStep: function prevStep() {\n      return this.steps.slice(0, this.currentStep).reverse().find(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"notDisabled\"]);\n    },\n    hasNext: function hasNext() {\n      return !!this.nextStep;\n    },\n    hasPrev: function hasPrev() {\n      return !!this.prevStep;\n    }\n  },\n  watch: {\n    // for v-model\n    value: function value(newValue, oldValue) {\n      if (newValue !== oldValue) {\n        newValue = Object(_utils_number__WEBPACK_IMPORTED_MODULE_0__[\"toInteger\"])(newValue, 0);\n        oldValue = Object(_utils_number__WEBPACK_IMPORTED_MODULE_0__[\"toInteger\"])(oldValue, 0);\n        var $step = this.steps[newValue];\n\n        if ($step && !$step.disabled) {\n          this.activateStep($step);\n        } else {\n          // Try next or prev steps\n          if (newValue < oldValue) {\n            this.previousStep();\n          } else {\n            this.nextStep();\n          }\n        }\n      }\n    },\n    currentStep: function currentStep(newValue) {\n      var index = 0; // Ensure only one step is active at most\n\n      this.steps.forEach(function ($step, i) {\n        if (i === newValue && !$step.disabled) {\n          $step.localActive = true;\n          index = i;\n        } else {\n          $step.localActive = false;\n        }\n      }); // Update the v-model\n\n      this.$emit('input', index);\n    }\n  },\n  mounted: function mounted() {\n    this.updateSteps();\n  },\n  beforeDestroy: function beforeDestroy() {\n    // Ensure no references to child instances exist\n    this.steps = [];\n  },\n  methods: {\n    updateSteps: function updateSteps() {\n      var steps = this.steps; // Find last active non-disabled step in current steps\n      // We trust step state over `currentStep`, in case steps were added/removed/re-ordered\n\n      var stepIndex = steps.indexOf(steps.slice().reverse().find(function ($step) {\n        return $step.localActive && !$step.disabled;\n      })); // Else try setting to `currentStep`\n\n      if (stepIndex < 0) {\n        var currentStep = this.currentStep;\n\n        if (steps[currentStep] && !steps[currentStep].disabled) {\n          // Current step is not disabled\n          stepIndex = currentStep;\n        }\n      }\n\n      if (stepIndex < 0) {\n        stepIndex = steps.indexOf(steps.find(_utils_filters__WEBPACK_IMPORTED_MODULE_3__[\"notDisabled\"]));\n      } // Ensure only one step is active at a time\n\n\n      steps.forEach(function (step, index) {\n        step.localActive = index === stepIndex;\n      });\n      this.currentStep = stepIndex;\n    },\n    registerStep: function registerStep(step) {\n      if (!this.steps.includes(step)) {\n        this.steps.push(step);\n      }\n    },\n    unregisterStep: function unregisterStep(step) {\n      this.steps = this.steps.slice().filter(function (s) {\n        return s !== step;\n      });\n    },\n    next: function next() {\n      var _arguments = arguments,\n          _this = this;\n\n      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        var bypassValidation, step, canContinue;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                bypassValidation = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : false;\n\n                if (!_this.validating) {\n                  _context.next = 3;\n                  break;\n                }\n\n                return _context.abrupt(\"return\");\n\n              case 3:\n                step = _this.steps[_this.currentStep];\n\n                if (!step) {\n                  _context.next = 20;\n                  break;\n                }\n\n                _this.validating = true;\n                canContinue = false;\n\n                if (!(bypassValidation === true)) {\n                  _context.next = 11;\n                  break;\n                }\n\n                canContinue = true;\n                _context.next = 18;\n                break;\n\n              case 11:\n                if (!Object(_utils_inspect__WEBPACK_IMPORTED_MODULE_1__[\"isFunction\"])(step.validate)) {\n                  _context.next = 17;\n                  break;\n                }\n\n                _context.next = 14;\n                return step.validate(_this.wizardData);\n\n              case 14:\n                canContinue = _context.sent;\n                _context.next = 18;\n                break;\n\n              case 17:\n                if (step.validate === false) {\n                  canContinue = true;\n                }\n\n              case 18:\n                if (canContinue) {\n                  _this.backwarding = false;\n\n                  if (_this.nextStep) {\n                    _this.$nextTick(function () {\n                      var result = _this.activateStep(_this.nextStep);\n\n                      if (result) {\n                        /**\n                         * Emitted when the current step has finished (on calling next).\n                         * Emits after activate-step if it was not cancelled.\n                         * Eemits before the <wizard-manager> `finished` event on the last step (there's no `activate-step` when on last step, because there's no next step).\n                         * @event finished\n                         * @property {object} data - contains the wizard data\n                         */\n                        step.$emit('finished', _this.wizardData);\n                      }\n                    });\n                  } else {\n                    step.$emit('finished', _this.wizardData);\n                    /**\n                     * Emitted when there's no next step remaining and **next()** function is called.\n                     * @event finished\n                     * @property {object} data - contains the wizard data\n                     */\n\n                    _this.$emit('finished', _this.wizardData);\n                  }\n                }\n\n                _this.validating = false;\n\n              case 20:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }))();\n    },\n    prev: function prev() {\n      var _this2 = this;\n\n      if (this.validating) return;\n      this.backwarding = true;\n      this.$nextTick(function () {\n        _this2.activateStep(_this2.prevStep);\n      });\n    },\n    setStep: function setStep(index) {\n      this.activateStep(this.steps[index]);\n    },\n    activateStep: function activateStep(step) {\n      var currentStep = this.currentStep,\n          steps = this.steps;\n      var result = false;\n\n      if (step) {\n        var index = steps.indexOf(step);\n\n        if (index !== currentStep && !step.disabled) {\n          var stepEvent = new Event('activate-step', {\n            cancelable: true\n          });\n          /**\n           * Emitted just before a step is shown/activated. Cancelable\n           * @event activate-step\n           * @property {number} newStepIndex - Step being activated (0-based index)\n           * @property {number} prevStepIndex - Step that is currently active (0-based index). Will be -1 if no current active step\n           * @property {Event} event - Event object. Call event.preventDefault() to cancel\n           */\n\n          this.$emit('activate-step', index, this.currentStep, stepEvent);\n\n          if (!stepEvent.defaultPrevented) {\n            this.currentStep = index;\n            result = true;\n          }\n        }\n      } // Couldn't set step, so ensure v-model is up to date\n\n\n      if (!result && this.value !== currentStep) {\n        /**\n         * Emitted when a step is shown. Used to update the v-model.\n         * @event input\n         * @property {number} stepIndex - Current selected step index (0-based index)\n         */\n        this.$emit('input', currentStep);\n      }\n\n      return result;\n    },\n    reset: function reset() {\n      this.setStep(this.value);\n\n      if (this.currentStep === this.value) {\n        this.wizardData = Object(_utils_cloneDeep__WEBPACK_IMPORTED_MODULE_2__[\"cloneDeep\"])(this.initialData, {});\n        /**\n         * Triggered when reset is called and current step is changed to **value** prop successfully. Wizard data is reset to initial data as well.\n         * @event reset\n         * @type {Event}\n         */\n\n        this.$emit('reset');\n      }\n    }\n  },\n\n  /**\n   * The default slot of wizard. You can structure your overall wizard look in here and put where the steps should be rendered.\n   * There **Must** be `<wizard-step>` components inside.\n   * @slot default\n   * @binding {number} currentStep - Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don't jump).\n   * @binding {number} currentStepIndex - Current step index. starts from zero.\n   * @binding {number} stepsCount - Total steps count. Excludes disabled steps count so you can use it as is in UI.\n   * @binding {number} realStepsCount - Total steps count. Including disabled steps.\n   * @binding {function(boolean: bypassValidation)} next - Proceed to next step\n   * @binding {function} prev - Proceed to previous step\n   * @binding {function(index: number)} setStep - Directly go to a step by index.\n   * @binding {reset} reset - Emits a `reset` event, restores `initial-data` prop and goes to first step\n   * @binding {boolean} hasNext\n   * @binding {boolean} hasPrev\n   * @binding {boolean} validating - if a validation check is in progress\n   * @binding {object} data - the wizard data that you can use as your data.\n   * @binding {boolean} backwarding - you can think of it as which direction the wizard is moving.\n   *  If true, It's a previous step,\n   *  If false, It's a next step.\n   *  You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it's one boolean.\n   */\n  render: function render() {\n    return this.$scopedSlots.default({\n      currentStep: this.availableStepProgress,\n      currentStepIndex: this.currentStep,\n      stepsCount: this.availableSteps,\n      realStepsCount: this.stepsCount,\n      next: this.next,\n      prev: this.prev,\n      setStep: this.setStep,\n      reset: this.reset,\n      hasNext: this.hasNext,\n      hasPrev: this.hasPrev,\n      data: this.wizardData,\n      validating: this.validating,\n      backwarding: this.backwarding\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/wizard-manager.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/wizard-step.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/wizard-step.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  inject: {\n    wizardManager: {\n      default: function _default() {\n        return {};\n      }\n    }\n  },\n  props: {\n    /**\n     * Should this step be skipped in counting and\n     * when the `Next` or `Prev` method is called ?\n     */\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\n     * is this the current active step or not.\n     * when set, wizard manager will render this set.\n     * if there's multiple active steps, only the last one with active is rendered.\n     * disabled steps are ignored.\n     */\n    active: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\n     * Should this step be rendered only when It's active ? False means render all the time. <wizard-manager> can override this.\n     */\n    lazy: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\n     * A function which will be called with wizard data as argument whenever the `Next` button is called. This function can return a Promise.\n     */\n    validate: {\n      type: [Boolean, Function],\n      default: false\n    },\n\n    /**\n     * Data object for passing to render function of 'transition' component.\n     * anything in this object will be passed to the render function directly.\n     */\n    transition: {\n      type: [Object, Function],\n      default: function _default() {\n        return {};\n      }\n    }\n  },\n  data: function data() {\n    return {\n      localActive: this.active\n    };\n  },\n  computed: {\n    // For parent sniffing of child\n    _isStep: function _isStep() {\n      return true;\n    },\n    computedLazy: function computedLazy() {\n      return this.wizardManager.lazy || this.lazy;\n    }\n  },\n  watch: {\n    localActive: function localActive(newValue) {\n      // Make `active` prop work with `.sync` modifier\n      this.$emit('active', newValue);\n    }\n  },\n  created: function created() {\n    // Inform `<wizard-manager>` of our presence\n    this.registerStep();\n  },\n  beforeDestroy: function beforeDestroy() {\n    // Inform `<wizard-manager>` of our departure\n    this.unregisterStep();\n  },\n  methods: {\n    // Private methods\n    registerStep: function registerStep() {\n      // Inform `<wizard-manager>` of our presence\n      var registerStep = this.wizardManager.registerStep;\n\n      if (registerStep) {\n        registerStep(this);\n      }\n    },\n    unregisterStep: function unregisterStep() {\n      // Inform `<wizard-manager>` of our departure\n      var unregisterStep = this.wizardManager.unregisterStep;\n\n      if (unregisterStep) {\n        unregisterStep(this);\n      }\n    }\n  },\n\n  /**\n   * The default slot of wizard-step. This slot provides scoped data and methods you can use in your steps.\n   * @slot default\n   * @binding {boolean} active - true if this step component content should rendered\n   * @binding {number} currentStep - Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don't jump).\n   * @binding {number} currentStepIndex - Current step index. starts from zero.\n   * @binding {number} stepsCount - Total steps count. Excludes disabled steps count so you can use it as is in UI.\n   * @binding {number} realStepsCount - Total steps count. Including disabled steps.\n   * @binding {function(boolean: bypassValidation)} next - Proceed to next step\n   * @binding {function} prev - Proceed to previous step\n   * @binding {function(index: number)} setStep - Directly go to a step by index.\n   * @binding {reset} reset - Emits a `reset` event, restores `initial-data` prop and goes to first step\n   * @binding {boolean} hasNext\n   * @binding {boolean} hasPrev\n   * @binding {boolean} validating - if a validation check is in progress\n   * @binding {object} data - the wizard data that you can use as your data.\n   * @binding {boolean} backwarding - you can think of it as which direction the wizard is moving.\n   *  If true, It's a previous step,\n   *  If false, It's a next step.\n   *  You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it's one boolean.\n   */\n  render: function render(h) {\n    var localActive = this.localActive;\n    var children = // Render content lazily if requested\n    localActive || !this.computedLazy ? this.$scopedSlots.default({\n      active: localActive,\n      currentStep: this.wizardManager.availableStepProgress,\n      currentStepIndex: this.wizardManager.currentStep,\n      stepsCount: this.wizardManager.availableSteps,\n      realStepsCount: this.wizardManager.stepsCount,\n      next: this.wizardManager.next,\n      prev: this.wizardManager.prev,\n      setStep: this.wizardManager.setStep,\n      reset: this.wizardManager.reset,\n      hasNext: this.wizardManager.hasNext,\n      hasPrev: this.wizardManager.hasPrev,\n      data: this.wizardManager.wizardData,\n      validating: this.wizardManager.validating,\n      backwarding: this.wizardManager.backwarding\n    }) : h();\n    var transition;\n\n    if (typeof this.transition === 'function') {\n      transition = this.transition(this.wizardManager.backwarding, localActive);\n    } else {\n      transition = this.transition;\n    }\n\n    return h('transition', _objectSpread({}, transition), children);\n  }\n});\n\n//# sourceURL=webpack:///./src/wizard-step.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/disabled-step.vue?vue&type=template&id=2106a97e& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('StepBase',{attrs:{\"disabled\":\"\"}},[_vm._v(\" This is not gonna be shown or activated until disabled is gone, but will be rendered. if lazy prop is true, it will be rendered when activated. Lazy prop is set either on <wizard-manager> component or <wizard-step> component itself. \")])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/disabled-step.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step-base.vue?vue&type=template&id=2a227832&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step-base.vue?vue&type=template&id=2a227832& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('WizardStep',_vm._g(_vm._b({attrs:{\"transition\":_vm.getTransition,\"disabled\":_vm.disabled},scopedSlots:_vm._u([{key:\"default\",fn:function(scope){return [_c('div',_vm._b({staticClass:\"center fill\"},'div',_vm.$attrs.class,false),[_vm._t(\"default\",null,null,scope)],2)]}}],null,true)},'WizardStep',_vm.$attrs,false),_vm.$listeners))}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step-base.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step1.vue?vue&type=template&id=4d5fdfb3& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('StepBase',{on:{\"finished\":_vm.finished}},[_vm._v(\" Welcome to the first step \")])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step1.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step2.vue?vue&type=template&id=83b75b82&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step2.vue?vue&type=template&id=83b75b82& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('StepBase',{staticClass:\"p-3 column center text-center\",scopedSlots:_vm._u([{key:\"default\",fn:function(ref){\nvar data = ref.data;\nreturn [_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(data.firstName),expression:\"data.firstName\"}],staticClass:\"form-control mb-3 w-sm\",attrs:{\"type\":\"text\",\"placeholder\":\"First Name\"},domProps:{\"value\":(data.firstName)},on:{\"input\":function($event){if($event.target.composing){ return; }_vm.$set(data, \"firstName\", $event.target.value)}}}),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(data.lastName),expression:\"data.lastName\"}],staticClass:\"form-control w-sm\",attrs:{\"type\":\"text\",\"placeholder\":\"Last Name\"},domProps:{\"value\":(data.lastName)},on:{\"input\":function($event){if($event.target.composing){ return; }_vm.$set(data, \"lastName\", $event.target.value)}}})]}}])})}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step2.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/step3.vue?vue&type=template&id=57af98be&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/step3.vue?vue&type=template&id=57af98be& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('StepBase',{staticClass:\"p-3 center\",attrs:{\"validate\":_vm.validate},scopedSlots:_vm._u([{key:\"default\",fn:function(ref){\nvar data = ref.data;\nreturn [_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(data.age),expression:\"data.age\"}],staticClass:\"form-control text-center w-sm\",attrs:{\"type\":\"number\",\"placeholder\":\"Age\"},domProps:{\"value\":(data.age)},on:{\"input\":function($event){if($event.target.composing){ return; }_vm.$set(data, \"age\", $event.target.value)}}})]}}])})}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/step3.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"450c5aac-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"450c5aac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/wizard-container.vue?vue&type=template&id=707da15f& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"wizard-container\"},[_c('div',{staticClass:\"step-content\"},[_vm._t(\"default\")],2),_c('div',{staticClass:\"step-controller\"},[_c('button',{staticClass:\"btn\",attrs:{\"disabled\":!_vm.scope.hasPrev},on:{\"click\":_vm.scope.prev}},[_vm._v(\" Back \")]),_c('div',{staticClass:\"center\"},[_vm._v(\" Step \"+_vm._s(_vm.scope.currentStep)+\" of \"+_vm._s(_vm.scope.stepsCount)+\" \")]),_c('button',{staticClass:\"btn\",on:{\"click\":_vm.scope.next}},[_vm._v(\" \"+_vm._s(_vm.scope.hasNext ? 'Next' : 'Finish')+\" \")])])])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22450c5aac-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./guide/Example1/global.css":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!./node_modules/postcss-loader/src??ref--7-oneOf-3-2!./guide/Example1/global.css ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#app {\\n  font-size: 16px;\\n}\\n\\n.fill {\\n  flex: 1 1 0;\\n}\\n\\n.center {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n.text-center {\\n  text-align: center !important;\\n}\\n\\n.text-center input {\\n  text-align: center !important;\\n}\\n\\n.btn {\\n  border-radius: 5px;\\n  border: #7a7a7a;\\n  box-shadow: 0px 0px 1px 0px rgba(35, 35, 35, 0.3);\\n  font-size: 1.2rem;\\n  padding: 0.5rem 2rem;\\n}\\n\\n.d-none {\\n  display: none !important;\\n}\\n\\n.p-3 {\\n  padding: 1rem;\\n}\\n\\n.mb-3 {\\n  margin-bottom: 1rem;\\n}\\n\\n.w-sm {\\n  max-width: 300px;\\n}\\n\\n.column {\\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n/* from bootstrap */\\n\\n.form-control {\\n  display: block;\\n  width: 100%;\\n  height: calc(1.5em + .75rem + 2px);\\n  padding: .2rem .5rem;\\n  font-size: 1.2rem;\\n  font-weight: 400;\\n  line-height: 1.5;\\n  color: #495057;\\n  background-color: #fff;\\n  background-clip: padding-box;\\n  border: 1px solid #ced4da;\\n  border-radius: 99px;\\n  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out\\n}\\n\\n.form-control:focus {\\n  color: #495057;\\n  background-color: #fff;\\n  border-color: #ffb380;\\n  outline: 0;\\n  box-shadow: 0 0 0 .2rem rgba(255, 102, 0, 0.25)\\n}\\n\\n.form-control:-ms-input-placeholder {\\n  color: #979797;\\n  opacity: 1\\n}\\n\\n.form-control::placeholder {\\n  color: #979797;\\n  opacity: 1\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./guide/Example1/global.css?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!./node_modules/postcss-loader/src??ref--7-oneOf-3-2");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./guide/Example1/transitions.css":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!./node_modules/postcss-loader/src??ref--7-oneOf-3-2!./guide/Example1/transitions.css ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".fade-enter-active,\\n.fade-leave-active {\\n  transition: opacity 0.5s ease;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n}\\n.fade-enter-from,\\n.fade-leave-to {\\n  opacity: 0;\\n}\\n\\n/* taken from view docs with some edits */\\n\\n.translate-fade-enter-active,\\n.translate-fade-leave-active {\\n  transition: all 300ms;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n}\\n.translate-fade-enter,\\n.translate-fade-leave-active {\\n  opacity: 0;\\n}\\n.translate-fade-enter {\\n  transform: translateX(100%);\\n}\\n.translate-fade-leave-active {\\n  transform: translateX(-100%);\\n}\\n\\n/* The \\\"backwarding\\\" version*/\\n\\n.translate-fade-backwarding-leave-active,\\n.translate-fade-backwarding-enter-active {\\n  transition: all 300ms;\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n  bottom: 0;\\n  left: 0;\\n}\\n\\n.translate-fade-backwarding-enter {\\n  transform: translateX(-100%);\\n}\\n.translate-fade-backwarding-leave-active {\\n  opacity: 0;\\n}\\n.translate-fade-backwarding-leave {\\n  transform: translateX(0%);\\n}\\n.translate-fade-enter {\\n  transform: translateX(100%);\\n}\\n.translate-fade-enter-to {\\n  transform: translateX(0%);\\n}\\n.translate-fade-backwarding-leave-to {\\n  transform: translateX(100%);\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./guide/Example1/transitions.css?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-3-1!./node_modules/postcss-loader/src??ref--7-oneOf-3-2");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.wizard-container {\\n  background: #f7f7f7;\\n  border-radius: 3px;\\n  box-shadow: 0px 0px 3px 0px rgba(35, 35, 35, 0.3);\\n  color: #424242;\\n  font-size: 1.2rem;\\n  margin: 1rem;\\n  min-height: 300px;\\n\\n  display: flex;\\n  flex-direction: column;\\n}\\n.step-content {\\n  display: flex;\\n  position: relative;\\n  flex: 1 1 0;\\n  overflow: hidden;\\n}\\n.step-controller {\\n  border-top: 1px solid #dadada;\\n  display: flex;\\n  justify-content: space-between;\\n  padding: 0.8rem;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./wizard-container.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./guide/Example1/wizard-container.vue?vue&type=style&index=0&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"87c27012\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./guide/Example1/wizard-container.vue?./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/Credits.md":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/Credits.md ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': 'Thanks to contributors of bootstrap-vue,\\nspecially those who have worked on `<b-tabs>` and `utils` in the source.\\nI have used them in my code.\\nbecause probably I wouldn\\'t be able to make this easily if I had not read their way of doing stuff.\\nStill this component does some stuff in It\\'s own way which is not exactly what b-vue is doing.\\n\\nI made this in my spare time with no real use case for it, so It may not be what you want exactly, but I tried to do it in a way that pleases more tastes than one.\\n\\nI hope you enjoy using it.'\n    }]\n\n//# sourceURL=webpack:///./guide/Credits.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/Example1/ReadMe.md":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/Example1/ReadMe.md ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {\n    '../../src/entry': __webpack_require__(/*! ../../src/entry */ \"./src/entry.js\"),\n    './wizard-container.vue': __webpack_require__(/*! ./wizard-container.vue */ \"./guide/Example1/wizard-container.vue\"),\n    './step1.vue': __webpack_require__(/*! ./step1.vue */ \"./guide/Example1/step1.vue\"),\n    './step2.vue': __webpack_require__(/*! ./step2.vue */ \"./guide/Example1/step2.vue\"),\n    './step3.vue': __webpack_require__(/*! ./step3.vue */ \"./guide/Example1/step3.vue\"),\n    './disabled-step.vue': __webpack_require__(/*! ./disabled-step.vue */ \"./guide/Example1/disabled-step.vue\"),\n    './global.css': __webpack_require__(/*! ./global.css */ \"./guide/Example1/global.css\"),\n    './transitions.css': __webpack_require__(/*! ./transitions.css */ \"./guide/Example1/transitions.css\")\n};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [\n    {\n        'type': 'code',\n        'content': '<template>\\n  <div id=\"app\">\\n    <WizardManager v-slot=\"scope\" lazy @finished=\"handleFinished\">\\n      <WizardContainer :scope=\"scope\">\\n        <Step1 />\\n        <disabled-step />\\n        <Step2 />\\n        <Step3 />\\n      </WizardContainer>\\n    </WizardManager>\\n  </div>\\n</template>\\n\\n<script>\\nimport { WizardManager } from \\'../../src/entry\\';\\nimport WizardContainer from \\'./wizard-container.vue\\';\\nimport Step1 from \\'./step1.vue\\';\\nimport Step2 from \\'./step2.vue\\';\\nimport Step3 from \\'./step3.vue\\';\\nimport DisabledStep from \\'./disabled-step.vue\\';\\nimport \\'./global.css\\';\\nimport \\'./transitions.css\\';\\n\\nexport default {\\n  components: {\\n    WizardManager,\\n    WizardContainer,\\n    Step1,\\n    Step2,\\n    Step3,\\n    DisabledStep,\\n  },\\n  methods: {\\n    handleFinished(data) {\\n      typeof alert === \\'function\\' && alert(JSON.stringify(data));\\n    },\\n  },\\n};\\n</script>\\n',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': '\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\nvar entry$0 = require(\\'../../src/entry\\');var WizardManager = entry$0.WizardManager;\\nvar wizard_container_vue$39 = require(\\'./wizard-container.vue\\');var WizardContainer = wizard_container_vue$39.default || wizard_container_vue$39;\\nvar step1_vue$135 = require(\\'./step1.vue\\');var Step1 = step1_vue$135.default || step1_vue$135;\\nvar step2_vue$201 = require(\\'./step2.vue\\');var Step2 = step2_vue$201.default || step2_vue$201;\\nvar step3_vue$267 = require(\\'./step3.vue\\');var Step3 = step3_vue$267.default || step3_vue$267;\\nvar disabled_step_vue$333 = require(\\'./disabled-step.vue\\');var DisabledStep = disabled_step_vue$333.default || disabled_step_vue$333;\\nrequire(\\'./global.css\\');\\nrequire(\\'./transitions.css\\');\\n\\n;return {template: \"\\\\n  <div id=\\\\\"app\\\\\">\\\\n    <WizardManager v-slot=\\\\\"scope\\\\\" lazy @finished=\\\\\"handleFinished\\\\\">\\\\n      <WizardContainer :scope=\\\\\"scope\\\\\">\\\\n        <Step1 />\\\\n        <disabled-step />\\\\n        <Step2 />\\\\n        <Step3 />\\\\n      </WizardContainer>\\\\n    </WizardManager>\\\\n  </div>\\\\n\", \\n  components: {\\n    WizardManager: WizardManager,\\n    WizardContainer: WizardContainer,\\n    Step1: Step1,\\n    Step2: Step2,\\n    Step3: Step3,\\n    DisabledStep: DisabledStep,\\n  },\\n  methods: {\\n    handleFinished: function handleFinished(data) {\\n      typeof alert === \\'function\\' && alert(JSON.stringify(data));\\n    },\\n  },\\n};;\\n',\n            'style': void 0\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': 'Second Step:\\n\\n```jsx\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>template</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n  </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span><span class=\"token class-name\">StepBase</span></span> <span class=\"token attr-name\">v-slot</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>{ data }<span class=\"token punctuation\">\"</span></span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>p-3 column center text-center<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>input</span>\\n      <span class=\"token attr-name\">v-model</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>data.firstName<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>form-control mb-3 w-sm<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">type</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>text<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">placeholder</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>First Name<span class=\"token punctuation\">\"</span></span>\\n    <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>input</span>\\n      <span class=\"token attr-name\">v-model</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>data.lastName<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>form-control w-sm<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">type</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>text<span class=\"token punctuation\">\"</span></span>\\n      <span class=\"token attr-name\">placeholder</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>Last Name<span class=\"token punctuation\">\"</span></span>\\n    <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\\n  </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span><span class=\"token class-name\">StepBase</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>template</span><span class=\"token punctuation\">></span></span>\\n\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>script</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\nimport StepBase from \\'./step-base\\';\\n\\nexport default {\\n  components: {\\n    StepBase,\\n  },\\n};\\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>script</span><span class=\"token punctuation\">></span></span>\\n\\n```\\n\\nWizard Container:\\n\\n```jsx\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>template</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n  </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>wizard-container<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>step-content<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>slot</span><span class=\"token punctuation\">></span></span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>slot</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>step-controller<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n      &lt;button class=\"btn\" :disabled=\"!scope.hasPrev\" @click=\"scope.prev\">\\n        Back\\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>button</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>div</span> <span class=\"token attr-name\">class</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>center<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n        Step </span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> scope<span class=\"token punctuation\">.</span>currentStep <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span><span class=\"token plain-text\"> of </span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> scope<span class=\"token punctuation\">.</span>stepsCount <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span><span class=\"token plain-text\">\\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n      &lt;button class=\"btn\" @click=\"scope.next\">\\n        </span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> scope<span class=\"token punctuation\">.</span>hasNext <span class=\"token operator\">?</span> <span class=\"token string\">\\'Next\\'</span> <span class=\"token operator\">:</span> <span class=\"token string\">\\'Finish\\'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span><span class=\"token plain-text\">\\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>button</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n  </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>div</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>template</span><span class=\"token punctuation\">></span></span>\\n\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>script</span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\nexport default {\\n  props: [\\'scope\\'],\\n};\\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>script</span><span class=\"token punctuation\">></span></span>\\n\\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;</span>style</span> <span class=\"token attr-name\">lang</span><span class=\"token attr-value\"><span class=\"token punctuation attr-equals\">=</span><span class=\"token punctuation\">\"</span>css<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\\n.wizard-container {\\n  background: #f7f7f7;\\n  border-radius: 3px;\\n  box-shadow: 0px 0px 3px 0px rgba(35, 35, 35, 0.3);\\n  color: #424242;\\n  font-size: 1.2rem;\\n  margin: 1rem;\\n  min-height: 300px;\\n\\n  display: flex;\\n  flex-direction: column;\\n}\\n\\n.step-content {\\n  display: flex;\\n  position: relative;\\n  flex: 1 1 0;\\n  overflow: hidden;\\n}\\n\\n.step-controller {\\n  border-top: 1px solid #dadada;\\n  display: flex;\\n  justify-content: space-between;\\n  padding: 0.8rem;\\n}\\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&lt;/</span>style</span><span class=\"token punctuation\">></span></span>\\n\\n```\\n\\nNote that wizard-container is for illustration purposes and is not bundled with vue-renderless-wizard'\n    }\n]\n\n//# sourceURL=webpack:///./guide/Example1/ReadMe.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/getting-started/Install.md":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/getting-started/Install.md ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': '```bash\\n<span class=\"token function\">npm</span> <span class=\"token function\">install</span> vue-renderless-wizard\\n<span class=\"token comment\"># or </span>\\n<span class=\"token function\">yarn</span> <span class=\"token function\">add</span> vue-renderless-wizard\\n```\\n\\n## Load Component\\n\\n```js\\n<span class=\"token comment\">// add it to your vue application:</span>\\n<span class=\"token keyword\">import</span> VueRenderlessWizard <span class=\"token keyword\">from</span> <span class=\"token string\">\\'vue-renderless-wizard\\'</span><span class=\"token punctuation\">;</span>\\n<span class=\"token keyword\">import</span> Vue <span class=\"token keyword\">from</span> <span class=\"token string\">\\'vue\\'</span><span class=\"token punctuation\">;</span>\\n\\nVue<span class=\"token punctuation\">.</span><span class=\"token function\">use</span><span class=\"token punctuation\">(</span>VueRenderlessWizard<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\\n\\n<span class=\"token comment\">// or</span>\\n\\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> WizardManager<span class=\"token punctuation\">,</span> WizardStep <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">\\'vue-renderless-wizard\\'</span><span class=\"token punctuation\">;</span>\\n\\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token punctuation\">{</span>\\n  components<span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\\n    WizardManager<span class=\"token punctuation\">,</span>\\n    WizardStep<span class=\"token punctuation\">,</span>\\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\\n```'\n    }]\n\n//# sourceURL=webpack:///./guide/getting-started/Install.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/getting-started/Usage.md":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./guide/getting-started/Usage.md ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [{\n        'type': 'markdown',\n        'content': 'This component is renderless, this means you have to manage the css needed for displaying steps and animations yourself.\\n\\nThere\\'s a lot of ways you can use the component, but I have prepared one example you can find in this doc.'\n    }]\n\n//# sourceURL=webpack:///./guide/getting-started/Usage.md?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/wizard-manager.vue":
/*!*********************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/wizard-manager.vue ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'description': 'Vue Renderless Wizard component (hopefully) helps you manage the steps of your wizard easily.',\n    'tags': {\n        'requires': [{\n                'description': './wizard-step.vue',\n                'title': 'requires'\n            }]\n    },\n    'exportName': 'default',\n    'displayName': 'wizard-manager',\n    'props': [\n        {\n            'name': 'initialData',\n            'description': 'The data that is used as initial data *and* **reset**',\n            'type': { 'name': 'object' },\n            'defaultValue': {\n                'func': false,\n                'value': '{}'\n            }\n        },\n        {\n            'name': 'lazy',\n            'description': 'Accessed by `<wizard-step>` component. If set, all the steps are rendered lazily.',\n            'type': { 'name': 'boolean' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        },\n        {\n            'name': 'value',\n            'description': 'Starting step index (zero-based). is 0 by default',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '0'\n            }\n        }\n    ],\n    'events': {\n        'input': {\n            'name': 'input',\n            'type': { 'names': ['undefined'] },\n            'description': 'Emitted when a step is shown. Used to update the v-model.',\n            'properties': [{\n                    'type': { 'names': ['number'] },\n                    'name': 'stepIndex',\n                    'description': 'Current selected step index (0-based index)'\n                }]\n        },\n        'finished': {\n            'name': 'finished',\n            'description': 'Emitted when there\\'s no next step remaining and **next()** function is called.',\n            'type': { 'names': ['undefined'] },\n            'properties': [{\n                    'type': { 'names': ['object'] },\n                    'name': 'data',\n                    'description': 'contains the wizard data'\n                }]\n        },\n        'activate-step': {\n            'name': 'activate-step',\n            'description': 'Emitted just before a step is shown/activated. Cancelable',\n            'type': { 'names': ['undefined'] },\n            'properties': [\n                {\n                    'type': { 'names': ['number'] },\n                    'name': 'newStepIndex',\n                    'description': 'Step being activated (0-based index)'\n                },\n                {\n                    'type': { 'names': ['number'] },\n                    'name': 'prevStepIndex',\n                    'description': 'Step that is currently active (0-based index). Will be -1 if no current active step'\n                },\n                {\n                    'type': { 'names': ['Event'] },\n                    'name': 'event',\n                    'description': 'Event object. Call event.preventDefault() to cancel'\n                }\n            ]\n        },\n        'reset': {\n            'name': 'reset',\n            'description': 'Triggered when reset is called and current step is changed to **value** prop successfully. Wizard data is reset to initial data as well.',\n            'type': { 'names': ['Event'] }\n        }\n    },\n    'methods': void 0,\n    'slots': {\n        'default': {\n            'name': 'default',\n            'bindings': [\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'currentStep',\n                    'description': 'Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don\\'t jump).'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'currentStepIndex',\n                    'description': 'Current step index. starts from zero.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'stepsCount',\n                    'description': 'Total steps count. Excludes disabled steps count so you can use it as is in UI.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'realStepsCount',\n                    'description': 'Total steps count. Including disabled steps.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function(boolean: bypassValidation)' },\n                    'name': 'next',\n                    'description': 'Proceed to next step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function' },\n                    'name': 'prev',\n                    'description': 'Proceed to previous step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function(index: number)' },\n                    'name': 'setStep',\n                    'description': 'Directly go to a step by index.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'reset' },\n                    'name': 'reset',\n                    'description': 'Emits a `reset` event, restores `initial-data` prop and goes to first step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'hasNext'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'hasPrev'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'validating',\n                    'description': 'if a validation check is in progress'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'object' },\n                    'name': 'data',\n                    'description': 'the wizard data that you can use as your data.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'backwarding',\n                    'description': 'you can think of it as which direction the wizard is moving.\\n If true, It\\'s a previous step,\\n If false, It\\'s a next step.\\n You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it\\'s one boolean.'\n                }\n            ],\n            'description': 'The default slot of wizard. You can structure your overall wizard look in here and put where the steps should be rendered.\\nThere **Must** be `<wizard-step>` components inside.'\n        }\n    },\n    'examples': __webpack_require__(/*! !./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=wizard-manager&file=.%2F..%5C..%5C..%5Csrc%5Cwizard-manager.vue&shouldShowDefaultExample=true&customLangs=vue%7Cjs%7Cjsx%7Chtml!./node_modules/vue-styleguidist/templates/DefaultExample.md */ \"./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?displayName=wizard-manager&file=.%2F..%5C..%5C..%5Csrc%5Cwizard-manager.vue&shouldShowDefaultExample=true&customLangs=vue%7Cjs%7Cjsx%7Chtml!./node_modules/vue-styleguidist/templates/DefaultExample.md\")\n}\n\t\n\n//# sourceURL=webpack:///./src/wizard-manager.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js?noExample=1!./src/wizard-step.vue":
/*!******************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js?noExample=1!./src/wizard-step.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'exportName': 'default',\n    'displayName': 'wizard-step',\n    'description': '',\n    'tags': {},\n    'props': [\n        {\n            'name': 'active',\n            'description': 'is this the current active step or not.\\nwhen set, wizard manager will render this set.\\nif there\\'s multiple active steps, only the last one with active is rendered.\\ndisabled steps are ignored.',\n            'type': { 'name': 'boolean' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        },\n        {\n            'name': 'disabled',\n            'description': 'Should this step be skipped in counting and\\nwhen the `Next` or `Prev` method is called ?',\n            'type': { 'name': 'boolean' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        },\n        {\n            'name': 'lazy',\n            'description': 'Should this step be rendered only when It\\'s active ? False means render all the time. <wizard-manager> can override this.',\n            'type': { 'name': 'boolean' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        },\n        {\n            'name': 'transition',\n            'description': 'Data object for passing to render function of \\'transition\\' component.\\nanything in this object will be passed to the render function directly.',\n            'type': { 'name': 'object|func' },\n            'defaultValue': {\n                'func': true,\n                'value': '() => ({})'\n            }\n        },\n        {\n            'name': 'validate',\n            'description': 'A function which will be called with wizard data as argument whenever the `Next` button is called. This function can return a Promise.',\n            'type': { 'name': 'boolean|func' },\n            'defaultValue': {\n                'func': false,\n                'value': 'false'\n            }\n        }\n    ],\n    'events': {\n        'active': {\n            'name': 'active',\n            'type': { 'names': ['undefined'] }\n        }\n    },\n    'methods': void 0,\n    'slots': {\n        'default': {\n            'name': 'default',\n            'bindings': [\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'active',\n                    'description': 'true if this step component content should rendered'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'currentStep',\n                    'description': 'Current step number. Starts from 1 and Excludes disabled steps count so you can use it as is in UI (numbers don\\'t jump).'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'currentStepIndex',\n                    'description': 'Current step index. starts from zero.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'stepsCount',\n                    'description': 'Total steps count. Excludes disabled steps count so you can use it as is in UI.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'number' },\n                    'name': 'realStepsCount',\n                    'description': 'Total steps count. Including disabled steps.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function(boolean: bypassValidation)' },\n                    'name': 'next',\n                    'description': 'Proceed to next step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function' },\n                    'name': 'prev',\n                    'description': 'Proceed to previous step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'function(index: number)' },\n                    'name': 'setStep',\n                    'description': 'Directly go to a step by index.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'reset' },\n                    'name': 'reset',\n                    'description': 'Emits a `reset` event, restores `initial-data` prop and goes to first step'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'hasNext'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'hasPrev'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'validating',\n                    'description': 'if a validation check is in progress'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'object' },\n                    'name': 'data',\n                    'description': 'the wizard data that you can use as your data.'\n                },\n                {\n                    'title': 'binding',\n                    'type': { 'name': 'boolean' },\n                    'name': 'backwarding',\n                    'description': 'you can think of it as which direction the wizard is moving.\\n If true, It\\'s a previous step,\\n If false, It\\'s a next step.\\n You have to note though that it can be neither forwarding or backwarding (at the time of accessing this), but for simplicity it\\'s one boolean.'\n                }\n            ],\n            'description': 'The default slot of wizard-step. This slot provides scoped data and methods you can use in your steps.'\n        }\n    },\n    'examples': [{ 'type': 'noexample' }]\n}\n\t\n\n//# sourceURL=webpack:///./src/wizard-step.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js?noExample=1");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! exports provided: default, WizardManager, WizardStep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _wizard_manager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/wizard-manager.vue */ \"./src/wizard-manager.vue\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WizardManager\", function() { return _wizard_manager_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _wizard_step_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/wizard-step.vue */ \"./src/wizard-step.vue\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"WizardStep\", function() { return _wizard_step_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n// Import vue component\n\n // install function executed by Vue.use()\n\nvar install = function installVueRenderlessWizard(Vue) {\n  if (install.installed) return;\n  install.installed = true;\n  Vue.component('WizardManager', _wizard_manager_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  Vue.component('WizardStep', _wizard_step_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n}; // Create module definition for Vue.use()\n\n\nvar plugin = {\n  install: install\n}; // To auto-install when vue is found\n// eslint-disable-next-line no-redeclare\n\n/* global window, global */\n\nvar GlobalVue = null;\n\nif (typeof window !== 'undefined') {\n  GlobalVue = window.Vue;\n} else if (typeof global !== 'undefined') {\n  GlobalVue = global.Vue;\n}\n\nif (GlobalVue) {\n  GlobalVue.use(plugin);\n} // Inject install function into component - allows component\n// to be registered via Vue.use() as well as Vue.component()\n\n\n_wizard_manager_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].install = install; // Export component by default\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_wizard_manager_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n // It's possible to expose named exports when writing components that can\n// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';\n// export const RollupDemoDirective = component;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/utils/cloneDeep.js":
/*!********************************!*\
  !*** ./src/utils/cloneDeep.js ***!
  \********************************/
/*! exports provided: cloneDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cloneDeep\", function() { return cloneDeep; });\n/* harmony import */ var _inspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inspect */ \"./src/utils/inspect.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nvar cloneDeep = function cloneDeep(obj) {\n  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj;\n\n  if (Array.isArray(obj)) {\n    return obj.reduce(function (result, val) {\n      return [].concat(_toConsumableArray(result), [cloneDeep(val, val)]);\n    }, []);\n  }\n\n  if (Object(_inspect__WEBPACK_IMPORTED_MODULE_0__[\"isPlainObject\"])(obj)) {\n    return Object.keys(obj).reduce(function (result, key) {\n      return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, key, cloneDeep(obj[key], obj[key])));\n    }, {});\n  }\n\n  return defaultValue;\n};\n\n//# sourceURL=webpack:///./src/utils/cloneDeep.js?");

/***/ }),

/***/ "./src/utils/filters.js":
/*!******************************!*\
  !*** ./src/utils/filters.js ***!
  \******************************/
/*! exports provided: notDisabled, disabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notDisabled\", function() { return notDisabled; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"disabled\", function() { return disabled; });\n// Filter function to filter out disabled steps\nvar notDisabled = function notDisabled(step) {\n  return !step.disabled;\n};\nvar disabled = function disabled(step) {\n  return step.disabled;\n};\n\n//# sourceURL=webpack:///./src/utils/filters.js?");

/***/ }),

/***/ "./src/utils/inspect.js":
/*!******************************!*\
  !*** ./src/utils/inspect.js ***!
  \******************************/
/*! exports provided: isFunction, isPlainObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFunction\", function() { return isFunction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isPlainObject\", function() { return isPlainObject; });\nvar isFunction = function isFunction(value) {\n  return typeof value === 'function';\n}; // Strict object type check\n// Only returns true for plain JavaScript objects\n\nvar isPlainObject = function isPlainObject(obj) {\n  return Object.prototype.toString.call(obj) === '[object Object]';\n};\n\n//# sourceURL=webpack:///./src/utils/inspect.js?");

/***/ }),

/***/ "./src/utils/number.js":
/*!*****************************!*\
  !*** ./src/utils/number.js ***!
  \*****************************/
/*! exports provided: toInteger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toInteger\", function() { return toInteger; });\nvar toInteger = function toInteger(value) {\n  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;\n  var integer = parseInt(value, 10);\n  return isNaN(integer) ? defaultValue : integer;\n};\n\n//# sourceURL=webpack:///./src/utils/number.js?");

/***/ }),

/***/ "./src/wizard-manager.vue":
/*!********************************!*\
  !*** ./src/wizard-manager.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wizard_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wizard-manager.vue?vue&type=script&lang=js& */ \"./src/wizard-manager.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _wizard_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/wizard-manager.vue?");

/***/ }),

/***/ "./src/wizard-manager.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/wizard-manager.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--13-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./wizard-manager.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/wizard-manager.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/wizard-manager.vue?");

/***/ }),

/***/ "./src/wizard-step.vue":
/*!*****************************!*\
  !*** ./src/wizard-step.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wizard_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wizard-step.vue?vue&type=script&lang=js& */ \"./src/wizard-step.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _wizard_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/wizard-step.vue?");

/***/ }),

/***/ "./src/wizard-step.vue?vue&type=script&lang=js&":
/*!******************************************************!*\
  !*** ./src/wizard-step.vue?vue&type=script&lang=js& ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--13-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--1-0!../node_modules/vue-loader/lib??vue-loader-options!./wizard-step.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/wizard-step.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wizard_step_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/wizard-step.vue?");

/***/ }),

/***/ 0:
/*!*******************************************************************************!*\
  !*** multi ./guide/setup.js ./node_modules/vue-styleguidist/lib/client/index ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! F:\\Projects\\Private\\npm packages\\vue\\vue-renderless-wizard\\guide\\setup.js */\"./guide/setup.js\");\nmodule.exports = __webpack_require__(/*! F:\\Projects\\Private\\npm packages\\vue\\vue-renderless-wizard\\node_modules\\vue-styleguidist\\lib\\client\\index */\"./node_modules/vue-styleguidist/lib/client/index.js\");\n\n\n//# sourceURL=webpack:///multi_./guide/setup.js_./node_modules/vue-styleguidist/lib/client/index?");

/***/ })

/******/ });