
export default function fromMinutesToHours(minutes) {
  let regex = new RegExp("^[0-9]+$","g");
  if(regex.test(minutes)){
    let nbHour = parseInt(minutes / 60);
    let nbminuteRestante = (minutes % 60);
    if(nbminuteRestante == 0){
      return(nbHour + ":");}
    else{
      return(nbHour + ":" + nbminuteRestante);
    }
  }
}
