export default {
  color: (v, l = '') =>
    (v.startsWith('#') && (v.length === 4 || v.length === 7)) ||
    v.startsWith('rgb') ||
    v.startsWith('rgba') ||
    l.toLowerCase().includes('color'),

  number: v => typeof v === 'number',
  string: v => typeof v === 'string',
  object: v => typeof v === 'object',
  array: v => Array.isArray(v),
  boolean: v => typeof v === 'boolean' || v === 'true' || v === 'false',
  unit: v =>
    v.endsWith('px') ||
    v.endsWith('rem') ||
    v.endsWith('em') ||
    v.endsWith('%'),
  text: v => v.length >= 40,
  shorthand: v => {
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
