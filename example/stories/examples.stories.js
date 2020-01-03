import React from 'react';
import {
  Title,
  Content,
  ColorPrimary,
  ColorSecondary,
  ColorTertiary,
  Rect,
  Headline,
  Copy,
  Spacing
} from './example.style';

export default {
  title: 'Examples'
};

export const index = () => {
  return (
    <>
      <Title>Color</Title>
      <Content>
        <ColorPrimary />
        <ColorSecondary />
        <ColorTertiary />
      </Content>
      <Title>Rectangle</Title>
      <Content>
        <Rect />
        <Rect />
        <Rect />
      </Content>

      <Title>Typography</Title>
      <Content>
        <Headline>Headline Text</Headline>
        <Copy>Copy Text</Copy>
      </Content>

      <Title>Spacing</Title>
      <Content>
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
      </Content>
    </>
  );
};
