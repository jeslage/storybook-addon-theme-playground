export const getPrimaryColor = theme => {
  return theme.base === 'dark' ? theme.color.lightest : theme.color.darkest;
};

export const getSecondaryColor = theme => {
  return theme.base === 'dark'
    ? theme.color.mediumdark
    : theme.color.mediumdark;
};

export const getTextColor = theme => {
  return theme.color.inverseText;
};

export const getCodeBackground = theme => {
  return theme.base === 'dark' ? theme.color.darker : theme.color.darkest;
};
