
export default function fromMinutesToHours(minutes) {
  minutes = Math.round(minutes);
  let regex = new RegExp("^[0-9]+$","g");
  if(regex.test(minutes)){
    let nbHour = parseInt(minutes / 60);
    let nbminuteRestante = (minutes % 60);
    if(nbminuteRestante == 0){
      return(nbHour + ":00");}
    else{
      if (nbminuteRestante < 10) {
        return (nbHour + ":0" + nbminuteRestante);
      } else {
        return (nbHour + ":" + nbminuteRestante);
      }
    }
  }
}
