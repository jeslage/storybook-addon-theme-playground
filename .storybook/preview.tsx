import React from "react";
import type { Preview } from "@storybook/react";

import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.color.foreground};
    margin: 0;
    font-family: ${(props) => props.theme.copy.fontFamily};
  }
`;

const themes = [
  {
    name: "Default Theme",
    theme: {
      color: {
        primary: "#00ffa2",
        secondary: "#004466",
        background: "#fff",
        foreground: "#000",
      },
      headline: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "52px",
      },
      copy: {
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 200,
        fontSize: "20px",
      },
      spacings: [40, 80, 120, 160],
      rectangle: {
        width: "40px",
        height: "20px",
        margin: {
          top: 60,
          bottom: 60,
          left: 20,
          right: 20,
        },
      },
    },
  },
  {
    name: "Another Theme",
    theme: {
      color: {
        primary: "indigo",
        secondary: "honeydew",
        background: "#fff",
        foreground: "#000",
      },
      headline: {
        fontFamily: "'Crimson Pro', serif",
        fontWeight: 900,
        fontSize: "32px",
      },
      copy: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
      },
      spacings: [20, 40, 60, 90],
      rectangle: {
        width: "100px",
        height: "100px",
        margin: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
    },
  },
];

const preview: Preview = {
  parameters: {
    themePlayground: {
      theme: themes,
      provider: ({ children, theme, name }) => {
        console.log("Current theme is: ", name);
        return (
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        );
      },
      controls: {
        "headline.fontWeight": {
          type: "range",
          max: 900,
          min: 1,
          description: "Define the font weight of the variable font",
        },
        "copy.fontWeight": {
          type: "range",
          max: 900,
          min: 1,
          description: "Define the font weight of the variable font",
        },
        "headline.fontFamily": {
          type: "select",
          options: [
            { value: "'Crimson Pro', serif", label: "Crimson Pro" },
            { value: "'Inter', sans-serif", label: "Inter" },
          ],
          description: "Select the headline font family",
        },
        "copy.fontFamily": {
          type: "select",
          options: [
            { value: "'Crimson Pro', serif", label: "Crimson Pro" },
            { value: "'Inter', sans-serif", label: "Inter" },
          ],
          description: "Select the copy font family",
        },
      },
    },
  },
};

export default preview;
