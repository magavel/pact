import moment from 'moment';

/**
 * return le mois et l'année sous la forme:
 * 12/20
 * @param value
 * @returns {string}
 */
export default function monthYearShort(value) {
  return moment(value).format('DD/MM');
}
