import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { withThemePlayground } from 'storybook-addon-theme-playground';

export default {
  title: 'Examples'
};

/* Colors  */

export const Colors = () => {
  const ColorRect = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin: 1rem 1rem 2.5rem;
    display: inline-block;

    &:before {
      position: absolute;
      bottom: -1.5rem;
      text-align: center;
      text-transform: uppercase;
      font-family: sans-serif;
      width: 100%;
    }
  `;

  const ColorPrimary = styled(ColorRect)`
    background: ${props => props.theme.color.primary};

    &:before {
      content: "${props => props.theme.color.primary}";
    }
  `;

  const ColorSecondary = styled(ColorRect)`
    background: ${props => props.theme.color.secondary};

    &:before {
      content: "${props => props.theme.color.secondary}";
    }
  `;

  const ColorTertiary = styled(ColorRect)`
    background: ${props => props.theme.color.tertiary};

    &:before {
      content: "${props => props.theme.color.tertiary}";
    }
  `;

  return (
    <>
      <ColorPrimary />
      <ColorSecondary />
      <ColorTertiary />
    </>
  );
};

const defaultColorTheme = {
  name: 'Color 1',
  theme: {
    color: {
      primary: '#ff9922',
      secondary: '#224422',
      tertiary: '#662255'
    }
  }
};

const anotherColorTheme = {
  name: 'Color 2',
  theme: {
    color: {
      primary: '#88ee22',
      secondary: '#223388',
      tertiary: '#ff6688'
    }
  }
};

Colors.story = {
  decorators: [
    withThemePlayground({
      theme: [defaultColorTheme, anotherColorTheme],
      provider: ThemeProvider
    })
  ]
};

/* Rectangles  */

export const Rectangle = () => {
  const getRectStyles = ({ theme }) => `
    width: ${theme.width};
    height: ${theme.height};
    margin-right: ${theme.margin.right}px;
    margin-top: ${theme.margin.top}px;
    margin-left: ${theme.margin.left}px;
    margin-bottom: ${theme.margin.bottom}px;
  `;

  const Rect = styled.div`
    display: inline-block;
    background: #323232;
    ${getRectStyles};
  `;

  return (
    <>
      <Rect />
      <Rect />
      <Rect />
    </>
  );
};

const defaultRectTheme = {
  name: 'Rectangle 1',
  theme: {
    width: '100px',
    height: '100px',
    margin: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }
};

const anotherRectTheme = {
  name: 'Rectangle 2',
  theme: {
    width: '50px',
    height: '40px',
    margin: {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    }
  }
};

Rectangle.story = {
  decorators: [
    withThemePlayground({
      theme: [defaultRectTheme, anotherRectTheme],
      provider: ThemeProvider
    })
  ]
};

/* Typography  */

export const Typography = () => {
  const Headline = styled.h1`
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSize.headline};
  `;

  const Copy = styled.p`
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSize.copy};
  `;

  return (
    <>
      <Headline>Headline Text</Headline>
      <Copy>Copy Text</Copy>
    </>
  );
};

const defaultTypoTheme = {
  name: 'Typograhy 1',
  theme: {
    fontFamily: 'sans-serif',
    fontSize: {
      headline: '30px',
      copy: '14px'
    }
  }
};

const anotherTypoTheme = {
  name: 'Typograhy 2',
  theme: {
    fontFamily: 'serif',
    fontSize: {
      headline: '52px',
      copy: '40px'
    }
  }
};

Typography.story = {
  decorators: [
    withThemePlayground({
      theme: [defaultTypoTheme, anotherTypoTheme],
      provider: ThemeProvider
    })
  ]
};

/* Typography  */

export const Spacings = () => {
  const Spacing = styled.div`
    position: relative;
    width: 50px;
    margin: 1rem;
    background: lightpink;
    height: ${props => props.theme.spacings[0]}px;

    &:after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
      font-family: sans-serif;
      font-size: 12px;
      content: "${props => props.theme.spacings[0]}";
    }

    &:nth-of-type(2) {
      height: ${props => props.theme.spacings[1]}px;
      &:after {
        content: "${props => props.theme.spacings[1]}";
      }
    }

    &:nth-of-type(3) {
      height: ${props => props.theme.spacings[2]}px;
      &:after {
        content: "${props => props.theme.spacings[2]}";
      }
    }

    &:nth-of-type(4) {
      height: ${props => props.theme.spacings[3]}px;
      &:after {
        content: "${props => props.theme.spacings[3]}";
      }
    }
  `;

  return (
    <>
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
    </>
  );
};

const defaultSpacingTheme = {
  spacings: [20, 40, 60, 90]
};

Spacings.story = {
  decorators: [
    withThemePlayground({
      theme: defaultSpacingTheme,
      provider: ThemeProvider
    })
  ]
};
