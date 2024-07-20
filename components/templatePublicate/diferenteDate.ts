import moment from 'moment';

export default function DiferenteDate(date: string) {
  const targetDate = moment(date);
  const currentDate = moment();
  const differenceInMilliseconds = Math.abs(targetDate.diff(currentDate));

  const yearsDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );
  const monthsDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
      (1000 * 60 * 60 * 24 * 30)
  );
  const weeksDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 30)) /
      (1000 * 60 * 60 * 24 * 7)
  );
  const daysDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 7)) /
      (1000 * 60 * 60 * 24)
  );
  const hoursDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60)) / 1000
  );

  if (yearsDifference) return 'Hace ' + yearsDifference + ' años';
  if (monthsDifference) return 'Hace ' + monthsDifference + ' meses';
  if (weeksDifference) return 'Hace ' + weeksDifference + ' sem';
  if (daysDifference) return 'Hace ' + daysDifference + ' d';
  if (hoursDifference) return 'Hace ' + hoursDifference + ' h';
  if (minutesDifference) return 'Hace ' + minutesDifference + ' min';
  return;

  {
    'Hace ' + secondsDifference + ' s';
  }
}
