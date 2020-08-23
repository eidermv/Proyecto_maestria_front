export interface Seguimiento {
    id:number,
    nombre: string;
    tipo: string;
    tutor: string;
    estudiante: string;
    estado: string;
    cohorte:string,
    oGeneral:string,
    oEspecificos:string[]
  }