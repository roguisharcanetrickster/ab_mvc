/******/ var __webpack_modules__ = ({

/***/ "./web/FNViewLLM.js"
/*!**************************!*\
  !*** ./web/FNViewLLM.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FNViewLLM)
/* harmony export */ });
/* harmony import */ var _FNViewLLMComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FNViewLLMComponent.js */ "./web/FNViewLLMComponent.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


// FNViewLLM Web
// ABView definition for the LLM widget. Hosts a chat-like UI that talks to a
// stubbed server endpoint (POST /llm/complete) and, when the user clicks
// "Build", persists a minimal DefinitionBundle via the existing
// /definition/bundle/create flow (ab_plugin_ab_mvc service).
function FNViewLLM(_ref) {
  var ABViewPlugin = _ref.ABViewPlugin,
    ABViewComponentPlugin = _ref.ABViewComponentPlugin;
  var ABViewLLMComponent = (0,_FNViewLLMComponent_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ABViewComponentPlugin: ABViewComponentPlugin
  });
  var ABViewLLMComponentDefaults = {
    systemPrompt: "process",
    placeholder: ""
  };
  var ABViewDefaults = {
    key: "ab-view-view-llm",
    icon: "comments",
    labelKey: "Plugin ab-view-view-llm"
  };
  return /*#__PURE__*/function (_ABViewPlugin) {
    function ABViewLLM() {
      _classCallCheck(this, ABViewLLM);
      return _callSuper(this, ABViewLLM, arguments);
    }
    _inherits(ABViewLLM, _ABViewPlugin);
    return _createClass(ABViewLLM, [{
      key: "component",
      value: function component(parentId) {
        return new ABViewLLMComponent(this, parentId);
      }
    }, {
      key: "toObj",
      value: function toObj() {
        var obj = _superPropGet(ABViewLLM, "toObj", this, 3)([]);
        obj.views = [];
        return obj;
      }
    }, {
      key: "fromValues",
      value: function fromValues(values) {
        _superPropGet(ABViewLLM, "fromValues", this, 3)([values]);
        this.settings = this.settings || {};
      }
    }, {
      key: "componentList",
      value: function componentList() {
        return [];
      }
    }], [{
      key: "getPluginKey",
      value: function getPluginKey() {
        return "ab-view-view-llm";
      }
    }, {
      key: "common",
      value: function common() {
        return ABViewDefaults;
      }
    }, {
      key: "defaultValues",
      value: function defaultValues() {
        return ABViewLLMComponentDefaults;
      }
    }]);
  }(ABViewPlugin);
}

/***/ },

/***/ "./web/FNViewLLMComponent.js"
/*!***********************************!*\
  !*** ./web/FNViewLLMComponent.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FNViewLLMComponent)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// FNViewLLMComponent
// Webix UI for the LLM widget. Renders:
//   - system prompt switcher (process / object / interface)
//   - prompt textarea (input)
//   - Send button -> POST /llm/complete (stubbed) -> writes plan text to output
//   - Build button -> for systemPrompt=process, persists a minimal
//     DefinitionBundle through AB.definitionBundleCreate. For other
//     systemPrompts, alerts a TODO (no platform helpers yet).
//   - response textarea (output, readonly)
function FNViewLLMComponent(_ref) {
  var ABViewComponentPlugin = _ref.ABViewComponentPlugin;
  return /*#__PURE__*/function (_ABViewComponentPlugi) {
    function ABViewLLMComponent(baseView, idBase, ids) {
      _classCallCheck(this, ABViewLLMComponent);
      return _callSuper(this, ABViewLLMComponent, [baseView, idBase || "ABViewLLM_".concat(baseView.id), Object.assign({
        systemPrompt: "",
        input: "",
        output: "",
        buttonSend: "",
        buttonBuild: ""
      }, ids)]);
    }
    _inherits(ABViewLLMComponent, _ABViewComponentPlugi);
    return _createClass(ABViewLLMComponent, [{
      key: "ui",
      value: function ui() {
        var _this = this;
        this.settings = this.view.settings || {};
        var ids = this.ids;
        var systemPrompt = this.settings.systemPrompt || "process";
        var placeholder = this.settings.placeholder || "";
        var _ui = _superPropGet(ABViewLLMComponent, "ui", this, 3)([[{
          view: "richselect",
          id: ids.systemPrompt,
          label: "System Prompt",
          labelWidth: 120,
          value: systemPrompt,
          options: [{
            id: "process",
            value: "Process"
          }, {
            id: "object",
            value: "Object"
          }, {
            id: "interface",
            value: "Interface"
          }]
        }, {
          view: "textarea",
          id: ids.input,
          height: 100,
          placeholder: placeholder || "Describe what to build..."
        }, {
          cols: [{
            fillspace: true
          }, {
            view: "button",
            id: ids.buttonSend,
            value: "Send",
            autowidth: true,
            click: function click() {
              return _this._sendLLM();
            }
          }, {
            view: "button",
            id: ids.buttonBuild,
            value: "Build",
            css: "webix_primary",
            autowidth: true,
            click: function click() {
              return _this._build();
            }
          }]
        }, {
          view: "textarea",
          id: ids.output,
          readonly: true,
          height: 200,
          placeholder: "LLM response will appear here."
        }]]);
        return _ui;
      }
    }, {
      key: "onShow",
      value: function onShow() {
        _superPropGet(ABViewLLMComponent, "onShow", this, 3)([]);
      }

      /**
       * @method _sendLLM
       * POST the current prompt + systemPrompt to /llm/complete and write
       * the response text into the output textarea.
       */
    }, {
      key: "_sendLLM",
      value: (function () {
        var _sendLLM2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var ids, AB, prompt, systemPrompt, result, text, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                ids = this.ids;
                AB = this.view && this.view.AB;
                if (!(!AB || !AB.Network || typeof AB.Network.post !== "function")) {
                  _context.n = 1;
                  break;
                }
                webix.alert({
                  title: "LLM",
                  text: "Network unavailable."
                });
                return _context.a(2);
              case 1:
                prompt = $$(ids.input) && $$(ids.input).getValue() || "";
                systemPrompt = $$(ids.systemPrompt) && $$(ids.systemPrompt).getValue() || "process";
                _context.p = 2;
                _context.n = 3;
                return AB.Network.post({
                  url: "/llm/complete",
                  data: {
                    systemPrompt: systemPrompt,
                    prompt: prompt
                  }
                });
              case 3:
                result = _context.v;
                text = result && result.text || "";
                if ($$(ids.output)) $$(ids.output).setValue(text);
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
                webix.alert({
                  title: "LLM error",
                  text: _t && _t.message || "Unknown error"
                });
              case 5:
                return _context.a(2);
            }
          }, _callee, this, [[2, 4]]);
        }));
        function _sendLLM() {
          return _sendLLM2.apply(this, arguments);
        }
        return _sendLLM;
      }()
      /**
       * @method _build
       * Persist a minimal DefinitionBundle through the existing
       * POST /definition/bundle/create flow. Only `process` systemPrompt is
       * wired for MVP - other types alert a TODO.
       */
      )
    }, {
      key: "_build",
      value: (function () {
        var _build2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var ids, AB, systemPrompt, name, bundle, results, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                ids = this.ids;
                AB = this.view && this.view.AB;
                systemPrompt = $$(ids.systemPrompt) && $$(ids.systemPrompt).getValue() || "process";
                if (!(systemPrompt !== "process")) {
                  _context2.n = 1;
                  break;
                }
                webix.alert({
                  title: "Build",
                  text: "TODO: Build is only wired for 'process' in this MVP. " + "Add definitionBundleNewMinimal" + systemPrompt.charAt(0).toUpperCase() + systemPrompt.slice(1) + " to enable."
                });
                return _context2.a(2, false);
              case 1:
                if (!(!AB || typeof AB.definitionBundleNewMinimalProcess !== "function" || typeof AB.definitionBundleCreate !== "function")) {
                  _context2.n = 2;
                  break;
                }
                webix.alert({
                  title: "Build",
                  text: "Definition bundle helpers unavailable."
                });
                return _context2.a(2, false);
              case 2:
                name = $$(ids.input) && $$(ids.input).getValue() || "";
                if (name.trim()) {
                  _context2.n = 3;
                  break;
                }
                webix.alert({
                  title: "Build",
                  text: "Enter a prompt to use as the process name."
                });
                return _context2.a(2, false);
              case 3:
                _context2.p = 3;
                bundle = AB.definitionBundleNewMinimalProcess({
                  name: name
                });
                _context2.n = 4;
                return AB.definitionBundleCreate(bundle);
              case 4:
                results = _context2.v;
                if (typeof webix.message === "function") {
                  webix.message({
                    type: "success",
                    text: "Created process ".concat(results.process.id)
                  });
                }
                return _context2.a(2, results);
              case 5:
                _context2.p = 5;
                _t2 = _context2.v;
                webix.alert({
                  title: "Build error",
                  text: _t2 && _t2.message || "Unknown error"
                });
                return _context2.a(2, false);
            }
          }, _callee2, this, [[3, 5]]);
        }));
        function _build() {
          return _build2.apply(this, arguments);
        }
        return _build;
      }())
    }]);
  }(ABViewComponentPlugin);
}

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************!*\
  !*** ./web.js ***!
  \****************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerWeb)
/* harmony export */ });
/* harmony import */ var _web_FNViewLLM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web/FNViewLLM.js */ "./web/FNViewLLM.js");

function registerWeb(PluginAPI) {
  return [(0,_web_FNViewLLM_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PluginAPI)];
}
})();

const __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };

//# sourceMappingURL=ABAbMvc_web.mjs.map