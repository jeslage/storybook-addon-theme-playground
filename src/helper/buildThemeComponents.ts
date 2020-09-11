import { is } from './';
import { OverridesProps } from '../types';

const buildThemeComponents = (
  theme: any,
  overrides: OverridesProps,
  arr: string[] = []
) => {
  const themeComponents = Object.keys(theme).reduce((acc, key) => {
    const value = theme[key];
    const path = [...arr, key];
    const pathString = path.join('.');

    // Return if component is hidden
    if (overrides[pathString] && overrides[pathString].hidden) {
      return;
    }

    if (overrides[pathString] && overrides[pathString].type) {
      return {
        ...acc,
        [pathString]: { type: overrides[pathString].type, value },
      };
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        ...buildThemeComponents(value, overrides, path),
      };
    }

    if (is.object(value)) {
      if (is.shorthand(value)) {
        return { ...acc, [pathString]: { type: 'shorthand', value } };
      }

      return {
        ...acc,
        ...buildThemeComponents(value, overrides, path),
      };
    }

    if (is.boolean(value)) {
      return { ...acc, [pathString]: { type: 'switch', value } };
    }

    if (typeof value === 'number') {
      return { ...acc, [pathString]: { type: 'counter', value } };
    }

    if (typeof value === 'string') {
      if (is.color(value, key)) {
        return { ...acc, [pathString]: { type: 'colorpicker', value } };
      }

      if (is.unit(value)) {
        return { ...acc, [pathString]: { type: 'range', value } };
      }

      if (is.text(value)) {
        return { ...acc, [pathString]: { type: 'textarea', value } };
      }

      return { ...acc, [pathString]: { type: 'input', value } };
    }
  }, {});

  return themeComponents;
};

export default buildThemeComponents;
