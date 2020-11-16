"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SYNC_EVENT = exports.eventCenter = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var eventCenter = new _events["default"]();
exports.eventCenter = eventCenter;

if (eventCenter.setMaxListeners) {
  eventCenter.setMaxListeners(10);
}

var SYNC_EVENT = 'recharts.syncMouseEvents';
exports.SYNC_EVENT = SYNC_EVENT;