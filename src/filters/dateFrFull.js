import moment from 'moment';

export default function dateFrFull(value) {
  return moment(value).format('dddd D MMMM YYYY');
}
