import React from "react";
import { styled } from "@storybook/theming";
import { Loader } from "@storybook/components";

const StyledLoading = styled.div`
  flex-grow: 2;
  position: relative;
  padding: 8px 7px;
  height: 28px;
  width: 28px;
  display: inline-flex;
  align-items: center;
  margin-top: 6px;
  justify-content: center;
`;

const Loading = () => (
  <StyledLoading>
    <Loader size={14} />
  </StyledLoading>
);

export default Loading;
