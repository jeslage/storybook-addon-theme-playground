import React from 'react';
import { ThemePlaygroundProps } from 'storybook-addon-theme-playground';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: #ffffff;
    margin:0;
    font-family: Helvetica, sans-serif;
  }
`;

const uiThemes = [
  {
    name: 'Default Theme',
    theme: {
      color: {
        primary: '#00ffa2',
        secondary: '#004466',
        tertiary: '#fbe9a0'
      },
      headline: {
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 900,
        fontSize: '32px'
      },
      copy: {
        fontFamily: "'Hepta Slab', serif",
        fontWeight: 400,
        fontSize: '14px'
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
  },
  {
    name: 'Another Theme',
    theme: {
      color: {
        primary: '#ff9922',
        secondary: '#224422',
        tertiary: '#662255'
      },
      headline: {
        fontFamily: "'Hepta Slab', serif",
        fontWeight: 700,
        fontSize: '52px'
      },
      copy: {
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 200,
        fontSize: '20px'
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
  }
];

const options: ThemePlaygroundProps<typeof uiThemes> = {
  theme: uiThemes,
  provider: ({ children, theme, name }) => {
    console.log('Current theme is: ', name);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  },
  controls: {
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
    },
    'headline.fontFamily': {
      type: 'select',
      options: [
        { value: "'Hepta Slab', serif", label: 'Hepta Slab' },
        { value: "'Crimson Pro', serif", label: 'Crimson Pro' }
      ],
      description: 'Select the headline font family'
    },
    'copy.fontFamily': {
      type: 'select',
      options: [
        { value: "'Hepta Slab', serif", label: 'Hepta Slab' },
        { value: "'Crimson Pro', serif", label: 'Crimson Pro' }
      ],
      description: 'Select the copy font family'
    }
  }
};

export const parameters = {
  themePlayground: options
};

export const decorators = [
  (storyFn) => {
    return (
      <>
        <GlobalStyles />
        {storyFn()}
      </>
    );
  }
];
