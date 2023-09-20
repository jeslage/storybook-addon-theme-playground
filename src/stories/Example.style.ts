import styled, { css } from "styled-components";

export const Content = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

export const Color = styled.div<{ index?: number; color?: string }>`
  position: relative;
  width: 180px;
  aspect-ratio: 3/2;
  margin: 0rem 1rem 1rem 0rem;
  display: inline-block;
  border-radius: 0.25rem;
  background: ${({ theme, color }) => theme.color[color]};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
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
    content: "${({ theme, color }) => theme.color[color]}";
  }
`;

export const ColorShade = styled(Color)`
  background: ${({ theme, index }) => theme.color.shades[index || 0]};

  &:after {
    content: "${({ theme, index }) => theme.color.shades[index || 0]}";
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
  background: ${(props) => props.theme.color.shades[4]};
  border-radius: ${(props) => props.theme.borderRadius};
  ${getRectStyles};
`;

export const RectContainer = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.color.shades[0]};
  border-radius: ${(props) => props.theme.borderRadius};
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
  margin-right: 1rem;
  background: ${(props) => props.theme.color.shades[0]};
  display: inline-block;
  border-radius: ${(props) => props.theme.borderRadius};

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    font-family: ${({ theme }) => theme.copy.fontFamily};
    font-size: 14px;
    font-weight: ${({ theme }) => theme.copy.fontWeight};
    color: ${(props) => props.theme.color.shades[4]};
  }

  ${(props) =>
    props.theme.spacings.map(
      (spacing: number, i: number) => css`
        &:nth-of-type(${i + 1}) {
          height: ${spacing}px;
          width: ${spacing}px;

          &:after {
            content: "${spacing}";
          }
        }
      `
    )}
`;
