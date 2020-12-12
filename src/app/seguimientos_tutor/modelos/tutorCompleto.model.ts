import { TipoTutorCompleto } from './tipoTutorCompleto.model';
export class TutorCompleto {
    id_tutor: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    tipo: TipoTutorCompleto;
    departamento: string;
    grupoInvestigacion: string;
    universidad: string;
    constructor() { }
  }
