import React from "react";

import {
  Content,
  Rect,
  Headline,
  Copy,
  Spacing,
  RectContainer,
  ColorShade,
  Color,
} from "./Example.style";

const Example = () => (
  <div>
    <Content>
      <ColorShade index={0} />
      <ColorShade index={1} />
      <ColorShade index={2} />
      <ColorShade index={3} />
      <ColorShade index={4} />
      <Color color="foreground" />
      <Color color="background" />
    </Content>

    <Content>
      <Headline>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr
      </Headline>
      <Copy>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</Copy>
    </Content>

    <Content>
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
      <Spacing />
    </Content>

    <Content>
      <RectContainer>
        <Rect />
      </RectContainer>
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
