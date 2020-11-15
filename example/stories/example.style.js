import styled from 'styled-components';

export const Content = styled.fieldset`
  padding: 1.5rem;
  border: 1px solid #f4f4f4;
  margin-bottom: 2rem;
  position: relative;

  legend {
    display: block;
    padding: 0 0.25rem;
    color: lightgray;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
`;

export const Color = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  margin: 0rem 1rem 0rem 0rem;
  display: inline-block;
  border-radius: 0.25rem;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    text-transform: uppercase;
    font-family: sans-serif;
    padding: 5px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.25rem;
  }
`;

export const ColorPrimary = styled(Color)`
  background: ${({ theme }) => theme.color.primary};

  &:before {
    content: '${({ theme }) => theme.color.primary}';
    font-size: 12px;
  }
`;

export const ColorSecondary = styled(Color)`
  background: ${({ theme }) => theme.color.secondary};

  &:before {
    content: '${({ theme }) => theme.color.secondary}';
    font-size: 12px;
  }
`;

export const ColorTertiary = styled(Color)`
  background: ${({ theme }) => theme.color.tertiary};

  &:before {
    content: '${({ theme }) => theme.color.tertiary}';
    font-size: 12px;
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
  background: #333;
  ${getRectStyles};
`;

export const RectContainer = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  border: 1px solid palevioletred;
  background: lightpink;
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
  display: inline-block;
  height: ${({ theme }) => theme.spacings[0]}px;

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    font-family: 'sans-serif';
    font-size: 12px;
    content: '${({ theme }) => theme.spacings[0]}';
  }

  &:nth-of-type(2) {
    height: ${({ theme }) => theme.spacings[1]}px;
    &:after {
      content: '${({ theme }) => theme.spacings[1]}';
    }
  }

  &:nth-of-type(3) {
    height: ${({ theme }) => theme.spacings[2]}px;
    &:after {
      content: '${({ theme }) => theme.spacings[2]}';
    }
  }

  &:nth-of-type(4) {
    height: ${({ theme }) => theme.spacings[3]}px;
    &:after {
      content: '${({ theme }) => theme.spacings[3]}';
    }
  }
`;
