import { styled } from '@storybook/theming';
import { getPrimaryColor } from '../../helper';

const StlyedColorPicker = styled.div`
  position: relative;

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
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 195px;
    border-radius: 5px;
    border: 1px solid ${getPrimaryColor};

    span {
      display: block;
      border-radius: 30px;
      height: 20px;
      width: 20px;
      border-radius: 20px;
      margin-left: 5px;
      flex-shrink: 0;
    }

    &:focus,
    &:active {
      color: inherit;
    }
  }

  .colorPicker__content {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 1;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 2px, rgba(0, 0, 0, 0.15) 0px 4px 8px;
  }
`;

export default StlyedColorPicker;
