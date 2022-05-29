export const formatTime = (value: string): string => {
  if (!value) return '';
  const timeArr = new Date(value).toLocaleTimeString('ru-RU').split(':');
  return `${timeArr[0]}:${timeArr[1]}`;
};

export default { formatTime };
