export const capitalize = (str = '') => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};
