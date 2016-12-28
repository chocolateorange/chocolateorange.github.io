/*!
 * @license Copyright(c) 2016 sasa+1
 * https://github.com/chocolateorange/chocolateorange.github.io
 * Released under the MIT license.
 */
var preload=function(e){function t(o){if(r[o])return r[o].exports;var l=r[o]={exports:{},id:o,loaded:!1};return e[o].call(l.exports,l,l.exports,t),l.loaded=!0,l.exports}var r={};return t.m=e,t.c=r,t.p="./",t(0)}([function(e,t){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"stylesheet",r=document.createElement("link");if(!r.relList||"function"!=typeof r.relList.supports||!r.relList.supports("preload")){var o=document.querySelectorAll(e),l=void 0,n=void 0;for(l=0,n=o.length;l<n;++l)o[l].rel=t}}e.exports={fallback:r}}]);