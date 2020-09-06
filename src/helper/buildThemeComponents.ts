import { is } from './';
import { Theme, OverridesProps } from '../types';

const buildThemeComponents = (
  theme: Theme,
  overrides: OverridesProps,
  arr: string[] = []
) => {
  let themeComponents = {};
  const keys: string[] = Object.keys(theme);

  keys.forEach((key) => {
    const value = theme[key];
    const path = [...arr, key];
    const pathString = path.join('.');

    // Return if component is hidden
    if (overrides[pathString] && overrides[pathString].hidden) {
      return;
    }

    if (overrides[pathString] && overrides[pathString].type) {
      themeComponents[pathString] = { type: overrides[pathString].type, value };
    } else if (is.object(value)) {
      if (is.shorthand(value)) {
        themeComponents[pathString] = { type: 'shorthand', value };
      } else {
        themeComponents = {
          ...themeComponents,
          ...buildThemeComponents(value, overrides, path),
        };
      }
    } else if (is.array(value)) {
      themeComponents = {
        ...themeComponents,
        ...buildThemeComponents(value, overrides, path),
      };
    } else if (is.boolean(value)) {
      themeComponents[pathString] = { type: 'switch', value };
    } else if (is.number(value)) {
      themeComponents[pathString] = { type: 'counter', value };
    } else if (is.string(value)) {
      if (is.color(value, key)) {
        themeComponents[pathString] = { type: 'colorpicker', value };
      } else if (is.unit(value)) {
        themeComponents[pathString] = { type: 'range', value };
      } else if (is.text(value)) {
        themeComponents[pathString] = { type: 'textarea', value };
      } else {
        themeComponents[pathString] = { type: 'input', value };
      }
    }
  });

  return themeComponents;
};

export default buildThemeComponents;
