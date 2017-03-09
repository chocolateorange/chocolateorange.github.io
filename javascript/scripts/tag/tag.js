import _ from 'lodash';

import html from './tag.html';

/**
 * return querystring
 *
 * @param {String[]} sourceTags
 * @param {String} removeTag
 * @return {String}
 */
function removeTag(sourceTags, removeTag) {
  const result = _.pull(_.clone(sourceTags), removeTag);

  return (result.length > 0) ? `?q=${result.join('&q=')}` : '';
}

/**
 * return querystring
 *
 * @param {String[]} sourceTags
 * @param {String} appendTag
 * @return {String}
 */
function appendTag(sourceTags, appendTag) {
  const result = _.clone(sourceTags).concat([
    appendTag,
  ]);

  return (result.length > 0) ? `?q=${result.join('&q=')}` : '';
}

/**
 * compile template
 *
 * @param {Object} params
 * @param {String[]} params.noteTags
 * @param {String[]} params.queryTags
 * @return {Object}
 */
export function compile({ noteTags, queryTags }) {
  const selectedTags = _.pullAll(noteTags, queryTags),
        unselectTags = _.pullAll(queryTags, noteTags);

  const compiler = _.template(html, {
    imports: {
      forEach: _.forEach,
    },
    variable: 'data',
  });

  const selectedTagsFlow = _.flow([
    _.partial(_.map, _,
      (tagName) => ({
        name: tagName,
        href: location.pathname + removeTag(queryTags, tagName),
      })
    ),
    _.partial(_.map, _, compiler),
  ]);

  const unselectTagsFlow = _.flow([
    _.partial(_.map, _,
      (tagName) => ({
        name: tagName,
        href: location.pathname + appendTag(queryTags, tagName),
      })
    ),
    _.partial(_.map, _, compiler),
  ]);

  return {
    selectedTagsHTML: '<p>s</p>',//selectedTagsFlow(unselectTags).join(''),
    unselectTagsHTML: '<p>u</p>',//unselectTagsFlow(selectedTags).join(''),
  };
}
