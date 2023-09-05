import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, outputFormat) => {
  let result;

  if (outputFormat === 'stylish') {
    result = stylish(diff);
  }

  if (outputFormat === 'plain') {
    result = plain(diff);
  }

  return result;
};
