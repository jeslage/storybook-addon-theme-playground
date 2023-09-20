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

export const themes = [
  {
    name: "Forest Theme",
    theme: {
      color: {
        shades: ["#cad2c5", "#84a98c", "#52796f", "#354f52", "#2f3e46"],
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
      borderRadius: "4px",
      spacings: [40, 80, 120, 160, 180],
      rectangle: {
        width: "80px",
        height: "80px",
        margin: {
          top: 60,
          bottom: 60,
          left: 60,
          right: 60,
        },
      },
    },
  },
  {
    name: "Ocean Theme",
    theme: {
      color: {
        shades: ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"],
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
      borderRadius: "100px",
      spacings: [20, 40, 60, 90, 120],
      rectangle: {
        width: "100px",
        height: "100px",
        margin: {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40,
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
        borderRadius: {
          type: "range",
          max: 120,
          min: 0,
          description: "Define the border radius",
        },
      },
    },
  },
};

export default preview;
