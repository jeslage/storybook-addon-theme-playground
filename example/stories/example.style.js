import styled from 'styled-components';

export const Content = styled.div`
  border-top: 1px solid #f4f4f4;
  padding: 0.5rem 1.5rem;
`;

export const Color = styled.div`
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

export const ColorPrimary = styled(Color)`
  background: ${({ theme }) => theme.color.primary};

  &:before {
    content: "${({ theme }) => theme.color.primary}";
  }
`;

export const ColorSecondary = styled(Color)`
  background: ${({ theme }) => theme.color.secondary};

  &:before {
    content: "${({ theme }) => theme.color.secondary}";
  }
`;

export const ColorTertiary = styled(Color)`
  background: ${({ theme }) => theme.color.tertiary};

  &:before {
    content: "${({ theme }) => theme.color.tertiary}";
  }
`;

const getRectStyles = ({ theme }) => `
  width: ${theme.rectangle.width};
  height: ${theme.rectangle.height};
  margin-right: ${theme.rectangle.margin.right}px;
  margin-top: ${theme.rectangle.margin.top}px;
  margin-left: ${theme.rectangle.margin.left}px;
  margin-bottom: ${theme.rectangle.margin.bottom}px;
`;

export const Rect = styled.div`
  display: inline-block;
  background: #323232;
  ${getRectStyles};
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
  background: lightpink;
  height: ${({ theme }) => theme.spacings[0]}px;

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    font-family: "sans-serif";
    font-size: 12px;
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
