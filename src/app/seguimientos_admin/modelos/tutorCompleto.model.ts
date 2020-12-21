import { TipoTutor } from './tipoTutor.model';
export interface TutorCompleto {
    nombre:string,
    apellido: string;
    identificacion: string;
    correo: string;
    telefono: string;
    tipo: TipoTutor;
    departamento: string;
    grupoInvestigacion:string;
    universidad:string;
    id:string;
  }