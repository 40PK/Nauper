/* eslint-disable */
var __nativeST__ = window.setTimeout;
var __nativeSI__ = window.setInterval;
/* eslint-enable */
window.setTimeout = function __timeout(vCallback, nDelay) {
  var context = this;
  var aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function __cb() {
    vCallback.apply(context, aArgs);
  } : vCallback, nDelay);
};

window.setInterval = function __interval(vCallback, nDelay) {
  var context = this;
  var aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function __cb() {
    vCallback.apply(context, aArgs);
  } : vCallback, nDelay);
};
