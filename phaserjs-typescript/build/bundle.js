/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/// <reference path=\"../dist/lib/phaser.d.ts\"/>\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Boot_1 = __webpack_require__(/*! ./game/game_state/Boot */ \"./src/game/game_state/Boot.ts\");\nconst Preload_1 = __webpack_require__(/*! ./game/game_state/Preload */ \"./src/game/game_state/Preload.ts\");\nconst Play_1 = __webpack_require__(/*! ./game/game_state/Play */ \"./src/game/game_state/Play.ts\");\nexports.SCALE = 2;\nconst GAME_WIDTH = 1200;\nconst GAME_HEIGHT = 800;\nclass SimpleGame extends Phaser.Game {\n    constructor() {\n        super({\n            width: GAME_WIDTH / exports.SCALE,\n            height: GAME_HEIGHT / exports.SCALE,\n            renderer: Phaser.CANVAS,\n            parent: null,\n            state: 'content',\n            transparent: false,\n            antialias: false,\n            physicsConfig: false\n        });\n        this.antialias = false;\n        this.state.add('Boot', Boot_1.default);\n        this.state.add('Preload', Preload_1.default);\n        this.state.add('Play', Play_1.default);\n        this.state.start('Boot');\n    }\n}\nwindow.onload = () => {\n    new SimpleGame();\n};\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/game/game_state/Boot.ts":
/*!*************************************!*\
  !*** ./src/game/game_state/Boot.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst app_1 = __webpack_require__(/*! ../../app */ \"./src/app.ts\");\nclass Boot extends Phaser.State {\n    create() {\n        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;\n        this.game.scale.setUserScale(app_1.SCALE, app_1.SCALE);\n        this.game.renderer.renderSession.roundPixels = true;\n        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);\n        this.game.state.start('Preload');\n    }\n}\nexports.default = Boot;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Boot.ts?");

/***/ }),

/***/ "./src/game/game_state/Play.ts":
/*!*************************************!*\
  !*** ./src/game/game_state/Play.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Play extends Phaser.State {\n    constructor() {\n        super();\n    }\n    create(game) {\n        /* Text example */\n        game.add.bitmapText(100, 100, 'font', 'Sample text', 7);\n        /* Graphics example */\n        const graphics = game.add.graphics(100, 150);\n        graphics.lineStyle(2, 0xffff00);\n        graphics.drawRect(0, 0, 50, 50);\n        /* Image example */\n        game.add.image(100, 250, 'chips', 0);\n        /* Animated sprite example */\n        const sprite = game.add.sprite(100, 300, 'chips', 1);\n        sprite.animations.add('animationName', [1, 2, 3, 4], 4, true);\n        sprite.animations.play('animationName');\n        /* Tween example */\n        game.add.tween(sprite).to({ x: 500 }, 4000, Phaser.Easing.Default, true);\n    }\n    update(game) {\n    }\n}\nexports.default = Play;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Play.ts?");

/***/ }),

/***/ "./src/game/game_state/Preload.ts":
/*!****************************************!*\
  !*** ./src/game/game_state/Preload.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Preload extends Phaser.State {\n    preload() {\n        this.loadAudio();\n        this.loadImages();\n        this.loadFonts();\n    }\n    create() {\n        this.game.state.start('Play');\n    }\n    loadAudio() {\n    }\n    loadImages() {\n        this.game.load.spritesheet('chips', 'assets/images/chips.png', 12, 12);\n    }\n    loadFonts() {\n        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');\n    }\n}\nexports.default = Preload;\n\n\n//# sourceURL=webpack:///./src/game/game_state/Preload.ts?");

/***/ })

/******/ });