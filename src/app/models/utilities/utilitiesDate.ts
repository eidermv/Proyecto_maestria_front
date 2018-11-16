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
}
