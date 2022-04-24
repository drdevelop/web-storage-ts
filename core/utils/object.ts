export function isJSON(jsonStr: string) {
  try {
    const result = JSON.parse(jsonStr);
    return Object.prototype.toString.call(result) === '[object Object]';
  } catch (err) {
    return false;
  }
}
