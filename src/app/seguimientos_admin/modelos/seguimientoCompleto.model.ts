import { TutorCompleto } from './tutorCompleto.model';
import { EstadoSeguimiento } from './estadoSeguimiento.model';
import { EstadoProyecto } from './estadosProyecto.model';
import { Student } from './../../models/student';
import { TipoSeguimiento } from './tipoSeguimiento.model';
export interface SeguimientoCompleto {
    id:number;
    nombre: string;
    tipo: TipoSeguimiento;
    tutor: TutorCompleto;
    estudiante: Student;
    coodirector: string;
    estado: EstadoProyecto;
    cohorte:string;
    oGeneral:string;
    oEspecificos:string;
    estadoSeguimiento:EstadoSeguimiento;
  }