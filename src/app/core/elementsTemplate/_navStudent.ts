export const navStudent = [

    {
    title: true,
    name: 'Estudiante'
  },
  {
    name: 'Publicaciones',
    url: '/publication',
    icon: 'fa fa-database',
    children: [
      {
        name: 'Agregar Publicacion',
        url: '/publication/addPublications',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Mis Publicaciones',
        url: '/publication/listPublicationsEstudent',
        icon: 'fa fa-list-alt'
      }
    ]
  },
  {
    name: 'Practica Docente',
    url: '/teachingPractice',
    icon: 'fa fa-database',
    children: [
      {
        name: 'Agregar Practica',
        url: '/teachingPractice/addTeachingPractice',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Mis Practicas',
        url: '/teachingPractice/listTeachingPracticeforStudent',
        icon: 'fa fa-list-alt'
      }
    ]
  },
  {
    name: 'Pasantia',
    url: '/internship',
    icon: 'fa fa-database',
    children: [
      {
        name: 'Agregar Pasantia',
        url: '/internship/addIntership',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Mis Pasantias',
        url: '/internship/listInternshipForStudent',
        icon: 'fa fa-list-alt'
      }
    ]
  }
];
