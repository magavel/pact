import moment from 'moment';

export default function dateFrShort(value) {
  return `${moment(value).format('dd')} ${moment(value).format('DD/MM')}`
}
