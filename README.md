# storybook-addon-theme-playground

`storybook-addon-theme-playground` is a theme addon for storybook. It provides a panel where you can tweek the theme values directly.

![Screenshot](./assets/screenshot.png)
[Example](https://storybook-addon-theme-playground.now.sh)

## Installation

#### 1. Install the addon

```sh
npm install -D storybook-addon-theme-playground

yarn add -D storybook-addon-theme-playground
```

#### 2. Register the panel

Add to `.storybook/addons.js`

```js
import 'storybook-addon-theme-playground/dist/register';
```

#### 3. Add decorator

Add to `.storybook/config.js`.

```js
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import theme from 'path/to/theme';

const options = {
  theme,
  provider: ThemeProvider
};

addDecorator(withThemePlayground(options));
```

... or to particular story

```js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import Button from './Button';

import theme from 'path/to/theme';

const options = {
  theme,
  provider: ThemeProvider
};

export default {
  title: 'Button with theme',
  decorators: [withThemePlayground(options)]
};

export const Primary = () => <Button>Primary Button</Button>;
```

## Options

### `theme`

`object` | `Array<{ name: string, theme: object }>` | required

Your theme `object` or multiple themes as an `array` of `objects`. Look at the [Multiple Themes](#multiple-themes) section for an example.

### `provider`

`any` | required

Any provider component which will accept a theme object prop and children.

### `overrides`

`object` | optional

Optional [override components](#override-components) of [default components](#default-components). Look at the [Overrides](#overrides) section for detailed documentation.

### `config`

`object` | optional

### `config.labelFormat`

`"path" || "startCase" || (path: string[]) => string` | default: `"path"`

### `config.debounce`

`boolean` | default: `true`

Set to `false` updating the theme values will not be debounced.

## Multiple Themes

It is also possible to add multiple themes. Just add an `Array` to the `theme` key. Each theme must have a `name` and a `theme` key.

```js
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'path/to/default/theme';
import anotherTheme from 'path/to/another/theme';

const options = {
  theme: [
    { name: 'Theme', theme: defaultTheme },
    { name: 'Another Theme', theme: anotherTheme }
  ],
  provider: ThemeProvider
};

addDecorator(withThemePlayground(options));
```

## Overrides

`storybook-addon-theme-playground` will render a [default component](#default-components) based on the theme value. If you want to customize them, you can override the default components by adding an `overrides` object to your decorator.

As a key use the theme object path, e.g `'button.color.spacing'`

**Example**

```js
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import theme from 'path/to/theme';

const overrides = {
  'button.color.spacing': {
    type: 'counter',
    label: 'Button Spacing',
    description: 'Spacing for all buttons',
    min: 1,
    max: 10,
    steps: 1,
    suffix: 'rem'
  },
  'button.color.primary': {
    type: 'color',
    label: 'Button Primary Color'
  }
};

addDecorator(
  withThemePlayground({ theme, overrides, provider: ThemeProvider })
);
```

## Override components

### Color

```js
'theme.path': {
  type: 'color',
  label: String | 'Theme Path',
  description: String | null
}
```

### Counter

```js
'theme.path': {
  type: 'counter',
  label: String | 'Theme Path',
  description: String | null,
  min: Number | 0,
  max: Number | 100,
  steps: Number | 1,
  suffix: String | null
}
```

### Select

```js
'theme.path': {
  type: 'select',
  label: String | 'Theme Path',
  description: String | null
  options: [
    {
      value: String,
      label: String
    }
  ]
}
```

### Shorthand

```js
'theme.path': {
  type: 'shorthand',
  label: String | 'Theme Path',
  description: String | null
}
```

### Switch

```js
'theme.path': {
  type: 'switch',
  label: String | 'Theme Path',
  description: String | null
}
```

### Range

```js
'theme.path': {
  type: 'range',
  label: String | 'Theme Path',
  description: String | null,
  min: Number | 0,
  max: Number | 100,
  steps: Number | 1,
  suffix: String | null
}
```

## Default components

`storybook-addon-theme-playground` will render the following components based on the value.

### `Switch`

> `boolean`

### `Counter`

> `number`

### `Input`

> `string`

### `Textarea`

> `string` && `string.length >= 40`

### `Range`

> `string` && `string.endsWith("px" || "rem" || "em" || "%")`

### `Color`

> `string` && `string.startsWith("#" || "rgba" || "rgba")` || `label.includes("color")`

### `Shorthand`

> `object` && `Object.keys(object).length === 4` && `Object.keys(object).includes("top" && "right" && "bottom" && "left")`

## Roadmap for next release

- [x] Add descriptions to every component
- [x] Add config to options
- [ ] Add testing
