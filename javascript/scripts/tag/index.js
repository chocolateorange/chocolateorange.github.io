import _ from 'lodash';

import domready from 'domready';
import parseQuery from 'parse-query';

import * as tag from './tag';
import * as note from './note';

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

  const queries = parseQuery(location.search.replace(/^\?/, '')),
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
