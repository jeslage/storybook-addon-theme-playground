import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper/color';

const StlyedColorPicker = styled.div`
  display: flex;
  align-items: center;

  .colorPicker__cover {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    outline: none;
    border: none;
    background: none;
  }

  .colorPicker__open {
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
    padding: 5px;
    width: 60px;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => getPrimaryColor(theme)};

    span {
      display: block;
      border-radius: 30px;
      height: 20px;
    }
  }

  .colorPicker__wrapper {
    position: relative;
  }

  .colorPicker__content {
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 2;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 2px, rgba(0, 0, 0, 0.15) 0px 4px 8px;
  }
`;

export default StlyedColorPicker;
