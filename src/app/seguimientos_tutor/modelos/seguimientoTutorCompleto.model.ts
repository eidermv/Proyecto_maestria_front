import { EstudianteCompleto } from './estudianteCompleto.model';
import { TipoSeguimientoCompleto } from './tipoSeguimientoCompleto.model';
import { EstadoSeguimientoCompleto } from './estadoSeguimientoCompleto.model';
import { EstadoProyectoCompleto } from './estadoProyectoCompleto.model';
import { Student } from "../../models/student";
import { EstadoSeguimiento } from "./estadoSeguimiento.model";
import { EstadoProyecto } from "./estadosProyecto.model";
import { TipoSeguimiento } from "./tipoSeguimiento.model";
import { TutorCompleto } from "./tutorCompleto.model";

export class SeguimientoTutorCompleto {
    cohorte: string;
    estudiante: EstudianteCompleto;
    tipoSeguimiento: TipoSeguimientoCompleto;
    codirector: string;
    idSeguimiento: number;
    objetivosEspecificos: string;
    objetivoGeneral: string;
    nombre: string;
    estadoProyecto: EstadoProyectoCompleto;
    estadoSeguimiento: EstadoSeguimientoCompleto;
    tutor: TutorCompleto;
  constructor() { }
}

