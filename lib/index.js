/*! 2c8c008 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("index", [], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory();
	else
		root["index"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generateUniqueId = {
  defaultOpts: {
    length: 10,
    useLetters: true,
    useNumbers: true,
    includeSymbols: [],
    excludeSymbols: []
  },
  init: function (opts={}) {
    this.config = Object.assign({}, this.defaultOpts, opts);
    let mainArr = [];
    let lettersArr = [];
    let numbersArr = [];

    if (this.config.useLetters) {
      if (this.config.excludeSymbols.length) this.filterSymbols('letters');
      lettersArr = this.letters.split('');
    }

    if (this.config.useNumbers) {
      if (this.config.excludeSymbols.length) this.filterSymbols('numbers');
      numbersArr = this.numbers.split('');
    }

    this.pool = mainArr.concat(lettersArr, numbersArr, this.config.includeSymbols);

    return this.createID();
  },
  letters: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  pool: [],
  filterSymbols: function(group) {
    this.config.excludeSymbols.map(item => this[group] = this[group].replace(item, ''));
  },
  getRandomNumber: function() {
    return Math.floor(Math.random()*this.pool.length);
  },
  createID: function() {
    let id = '';
    for (let i=0;i<this.config.length;i++){
      id += this.pool[this.getRandomNumber()];
    }

    return id;
  }
}

module.exports = generateUniqueId;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "Controller", function() { return /* reexport */ core_Controller; });
__webpack_require__.d(__webpack_exports__, "Model", function() { return /* reexport */ core_Model; });
__webpack_require__.d(__webpack_exports__, "View", function() { return /* reexport */ core_View; });
__webpack_require__.d(__webpack_exports__, "AsyncMacroCommand", function() { return /* reexport */ command_AsyncMacroCommand; });
__webpack_require__.d(__webpack_exports__, "Guard", function() { return /* reexport */ command_Guard; });
__webpack_require__.d(__webpack_exports__, "SimpleCommand", function() { return /* reexport */ command_SimpleCommand; });
__webpack_require__.d(__webpack_exports__, "SyncMacroCommand", function() { return /* reexport */ command_SyncMacroCommand; });
__webpack_require__.d(__webpack_exports__, "Facade", function() { return /* reexport */ facade_Facade; });
__webpack_require__.d(__webpack_exports__, "Mediator", function() { return /* reexport */ mediator_Mediator; });
__webpack_require__.d(__webpack_exports__, "Notifier", function() { return /* reexport */ observer_Notifier; });
__webpack_require__.d(__webpack_exports__, "Proxy", function() { return /* reexport */ proxy_Proxy; });

// EXTERNAL MODULE: ../node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__(0);
var eventemitter3_default = /*#__PURE__*/__webpack_require__.n(eventemitter3);

// CONCATENATED MODULE: ./core/View.ts

var View_View = /** @class */ (function () {
    function View(key) {
        this.mediatorMap = {};
        this.eventEmitter = new eventemitter3_default.a();
        if (View.instanceMap[key]) {
            throw new Error(MULTITON_MSG);
        }
        this.multitonKey = key;
        this.initializeView();
    }
    View.getInstance = function (key) {
        if (!key) {
            return null;
        }
        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new View(key);
        }
        return this.instanceMap[key];
    };
    View.removeView = function (key) {
        delete this.instanceMap[key];
    };
    View.prototype.removeObserver = function (notificationName, observerMethod, context) {
        this.eventEmitter.removeListener(notificationName, observerMethod, context);
    };
    View.prototype.registerObserver = function (notificationName, observerMethod, context) {
        this.eventEmitter.on(notificationName, observerMethod, context);
    };
    View.prototype.notifyObservers = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.eventEmitter).emit.apply(_a, [notificationName, notificationName].concat(args));
    };
    View.prototype.registerMediator = function (mediator) {
        if (this.hasMediator(mediator.getMediatorName(), mediator.getMediatorId())) {
            return;
        }
        mediator.initializeNotifier(this.multitonKey);
        mediator.registerNotificationInterests();
        // register the mediator for retrieval by name
        if (!this.mediatorMap[mediator.getMediatorName()]) {
            this.mediatorMap[mediator.getMediatorName()] = [];
        }
        this.mediatorMap[mediator.getMediatorName()].push({
            mediator: mediator,
            interests: mediator.listNotificationInterests.slice(),
            id: mediator.getMediatorId(),
        });
        // get notification interests if any
        var interests = this.mediatorMap[mediator.getMediatorName()][0]
            .interests;
        // register mediator as an observer for each notification
        if (interests.length > 0) {
            for (var _i = 0, interests_1 = interests; _i < interests_1.length; _i++) {
                var interest = interests_1[_i];
                this.registerObserver(interest, mediator.handleSubscribedNotification, mediator);
            }
        }
        mediator.onRegister();
    };
    View.prototype.updateMediator = function (mediator) {
        if (!this.hasMediator(mediator.getMediatorName(), mediator.getMediatorId())) {
            return;
        }
        var mediators = this.mediatorMap[mediator.getMediatorName()];
        var targetElement = mediators.filter(function (element) {
            return element.id === mediator.getMediatorId();
        })[0];
        var registeredInterests = targetElement.interests;
        var newInterests = mediator.listNotificationInterests;
        for (var _i = 0, registeredInterests_1 = registeredInterests; _i < registeredInterests_1.length; _i++) {
            var interest = registeredInterests_1[_i];
            // interest
            this.removeObserver(interest, mediator.handleSubscribedNotification, mediator);
        }
        for (var _a = 0, newInterests_1 = newInterests; _a < newInterests_1.length; _a++) {
            var interest = newInterests_1[_a];
            this.registerObserver(interest, mediator.handleSubscribedNotification, mediator);
        }
        targetElement.interests = newInterests.slice();
    };
    View.prototype.retrieveMediator = function (mediatorName, id) {
        var mediators = this.mediatorMap[mediatorName];
        if (!!mediators && mediators.length) {
            return id
                ? mediators.filter(function (element) { return element.id === id; })[0].mediator
                : mediators[0].mediator;
        }
        else {
            return null;
        }
    };
    View.prototype.retrieveMediators = function (mediatorName) {
        return this.mediatorMap[mediatorName].map(function (element) { return element.mediator; });
    };
    View.prototype.removeMediator = function (mediatorName, id) {
        if (!this.mediatorMap[mediatorName]) {
            return null;
        }
        var mediators = this.mediatorMap[mediatorName];
        var targetElement = id
            ? mediators.filter(function (element) {
                return element.id === id;
            })[0]
            : this.mediatorMap[mediatorName][0];
        if (!targetElement) {
            return null;
        }
        // for every notification the mediator is interested in...
        var interests = targetElement.interests;
        for (var _i = 0, interests_2 = interests; _i < interests_2.length; _i++) {
            var interest = interests_2[_i];
            // interest
            this.removeObserver(interest, targetElement.mediator.handleSubscribedNotification, targetElement.mediator);
        }
        // remove the mediator from the map
        var index = this.mediatorMap[mediatorName].indexOf(targetElement);
        if (index !== -1) {
            this.mediatorMap[mediatorName].splice(index, 1);
        }
        if (this.mediatorMap[mediatorName].length === 0) {
            delete this.mediatorMap[mediatorName];
        }
        // alert the mediator that it has been removed
        targetElement.mediator.onRemove();
        return targetElement.mediator;
    };
    View.prototype.hasMediator = function (mediatorName, id) {
        return this.mediatorMap[mediatorName]
            ? id
                ? this.mediatorMap[mediatorName].filter(function (el) { return el.id === id; }).length > 0
                : this.mediatorMap[mediatorName].length > 0
            : false;
    };
    View.prototype.initializeView = function () { };
    View.prototype.getMediatorsCount = function (mediatorName) {
        return this.mediatorMap[mediatorName]
            ? this.mediatorMap[mediatorName].length
            : 0;
    };
    View.prototype.getMediatorIndex = function (mediator) {
        var mediatorMapElements = this.mediatorMap[mediator.getMediatorName()];
        var mapElement = mediatorMapElements.filter(function (el) { return el.mediator === mediator; })[0];
        return mediatorMapElements.indexOf(mapElement);
    };
    View.instanceMap = {};
    return View;
}());
/* harmony default export */ var core_View = (View_View);
var MULTITON_MSG = 'View instance for this Multiton key already constructed!';

// CONCATENATED MODULE: ./core/Controller.ts

var Controller_Controller = /** @class */ (function () {
    function Controller(key) {
        this.commandMap = {};
        if (Controller.instanceMap[key]) {
            throw new Error(Controller_MULTITON_MSG);
        }
        this.multitonKey = key;
        this.initializeController();
    }
    Controller.removeController = function (key) {
        delete this.instanceMap[key];
    };
    Controller.getInstance = function (key) {
        if (!key) {
            return null;
        }
        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new Controller(key);
        }
        return this.instanceMap[key];
    };
    Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
        if (!this.commandMap[notificationName]) {
            this.commandMap[notificationName] = [];
            this.view.registerObserver(notificationName, this.executeCommand, this);
        }
        this.commandMap[notificationName].push(commandClassRef);
    };
    Controller.prototype.registerCommandOnce = function (notificationName, commandClassRef) {
        if (!this.commandMap[notificationName]) {
            this.commandMap[notificationName] = [];
            this.view.registerObserver(notificationName, this.executeCommand, this);
            this.view.registerObserver(notificationName, this.removeCommand.bind(this, notificationName, commandClassRef), this);
        }
        this.commandMap[notificationName].push(commandClassRef);
    };
    Controller.prototype.hasCommand = function (notificationName, commandClassRef) {
        return (this.hasAnyCommand(notificationName) &&
            this.commandMap[notificationName].indexOf(commandClassRef) !== -1);
    };
    Controller.prototype.hasAnyCommand = function (notificationName) {
        return (this.commandMap[notificationName] !== undefined &&
            this.commandMap[notificationName].length !== 0);
    };
    Controller.prototype.removeCommands = function (notificationName) {
        if (this.hasAnyCommand(notificationName)) {
            this.view.removeObserver(notificationName, this.executeCommand, this);
            delete this.commandMap[notificationName];
        }
    };
    Controller.prototype.removeCommand = function (notificationName, commandClassRef) {
        if (this.hasCommand(notificationName, commandClassRef)) {
            this.commandMap[notificationName].splice(this.commandMap[notificationName].indexOf(commandClassRef), 1);
        }
    };
    Controller.prototype.initializeController = function () {
        this.view = core_View.getInstance(this.multitonKey);
    };
    Controller.prototype.executeCommand = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var commandClassRefs = this.commandMap[notificationName];
        if (!commandClassRefs || commandClassRefs.length === 0) {
            return;
        }
        for (var _a = 0, commandClassRefs_1 = commandClassRefs; _a < commandClassRefs_1.length; _a++) {
            var commandClassRef = commandClassRefs_1[_a];
            var commandInstance = new commandClassRef();
            commandInstance.initializeNotifier(this.multitonKey);
            commandInstance.startCommandExecution.apply(commandInstance, [notificationName].concat(args));
        }
    };
    Controller.instanceMap = {};
    return Controller;
}());
/* harmony default export */ var core_Controller = (Controller_Controller);
var Controller_MULTITON_MSG = 'controller key for this Multiton key already constructed';

// CONCATENATED MODULE: ./core/Model.ts
var Model = /** @class */ (function () {
    function Model(key) {
        this.proxyMap = {};
        if (Model.instanceMap[key]) {
            throw new Error(Model_MULTITON_MSG);
        }
        this.multitonKey = key;
        this.initializeModel();
    }
    Model.getInstance = function (key) {
        if (!key) {
            return null;
        }
        if (!this.instanceMap[key]) {
            this.instanceMap[key] = new Model(key);
        }
        return this.instanceMap[key];
    };
    Model.removeModel = function (key) {
        delete this.instanceMap[key];
    };
    Model.prototype.registerProxy = function (proxy) {
        proxy.initializeNotifier(this.multitonKey);
        this.proxyMap[proxy.getProxyName()] = proxy;
        proxy.onRegister();
    };
    Model.prototype.retrieveProxy = function (proxyName) {
        return this.proxyMap[proxyName];
    };
    Model.prototype.hasProxy = function (proxyName) {
        return this.proxyMap[proxyName] !== undefined;
    };
    Model.prototype.removeProxy = function (proxyName) {
        if (this.proxyMap[proxyName]) {
            var proxy = this.proxyMap[proxyName];
            proxy.onRemove();
            delete this.proxyMap[proxyName];
            return proxy;
        }
        return null;
    };
    Model.prototype.initializeModel = function () { };
    Model.instanceMap = {};
    return Model;
}());
/* harmony default export */ var core_Model = (Model);
var Model_MULTITON_MSG = 'Model instance for this Multiton key already constructed!';

// CONCATENATED MODULE: ./patterns/facade/Facade.ts



var Facade_Facade = /** @class */ (function () {
    function Facade(key) {
        if (Facade.instanceMap[key]) {
            throw new Error(Facade_MULTITON_MSG);
        }
        this.initializeNotifier(key);
        this.initializeFacade();
    }
    Facade.getInstance = function (key) {
        if (!key) {
            return null;
        }
        if (!Facade.instanceMap[key]) {
            Facade.instanceMap[key] = new Facade(key);
        }
        return Facade.instanceMap[key];
    };
    Facade.hasCore = function (key) {
        return this.instanceMap[key] !== undefined;
    };
    Facade.removeCore = function (key) {
        if (!this.instanceMap[key]) {
            return;
        }
        core_Model.removeModel(key);
        core_View.removeView(key);
        core_Controller.removeController(key);
        delete this.instanceMap[key];
    };
    Facade.prototype.initializeFacade = function () {
        this.initializeModel();
        this.initializeController();
        this.initializeView();
    };
    Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
        this.controller.registerCommand(notificationName, commandClassRef);
    };
    Facade.prototype.registerCommandOnce = function (notificationName, commandClassRef) {
        this.controller.registerCommandOnce(notificationName, commandClassRef);
    };
    Facade.prototype.removeCommands = function (notificationName) {
        this.controller.removeCommands(notificationName);
    };
    Facade.prototype.removeCommand = function (notificationName, commandClassRef) {
        this.controller.removeCommand(notificationName, commandClassRef);
    };
    Facade.prototype.hasAnyCommand = function (notificationName) {
        return this.controller.hasAnyCommand(notificationName);
    };
    Facade.prototype.hasCommand = function (notificationName, commandClassRef) {
        return this.controller.hasCommand(notificationName, commandClassRef);
    };
    Facade.prototype.registerProxy = function (proxy) {
        this.model.registerProxy(proxy);
    };
    Facade.prototype.retrieveProxy = function (proxyName) {
        return this.model.retrieveProxy(proxyName);
    };
    Facade.prototype.removeProxy = function (proxyName) {
        if (this.model) {
            return this.model.removeProxy(proxyName);
        }
        return null;
    };
    Facade.prototype.hasProxy = function (proxyName) {
        return this.model.hasProxy(proxyName);
    };
    Facade.prototype.registerMediator = function (mediator) {
        this.view.registerMediator(mediator);
    };
    Facade.prototype.registerMediators = function (mediators) {
        for (var _i = 0, mediators_1 = mediators; _i < mediators_1.length; _i++) {
            var mediator = mediators_1[_i];
            this.view.registerMediator(mediator);
        }
    };
    Facade.prototype.updateMediator = function (mediator) {
        this.view.updateMediator(mediator);
    };
    Facade.prototype.getMediatorIndex = function (mediator) {
        return this.view.getMediatorIndex(mediator);
    };
    Facade.prototype.retrieveMediator = function (mediatorName, id) {
        return this.view.retrieveMediator(mediatorName, id);
    };
    Facade.prototype.retrieveMediators = function (mediatorName) {
        return this.view.retrieveMediators(mediatorName);
    };
    Facade.prototype.removeMediator = function (mediatorName, id) {
        return this.view.removeMediator(mediatorName, id);
    };
    Facade.prototype.removeMediators = function (mediatorAndIdPairs) {
        var removedMediators = [];
        for (var _i = 0, mediatorAndIdPairs_1 = mediatorAndIdPairs; _i < mediatorAndIdPairs_1.length; _i++) {
            var pair = mediatorAndIdPairs_1[_i];
            removedMediators.push(this.view.removeMediator(pair.mediatorName, pair.id));
        }
        return removedMediators;
    };
    Facade.prototype.hasMediator = function (mediatorName, id) {
        return this.view.hasMediator(mediatorName, id);
    };
    Facade.prototype.hasMediatorWithName = function (mediatorName) {
        return this.view.hasMediator(mediatorName);
    };
    Facade.prototype.getMediatorsCount = function (mediatorName) {
        return this.view.getMediatorsCount(mediatorName);
    };
    Facade.prototype.sendNotification = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.notifyObservers.apply(this, [notificationName].concat(args));
    };
    Facade.prototype.notifyObservers = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.view).notifyObservers.apply(_a, [notificationName].concat(args));
    };
    Facade.prototype.initializeNotifier = function (key) {
        this.multitonKey = key;
    };
    Facade.prototype.initializeController = function () {
        if (this.controller) {
            return;
        }
        this.controller = core_Controller.getInstance(this.multitonKey);
    };
    Facade.prototype.initializeModel = function () {
        if (this.model) {
            return;
        }
        this.model = core_Model.getInstance(this.multitonKey);
    };
    Facade.prototype.initializeView = function () {
        if (this.view) {
            return;
        }
        this.view = core_View.getInstance(this.multitonKey);
    };
    Facade.instanceMap = {};
    return Facade;
}());
/* harmony default export */ var facade_Facade = (Facade_Facade);
var Facade_MULTITON_MSG = 'Facade instance for this Multiton key already constructed!';

// CONCATENATED MODULE: ./patterns/observer/Notifier.ts

var Notifier_Notifier = /** @class */ (function () {
    function Notifier() {
    }
    Notifier.prototype.initializeNotifier = function (key) {
        this.multitonKey = key;
        this.facade = this.getFacade();
    };
    Notifier.prototype.sendNotification = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        if (this.facade) {
            (_a = this.facade).sendNotification.apply(_a, [notificationName].concat(args));
        }
    };
    Notifier.prototype.getFacade = function () {
        if (this.multitonKey === null) {
            throw new Error(Notifier_MULTITON_MSG);
        }
        return facade_Facade.getInstance(this.multitonKey);
    };
    return Notifier;
}());
/* harmony default export */ var observer_Notifier = (Notifier_Notifier);
var Notifier_MULTITON_MSG = 'multitonKey for this Notifier not yet initialized!';

// CONCATENATED MODULE: ./patterns/command/SimpleCommand.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var SimpleCommand = /** @class */ (function (_super) {
    __extends(SimpleCommand, _super);
    function SimpleCommand() {
        var _this = _super.call(this) || this;
        _this.isChecked = false;
        _this.guards = [];
        _this.prepare();
        _this.failedGuardsCount = _this.guards.length;
        return _this;
    }
    SimpleCommand.prototype.startCommandExecution = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = !this.isChecked;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkGuards.apply(this, [notificationName].concat(args))];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        this.startExecution.apply(this, [notificationName].concat(args));
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleCommand.prototype.onAnyGuardApproved = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        notificationName;
        args;
    };
    SimpleCommand.prototype.onAnyGuardDenied = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        notificationName;
        args;
    };
    SimpleCommand.prototype.onAllGuardsDenied = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        notificationName;
        args;
    };
    SimpleCommand.prototype.prepare = function () {
        //
    };
    SimpleCommand.prototype.addGuards = function () {
        var guardClassRefs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            guardClassRefs[_i] = arguments[_i];
        }
        for (var _a = 0, guardClassRefs_1 = guardClassRefs; _a < guardClassRefs_1.length; _a++) {
            var guardClassRef = guardClassRefs_1[_a];
            this.guards.push(new guardClassRef());
        }
    };
    SimpleCommand.prototype.sendNotification = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.facade).sendNotification.apply(_a, [notificationName].concat(args));
    };
    SimpleCommand.prototype.startExecution = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.failedGuardsCount === 0
            ? this.execute.apply(this, [notificationName].concat(args)) : this.onAnyGuardDenied.apply(this, [notificationName].concat(args));
        this.failedGuardsCount === this.guards.length
            ? this.onAllGuardsDenied.apply(this, [notificationName].concat(args)) : this.onAnyGuardApproved.apply(this, [notificationName].concat(args));
    };
    SimpleCommand.prototype.checkGuards = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, guard;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = 0, _b = this.guards;
                        _c.label = 1;
                    case 1:
                        if (!(_a < _b.length)) return [3 /*break*/, 4];
                        guard = _b[_a];
                        guard.initializeNotifier(this.multitonKey);
                        return [4 /*yield*/, guard.approve.apply(guard, [notificationName].concat(args))];
                    case 2:
                        if (_c.sent()) {
                            this.failedGuardsCount--;
                        }
                        _c.label = 3;
                    case 3:
                        _a++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.isChecked = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return SimpleCommand;
}(observer_Notifier));
/* harmony default export */ var command_SimpleCommand = (SimpleCommand);

// CONCATENATED MODULE: ./patterns/command/MacroCommand.ts
var MacroCommand_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MacroCommand_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MacroCommand_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var MacroCommand = /** @class */ (function (_super) {
    MacroCommand_extends(MacroCommand, _super);
    function MacroCommand() {
        var _this = _super.call(this) || this;
        _this.subCommands = [];
        _this.exclusiveSubCommands = [];
        _this.initializeMacroCommand();
        return _this;
    }
    MacroCommand.prototype.initializeMacroCommand = function () { };
    MacroCommand.prototype.addSubCommand = function (subCommand) {
        this.subCommands.push(subCommand);
    };
    MacroCommand.prototype.addExclusiveSubCommand = function (subCommand) {
        var guards = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            guards[_i - 1] = arguments[_i];
        }
        var guardsInstances = [];
        for (var _a = 0, guards_1 = guards; _a < guards_1.length; _a++) {
            var guard = guards_1[_a];
            guardsInstances.push(new guard());
        }
        this.exclusiveSubCommands.push({
            command: subCommand,
            guards: guardsInstances,
        });
    };
    MacroCommand.prototype.executeExclusiveSubCommands = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return MacroCommand_awaiter(this, void 0, void 0, function () {
            var _a, _b, exclusiveSubCommand, cmd, guards, failedGuardsCount, _c, guards_2, guard;
            return MacroCommand_generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = 0, _b = this.exclusiveSubCommands;
                        _d.label = 1;
                    case 1:
                        if (!(_a < _b.length)) return [3 /*break*/, 8];
                        exclusiveSubCommand = _b[_a];
                        cmd = new exclusiveSubCommand.command();
                        guards = cmd.guards.concat(exclusiveSubCommand.guards);
                        failedGuardsCount = 0;
                        _c = 0, guards_2 = guards;
                        _d.label = 2;
                    case 2:
                        if (!(_c < guards_2.length)) return [3 /*break*/, 5];
                        guard = guards_2[_c];
                        guard.initializeNotifier(this.multitonKey);
                        return [4 /*yield*/, guard.approve.apply(guard, [notificationName].concat(args))];
                    case 3:
                        if (!(_d.sent())) {
                            failedGuardsCount++;
                        }
                        _d.label = 4;
                    case 4:
                        _c++;
                        return [3 /*break*/, 2];
                    case 5:
                        cmd.isChecked = true;
                        if (!(failedGuardsCount === 0)) return [3 /*break*/, 7];
                        cmd.initializeNotifier(this.multitonKey);
                        return [4 /*yield*/, cmd.startCommandExecution.apply(cmd, [notificationName].concat(args))];
                    case 6:
                        _d.sent();
                        return [2 /*return*/];
                    case 7:
                        _a++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return MacroCommand;
}(command_SimpleCommand));
/* harmony default export */ var command_MacroCommand = (MacroCommand);

// CONCATENATED MODULE: ./patterns/command/AsyncMacroCommand.ts
var AsyncMacroCommand_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AsyncMacroCommand_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AsyncMacroCommand_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var AsyncMacroCommand = /** @class */ (function (_super) {
    AsyncMacroCommand_extends(AsyncMacroCommand, _super);
    function AsyncMacroCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncMacroCommand.prototype.execute = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return AsyncMacroCommand_awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return AsyncMacroCommand_generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.subCommands.length > 0;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.executeSubCommands.apply(this, [notificationName].concat(args))];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a;
                        _b = this.exclusiveSubCommands.length > 0;
                        if (!_b) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.executeExclusiveSubCommands.apply(this, [notificationName].concat(args))];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        _b;
                        return [2 /*return*/];
                }
            });
        });
    };
    AsyncMacroCommand.prototype.executeSubCommands = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return AsyncMacroCommand_awaiter(this, void 0, void 0, function () {
            var ref, cmd;
            return AsyncMacroCommand_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.subCommands.length > 0)) return [3 /*break*/, 2];
                        ref = this.subCommands.shift();
                        cmd = new ref();
                        cmd.initializeNotifier(this.multitonKey);
                        return [4 /*yield*/, cmd.startCommandExecution.apply(cmd, [notificationName].concat(args))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return AsyncMacroCommand;
}(command_MacroCommand));
/* harmony default export */ var command_AsyncMacroCommand = (AsyncMacroCommand);

// CONCATENATED MODULE: ./patterns/command/Guard.ts
var Guard_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Guard = /** @class */ (function (_super) {
    Guard_extends(Guard, _super);
    function Guard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Guard;
}(observer_Notifier));
/* harmony default export */ var command_Guard = (Guard);

// CONCATENATED MODULE: ./patterns/command/SyncMacroCommand.ts
var SyncMacroCommand_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SyncMacroCommand = /** @class */ (function (_super) {
    SyncMacroCommand_extends(SyncMacroCommand, _super);
    function SyncMacroCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyncMacroCommand.prototype.execute = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.subCommands.length > 0 && this.executeSubCommands.apply(this, [notificationName].concat(args));
        this.exclusiveSubCommands.length > 0 && this.executeExclusiveSubCommands.apply(this, [notificationName].concat(args));
    };
    SyncMacroCommand.prototype.executeSubCommands = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        while (this.subCommands.length > 0) {
            var ref = this.subCommands.shift();
            var cmd = new ref();
            cmd.initializeNotifier(this.multitonKey);
            cmd.startCommandExecution.apply(cmd, [notificationName].concat(args));
        }
    };
    return SyncMacroCommand;
}(command_MacroCommand));
/* harmony default export */ var command_SyncMacroCommand = (SyncMacroCommand);

// CONCATENATED MODULE: ./patterns/mediator/Mediator.ts
var Mediator_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//@ts-ignore
var uuid = __webpack_require__(1);

var Mediator = /** @class */ (function (_super) {
    Mediator_extends(Mediator, _super);
    function Mediator(mediatorName, viewComponent) {
        var _this = _super.call(this) || this;
        _this.notificationInterests = [];
        _this.isAwake = true;
        _this.mediatorName = mediatorName || NAME;
        _this.viewComponent = viewComponent;
        _this.id = uuid.init({
            length: 6,
            useLetters: false,
        });
        return _this;
    }
    Mediator.prototype.sleep = function () {
        this.isAwake = false;
    };
    Mediator.prototype.wake = function () {
        this.isAwake = true;
    };
    Mediator.prototype.getMediatorName = function () {
        return this.mediatorName;
    };
    Mediator.prototype.getMediatorId = function () {
        return this.id;
    };
    Mediator.prototype.setViewComponent = function (viewComponent) {
        this.viewComponent = viewComponent;
    };
    Mediator.prototype.getViewComponent = function () {
        return this.viewComponent;
    };
    Mediator.prototype.subscribeToNotifications = function () {
        var notificationNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            notificationNames[_i] = arguments[_i];
        }
        for (var _a = 0, notificationNames_1 = notificationNames; _a < notificationNames_1.length; _a++) {
            var notificationName = notificationNames_1[_a];
            if (this.notificationInterests.indexOf(notificationName) !== -1) {
                console.warn(this.constructor.name + " subscribes to same notification: " + notificationName);
                continue;
            }
            this.notificationInterests.push(notificationName);
        }
        this.updateMediator();
    };
    Mediator.prototype.subscribeToNotification = function (notificationName) {
        if (this.notificationInterests.indexOf(notificationName) !== -1) {
            console.warn(this.constructor.name + " subscribes to same notification: " + notificationName);
            return;
        }
        this.notificationInterests.push(notificationName);
        this.updateMediator();
    };
    Mediator.prototype.unsubscribeToNotification = function () {
        var notificationNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            notificationNames[_i] = arguments[_i];
        }
        for (var _a = 0, notificationNames_2 = notificationNames; _a < notificationNames_2.length; _a++) {
            var notificationName = notificationNames_2[_a];
            var notificationIndex = this.notificationInterests.indexOf(notificationName);
            if (notificationIndex === -1) {
                return;
            }
            this.notificationInterests.splice(notificationIndex, 1);
        }
        this.updateMediator();
    };
    Mediator.prototype.handleSubscribedNotification = function (notificationName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.isAwake && this.handleNotification.apply(this, [notificationName].concat(args));
    };
    Mediator.prototype.onRegister = function () { };
    Mediator.prototype.onRemove = function () { };
    Mediator.prototype.setMediatorId = function (id) {
        this.id = id;
    };
    Object.defineProperty(Mediator.prototype, "listNotificationInterests", {
        get: function () {
            return this.notificationInterests;
        },
        enumerable: true,
        configurable: true
    });
    Mediator.prototype.updateMediator = function () {
        this.facade.updateMediator(this);
    };
    Object.defineProperty(Mediator.prototype, "index", {
        get: function () {
            return this.facade.getMediatorIndex(this);
        },
        enumerable: true,
        configurable: true
    });
    return Mediator;
}(observer_Notifier));
/* harmony default export */ var mediator_Mediator = (Mediator);
var NAME = 'Mediator';

// CONCATENATED MODULE: ./patterns/proxy/Proxy.ts
var Proxy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Proxy = /** @class */ (function (_super) {
    Proxy_extends(Proxy, _super);
    function Proxy(proxyName, data) {
        var _this = _super.call(this) || this;
        _this.proxyName = proxyName || Proxy_NAME;
        _this.data = data;
        return _this;
    }
    Proxy.prototype.getProxyName = function () {
        return this.proxyName;
    };
    Proxy.prototype.onRegister = function () { };
    Proxy.prototype.onRemove = function () { };
    Object.defineProperty(Proxy.prototype, "vo", {
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data;
        },
        enumerable: true,
        configurable: true
    });
    return Proxy;
}(observer_Notifier));
/* harmony default export */ var proxy_Proxy = (Proxy);
var Proxy_NAME = 'Proxy';

// CONCATENATED MODULE: ./index.ts













/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map