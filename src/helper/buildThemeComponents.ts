import { is } from '.';
import { OverridesProps } from '../types';

export const getThemeComponents = (
  theme: any | { [key: string]: any }[],
  overrides: OverridesProps
) => {
  const components: { [key: string]: any } = {};

  if (Array.isArray(theme)) {
    theme.forEach((item) => {
      components[item.name] = buildThemeComponents(item.theme, overrides);
    });
  } else {
    components['Default Theme'] = buildThemeComponents(theme, overrides);
  }

  return components;
};

const buildThemeComponents = (
  theme: any,
  overrides: OverridesProps,
  arr: string[] = []
) => {
  const themeComponents = Object.keys(theme).reduce((acc, key) => {
    const value = theme[key];
    const pathArray = [...arr, key];
    const path = pathArray.join('.');

    if (overrides[path] && overrides[path].hidden) {
      return;
    }

    if (overrides[path] && overrides[path].type) {
      return {
        ...acc,
        [path]: { type: overrides[path].type, value },
      };
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        ...buildThemeComponents(value, overrides, pathArray),
      };
    }

    if (is.object(value)) {
      if (is.shorthand(value)) {
        return { ...acc, [path]: { type: 'shorthand', value } };
      }

      return {
        ...acc,
        ...buildThemeComponents(value, overrides, pathArray),
      };
    }

    if (is.boolean(value)) {
      return { ...acc, [path]: { type: 'switch', value } };
    }

    if (typeof value === 'number') {
      return { ...acc, [path]: { type: 'number', value } };
    }

    if (typeof value === 'string') {
      if (is.color(value, key)) {
        return { ...acc, [path]: { type: 'colorpicker', value } };
      }

      if (is.unit(value)) {
        return { ...acc, [path]: { type: 'range', value } };
      }

      if (is.text(value)) {
        return { ...acc, [path]: { type: 'textarea', value } };
      }

      return { ...acc, [path]: { type: 'input', value } };
    }
  }, {});

  return themeComponents;
};

export default buildThemeComponents;
