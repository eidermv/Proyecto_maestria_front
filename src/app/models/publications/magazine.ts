import { Publication } from './publication';

export class Magazine extends Publication {
   private doi: string;
   private titleArticle: string;
   private nameMagazine: string;
   private categoryMagazine: string;
   private articlePDF: File;
   private screenShotEmail: File;
   private screenShotClasification: File;

   public getDoi() {
     return this.doi;
   }
   public setDoi(doi: string) {
     this.doi = doi;
   }
   public getTitleArticle() {
     return this.titleArticle;
   }
   public setTitleArticle(titleArticle: string) {
     this.titleArticle = titleArticle;
   }
   public getNameMagazine() {
     return this.nameMagazine;
   }
   public setNameMagazine(nameMagazine: string) {
    this.nameMagazine = nameMagazine;
   }
   public getCategoryMagazine() {
     return this.categoryMagazine;
   }
   public setCategoryMagazine(categoryMagazine: string) {
     this.categoryMagazine = categoryMagazine;
   }
   public getArticlePDF() {
     return this.articlePDF;
   }
   public setArticlePDF(articlePDF: File) {
      this.articlePDF = articlePDF;
   }
   public getScreenShotEmail() {
     return this.screenShotEmail;
   }
   public setScreenShotEmail(screenShotEmail: File) {
     this.screenShotEmail = screenShotEmail;
   }
   public getScreenShotClasification() {
     return this.screenShotClasification;
   }
   public setScreenShotClasification(screenShotClasification: File) {
     this.screenShotClasification = screenShotClasification;
   }
}
