const setValue = (propertyPath: string[] | string, value: any, obj: object) => {
  const newObj = obj;

  const properties = Array.isArray(propertyPath)
    ? propertyPath
    : propertyPath.split('.');

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (
      !Object.prototype.hasOwnProperty.call(obj, properties[0]) ||
      typeof obj[properties[0]] !== 'object'
    )
      newObj[properties[0]] = {};
    // We iterate.
    return setValue(properties.slice(1), value, obj[properties[0]]);
    // This is the last property - the one where to set the value
  }

  // We set the value to the last property
  newObj[properties[0]] = value;

  return true; // this is the end
};

export default setValue;
