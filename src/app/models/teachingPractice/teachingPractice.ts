
export class TeachingPractice
{
  private _nameStudent: string;

  private _codeStudent: string;

  private _typePractice: string;

  private _dateStart: string;

  private _dateEnd: string;

  private _certificatePractice: File;


  public getNameStudent(): string {
    return this._nameStudent;
  }
  public setNameStudent(value: string) {
    this._nameStudent = value;
  }
  public getCodeStudent(): string {
    return this._codeStudent;
  }
  public setCodeStudent(value: string) {
    this._codeStudent = value;
  }
  public getTypePractice(): string {
    return this._typePractice;
  }
  public setTypePractice(value: string) {
    this._typePractice = value;
  }
  public getDateStart(): string {
    return this._dateStart;
  }
  public setDateStart(value: string) {
    this._dateStart = value;
  }
  public getDateEnd(): string {
    return this._dateEnd;
  }
  public setDateEnd(value: string) {
    this._dateEnd = value;
  }
  public getCertificatePractice(): File {
    return this._certificatePractice;
  }
  public setCertificatePractice(value: File) {
    this._certificatePractice = value;
  }
}
