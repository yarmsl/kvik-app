export const phoneFormat = (str: string): string => {
  str = str.replace(/\D/g, '');
  let format = '';
  if (!str) {
    return '';
  }
  if (str[0] === '9') {
    str = '7' + str;
  }
  format = '+7';
  if (str.length > 1) {
    format += ' (' + str.substring(1, 4);
  }
  if (str.length >= 5) {
    format += ') ' + str.substring(4, 7);
  }
  if (str.length >= 8) {
    format += '-' + str.substring(7, 9);
  }
  if (str.length >= 10) {
    format += '-' + str.substring(9, 11);
  }
  return format;
};
