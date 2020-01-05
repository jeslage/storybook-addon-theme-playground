import React from 'react';
import {
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
      <Content>
        <ColorPrimary />
        <ColorSecondary />
        <ColorTertiary />
      </Content>
      <Content>
        <Rect />
        <Rect />
        <Rect />
      </Content>

      <Content>
        <Headline>Headline Text</Headline>
        <Copy>Copy Text</Copy>
      </Content>

      <Content>
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
      </Content>
    </>
  );
};
