
export class Localization {
  private city: string;
  private county: string;

  constructor() {
  }

  public getCity() {
    return this.city;
  }
  public setCity(city: string) {
    this.city = city;
  }
  public getCountry() {
    return this.county;
  }
  public setCountry(county: string) {
    this.county = county;
  }
}
