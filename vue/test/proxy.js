!function (e) {
  var n = {};

  function t(o) {
    if (n[o]) return n[o].exports;
    var r = n[o] = { i: o, l: !1, exports: {} };
    return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
  }

  t.m = e, t.c = n, t.d = function (e, n, o) {
    t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o })
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return t.d(n, 'a', n), n
  }, t.o = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n)
  }, t.p = '', t(t.s = 147)
}({
  147: function (e, n) {
    const t = chrome.runtime.connect({ name: 'content-script' });

    function o(e) {
      window.postMessage({ source: 'vue-devtools-proxy', payload: e }, '*')
    }

    function r(e) {
      e.data && 'vue-devtools-backend' === e.data.source && t.postMessage(e.data.payload)
    }

    t.onMessage.addListener(o), window.addEventListener('message', r), t.onDisconnect.addListener(function () {
      window.removeEventListener('message', r), o('shutdown')
    }), o('init')
  }
});
