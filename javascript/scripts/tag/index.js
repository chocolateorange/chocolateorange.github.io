import _ from 'lodash';

import domready from 'domready';

import * as tag from './tag';
import * as note from './note';

/**
 * parse query string
 *
 * @param {String} [text]
 * @return {Object}
 */
function parseQueryString(text = '') {
  const result = {},
        params = text.replace(/^\?/, '').split('&');

  _.forEach(params, function(string) {
    let key, value;

    /=/.exec(string);

    key = RegExp.leftContext;
    value = RegExp.rightContext;

    result[key] || (result[key] = []);
    result[key].push(
      decodeURIComponent(value) || null
    );
  });

  return result;
}

/**
 * initialize
 */
function initialize() {
  const selectedTagsElement = document.getElementById('js-selected-tags'),
        unselectTagsElement = document.getElementById('js-unselect-tags');

  if (!selectedTagsElement || !unselectTagsElement) {
    return;
  }

  const notesElement = document.getElementById('js-notes');

  if (!notesElement) {
    return;
  }

  const tagsJSONElement = document.getElementById('json-tags'),
        notesJSONElement = document.getElementById('json-notes');

  if (!tagsJSONElement || !notesJSONElement) {
    return;
  }

  //----------------------------------------------------------------------------

  const { tags = [] } = JSON.parse(tagsJSONElement.innerHTML),
        { notes = [] } = JSON.parse(notesJSONElement.innerHTML);

  const queries = parseQueryString(location.search),
        queryTags = _.map(queries.q, _.toLower);

  //----------------------------------------------------------------------------

  const {
    selectedTagsHTML,
    unselectTagsHTML,
  } = tag.compile({
    noteTags: tags,
    queryTags,
  });

  selectedTagsElement.innerHTML = selectedTagsHTML;
  unselectTagsElement.innerHTML = unselectTagsHTML;

  //----------------------------------------------------------------------------

  const {
    notesHTML,
  } = note.compile({
    notes: notes,
    queryTags,
  });

  notesElement.innerHTML = notesHTML;
}

//------------------------------------------------------------------------------

domready(initialize);
