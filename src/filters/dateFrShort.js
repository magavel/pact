import moment from 'moment';

export default function dateFrShort(value) {
  return `${moment(value).format('ddd')} ${moment(value).format('DD/MM')}`;
}
