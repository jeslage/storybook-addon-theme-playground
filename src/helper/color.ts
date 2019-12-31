export const getPrimaryColor = theme => {
  return theme.base === 'dark' ? theme.color.lightest : theme.color.darkest;
};

export const getSecondaryColor = theme => {
  return theme.color.mediumdark;
};

export const getTextColor = theme => {
  return theme.color.defaultText;
};

export const getBorderColor = theme => {
  return theme.base === 'dark' ? theme.color.dark : theme.color.medium;
};
