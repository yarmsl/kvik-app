export const text2Bool = (str: string): boolean => {
  if (str === 'true') {
    return true;
  } else {
    return false;
  }
};

export const date2str = (date: Date): string => {
  return date.toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const ToRubles = (num: number): string => {
  return num.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
