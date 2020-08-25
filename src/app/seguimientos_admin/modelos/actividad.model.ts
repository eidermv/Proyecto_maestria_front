export interface Actividad {
    id:number,
    semana:string,
    fecha_inicio: Date;
    fecha_entrega: Date;
    entregas: string;
    compromisos: string;
    cumplido: number;
    visibilidad:number
  }