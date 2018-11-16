export class Publication
{
  private _credits: string;

  public code: string;
  public author: string;
  public secondaryAuthors: string;
  public datePublication: string;
  public dateAproved: string;
  public contendTable: File;
  public typePublicaton: string;
  private _comentary: string;

  public getComentary(): string {
    return this._comentary;
  }
  public setComentary(value: string) {
    this._comentary = value;
  }

  public getCredits(): string {
    return this._credits;
  }
  public setCredits(value: string) {
    this._credits = value;
  }

  public getAuthor()
  {
    return this.author;
  }
  public setAuthor(author: string)
  {
    this.author = author;
  }
  public getCode()
  {
    return this.code;
  }
  public setCode(code: string)
  {
    this.code = code;
  }
  public getSecondaryAuthors()
  {
    return this.secondaryAuthors;
  }
  public setSecondaryAuthors(secondaryAuthors: string)
  {
    this.secondaryAuthors = secondaryAuthors;
  }
  public getDatePublication()
  {
    return this.datePublication;
  }
  public setDatePublication(datePublication: string)
  {
    this.datePublication = datePublication;
  }
  public getDateAproved()
  {
    return this.dateAproved;
  }
  public setDateAproved(dateAproved: string)
  {
    this.dateAproved = dateAproved;
  }
  public getContenTable()
  {
    return this.contendTable;
  }
  public setContenTable(contendTable: File)
  {
    this.contendTable = contendTable;
  }

}
