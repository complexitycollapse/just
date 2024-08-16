export function format(value) {
  if (Array.isArray(value)) {
    return formatArray(value);
  } else if (typeof value === "object" && value !== null) {
    return formatObject(value);
  } else {
    return formatPrimitive(value);
  }
}

export function formatArray(value) {
  return "[" + value.map(format).join(", ") + "]";
}

export function formatObject(value) {
  return "{ " + Object.entries(value).map(([key, val]) => key + ": " + format(val)).join(", ") + " }";
}

export function formatPrimitive(prim) {
  if (prim === undefined) {
    return "undefined";
  }  else if (prim === null) {
    return "null";
  } else {
    return JSON.stringify(prim);
  }
}
