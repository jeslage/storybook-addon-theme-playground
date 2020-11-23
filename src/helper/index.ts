import startCase from 'lodash.startcase';
import defaultCssColors from './defaultCssColors';

import { LabelFormatFunction } from '../types';

export const getLabel = (
  label: string,
  format?: 'startCase' | 'path' | LabelFormatFunction
) => {
  const path = label.split('.');

  if (format === 'startCase') {
    return startCase(label);
  }

  if (format === 'path') return label;
  if (typeof format === 'function') return format(path);

  return label;
};

export const is = {
  color: (v, l = '') =>
    (v.startsWith('#') && (v.length === 4 || v.length === 7)) ||
    v.startsWith('rgb(') ||
    v.startsWith('rgba(') ||
    v.startsWith('hsl(') ||
    defaultCssColors.includes(v.toLowerCase()) ||
    l.toLowerCase().includes('color'),

  number: (v) => typeof v === 'number',
  string: (v) => typeof v === 'string',
  object: (v) => typeof v === 'object',
  array: (v) => Array.isArray(v),
  boolean: (v) => typeof v === 'boolean' || v === 'true' || v === 'false',
  unit: (v) =>
    v.endsWith('px') ||
    v.endsWith('rem') ||
    v.endsWith('em') ||
    v.endsWith('%'),
  text: (v) => v.length >= 40,
  shorthand: (v) => {
    const keys = Object.keys(v);
    return (
      keys.length === 4 &&
      keys.includes('top') &&
      keys.includes('bottom') &&
      keys.includes('right') &&
      keys.includes('left')
    );
  }
};

export const updateValueBasedOnPath = (
  propertyPath: string,
  value: any,
  obj: any
) => {
  const newObj = obj;

  const properties: string[] = propertyPath.split('.');

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (
      !Object.prototype.hasOwnProperty.call(obj, properties[0]) ||
      typeof obj[properties[0]] !== 'object'
    )
      newObj[properties[0]] = {};
    // We iterate.
    return updateValueBasedOnPath(
      properties.slice(1).join('.'),
      value,
      obj[properties[0]]
    );
    // This is the last property - the one where to set the value
  }

  newObj[properties[0]] = value;

  return true;
};

export const stripUnit = (value: string | number): any => {
  if (typeof value !== 'string') return [value, undefined];
  const matchedValue = value.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);

  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
};

export const objectify = (options: any[] = []) => {
  const obj = {};

  options.forEach((option) => {
    Object.assign(obj, { [option.label]: option.value });
  });

  return obj;
};

export const rgb2hex = (rgb: string): string => {
  const rgbMatch = rgb.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );

  if (!rgbMatch || rgbMatch.length < 5) return rgb;

  if (parseFloat(rgbMatch[4]) < 1) {
    return rgb;
  }

  return (
    '#' +
    ('0' + parseInt(rgbMatch[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgbMatch[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgbMatch[3], 10).toString(16)).slice(-2)
  );
};
