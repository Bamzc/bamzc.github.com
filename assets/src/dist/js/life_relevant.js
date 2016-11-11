webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var _classCallCheck2 = __webpack_require__(76);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(77);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	__webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var comments = function () {
		function comments() {
			(0, _classCallCheck3.default)(this, comments);
		}
	
		(0, _createClass3.default)(comments, [{
			key: 'ajaxHandlerComments',
			value: function ajaxHandlerComments(cb, key) {
				$.ajax({
					url: 'https://api.duoshuo.com/threads/counts.jsonp',
					type: 'get',
					data: {
						short_name: 'bamzc',
						threads: key
					},
					dataType: 'jsonp',
					success: function success(res) {
						if (res.code == 0) {
							cb(res.response[key]);
						}
					}
				});
			}
		}]);
		return comments;
	}();
	
	var cm = new comments();
	var cs = $('.comments-link');
	
	if (cs.length > 0) {
		cs.each(function (k, v) {
			var comments_a = $(v).find('a');
			cm.ajaxHandlerComments(function (res) {
				comments_a.find('i').html(res.comments);
			}, comments_a.data('thread-key'));
		});
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 76:
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(78);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	var $Object = __webpack_require__(9).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },

/***/ 80:
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(7);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(17), 'Object', {defineProperty: __webpack_require__(13).f});

/***/ }

});
//# sourceMappingURL=life_relevant.js.map