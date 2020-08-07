import { Publication } from './publication';

export class CapBook extends Publication {
  private _isbn: string;
  private _titleBook: string;
  private _titleCapBook: string;
  private _editorial: string;
  private _capBook: File;
  private _CertificateCapBook: File;

  public getCertificateCapBook(): File {
    return this._CertificateCapBook;
  }
  public setCertificateCapBook(value: File) {
    this._CertificateCapBook = value;
  }

  public getCapBook(): File {
    return this._capBook;
  }
  public setCapBook(value: File) {
    this._capBook = value;
  }
  public getEditorial(): string {
    return this._editorial;
  }
  public setEditorial(value: string) {
    this._editorial = value;
  }

  public getTitleCapBook(): string {
    return this._titleCapBook;
  }
  public setTitleCapBook(value: string) {
    this._titleCapBook = value;
  }

  public getTitleBook(): string {
    return this._titleBook;
  }
  public setTitleBook(value: string) {
    this._titleBook = value;
  }

  public getIsbn(): string {
    return this._isbn;
  }
  public setIsbn(value: string) {
    this._isbn = value;
  }

}
