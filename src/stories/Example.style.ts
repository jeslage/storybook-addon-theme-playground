import styled from "styled-components";

export const Content = styled.fieldset`
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;

  legend {
    display: block;
    padding: 0 0.25rem;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.headline.fontWeight};
    font-family: ${({ theme }) => theme.headline.fontFamily};
  }
`;

export const Color = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  margin: 0rem 1rem 0rem 0rem;
  display: inline-block;
  border-radius: 0.25rem;
  overflow: hidden;

  &:after {
    position: absolute;
    bottom: 0;
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-family: sans-serif;
    padding: 5px;
    background: rgba(0, 0, 0, 0.25);
    color: white;
    font-size: 12px;
    border-top-right-radius: 0.25rem;
  }
`;

export const ColorPrimary = styled(Color)`
  background: ${({ theme }) => theme.color.primary};

  &:after {
    content: "${({ theme }) => theme.color.primary}";
  }
`;

export const ColorSecondary = styled(Color)`
  background: ${({ theme }) => theme.color.secondary};

  &:after {
    content: "${({ theme }) => theme.color.secondary}";
  }
`;

const getRectStyles = ({ theme }: any) => `
  width: ${theme.rectangle.width};
  height: ${theme.rectangle.height};
  margin-right: ${theme.rectangle.margin.right}px;
  margin-top: ${theme.rectangle.margin.top}px;
  margin-left: ${theme.rectangle.margin.left}px;
  margin-bottom: ${theme.rectangle.margin.bottom}px;
`;

export const Rect = styled.div`
  background: ${(props) => props.theme.color.secondary};
  ${getRectStyles};
`;

export const RectContainer = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.color.primary};
`;

export const Headline = styled.h1`
  font-family: ${({ theme }) => theme.headline.fontFamily};
  font-size: ${({ theme }) => theme.headline.fontSize};
  font-weight: ${({ theme }) => theme.headline.fontWeight};
`;

export const Copy = styled.p`
  font-family: ${({ theme }) => theme.copy.fontFamily};
  font-size: ${({ theme }) => theme.copy.fontSize};
  font-weight: ${({ theme }) => theme.copy.fontWeight};
`;

export const Spacing = styled.div`
  position: relative;
  width: 50px;
  margin: 1rem;
  background: ${(props) => props.theme.color.primary};
  display: inline-block;
  height: ${({ theme }) => theme.spacings[0]}px;

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    font-family: "sans-serif";
    font-size: 12px;
    color: ${(props) => props.theme.color.secondary};
    content: "${({ theme }) => theme.spacings[0]}";
  }

  &:nth-of-type(2) {
    height: ${({ theme }) => theme.spacings[1]}px;
    &:after {
      content: "${({ theme }) => theme.spacings[1]}";
    }
  }

  &:nth-of-type(3) {
    height: ${({ theme }) => theme.spacings[2]}px;
    &:after {
      content: "${({ theme }) => theme.spacings[2]}";
    }
  }

  &:nth-of-type(4) {
    height: ${({ theme }) => theme.spacings[3]}px;
    &:after {
      content: "${({ theme }) => theme.spacings[3]}";
    }
  }
`;
