import moment from 'moment';

export default function monthYearShort(value) {
  return moment(value).format('DD/MM');
}
