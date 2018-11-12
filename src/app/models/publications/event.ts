import { Publication } from './publication';

export class EventPublication extends Publication
{
  private _doi: string;
  private _dataStart: string;
  private _dataFinish: string;
  private _ISSN: string;
  private _tittlePresentation: string;
  private _nameEvent: string;
  private _typeEvent: string;
  private _county: string;
  private _city: string;
  private _presentationPDF: File;
  private _certificateEvent: File;


  public getDoi(): string {
    return this._doi;
  }
  public setDoi(value: string) {
    this._doi = value;
  }

  public getDataStart(): string {
    return this._dataStart;
  }
  public setDataStart(value: string) {
    this._dataStart = value;
  }
  public getDataFinish(): string {
    return this._dataFinish;
  }
  public setDataFinish(value: string) {
    this._dataFinish = value;
  }
  public getISSN(): string {
    return this._ISSN;
  }
  public setISSN(value: string) {
    this._ISSN = value;
  }
  public getTittlePresentation(): string {
    return this._tittlePresentation;
  }
  public setTittlePresentation(value: string) {
    this._tittlePresentation = value;
  }
  public getNameEvent(): string {
    return this._nameEvent;
  }
  public setNameEvent(value: string) {
    this._nameEvent = value;
  }
  public getTypeEvent(): string {
    return this._typeEvent;
  }
  public setTypeEvent(value: string) {
    this._typeEvent = value;
  }
  public getCounty(): string {
    return this._county;
  }
  public setCounty(value: string) {
    this._county = value;
  }

  public getCity(): string {
    return this._city;
  }
  public setCity(value: string) {
    this._city = value;
  }
  public getPresentationPDF(): File {
    return this._presentationPDF;
  }
  public setPresentationPDF(value: File) {
    this._presentationPDF = value;
  }

  public getCertificateEvent(): File {
    return this._certificateEvent;
  }
  public setCertificateEvent(value: File) {
    this._certificateEvent = value;
  }





}
