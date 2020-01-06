import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withThemePlayground } from 'storybook-addon-theme-playground';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { themes } from '@storybook/theming';

const GlobalStyles = createGlobalStyle`
  body {
    background: #fff;
    margin:0;
    font-family: Helvetica, sans-serif;
  }
`;

const uiThemes = [
  {
    name: 'Default Theme',
    theme: {
      headline: {
        fontFamily: "'Hepta Slab', sans-serif",
        fontWeight: 700,
        fontSize: '52px'
      },
      copy: {
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 200,
        fontSize: '20px'
      },
      color: {
        primary: '#ff9922',
        secondary: '#224422',
        tertiary: '#662255'
      },
      spacings: [20, 40, 60, 90],
      rectangle: {
        width: '100px',
        height: '100px',
        margin: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      }
    }
  },
  {
    name: 'Another Theme',
    theme: {
      headline: {
        fontFamily: "'Crimson Pro', sans-serif",
        fontWeight: 900,
        fontSize: '32px'
      },
      copy: {
        fontFamily: "'Hepta Slab', serif",
        fontWeight: 100,
        fontSize: '14px'
      },
      color: {
        primary: '#00ffa2',
        secondary: '#004466',
        tertiary: '#fbe9a0'
      },
      spacings: [40, 80, 120, 160],
      rectangle: {
        width: '40px',
        height: '20px',
        margin: {
          top: 60,
          bottom: 60,
          left: 20,
          right: 20
        }
      }
    }
  }
];

const options = {
  theme: uiThemes,
  provider: ThemeProvider,
  overrides: {
    'headline.fontWeight': {
      type: 'range',
      max: 900,
      min: 1,
      description: 'Define the font weight of the variable font'
    },
    'copy.fontWeight': {
      type: 'range',
      max: 900,
      min: 1,
      description: 'Define the font weight of the variable font'
    }
  }
};

addParameters({
  options: {
    theme: themes.dark
  }
});

addDecorator(storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
));

addDecorator(withThemePlayground(options));

configure(require.context('../stories', true, /\.stories\.js$/), module);
