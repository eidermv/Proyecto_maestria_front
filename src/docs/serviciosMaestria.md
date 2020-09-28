### GET /seguimientos/obtenerSeguimientos
Esta solicitud consulta el catalogo de seguimientos que deben mostrarse en la vista de segumientos.
Los seguimientos a listar deben estar estado_seguimiento ACEPTADO
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
    {
          id: 1,
          nombre: 'Tesis3',
          tipo: 'Propuesta',
          tutor: 'Carlos n',
          estudiante: 'Estudiante1',
          estado_proyecto: 'INICIADO',
          cohorte: '2020',
          coodirector:'Coodirector',
          oGeneral: 'Nuevo objetivo',
          oEspecificos: 'HACER UN PROTOTIPO DE INTERFAZ QUE PERMITA TALES COSAS',
          estado_seguimiento:'Aceptado',
        };
]
```
Si no se encuentran seguimientos devolver.
```Javascript
[]
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|

### GET /tutores/obtenerTutores
Esta solicitud consulta el catalogo de tutores que deben mostrarse en la vista de tutores.
El sistema debe responder con un array de objetos JSON de la siguiente manera
```Javascript
[
    {
            nombre:"Carlos",
            apellido:"Cobos",
            identificacion:"10618776564",
            correo:"ccobos@unicauca.edu.co",
            telefono:"3008765666",
            departamento:"Sistemas",
            grupoInvestigacion:"SIR",
            tipo:"Interno",
            universidad:"Universidad del Cauca"  
        };
]
```
Si no se encuentran tutores devolver.
```Javascript
[]
```
#### Códigos de estado
|Código de estado|Descripcion|
|---|---|
|`200`|Exitoso|
|`500`|Error interno del servidor|





---------------------------------------------------------------------------------------------
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
SERVICIOS PARA SEGUIMIENTOS TUTOR
--------------------------------------------------------------------------------------------

#### Get /seguimientos/obtenerSeguimientosTutor

Esta solicitud consulta la lista o catalogo de seguimientos que tiene asociada un tutor y que están en estado_seguimiento:"aceptado",
en esta petición se adjunta el id del tutor al cual pertenecen esos seguimientos, ejemplo:
[
	{
		id:"1"
		nombre:"Patron para la especificación"
		tutor:"Sandra lorena"
		coodirector:"francisco pino"
		estudiante:"santiago castillo"
		cohorte:"2020"
		objetivos:"crear un patrón"
		objetivos_especificos:"objetivo1/nobjetivo2/nobjetivo3"
		estado_proyecto:"desarrollo"
		tipo_seguimiento:"tesis"
		estado_seguimiento:"en espera"
	};
]

#### GET /seguimientos/obtenerNotificacionesTutor/3
Esta solicitud consulta la lista o catalogo de seguimientos que  están en estado_seguimiento:"en espera" de aceptar o rechazar por parte de un tutor,
a esta petición se adjunta el id del tutor.
[
	{
		id:"1"
		nombre:"Patron para la especificación"
		tutor:"Sandra lorena"
		estudiante:"santiago castillo"
		cohorte:"2020"
		objetivos:"crear un patrón"
		objetivos_especificos:"objetivo1/nobjetivo2/nobjetivo"
		estado_proyecto:"desarrollo"
		tipo_seguimiento:"tesis"
		estado_seguimiento:"en espera"
		coodirector:"francisco pino"
	};
]
