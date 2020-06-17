import moment from 'moment';

/**
 * return le jours en trois lettres;
 * ex: mer pour mercredi
 * @param value
 * @returns {string}
 */
export default function jourFrShort(value) {
  return moment(value).format('dd');
}
