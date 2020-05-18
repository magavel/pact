import moment from 'moment';

export default function fromNow(value) {
  return moment(value).fromNow();
}
