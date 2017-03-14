import { on } from 'event-listener';

/**
 * offline event handler
 */
function onOffLine() {
  var elements = document.querySelectorAll('[data-offline]'),
      i, len;

  for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].classList.add('offline');
    elements[i].classList.add('js-offline');
  }
}

/**
 * online event handler
 */
function onOnLine() {
  var elements = document.querySelectorAll('[data-offline]'),
      i, len;

  for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].classList.remove('offline');
    elements[i].classList.remove('js-offline');
  }
}

on(window, 'offline', onOffLine, false);
on(window, 'online', onOnLine, false);

if (!navigator.onLine) {
  onOffLine();
}
