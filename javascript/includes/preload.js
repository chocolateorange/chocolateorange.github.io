/**
 * fallback <link rel="preload">
 *
 * @param {String} selector
 * @param {String} [rel]
 */
function fallbackPreload(selector, rel = 'stylesheet') {
  let link = document.createElement('link');

  if (
    link.relList &&
    typeof link.relList.supports === 'function' &&
    link.relList.supports('preload')
  ) {
    return;
  }

  const preloads = document.querySelectorAll(selector);

  let i, len;

  for (i = 0, len = preloads.length; i < len; ++i) {
    preloads[i].rel = rel;
  }
}

module.exports = {
  fallback: fallbackPreload,
};
