export const stripUnit = (value: string | number): any => {
  if (typeof value !== 'string') return [value, undefined];
  const matchedValue = value.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);

  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
};
