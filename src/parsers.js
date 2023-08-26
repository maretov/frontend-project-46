import yaml from 'js-yaml';

export default (file, format) => {
  let parsed;
  if (format === '.json') {
    parsed = JSON.parse(file);
  } else if (format === '.yaml' || format === '.yml') {
    parsed = yaml.load(file);
  }

  return parsed;
};
