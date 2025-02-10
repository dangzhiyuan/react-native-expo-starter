import dayjs from "dayjs";

export const dateUtils = {
  format: (date: Date, format = "YYYY-MM-DD") => dayjs(date).format(format),

  fromNow: (date: Date) => dayjs(date).fromNow(),

  isToday: (date: Date) => dayjs(date).isSame(new Date(), "day"),
};
