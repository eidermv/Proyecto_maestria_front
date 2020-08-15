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
        icon: 'fa fa-database'
      },
      {
        name: 'Listar Prácticas Docente',
        url: '/teachingPractice/listTeachingPracticeAdmin',
        icon: 'fa fa-user-md'
      },
      {
        name: 'Listar Pasantías',
        url: '/internship/listInsternshipAdmin',
        icon: 'fa fa-building'
      },

    ]
  }, 
  {
    name: 'Seguimientos',
    url: '/seguimientos',
    icon: 'fa fa-search',
    children: [
      {
        name: 'Listar Seguimiento',
        url: '/listar',
        icon: 'fa fa-cloud-upload'
      }
    ]
  }

];
