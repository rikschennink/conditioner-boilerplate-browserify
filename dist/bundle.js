(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./node_modules/conditioner-core/conditioner-core.js":[function(require,module,exports){
/* conditioner-core 2.1.0 */!function(n,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var e={exports:{}};t(e.exports),n.conditioner=e.exports}}(this,function(n){"use strict";function t(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}Object.defineProperty(n,"__esModule",{value:!0});var e=function(n){var e=p("moduleGetName",n),o=s("moduleSetName",e),r={destroy:null,mounting:!1},u={alias:e,name:o,element:n,mounted:!1,unmount:function(){r.destroy&&u.mounted&&(l("moduleWillUnmount",u),r.destroy(),u.mounted=!1,l("moduleDidUnmount",u),u.onunmount.apply(n))},mount:function(){if(!u.mounted&&!r.mounting)return l("moduleWillMount",u),p("moduleImport",o).catch(function(t){r.mounting=!1,l("moduleDidCatch",t,u),u.onmounterror.apply(n,[t,u]),console.warn(t)}).then(function(e){r.destroy=p("moduleGetDestructor",p("moduleGetConstructor",e).apply(void 0,t(p("moduleSetConstructorArguments",o,n,e)))),u.mounted=!0,r.mounting=!1,l("moduleDidMount",u),u.onmount.apply(n,[u])}),u},onmounterror:function(){},onmount:function(){},onunmount:function(){}};return u},o=function(n){return/^([a-z]+) (.+)/.exec(n).splice(1)},r=function(n){return n.substr(1).split(" and @").map(o)},u=function(n,t,e){return a("monitor").find(function(t){return t.name===n}).create(t,e)},i=function(n,e){var o=r(n).map(function(n){return u.apply(void 0,t(n).concat([e.element]))}),i=function(){o.reduce(function(n,t){return!!n&&t.matches},!0)?e.mount():e.unmount()};return o.forEach(function(n){return n.addListener(i)}),i(),e},c=function(n){var t=e(n),o=p("moduleGetContext",n);return o?i(o,t):t.mount()},f=[],m=function(n,t){return n.indexOf(t)>-1},d=function(n){return f.push(n)},a=function(n){return f.filter(function(t){return m(Object.keys(t),n)}).map(function(t){return t[n]})},l=function(n){for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a(n).forEach(function(n){return n.apply(void 0,e)})},s=function(n){for(var e=arguments.length,o=Array(e>1?e-1:0),r=1;r<e;r++)o[r-1]=arguments[r];return a(n).reduce(function(n,e){return[e.apply(void 0,t(n))]},o).shift()},p=function(n){for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a(n).pop().apply(void 0,e)};d({moduleSelector:function(n){return n.querySelectorAll("[data-module]")},moduleGetContext:function(n){return n.dataset.context},moduleImport:function(n){return new Promise(function(t){return self[n]?t(self[n]):reject("Module "+n+" not found.")})},moduleGetConstructor:function(n){return n},moduleGetDestructor:function(n){return n},moduleSetConstructorArguments:function(n,t){return[t]},moduleGetName:function(n){return n.dataset.module},monitor:{name:"media",create:function(n){return self.matchMedia(n)}}}),n.hydrate=function(n){return[].concat(t(p("moduleSelector",n))).map(c)},n.addPlugin=d});
},{}],"./main.js":[function(require,module,exports){
var conditioner = require('conditioner-core/conditioner-core.js');

// apply custom settings
conditioner.addPlugin({

    // converts module aliases to paths
    moduleSetName: function(name) { return './ui/' + name + '.js' },

    // setup AMD require
    moduleImport: function(name) {
        return new Promise(function(resolve) {
            resolve( require(name) );
        });
    }

});

// lets go!
conditioner.hydrate( document.documentElement );
},{"conditioner-core/conditioner-core.js":"./node_modules/conditioner-core/conditioner-core.js"}],"./ui/component.js":[function(require,module,exports){
module.exports = function(element) {
    
    console.log('Component mounted on', element);
    

    // logic here
    element.textContent = 'Component mounted';


    // public component API
    element.foo = function() {

        console.log('foo called!');

        // dispatch events to notify other components
        element.dispatchEvent( new CustomEvent('bar') );
    };


    // expose destroy method
    return function() {
        
        // restore content
        element.textContent = '';

        // clean up methods
        element.foo = undefined;

    };

};
},{}]},{},["./main.js","./ui/component.js"]);
