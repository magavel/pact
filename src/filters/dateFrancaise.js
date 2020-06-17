import moment from 'moment';

export default function dateFrancaise(value) {
  return moment(value).format('DD/MM/YYYY');
}
