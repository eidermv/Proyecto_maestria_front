export const navAdministrator = [
  {
    title: true,
    name: 'Administrador'
  },
  {
    name: 'Estudiante',
    url: '/student',
    icon: 'fa fa-graduation-cap',
    children: [
      {
        name: 'Registrar Estudiante',
        url: '/student/addStudent',
        icon: 'fa fa-cloud-upload'
      },
      {
        name: 'Listar Estudiantes',
        url: '/student/listStudent',
        icon: 'fa fa-list-alt'
      },
      {
        name: 'Listar Publicaciones',
        url: '/publication/listPublicationsAdmin',
        icon: 'fa fa-list-alt'
      },
      {
        name: 'Listar Practicas Docente',
        url: '/teachingPractice/listTeachingPracticeAdmin',
        icon: 'fa fa-list-alt'
      }

    ]
  },

];
