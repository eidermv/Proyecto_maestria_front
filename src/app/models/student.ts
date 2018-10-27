export class Line
{
  private id: string;
  private name: string;
  private surname: string;
  private email: string;
  private tutor: string;
  private state: string;
  private cohorte: string;
  private semesterEnterd: string;
  private enteredBy: string;

  public getId()
  {
    return this.id;
  }
  public setId(id: string)
  {
    this.id = id;
  }

  public getName()
  {
    return this.name;
  }
  public setName(name: string)
  {
    this.name = name;
  }

  public getSurname()
  {
    return this.surname;
  }
  public setSurname(surname: string)
  {
    this.surname = surname;
  }

  public getTutor()
  {
    return this.tutor;
  }
  public setTutor(tutor: string)
  {
    this.tutor = tutor;
  }

  public getEmail()
  {
    return this.email;
  }
  public setEmail(email: string)
  {
    this.email = email;
  }

  public getCohorte()
  {
    return this.cohorte;
  }
  public setCohorte(cohorte: string)
  {
    this.cohorte = cohorte;
  }

  public getState()
  {
    return this.state;
  }
  public setState(state: string)
  {
    this.state = state;
  }

  public getEnteredSemester()
  {
    return this.semesterEnterd;
  }
  public setEnteredSemester(enteredSemester: string)
  {
    return this.semesterEnterd = enteredSemester;
  }

  public getEnteredBy()
  {
    return this.enteredBy;
  }
  public setEnteredBy(enteredBy: string)
  {
    this.enteredBy = enteredBy;
  }


}
