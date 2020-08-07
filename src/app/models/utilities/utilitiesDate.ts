export class UtilitiesDate {
  constructor() {
  }

  public getMaxDate(): string {
    let maxDate: string;
    const today = new Date();

    if (today.getMonth() + 1 < 10) {
      maxDate = today.getFullYear() + '-' + '0' +  (today.getMonth() + 1);
    } else {
      maxDate = today.getFullYear() + '-' + (today.getMonth() + 1);
    }

    if (today.getDate() < 10) {
      maxDate = maxDate + '-' + '0' + today.getDate();
    } else {
      maxDate = maxDate + '-' + today.getDate();
    }
    return maxDate;
  }



  invertToDate(date: string) {
    const dateAux = date.split('-');
    let dateReturn: string;
    dateReturn = '';
    for (let i = dateAux.length; i > 0; i--) {

      if ((i - 1) == 0) {
        dateReturn = dateReturn + dateAux[i - 1];
      } else {
        dateReturn = dateReturn + dateAux[i - 1] + '-';
      }
    }
    return dateReturn;
  }

}
