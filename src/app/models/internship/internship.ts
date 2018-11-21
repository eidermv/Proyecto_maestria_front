
export class Internship
{
  private _nameStudent: string;
  private _codeStudent: string;
  private _dataIntershipStart: string;
  private _dataIntershipEnd: string;
  private _typeIntership: string;
  private _institution: string;
  private _dependence: string;
  private _nameDependence: string;
  private _tutorInternship: string;
  private _certificateInternship: File;
  private _ReportInternship: File;
  private _dateRegistryIntership: string;
  private _state: string;
  private _credits: string;
  private _observation: string;
  private _idInternship: string;

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

  public getDataIntershipStart(): string {
    return this._dataIntershipStart;
  }
  public setDataIntershipStart(value: string) {
    this._dataIntershipStart = value;
  }

  public getDataIntershipEnd(): string {
    return this._dataIntershipEnd;
  }
  public setDataIntershipEnd(value: string) {
    this._dataIntershipEnd = value;
  }

  public getTypeIntership(): string {
    return this._typeIntership;
  }
  public setTypeIntership(value: string) {
    this._typeIntership = value;
  }

  public getInstitution(): string {
    return this._institution;
  }
  public setInstitution(value: string) {
    this._institution = value;
  }
  public getDependence(): string {
    return this._dependence;
  }
  public setDependence(value: string) {
    this._dependence = value;
  }
  public getNameDependence(): string {
    return this._nameDependence;
  }
  public setNameDependence(value: string) {
    this._nameDependence = value;
  }
  public getTutorInternship(): string {
    return this._tutorInternship;
  }
  public setTutorInternship(value: string) {
    this._tutorInternship = value;
  }
  public getCertificateInternship(): File {
    return this._certificateInternship;
  }
  public setCertificateInternship(value: File) {
    this._certificateInternship = value;
  }
  public getReportInternship(): File {
    return this._ReportInternship;
  }
  public setReportInternship(value: File) {
    this._ReportInternship = value;
  }

  public getDateRegistryIntership(): string {
    return this._dateRegistryIntership;
  }
  public setDateRegistryIntership(value: string) {
    this._dateRegistryIntership = value;
  }
  public getState(): string {
    return this._state;
  }
  public setState(value: string) {
    this._state = value;
  }
  public getCredits(): string {
    return this._credits;
  }
  public setCredits(value: string) {
    this._credits = value;
  }
  public getObservation(): string {
    return this._observation;
  }
  public setObservation(value: string) {
    this._observation = value;
  }
  public getIdInternship(): string {
    return this._idInternship;
  }
  public setIdInternship(value: string) {
    this._idInternship = value;
  }

}
