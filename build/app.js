/* eslint-disable */
"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.get('/', function (req, res) {
  return res.send({
    message: 'Welcome to TODO App'
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server ready at port http://localhost:".concat(port));
});