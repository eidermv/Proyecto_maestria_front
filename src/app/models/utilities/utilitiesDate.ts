export class UtilitiesDate
{
  constructor()
  {
  }

  public getMaxDate(): string
  {
    let maxDate: string;
    const today = new Date();
    if(today.getDate() < 10)
    {
      maxDate = today.getFullYear() + '-' + (today.getMonth()+ 1) + '-' +'0'+ today.getDate();
    }
    else{
      maxDate = today.getFullYear() + '-' + (today.getMonth()+ 1) + '-' + today.getDate();
    }
    return maxDate;
  }



  invertToDate(date: string)
  {
    const dateAux = date.split('-');
    var dateReturn: string;
    dateReturn = '';
    for(let i = dateAux.length; i > 0; i--)
    {

      if((i-1) == 0)
      {
        dateReturn = dateReturn + dateAux[i-1];
      }
      else{
        dateReturn = dateReturn + dateAux[i-1] + '-';
      }
    }
    return dateReturn;
  }

}
