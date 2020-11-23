export const config = function (entry) {
  return [...entry, require.resolve('./addDecorator')];
};

export const managerEntries = function (entry) {
  return [...entry, require.resolve('../register')];
};
