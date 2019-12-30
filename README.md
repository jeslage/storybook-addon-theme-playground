# storybook-addon-theme-playground

## Installation

Yet another theme addon for storybook.

![Screenshot](./assets/screenshot.png)

#### 1. Install the addon

```sh
yarn add -D storybook-addon-theme-playground
```

#### 2. Register the panel

Add to `.storybook/addons.js`

```js
import 'storybook-addon-theme-playground/dist/register';
```

#### 3. Add decorator

Add to `.storybook/config.js`

```js
import { addDecorator } from '@storybook/react';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import theme from 'path/to/theme';

addDecorator(withThemePlayground({ theme }));
```

... or to particular story

```js
import React from 'react';
import Button from './Button';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import theme from 'path/to/theme';

export default {
    title: 'Button with theme',
    decorators: [withThemePlayground({ theme })]
};

export const Primary = () => <Button>Primary Button</Button>;
```

#### 4. Add multiple themes

It is also possible to add multiple themes. Just add an `Array` to the `theme` key.

```js
import defaultTheme from 'path/to/default/theme';
import anotherTheme from 'path/to/another/theme';

addDecorator(
    withThemePlayground({
        theme: [
            { name: 'Theme', theme: defaultTheme },
            { name: 'Another Theme', theme: anotherTheme }
        ]
    })
);
```

## ThemeProvider

By default `storybook-addon-theme-playground` is using the `emotion` ThemeProvider which comes with the storybook packages. But you also can add a custom ThemeProvider, for example from `styled-components`.

```js
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withThemePlayground } from 'storybook-addon-theme-playground';

import theme from 'path/to/theme';

addDecorator(withThemePlayground({ theme, provider: ThemeProvider }));
```

## Overrides

`storybook-addon-theme-playground` will render a default component based on the theme value. If you want to customize them, you can override the default components by adding an `overrides` object to your decorator.

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

```ts
'theme.object.path': {
  type: 'color',
  label: string
}
```

### Counter

```ts
'theme.object.path': {
  type: 'counter',
  label: string,
  description: string,
  min: number,
  max: number,
  steps: number,
  suffix: string
}
```

### Select

```ts
'theme.object.path': {
  type: 'select',
  label: string,
  options: [
    {
      value: string,
      label: string
    }
  ]
}
```

### Shorthand

```ts
'theme.object.path': {
  type: 'shorthand',
  label: string,
  description: string
}
```

### Switch

```ts
'theme.object.path': {
  type: 'switch',
  label: string
}
```

### Range

```ts
'theme.object.path': {
  type: 'range',
  label: string,
  min: number,
  max: number,
  steps: number,
  suffix: string
}
```

## Roadmap

-   [ ] Add testing
