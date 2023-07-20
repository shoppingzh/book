import dayjs from "dayjs"

export function getDays(from: string | Date) {
  return dayjs().diff(dayjs(from), 'days')
}
