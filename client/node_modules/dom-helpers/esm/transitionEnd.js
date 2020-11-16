import css from './css';
import listen from './listen';

function parseDuration(node) {
  var str = css(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function triggerTransitionEnd(element) {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('transitionend', true, true);
  element.dispatchEvent(evt);
}

function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }

  var called = false;
  var handle = setTimeout(function () {
    if (!called) triggerTransitionEnd(element);
  }, duration + padding);
  var remove = listen(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}

export default function transitionEnd(element, handler, duration, padding) {
  if (duration == null) duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = listen(element, 'transitionend', handler);
  return function () {
    removeEmulate();
    remove();
  };
}