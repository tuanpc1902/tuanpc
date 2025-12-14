import dayjs from 'dayjs';

export default function CalcRemainTime(targetDate: string) {
  const now = dayjs();
  const target = dayjs(targetDate);

  // nếu target đã qua rồi
  if (target.isBefore(now)) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

 const diffSeconds = target.diff(now, 'seconds');
 const hours = Math.floor(diffSeconds / 3600);
const minutes = Math.floor((diffSeconds % 3600) / 60);
const seconds = diffSeconds % 60;

  const result = {
    hours,
    minutes,
    seconds,
  };

  return result;
}
