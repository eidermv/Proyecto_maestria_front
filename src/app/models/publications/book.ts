import { Publication } from './publication';

export class Book extends Publication {
  private _isbn: string;

  private _titleBook: string;

  private _editorial: string;

  private _county: string;

  private _city: string;

  private _bookPDF: File;

  private _certificateEditorial: File;

  public getIsbn(): string {
    return this._isbn;
  }
  public setIsbn(value: string) {
    this._isbn = value;
  }

  public getTitleBook(): string {
    return this._titleBook;
  }
  public setTitleBook(value: string) {
    this._titleBook = value;
  }
  public getEditorial(): string {
    return this._editorial;
  }
  public setEditorial(value: string) {
    this._editorial = value;
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
  public getBookPDF(): File {
    return this._bookPDF;
  }
  public setBookPDF(value: File) {
    this._bookPDF = value;
  }
  public getCertificateEditorial(): File {
    return this._certificateEditorial;
  }
  public setCertificateEditorial(value: File) {
    this._certificateEditorial = value;
  }


}
