import { startCase } from 'lodash';

export default (path: string[], format: any) => {
  const label = path.join('.');

  if (typeof format === 'function') {
    return format(path);
  }

  if (format === 'startCase') {
    return startCase(label);
  }

  if (format === 'path') {
    return label;
  }

  return label;
};
