

export class StringApp
{

  /** URL DEL SERVICIO*********** */

  private URL_SERVICIO = 'http://localhost:8080/';
  public URL_SERVICIO_LOGIN = this.URL_SERVICIO + 'login';
  public URL_SERVICIO_GET_ALL_TUTORS = this.URL_SERVICIO + 'tutor/buscar/todo';
  public URL_SERVICIO_CREATE_STUDENT = this.URL_SERVICIO + 'estudiante/crear';
  public URL_SERVICIO_GET_ALL_STUDENTS = this.URL_SERVICIO + 'estudiante/buscar/todo';
  public URL_SERVICIO_SEARCH_STUDENT = this.URL_SERVICIO + 'estudiante/buscar/match/';
  public URL_SERVICIO_SEARCH_STUDENT_BY_CODE = this.URL_SERVICIO +'estudiante/buscar/codigo/';
  public URL_SERVICIO_UPDATE_STUDENT = this.URL_SERVICIO + 'estudiante/actualizar';
  public URL_SERVICIO_GET_STUDENT_WHIT_TOKEN = this.URL_SERVICIO + 'estudiante/buscar/token/';

  public URL_SERVICIO_REGISTRY_PUBLICATIONS = this.URL_SERVICIO + 'publicacion/revista/registrar';
  public URL_SERVICIO_REGISTRY_BOOK = this.URL_SERVICIO + 'publicacion/libro/registrar';
  public URL_SERVICIO_REGISTRY_EVENT = this.URL_SERVICIO + 'publicacion/evento/registrar';
  public URL_SERVICIO_REGISTRY_CAP_BOOK = this.URL_SERVICIO + 'publicacion/capituloLibro/registrar';

  public URL_SERVICIO_GETPUBLICATIONS_STUDENT = this.URL_SERVICIO + 'publicacion/buscar/codigoEstudiante/';

  public URL_SERVICIO_GETPUBLICATION_EVENT = this.URL_SERVICIO + 'publicacion/evento/buscar/idPublicacion/';
  public URL_SERVICIO_GETPUBLICATION_BOOK = this.URL_SERVICIO + 'publicacion/libro/buscar/idPublicacion/';
  public URL_SERVICIO_GETPUBLICATION_CAPBOOK = this.URL_SERVICIO + 'publicacion/capituloLibro/buscar/idPublicacion/';
  public URL_SERVICIO_GETPUBLICATION_MAGAZINE = this.URL_SERVICIO + 'publicacion/revista/buscar/idPublicacion/';
  public URL_SERVICIO_GETFILES_MAGAZINE = this.URL_SERVICIO + 'publicacion/revista/descargar/';
  public URL_SERVICIO_GETFILES_BOOK = this.URL_SERVICIO + 'publicacion/libro/descargar/';
  public URL_SERVICIO_GETFILES_CAPBOKK = this.URL_SERVICIO + 'publicacion/capituloLibro/descargar/';
  public URL_SERVICIO_GETFILES_EVENT = this.URL_SERVICIO + 'publicacion/evento/descargar/';
  public URL_sERVICIO_DELETE_PUBLICATION = this.URL_SERVICIO + 'publicacion/eliminar';
  public URL_SERVICIO_GETALL_PUBLICATION = this.URL_SERVICIO + 'publicacion/buscar/todo';
  public URL_SERVICIO_UPDATE_STATE = this.URL_SERVICIO + 'publicacion/actualizar/estado';

  public URL_SERVICIO_REGISTRY_TEACHING_PRACTICE = this.URL_SERVICIO + 'practicaDocente/registrar';
  public URL_SERVICIO_GET_ALL_TEACHINGPRACTICE = this.URL_SERVICIO + 'practicaDocente/buscar/codigoEstudiante/';
  public URL_SERVICIO_GETFILE_TEACHING_PRACTICE = this.URL_SERVICIO + 'practicaDocente/descargar/';
  public URL_SERVICIO_DELETE_TEACHING_PRACTICE = this.URL_SERVICIO + 'practicaDocente/eliminar/idPracticaDocente/';
  public URL_SERVICIO_GET_ALL_TEACHINGPRACTICE_ADMIN = this.URL_SERVICIO + 'practicaDocente/buscar/todo';

  public URL_SERVICIO_REGISTRY_INTERNSHIP = this.URL_SERVICIO + 'pasantia/registrar';
  public URL_SERVICIO_GET_ALL_INTERNSHIP = this.URL_SERVICIO + 'pasantia/buscar/codigoEstudiante/';
  public URL_SERVICIO_GETFILE_INTERNSHIP = this.URL_SERVICIO + 'pasantia/descargar/';
  public URL_SERVICIO_DELETE_INTERNSHIP = this.URL_SERVICIO + 'pasantia/eliminar/idPasantia/';
  public URL_SERVICIO_GET_ALL_INTERNSHIP_ADMIN = this.URL_SERVICIO + 'pasantia/buscar/todo';


  /******** ROLES DE LA APP */

  public COORDINATOR =  'Coordinador';
  public STUDENT = 'Estudiante';


  /***************CONSTANTES DEL SERVICIO DE LOCALIZACION**********/

  public API_CITIES= 'http://api.geonames.org/';
  public API_SERVICE_SEARCH = 'searchJSON?q=';
  public API_PARAMS_REQUEST = '&maxRows=5&fuzzy=0.8&username=mundialrusia2018';

  // url_cadena = URL_SERVICIO + NOMBRE_SERVICIO + this.ciudadConsultar + PARAMETROS_PETICION;
  // http://api.geonames.org/search?q=popayan&maxRows=10&fuzzy=0.8&username=mundialrusia2018}

}

