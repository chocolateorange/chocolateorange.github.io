/**
 * handler for onerror
 *
 * @param {Event} event
 */
function onError(event) {
  window.ga && window.ga('send', 'exception', {
    exDescription:
      `filename: ${event.filename}\n` +
      `lineno: ${event.lineno}\n` +
      `colno: ${event.colno}\n` +
      `message: ${event.message}\n` +
      `stack: ${event.error && event.error.stack}`,
    exFatal: true,
  });
}

window.addEventListener('error', onError, false);
