/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hooks/attributes/device-visibility/index.js":
/*!*********************************************************!*\
  !*** ./src/hooks/attributes/device-visibility/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Device Attributes
 */

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'bep/device-attributes', function (settings) {
  settings.attributes = Object.assign(settings.attributes, {
    hideOnDesktop: {
      type: 'boolean',
      default: false
    },
    hideOnTablet: {
      type: 'boolean',
      default: false
    },
    hideOnMobile: {
      type: 'boolean',
      default: false
    }
  });
  return settings;
});

/***/ }),

/***/ "./src/hooks/attributes/index.js":
/*!***************************************!*\
  !*** ./src/hooks/attributes/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _device_visibility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device-visibility */ "./src/hooks/attributes/device-visibility/index.js");
/* harmony import */ var _typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typography */ "./src/hooks/attributes/typography/index.js");
// Attributes



/***/ }),

/***/ "./src/hooks/attributes/typography/index.js":
/*!**************************************************!*\
  !*** ./src/hooks/attributes/typography/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Typography Attributes
 */

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'bep/typography-attributes', function (settings, name) {
  if (name === 'core/paragraph' || name === 'core/heading') {
    settings.attributes = Object.assign(settings.attributes, {
      deskFontSize: {
        type: 'number'
      },
      tabFontSize: {
        type: 'number'
      },
      mobFontSize: {
        type: 'number'
      }
    });
  }

  return settings;
});

/***/ }),

/***/ "./src/hooks/generator/device-visibility/index.js":
/*!********************************************************!*\
  !*** ./src/hooks/generator/device-visibility/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const {
  createHigherOrderComponent
} = wp.compose;
const {
  addFilter
} = wp.hooks;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  ToggleControl
} = wp.components;
const {
  __
} = wp.i18n;
/**
 * Add device visibility settings to block sidebar
 */

const bepAddVisibilitySettings = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      hideOnDesktop,
      hideOnTablet,
      hideOnMobile
    } = attributes; // Check if the SelectControl is already rendered for this block

    const isSelectControlRendered = attributes.selectControlRendered;

    if (isSelectControlRendered) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props);
    } // Set selectControlRendered attribute to true to prevent rendering again


    const updatedAttributes = { ...attributes,
      selectControlRendered: true
    }; // Add SelectControl to InspectorControls

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      attributes: updatedAttributes
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(PanelBody, {
      title: __('Visibility', 'block-editor-plus'),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ToggleControl, {
      label: __('Hide on Desktop', 'block-editor-plus'),
      checked: hideOnDesktop,
      onChange: () => setAttributes({
        hideOnDesktop: !hideOnDesktop
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ToggleControl, {
      label: __('Hide on Tablet', 'block-editor-plus'),
      checked: hideOnTablet,
      onChange: () => setAttributes({
        hideOnTablet: !hideOnTablet
      })
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(ToggleControl, {
      label: __('Hide on Mobile', 'block-editor-plus'),
      checked: hideOnMobile,
      onChange: () => setAttributes({
        hideOnMobile: !hideOnMobile
      })
    }))));
  };
}, 'bepAddVisibilitySettings');
addFilter('editor.BlockEdit', 'bep/device-controls', bepAddVisibilitySettings);
/**
 * Add visibility class to block
 */

const bepAddVisibilityClass = createHigherOrderComponent(BlockListBlock => {
  return props => {
    const {
      attributes
    } = props;
    const {
      hideOnDesktop,
      hideOnTablet,
      hideOnMobile
    } = attributes;
    const hideOnDesktopClass = hideOnDesktop ? 'bep-hide__desktop' : '';
    const hideOnTabletClass = hideOnTablet ? ' bep-hide__tablet' : '';
    const hideOnMobileClass = hideOnMobile ? ' bep-hide__mobile' : '';
    const combinedClasses = hideOnDesktopClass + hideOnTabletClass + hideOnMobileClass;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: combinedClasses
    }));
  };
}, 'bepAddVisibilityClass');
addFilter('editor.BlockListBlock', 'bep/device-class', bepAddVisibilityClass);

/***/ }),

/***/ "./src/hooks/generator/index.js":
/*!**************************************!*\
  !*** ./src/hooks/generator/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _device_visibility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device-visibility */ "./src/hooks/generator/device-visibility/index.js");
/* harmony import */ var _typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typography */ "./src/hooks/generator/typography/index.js");



/***/ }),

/***/ "./src/hooks/generator/typography/index.js":
/*!*************************************************!*\
  !*** ./src/hooks/generator/typography/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const {
  createHigherOrderComponent
} = wp.compose;
const {
  addFilter
} = wp.hooks;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  RangeControl
} = wp.components;
const {
  __
} = wp.i18n;
/**
 * Add Typography settings to block sidebar
 */

const bepAddTypographySettings = createHigherOrderComponent(BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes
    } = props;
    const {
      deskFontSize,
      tabFontSize,
      mobFontSize
    } = attributes; // Check if the SelectControl is already rendered for this block

    const isTypoRendered = attributes.typoRendered;

    if (isTypoRendered) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, props);
    } // Set selectControlRendered attribute to true to prevent rendering again


    const updatedAttributes = { ...attributes,
      typoRendered: true
    }; // Add SelectControl to InspectorControls

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockEdit, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      attributes: updatedAttributes
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(PanelBody, {
      title: __('Typography', 'block-editor-plus'),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RangeControl, {
      label: __('Desktop Font Size', 'block-editor-plus'),
      value: deskFontSize,
      onChange: value => setAttributes({
        deskFontSize: value
      }),
      min: 1,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RangeControl, {
      label: __('Tablet Font Size', 'block-editor-plus'),
      value: tabFontSize,
      onChange: value => setAttributes({
        tabFontSize: value
      }),
      min: 1,
      max: 100
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(RangeControl, {
      label: __('Mobile Font Size', 'block-editor-plus'),
      value: mobFontSize,
      onChange: value => setAttributes({
        mobFontSize: value
      }),
      min: 1,
      max: 100
    }))));
  };
}, 'bepAddTypographySettings');
addFilter('editor.BlockEdit', 'bep/typo-controls', bepAddTypographySettings);
/**
 * Add style to block
 */

const bepAddTypoStyle = createHigherOrderComponent(BlockListBlock => {
  return props => {
    const {
      attributes
    } = props;
    const {
      deskFontSize,
      tabFontSize,
      mobFontSize
    } = attributes; // return (
    // 	<BlockListBlock {...props} className="bep-container">
    // 		{`<style>
    //         .bep-container {
    //             font-size: ${deskFontSize}px;
    //         }
    //     </style>`}
    // 	</BlockListBlock>
    // );

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(BlockListBlock, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: "bep-container"
    }));
  };
}, 'bepAddTypoStyle');
addFilter('editor.BlockListBlock', 'bep/typo-style', bepAddTypoStyle);

/***/ }),

/***/ "./src/hooks/scss/index.scss":
/*!***********************************!*\
  !*** ./src/hooks/scss/index.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/index.scss */ "./src/hooks/scss/index.scss");
/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attributes */ "./src/hooks/attributes/index.js");
/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generator */ "./src/hooks/generator/index.js");
// editor style
 // Attributes

 // Controls


})();

/******/ })()
;
//# sourceMappingURL=index.js.map