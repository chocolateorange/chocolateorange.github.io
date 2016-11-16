import _ from 'lodash';

import html from './note.html';

/**
 * compile template
 *
 * @param {Object} params
 * @param {Object[]} params.notes
 * @param {String[]} params.queryTags
 * @return {Object}
 */
export function compile({ notes, queryTags }) {
  const compiler = _.template(html, {
    imports: {
      forEach: _.forEach,
    },
    variable: 'data',
  });

  const filteredNotes = _.filter(notes, function(note) {
    const iteratee = _.partial(_.includes, note.tags),
          includes = _.map(queryTags, iteratee);

    return _.every(includes, function(value) {
      return !!value;
    });
  });

  return {
    notesHTML: _.map(filteredNotes, compiler).join(''),
  };
}
