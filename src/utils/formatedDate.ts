import dayjs from "dayjs";
import "dayjs/locale/id";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatDateWithTime(date: string | Date) {
  const formattedDate = dayjs(date).locale("id").format("D MMMM YYYY HH:mm"); // format Indonesia
  const relative = dayjs(date).locale("en").fromNow(); // relative time Inggris
  return `${formattedDate} (${relative})`;
}
