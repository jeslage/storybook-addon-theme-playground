import * as startCase from 'lodash.startcase';
import defaultCssColors from './defaultCssColors';

import { LabelFormatFunction } from '../types';

export const getLabel = (
  label: string,
  format?: 'startCase' | 'path' | LabelFormatFunction
) => {
  const path = label.split('.');

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
  },
};

export const updateValueBasedOnPath = (
  propertyPath: string,
  value: any,
  obj: object
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

  // We set the value to the last property
  newObj[properties[0]] = value;

  return true; // this is the end
};

export const getPrimaryColor = ({ theme }: { theme?: any }) => {
  return theme?.base === 'dark'
    ? theme?.color?.lightest
    : theme?.color?.darkest;
};

export const getSecondaryColor = ({ theme }: { theme?: any }) => {
  return theme?.color?.mediumdark;
};

export const getTextColor = (theme) => {
  return theme?.color?.defaultText;
};

export const getInverseTextColor = ({ theme }: { theme?: any }) => {
  return theme?.color?.inverseText;
};

export const getBorderColor = ({ theme }: { theme?: any }) => {
  return theme?.base === 'dark' ? theme?.color?.light : theme?.color?.dark;
};
