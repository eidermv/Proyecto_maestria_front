
export class StringApp
{
  /** variables del modulo linea **/
        /** registrar linea */
  public TITLE_ADD_LINE = 'Registrar Linea';
  public BTN_ADD_LINE = 'Registrar';
  public MSJ_EJEMPLO_ADD_LINE = 'En este sitio podrás crear líneas para tus productos como: línea de jabones, línea de celulares Samsung o las líneas que tu negocio requiera';
  public PLACEHOLDER_ADD_LINE = 'Nombre de la linea';
  public LABEL_MSJ_ADD_LINE = 'Nombre de la Línea';
  public MSJ_ERROR_ADD_LINE = 'El campo nombre línea no puede tener más de 20 caracteres o estar vacio';
  public MSJ_EXITO_ADD_LINE_MODAL = 'Línea registrada con éxito';
  public MSJ_FAIL_ADD_LINE_MODAL = 'El nombre de la línea ya existe, intente con otro nombre';

  /** Mensajes de exito en ventana Modal */
  public MSJ_OK_REGISTRY = 'Registro Exitoso';
  public MSJ_ERROR_REGISTRY = 'Falla en el registro';
  public MSJ_CLOSE = 'Cerrar';

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


  /******** ROLES DE LA APP */

  public COORDINATOR =  'Coordinador';
  public STUDENT = 'Estudiante';


  /***************CONSTANTES DEL SERVICIO DE LOCALIZACION**********/

  public API_CITIES= 'http://api.geonames.org/';
  public API_SERVICE_SEARCH = 'searchJSON?q=';
  public API_PARAMS_REQUEST = '&maxRows=10&fuzzy=0.8&username=mundialrusia2018';

  // url_cadena = URL_SERVICIO + NOMBRE_SERVICIO + this.ciudadConsultar + PARAMETROS_PETICION;
  // http://api.geonames.org/search?q=popayan&maxRows=10&fuzzy=0.8&username=mundialrusia2018}

}

