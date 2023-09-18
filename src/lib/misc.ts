import defaultCssColors from "./defaultCSSColors";

import { LabelFormatFunction } from "../types";

const startCase = (str: string) =>
  str
    .toLowerCase()
    .split(".")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatLabel = (
  label: string,
  format?: "startCase" | "path" | LabelFormatFunction
) => {
  const path = label.split(".");
  if (format === "path") return label;
  if (format === "startCase") return startCase(label);
  if (typeof format === "function") return format(path);
  return label;
};

type V = string | number | any[] | Record<any, any>;

export const is = {
  color: (v: V, l = "") =>
    typeof v === "string" &&
    ((v.startsWith("#") && (v.length === 4 || v.length === 7)) ||
      v.startsWith("rgb(") ||
      v.startsWith("rgba(") ||
      v.startsWith("hsl(") ||
      v.startsWith("hsla(") ||
      defaultCssColors.includes(v.toLowerCase()) ||
      l.toLowerCase().includes("color")),

  number: (v: V) => typeof v === "number",
  string: (v: V) => typeof v === "string",
  object: (v: V) => typeof v === "object",
  function: (v: V) => typeof v === "function",
  array: (v: V) => Array.isArray(v),
  boolean: (v: V) => typeof v === "boolean" || v === "true" || v === "false",
  unit: (v: V) =>
    typeof v === "string" &&
    (v.endsWith("px") ||
      v.endsWith("rem") ||
      v.endsWith("em") ||
      v.endsWith("%")),
  shorthand: (v: V) => {
    const keys = Object.keys(v);
    return (
      keys.length === 4 &&
      keys.includes("top") &&
      keys.includes("bottom") &&
      keys.includes("right") &&
      keys.includes("left")
    );
  },
};

export const updateObjectAtKey = (
  path: string,
  value: any,
  obj: Record<any, any>
) => {
  const newObj = obj;

  const properties: string[] = path.split(".");

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (
      !Object.prototype.hasOwnProperty.call(obj, properties[0]) ||
      typeof obj[properties[0]] !== "object"
    )
      newObj[properties[0]] = {};
    // We iterate.
    return updateObjectAtKey(
      properties.slice(1).join("."),
      value,
      obj[properties[0]]
    );
    // This is the last property - the one where to set the value
  }

  newObj[properties[0]] = value;

  return true;
};

export const stripUnit = (value: string | number): any => {
  if (typeof value !== "string") return [value, undefined];
  const matchedValue = value.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);

  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
};

export const objectify = (options: any[] = []) => {
  const obj = {};

  options.forEach((option) =>
    Object.assign(obj, { [option.label]: option.value })
  );

  return obj;
};
