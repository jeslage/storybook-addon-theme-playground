import type { Addon_DecoratorFunction } from '@storybook/types';
import { defaultOptions, withThemePlayground } from './withThemePlayground';
import { THEME_PLAYGROUND_PARAMETER_KEY } from './constants';

export const decorators: Addon_DecoratorFunction[] = [withThemePlayground];

export const parameters = {
  [THEME_PLAYGROUND_PARAMETER_KEY]: defaultOptions
};
