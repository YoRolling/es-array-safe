// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / //
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                           */
/*   define the ES5 Array prototype for older brower         */
/*   which is not implementation ES5                         */
/*                                                           */
/*                                                           */
/*   @author: Leo Yao                                        */
/*   @email : walldr2161ly # 163.com                         */
/*   @site  : http://wuyixiang.com                           */
/*   @update: 2014-10-11 15:37:29                            */
/*   @licence: MIT                                           */
/*                                                           */
/*                                                           */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / //

;!(function(exports) {
    "use strict";
    var ArrayPrototype = Array.prototype,
        ObjectPrototype = Object.prototype,
        FunctionPrototype = Function.prototype,
        StringPrototype = String.prototype,
        NumberPrototype = Number.prototype,
        array_slice = ArrayPrototype.slice,
        array_splice = ArrayPrototype.splice,
        array_push = ArrayPrototype.push,
        array_unshift = ArrayPrototype.unshift,
        call = FunctionPrototype.call,
        _toString = ObjectPrototype.toString;

    /* 
     * @param func {Object}
     * @return {Boolean}  whether is a Function
     */
    function isFunction(func) {
        return _toString.call(func) === "[object Function]";
    }


    /*
     * Boolean  whether or not support  {Object.defineProperty}
     *
     */
    var supportsDescriptors = Object.defineProperty && (function() {
        try {
            Object.defineProperty({}, '_property', {});
            return true;
        } catch (e) {
            return false;
        }
    }());

    
    var defineProperty;

    if (supportsDescriptors) {
        defineProperty = function(object, name, method, forceAssign) {
            if (!forceAssign && (name in object)) {
                return;
            }
            Object.defineProperty(object, name, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: method
            });
        };
    } else {
        defineProperty = function(object, name, method, forceAssign) {
            if (!forceAssign && (name in object)) {
                return;
            }
            object[name] = method;
        };
    }



    /**
    *
    *  define { Array.prototype.map }  for older Brower
    *
    **/
    if (!isFunction(ArrayPrototype.map)) {

        defineProperty(ArrayPrototype, "map", function(callback,thisArg) {
        
            if (!isFunction(callback)) {
                (console && console.log) ? console.log(typeof(callback) + ' is not  function') : "";
                return false;
            }
            var _len = this.length >>> 0,
                _temp = null,
                _newArr = [],
                T;
                
                if(thisArg){
                    T = thisArg;
                }
            for (var i = 0; i < _len; i++) {
                _temp = this[i];
                _newArr.push(callback.call(T, _temp,i,this));
            };
            return _newArr;

        }, true);

    }

    
    /**
    *
    *  define { Array.prototype.filter }  for older Brower
    *
    **/
    if (!isFunction(ArrayPrototype.filter)) {

        defineProperty(ArrayPrototype, "filter", function(callback,thisArg) {

            if (!isFunction(callback)) {
                (console && console.log) ? console.log('[' + typeof(callback) + '] is not  function') : "";
                return false;
            }

            var _len = this.length >>> 0,
                _temp = null,
                _newArr = [],
                T;
            
            if(thisArg){
                T = thisArg;
            }
            
            for (var i = 0; i < _len; i++) {
                _temp = this[i];
                callback.call(T, _temp,i,this) && _newArr.push(_temp);
            }
            return _newArr;
        }, true);
    }

    
    /**
    *
    *  define { Array.prototype.indexOf }  for older Brower
    *  IE6 does not support this
    *
    **/
    if (!isFunction(ArrayPrototype.indexOf)) {

        defineProperty(ArrayPrototype, "indexOf", function(val) {

            var _len = this.length >>> 0,
                index = -1;
            for (var i = 0; i < _len; i++) {
                if (val === this[i]) {
                    index = i;
                    break;
                }
            }
            return index;
        }, true);
    }

    /**
    *
    *  define { Array.prototype.lastIndexOf }  for older Brower
    *
    **/
    
    if (!isFunction(ArrayPrototype.lastIndexOf)) {

        defineProperty(ArrayPrototype, "lastIndexOf", function(val) {

            var _len = this.length >>> 0,
                index = -1;
            for (var i = _len - 1; i >= 0; i--) {
                if (val === this[i]) {
                    index = i;
                    break;
                }
            };
            return index;
        }, true);

    }
    
    /**
    *
    *  define { Array.prototype.some }  for older Brower
    *
    **/
    if (!isFunction(ArrayPrototype.some)) {

        defineProperty(ArrayPrototype, "some", function(func,thisArg) {

            if (!isFunction(func)) {
                (console && console.log) ? console.log('[' + typeof(func) + '] is not  function') : "";
                return false;
            }
            var _len = this.length >>> 0;
            var T;
            if(thisArg){
                T = thisArg;
            }
            for (var i = 0; i < _len; i++) {
                if(func.call(T, this[i] ,i,this)){
                    return true;
                }
                
            };
            return false;

        }, true);
    }

    /**
    *
    *  define { Array.prototype.every }  for older Brower
    *
    **/
    if (!isFunction(ArrayPrototype.every)) {

        defineProperty(ArrayPrototype, "every", function(func,thisArg) {

            if (!isFunction(func)) {
                (console && console.log) ? console.log('[' + typeof(func) + '] is not  function') : "";
                return false;
            }
            var _len = this.length >>> 0;
            var T;
            if(thisArg){
                T = thisArg;
            }


            for (var i = 0; i <_len; i++) {
                if(func.call(T, this[i], i, this)){
                    return true;
                }
            };
            
            return false;

        }, true);
    }

    /**
    *
    *  define { Array.prototype.every }  for older Brower
    *
    **/
    
    if (!isFunction(ArrayPrototype.forEach)) {

        defineProperty(ArrayPrototype, "forEach", function(func,thisArg) {

            if (!isFunction(func)) {
                (console && console.log) ? console.log('[' + typeof(func) + '] is not  function') : "";
                return false;
            }
            var _len = this.length >>> 0,
                T;
            if(thisArg){
                T = thisArg;
            }


            for (var i = 0; i < _len; i++) {
                func.call(T, this[i], i, this);
            };

        }, true);
    }
    
})(window);
