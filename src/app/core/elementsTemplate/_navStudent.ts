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
        name: 'Agregar Publicación',
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
    name: 'Práctica Docente',
    url: '/teachingPractice',
    icon: 'fa fa-user-md',
    children: [
      {
        name: 'Agregar Práctica',
        url: '/teachingPractice/addTeachingPractice',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Mis Prácticas',
        url: '/teachingPractice/listTeachingPracticeforStudent',
        icon: 'fa fa-list-alt'
      }
    ]
  },
  {
    name: 'Pasantía',
    url: '/internship',
    icon: 'fa fa-building',
    children: [
      {
        name: 'Agregar Pasantía',
        url: '/internship/addIntership',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Mis Pasantías',
        url: '/internship/listInternshipForStudent',
        icon: 'fa fa-list-alt'
      }
    ]
  }
];
