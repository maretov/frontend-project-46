import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, outputFormat) => {
  let result;

  if (outputFormat === 'stylish') {
    result = stylish(diff);
  }

  if (outputFormat === 'plain') {
    result = plain(diff);
  }

  if (outputFormat === 'json') {
    result = json(diff);
  }

  return result;
};
