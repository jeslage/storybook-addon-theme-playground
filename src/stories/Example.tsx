import React from "react";

import {
  Content,
  ColorPrimary,
  ColorSecondary,
  Rect,
  Headline,
  Copy,
  Spacing,
  RectContainer,
} from "./Example.style";

const Example = () => (
  <div>
    <Content>
      <legend>Colors</legend>
      <ColorPrimary />
      <ColorSecondary />
    </Content>

    <Content>
      <legend>Typography</legend>

      <Headline>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr
      </Headline>
      <Copy>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</Copy>
    </Content>

    <Content>
      <legend>Spacings</legend>

      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
    </Content>

    <Content>
      <legend>Margins</legend>

      <RectContainer>
        <Rect />
      </RectContainer>
      <RectContainer>
        <Rect />
      </RectContainer>
    </Content>
  </div>
);

export default Example;
