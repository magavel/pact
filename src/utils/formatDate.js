import moment from 'moment';

export default function formatDate(value) {
  return moment(value).format('DD/MM/YYYY');
}
