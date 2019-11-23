'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../../routes');

var _Wrapper = require('./Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/samhatem/Desktop/projects/blog_test/next-go/components/Post/index.js';


var PostItem = function PostItem(_ref) {
  var post = _ref.post;
  return _react2.default.createElement(_Wrapper2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement(_routes.Link, { route: 'post', params: { slug: post.title }, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement('a', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('h3', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, post.title), _react2.default.createElement('p', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, post.body))));
};

exports.default = PostItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUG9zdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkxpbmsiLCJXcmFwcGVyIiwiUG9zdEl0ZW0iLCJwb3N0Iiwic2x1ZyIsInRpdGxlIiwiYm9keSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVMsQUFBWTs7QUFDckIsQUFBTyxBQUFhOzs7Ozs7Ozs7QUFFcEIsSUFBTSxXQUFXLFNBQVgsQUFBVyxlQUFBO01BQUEsQUFBRyxZQUFILEFBQUc7eUJBQ2xCLEFBQUM7O2dCQUFEO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsQUFBQyw4QkFBSyxPQUFOLEFBQVksUUFBTyxRQUFRLEVBQUUsTUFBTSxLQUFuQyxBQUEyQixBQUFhO2dCQUF4QztrQkFBQSxBQUNFO0FBREY7cUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFBSztBQUFMO0FBQUEsVUFERixBQUNFLEFBQVUsQUFDVix3QkFBQSxjQUFBOztnQkFBQTtrQkFBQSxBQUFJO0FBQUo7QUFBQSxVQUxTLEFBQ2YsQUFDRSxBQUNFLEFBRUUsQUFBUztBQUxqQixBQVdBOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zYW1oYXRlbS9EZXNrdG9wL3Byb2plY3RzL2Jsb2dfdGVzdC9uZXh0LWdvIn0=