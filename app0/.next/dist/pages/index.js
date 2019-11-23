'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Main = require('../layouts/Main');

var _Main2 = _interopRequireDefault(_Main);

var _posts = require('../api/posts');

var _Post = require('../components/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/samhatem/Desktop/projects/blog_test/next-go/pages/index.js?entry',
    _this = undefined;

var IndexPage = function IndexPage(_ref) {
  var posts = _ref.posts;
  return _react2.default.createElement(_Main2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('ul', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, posts.map(function (p) {
    return _react2.default.createElement(_Post2.default, { key: p.title, post: p, __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    });
  })));
};

IndexPage.getInitialProps = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
    var req = _ref2.req;
    var res, json;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _posts.getPosts)();

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            json = _context.sent;
            return _context.abrupt('return', { posts: json });

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = IndexPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiTGF5b3V0IiwiZ2V0UG9zdHMiLCJQb3N0IiwiSW5kZXhQYWdlIiwicG9zdHMiLCJtYXAiLCJwIiwidGl0bGUiLCJnZXRJbml0aWFsUHJvcHMiLCJyZXEiLCJyZXMiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFFVCxBQUFPOzs7Ozs7Ozs7QUFFUCxJQUFNLFlBQVksU0FBWixBQUFZLGdCQUFBO01BQUEsQUFBRyxhQUFILEFBQUc7eUJBQ25CLEFBQUM7O2dCQUFEO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRztBQURIO0FBQUEsV0FDRyxBQUFNLElBQUksYUFBQTsyQkFBSyxBQUFDLGdDQUFLLEtBQUssRUFBWCxBQUFhLE9BQU8sTUFBcEIsQUFBMEI7a0JBQTFCO29CQUFMLEFBQUs7QUFBQTtLQUFBO0FBSEosQUFDaEIsQUFDRSxBQUNHO0FBSFA7O0FBT0EsVUFBQSxBQUFVLDhCQUFWO3lFQUE0Qix3QkFBQTtRQUFBLEFBQVMsWUFBVCxBQUFTO2FBQVQ7a0VBQUE7Z0JBQUE7eUNBQUE7ZUFBQTs0QkFBQTttQkFBQSxBQUNSOztlQUFaO0FBRG9CLDJCQUFBOzRCQUFBO21CQUVQLElBRk8sQUFFUCxBQUFJOztlQUFqQjtBQUZvQiw0QkFBQTs2Q0FHbkIsRUFBRSxPQUhpQixBQUduQixBQUFTOztlQUhVO2VBQUE7NEJBQUE7O0FBQUE7Z0JBQUE7QUFBNUI7O3VCQUFBOzZCQUFBO0FBQUE7QUFNQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc2FtaGF0ZW0vRGVza3RvcC9wcm9qZWN0cy9ibG9nX3Rlc3QvbmV4dC1nbyJ9