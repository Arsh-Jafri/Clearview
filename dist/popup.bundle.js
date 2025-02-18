/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/*!************************!*\
  !*** ./popup/popup.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Store DOM elements
var elements = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var currentTheme, content, textCard, articleText, themeIcon;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        console.log('DOM Content Loaded'); // Debug log

        // Initialize theme first
        currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        // Initialize elements
        elements = {
          articleImage: document.getElementById('article-image'),
          articleTitle: document.getElementById('article-title'),
          publisher: document.getElementById('publisher'),
          author: document.getElementById('author'),
          articleUrl: document.getElementById('article-url'),
          confidenceScore: document.getElementById('confidence-score'),
          biasIndicator: document.getElementById('bias-indicator'),
          flaggedSections: document.getElementById('flagged-sections'),
          articleText: document.getElementById('article-text')
        };

        // Debug log all elements
        console.log('Initialized elements:', {
          articleImage: !!elements.articleImage,
          articleTitle: !!elements.articleTitle,
          publisher: !!elements.publisher,
          author: !!elements.author,
          articleUrl: !!elements.articleUrl,
          confidenceScore: !!elements.confidenceScore,
          biasIndicator: !!elements.biasIndicator,
          flaggedSections: !!elements.flaggedSections,
          articleText: !!elements.articleText
        });

        // Debug DOM structure
        content = document.querySelector('.content');
        textCard = document.querySelector('.text-card');
        articleText = document.getElementById('article-text');
        console.log('DOM Structure:', {
          content: {
            exists: !!content,
            display: content ? getComputedStyle(content).display : null,
            visibility: content ? getComputedStyle(content).visibility : null,
            height: content ? content.offsetHeight : null
          },
          textCard: {
            exists: !!textCard,
            display: textCard ? getComputedStyle(textCard).display : null,
            visibility: textCard ? getComputedStyle(textCard).visibility : null,
            height: textCard ? textCard.offsetHeight : null
          },
          articleText: {
            exists: !!articleText,
            display: articleText ? getComputedStyle(articleText).display : null,
            visibility: articleText ? getComputedStyle(articleText).visibility : null,
            height: articleText ? articleText.offsetHeight : null
          }
        });

        // Force text visibility for debugging
        if (articleText) {
          articleText.innerHTML = "\n      <div style=\"\n        color: red;\n        background: yellow;\n        padding: 10px;\n        margin: 10px;\n        border: 3px solid purple;\n        font-size: 16px;\n        font-weight: bold;\n      \">\n        DEBUG: Article Text Container\n        <br>\n        Height: ".concat(articleText.offsetHeight, "px\n        <br>\n        Visibility: ").concat(getComputedStyle(articleText).visibility, "\n        <br>\n        Display: ").concat(getComputedStyle(articleText).display, "\n      </div>\n    ");
        }

        // Automatically analyze the current tab
        _context.next = 13;
        return analyzeCurrentTab();
      case 13:
        // Add scroll detection
        document.addEventListener('scroll', function () {
          var header = document.querySelector('.header');
          if (window.scrollY > 10) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        });

        // Add theme toggle handler
        themeIcon = document.querySelector('.theme-icon');
        themeIcon.addEventListener('click', function () {
          var currentTheme = document.documentElement.getAttribute('data-theme');
          var newTheme = currentTheme === 'light' ? 'dark' : 'light';

          // Update theme
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);

          // Update icon
          updateThemeIcon(newTheme);
        });
      case 16:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
function analyzeCurrentTab() {
  return _analyzeCurrentTab.apply(this, arguments);
}
function _analyzeCurrentTab() {
  _analyzeCurrentTab = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _results$2, _result$article$conte, _yield$chrome$tabs$qu3, _yield$chrome$tabs$qu4, tab, results, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          // Show loading state
          document.body.classList.remove('loaded');
          document.body.classList.remove('not-article');

          // Add debug info to body
          document.body.setAttribute('data-debug', 'analyzing');

          // Get the active tab
          _context3.next = 6;
          return chrome.tabs.query({
            active: true,
            currentWindow: true
          });
        case 6:
          _yield$chrome$tabs$qu3 = _context3.sent;
          _yield$chrome$tabs$qu4 = _slicedToArray(_yield$chrome$tabs$qu3, 1);
          tab = _yield$chrome$tabs$qu4[0];
          if (tab) {
            _context3.next = 11;
            break;
          }
          throw new Error('No active tab found');
        case 11:
          _context3.next = 13;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            files: ['lib/Readability.js']
          });
        case 13:
          _context3.next = 15;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            files: ['dist/content.bundle.js']
          });
        case 15:
          _context3.next = 17;
          return chrome.scripting.executeScript({
            target: {
              tabId: tab.id
            },
            func: function func() {
              return window.clearviewExtractContent();
            }
          });
        case 17:
          results = _context3.sent;
          result = (_results$2 = results[0]) === null || _results$2 === void 0 ? void 0 : _results$2.result;
          console.log('Raw extraction result:', result); // Debug log
          if (!(!result || !result.success)) {
            _context3.next = 22;
            break;
          }
          throw new Error((result === null || result === void 0 ? void 0 : result.error) || 'Failed to extract article');
        case 22:
          // Check if content exists
          console.log('Article content exists:', !!result.article.content); // Debug log
          console.log('Content length:', (_result$article$conte = result.article.content) === null || _result$article$conte === void 0 ? void 0 : _result$article$conte.length); // Debug log

          // Check if the content appears to be an article
          if (isArticle(result.article)) {
            _context3.next = 29;
            break;
          }
          document.body.classList.add('not-article');
          document.body.classList.add('loaded');
          document.body.setAttribute('data-debug', 'not-article');
          return _context3.abrupt("return");
        case 29:
          // Update body debug state
          document.body.setAttribute('data-debug', 'is-article');

          // Update UI with article info
          _context3.next = 32;
          return updateArticleInfo(result.article, tab);
        case 32:
          // Update bias analysis
          updateBiasAnalysis(result.article.analysis.bias);

          // Update flagged sections
          updateFlaggedSections(result.article.analysis.bias.flaggedSections);

          // Add this after getting the result
          console.log('Extraction result:', result); // Debug log

          // Hide loading state
          document.body.classList.add('loaded');
          _context3.next = 44;
          break;
        case 38:
          _context3.prev = 38;
          _context3.t0 = _context3["catch"](0);
          console.error('Analysis error:', _context3.t0);
          document.body.classList.add('not-article');
          document.body.classList.add('loaded');
          document.body.setAttribute('data-debug', 'error');
        case 44:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 38]]);
  }));
  return _analyzeCurrentTab.apply(this, arguments);
}
function isArticle(article) {
  var _article$content;
  // Add debug logging
  console.log('isArticle check:', {
    hasContent: !!article.content,
    contentLength: (_article$content = article.content) === null || _article$content === void 0 ? void 0 : _article$content.length,
    hasTitle: !!article.title,
    hasSiteName: !!article.siteName,
    article: article
  });

  // Check for minimum content length (e.g., 300 characters)
  if (!article.content || article.content.length < 300) {
    console.log('Article rejected: content too short or missing');
    return false;
  }

  // Check for required article properties
  if (!article.title || !article.siteName) {
    console.log('Article rejected: missing title or siteName');
    return false;
  }

  // Check for common article indicators
  var hasArticleStructure = article.content.includes('<p>') || article.content.includes('<article') || article.byline;
  console.log('Article structure check:', hasArticleStructure);
  return hasArticleStructure;
}
function updateArticleInfo(article, tab) {
  console.log('Article content:', article.content); // Debug log

  // Add debug info
  var debugLength = document.getElementById('debug-content-length');
  if (debugLength) {
    debugLength.textContent = article.content ? article.content.length : 'No content';
  }

  // Get the article image using chrome.scripting
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    func: function func() {
      var _document$querySelect, _document$querySelect2, _document$querySelect3, _Array$from$find;
      // Try different meta tags for image
      var ogImage = (_document$querySelect = document.querySelector('meta[property="og:image"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.content;
      var twitterImage = (_document$querySelect2 = document.querySelector('meta[name="twitter:image"]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.content;
      var articleImage = (_document$querySelect3 = document.querySelector('meta[property="article:image"]')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.content;

      // Try to find the first large image in the article
      var firstLargeImage = (_Array$from$find = Array.from(document.getElementsByTagName('img')).find(function (img) {
        return img.width >= 300 && img.height >= 200;
      })) === null || _Array$from$find === void 0 ? void 0 : _Array$from$find.src;
      return ogImage || twitterImage || articleImage || firstLargeImage;
    }
  }).then(function (results) {
    var _results$;
    var imageUrl = (_results$ = results[0]) === null || _results$ === void 0 ? void 0 : _results$.result;
    if (imageUrl) {
      elements.articleImage.src = imageUrl;
    } else {
      elements.articleImage.src = '../assets/placeholder.png';
    }
  });

  // Add quotes around the title
  elements.articleTitle.textContent = "\"".concat(article.title, "\"");

  // Update publisher
  elements.publisher.innerHTML = "<span class=\"publisher\">".concat(article.siteName, "</span>");
  if (article.byline) {
    var cleanByline = article.byline.replace(/^By |by /, '').trim();
    var authors = cleanByline.split(/,|\band\b/).map(function (author) {
      return author.trim();
    });

    // Create a temporary div to measure text width
    var measureDiv = document.createElement('div');
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.position = 'absolute';
    measureDiv.style.whiteSpace = 'nowrap';
    measureDiv.style.fontFamily = 'Figtree, sans-serif';
    measureDiv.style.fontSize = '14px';
    document.body.appendChild(measureDiv);

    // Get publisher width for better space calculation
    var publisherWidth = elements.publisher.offsetWidth;
    var maxWidth = 240; // Decreased to prevent line wrapping
    var currentWidth = 20; // Width of dot separator
    var displayAuthors = [];

    // Try adding authors until we exceed width
    for (var i = 0; i < authors.length; i++) {
      var author = authors[i];
      measureDiv.textContent = author;
      var authorWidth = measureDiv.offsetWidth;

      // Add comma/and spacing for width calculation
      if (i > 0) currentWidth += 4; // Space for comma or 'and'

      if (currentWidth + authorWidth > maxWidth) {
        // If we can't fit even one author, show truncated first author
        if (displayAuthors.length === 0) {
          var truncatedAuthor = author.split(' ')[0] + ' ...';
          displayAuthors.push(truncatedAuthor);
        } else {
          displayAuthors.push('...');
        }
        break;
      }
      displayAuthors.push(author);
      currentWidth += authorWidth;
    }
    document.body.removeChild(measureDiv);

    // Join authors with commas and 'and'
    var authorText = displayAuthors.join(', ');
    if (authorText.includes('...')) {
      authorText = authorText.replace(', ...', ' ...');
    } else if (displayAuthors.length > 1) {
      authorText = authorText.replace(/, ([^,]+)$/, ' and $1');
    }
    elements.author.innerHTML = "<span class=\"dot-separator\">&middot;</span><span class=\"author\">".concat(authorText, "</span>");
  } else {
    elements.author.innerHTML = "<span class=\"dot-separator\">&middot;</span><span class=\"author\">Unknown</span>";
  }

  // Update URL display with copy icon and shortened link
  var fullUrl = tab.url;
  var shortenedUrl = shortenUrl(fullUrl);
  elements.articleUrl.innerHTML = ''; // Clear any existing content
  elements.articleUrl.className = 'article-link'; // Reset classes
  elements.articleUrl.innerHTML = "\n    <div class=\"url-container\">\n      <img src=\"../assets/copy.png\" alt=\"Copy\" class=\"copy-icon\">\n      <span class=\"url-text\" title=\"".concat(fullUrl, "\" data-url=\"").concat(fullUrl, "\" style=\"cursor: pointer\">").concat(shortenedUrl, "</span>\n    </div>\n  ");

  // Add click handlers for both the icon and the text
  var copyIcon = elements.articleUrl.querySelector('.copy-icon');
  var urlText = elements.articleUrl.querySelector('.url-text');
  function copyUrl() {
    var url = urlText.dataset.url;
    navigator.clipboard.writeText(url).then(function () {
      var originalText = urlText.textContent;
      urlText.textContent = 'Copied!';
      setTimeout(function () {
        urlText.textContent = originalText;
      }, 1000);
    });
  }
  copyIcon.addEventListener('click', copyUrl);
  urlText.addEventListener('click', copyUrl);

  // Debug logs for article text
  console.log('updateArticleInfo called with article:', article);
  console.log('Article content exists:', !!article.content);

  // Update article text with more visibility checks
  if (article.content) {
    var cleanText = article.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    var articleTextDiv = document.createElement('div');
    articleTextDiv.style.cssText = "\n      margin-top: 20px;\n      padding: 15px;\n      border: 2px solid red;\n      border-radius: 8px;\n      background: var(--bg-card);\n      color: var(--text-primary);\n      font-size: 14px;\n      line-height: 1.6;\n      max-height: 300px;\n      overflow-y: auto;\n      position: relative;\n      z-index: 100;\n    ";
    articleTextDiv.innerHTML = "\n      <div style=\"color: red; font-weight: bold; margin-bottom: 10px;\">\n        Article Text (".concat(countWords(cleanText), " words)\n      </div>\n      <div>\n        ").concat(cleanText.substring(0, 500), "...\n      </div>\n    ");
    var articleMeta = elements.articleUrl.closest('.article-meta');
    if (articleMeta) {
      articleMeta.appendChild(articleTextDiv);
    }
  }
}

// Add this helper function to shorten URLs
function shortenUrl(url) {
  try {
    var urlObj = new URL(url);
    var fullPath = urlObj.hostname + urlObj.pathname;

    // Remove trailing slash if present
    fullPath = fullPath.replace(/\/$/, '');

    // If the URL is too long, truncate it with ellipsis at the end
    if (fullPath.length > 50) {
      return fullPath.substring(0, 47) + '...';
    }
    return fullPath;
  } catch (e) {
    // Fallback if URL parsing fails
    return url.substring(0, 47) + '...';
  }
}
function updateBiasAnalysis(bias) {
  // First update the header HTML to include the icon with tooltip
  var cardHeader = document.querySelector('.analysis-card .card-header');
  cardHeader.innerHTML = "\n    <h2>Article Bias Rating</h2>\n    <div class=\"tooltip-container\">\n      <img src=\"../../assets/info.png\" alt=\"Info\" class=\"info-icon\">\n      <div class=\"tooltip\">\n        This score indicates the article's political bias on a scale from -100 (very liberal) to +100 (very conservative). \n        The analysis is based on language patterns, tone, and content.\n      </div>\n    </div>\n  ";

  // Update confidence badge
  var confidence = Math.round(bias.confidence * 100);
  var confidenceClass = 'low';
  if (confidence >= 61) {
    confidenceClass = 'high';
  } else if (confidence >= 30) {
    confidenceClass = 'medium';
  }
  elements.confidenceScore.className = "confidence-badge ".concat(confidenceClass);
  elements.confidenceScore.textContent = "".concat(confidence, "% Confidence");

  // Update score display and position
  var score = Math.round(bias.score);
  var position = (bias.score + 100) / 2;

  // Update score circle with animation
  var scoreCircle = document.getElementById('bias-score');
  scoreCircle.textContent = score;

  // Start at center
  scoreCircle.style.left = '50%';

  // Trigger animation after a small delay
  setTimeout(function () {
    scoreCircle.classList.add('animate');
    scoreCircle.style.left = "".concat(position, "%");
  }, 100);

  // Update indicator dot
  elements.biasIndicator.style.left = "".concat(position, "%");
}
function updateFlaggedSections(sections) {
  // First update the header HTML with tooltip
  var cardHeader = document.querySelector('.flagged-card .card-header');
  cardHeader.innerHTML = "\n    <h2>Flagged Sections</h2>\n    <div class=\"tooltip-container\">\n      <img src=\"../../assets/info.png\" alt=\"Info\" class=\"info-icon\">\n      <div class=\"tooltip\">\n        These sections contain politically charged language or show significant bias. \n        Click on any section to view it in the original article.\n      </div>\n    </div>\n  ";
  if (!sections || sections.length === 0) {
    elements.flaggedSections.innerHTML = '<p>No politically charged sections found</p>';
    return;
  }
  elements.flaggedSections.innerHTML = sections.map(function (section, index) {
    var intensity = Math.abs(section.score);
    var intensityClass = intensity > 75 ? 'high' : 'moderate';

    // Truncate text at word boundary
    var truncatedText = section.text;
    if (section.text.length > 150) {
      // Find the last space before 150 characters
      var lastSpace = section.text.substring(0, 150).lastIndexOf(' ');
      truncatedText = section.text.substring(0, lastSpace) + '...';
    }
    return "\n      <div class=\"flagged-section ".concat(intensityClass, "\" data-section-index=\"").concat(index, "\">\n        <p>\"").concat(truncatedText, "\"</p>\n        <div class=\"flagged-section-score\">\n          Bias intensity: ").concat(intensity.toFixed(1), " (").concat(section.score > 0 ? 'Conservative' : 'Liberal', ")\n        </div>\n      </div>\n    ");
  }).join('');

  // Add click handlers
  document.querySelectorAll('.flagged-section').forEach(function (section) {
    section.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var index, sectionText, _yield$chrome$tabs$qu, _yield$chrome$tabs$qu2, tab;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            index = section.dataset.sectionIndex;
            sectionText = sections[index].text; // Get the current tab
            _context2.next = 4;
            return chrome.tabs.query({
              active: true,
              currentWindow: true
            });
          case 4:
            _yield$chrome$tabs$qu = _context2.sent;
            _yield$chrome$tabs$qu2 = _slicedToArray(_yield$chrome$tabs$qu, 1);
            tab = _yield$chrome$tabs$qu2[0];
            _context2.next = 9;
            return chrome.tabs.update(tab.id, {
              active: true
            });
          case 9:
            _context2.next = 11;
            return chrome.scripting.executeScript({
              target: {
                tabId: tab.id
              },
              func: function func(searchText) {
                // Clean the search text to match text nodes more reliably
                var cleanText = searchText.trim().substring(0, 50); // Use start of text for matching

                var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                var node;
                var _loop = function _loop() {
                  if (node.textContent.includes(cleanText)) {
                    // Get the closest block-level parent
                    var element = node.parentElement;
                    while (element && window.getComputedStyle(element).display === 'inline') {
                      element = element.parentElement;
                    }

                    // Scroll the element into view
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center'
                    });

                    // Highlight effect
                    var originalBackground = element.style.backgroundColor;
                    var originalTransition = element.style.transition;
                    element.style.transition = 'background-color 0.3s ease';
                    element.style.backgroundColor = '#FFF9E7';
                    setTimeout(function () {
                      element.style.backgroundColor = originalBackground;
                      element.style.transition = originalTransition;
                    }, 2000);
                    return 1; // break
                  }
                };
                while (node = walker.nextNode()) {
                  if (_loop()) break;
                }
              },
              args: [sectionText]
            });
          case 11:
            // Close the popup
            window.close();
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
  });
}
function updateThemeIcon(theme) {
  var themeIcon = document.querySelector('.theme-icon');
  var logo = document.querySelector('.logo');

  // Update theme icon
  themeIcon.src = theme === 'light' ? '../assets/moon.png' : '../assets/sun.png';
  themeIcon.alt = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

  // Update logo
  logo.src = theme === 'light' ? logo.dataset.lightSrc : logo.dataset.darkSrc;
}

// Helper function to count words
function countWords(str) {
  return str.trim().split(/\s+/).length;
}
/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map