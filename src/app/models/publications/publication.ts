export class Publication
{
  public code: string;
  public author: string;
  public secondaryAuthors: string;
  public datePublication: string;
  public dateAproved: string;
  public contendTable: File;
  public typePublicaton: string;

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
