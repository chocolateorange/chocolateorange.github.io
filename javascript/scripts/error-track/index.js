/**
 * handler for onerror
 *
 * @param {Error} err
 */
function onError(err) {
  window.ga && window.ga('send', 'exception', {
    exDescription: err.message + '\n' + err.stack,
    exFatal: true,
  });
}

window.addEventListener('error', onError, false);
