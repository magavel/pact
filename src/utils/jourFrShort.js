import moment from 'moment';

export default function jourFrShort(value) {
  return moment(value).format('dd');
}
