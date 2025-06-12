import dayjs from "dayjs";
export const normalizeDate = (d) => {
  if (typeof d === 'string') return d;

  if (dayjs.isDayjs(d)) return d.format('YYYY-MM-DD');

  return null;
};