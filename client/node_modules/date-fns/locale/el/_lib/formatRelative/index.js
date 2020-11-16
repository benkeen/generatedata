"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: "'την προηγούμενη' eeee 'στις' p",
  yesterday: "'χθες στις' p",
  today: "'σήμερα στις' p",
  tomorrow: "'αύριο στις' p",
  nextWeek: "eeee 'στις' p",
  other: 'P'
};

function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

module.exports = exports.default;