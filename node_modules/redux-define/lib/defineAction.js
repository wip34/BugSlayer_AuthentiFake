'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NAMESPACE_SEPARATOR = '/';

var defineAction = function defineAction(type) {
  var subactions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var namespace = arguments[2];

  if (subactions && subactions.ACTION || typeof subactions === 'string') {
    namespace = subactions;
  }

  if (!Array.isArray(subactions)) {
    subactions = [];
  }

  var name = namespace ? [namespace, type].join(NAMESPACE_SEPARATOR) : type;

  var action = subactions.reduce(function (r, i) {
    return _extends({}, r, _defineProperty({}, i, name + '_' + i));
  }, {});

  action.ACTION = name;
  action.defineAction = function (type, subactions) {
    return defineAction(type, subactions, name);
  };

  action.toString = function () {
    return name.toString();
  };
  return action;
};

exports.default = defineAction;