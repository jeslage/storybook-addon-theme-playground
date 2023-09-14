import { is } from '.';
import { ControlsProps } from '../types';

export const getThemeComponents = (
  theme?: any | { [key: string]: any }[],
  controls?: ControlsProps
) => {
  if (typeof theme === 'undefined') {
    return null;
  }

  if (Array.isArray(theme)) {
    return theme.map((item) => buildThemeComponents(item.theme, controls));
  } else {
    return buildThemeComponents(theme, controls);
  }
};

const buildThemeComponents = (
  theme: any,
  controls?: ControlsProps,
  arr: string[] = []
) => {
  const themeComponents = Object.keys(theme).reduce((acc, key) => {
    const value = theme[key];
    const pathArray = [...arr, key];
    const path = pathArray.join('.');

    if (controls) {
      if (controls[path] && controls[path].hidden) {
        return;
      }

      if (controls[path] && controls[path].type) {
        return {
          ...acc,
          [path]: { type: controls[path].type, value }
        };
      }
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        ...buildThemeComponents(value, controls, pathArray)
      };
    }

    if (is.function(value)) {
      return acc;
    }

    if (is.object(value)) {
      if (is.shorthand(value)) {
        return { ...acc, [path]: { type: 'shorthand', value } };
      }

      return {
        ...acc,
        ...buildThemeComponents(value, controls, pathArray)
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
        return { ...acc, [path]: { type: 'color', value } };
      }

      if (is.unit(value)) {
        return { ...acc, [path]: { type: 'range', value } };
      }

      return { ...acc, [path]: { type: 'text', value } };
    }
  }, {});

  return themeComponents;
};

export default buildThemeComponents;