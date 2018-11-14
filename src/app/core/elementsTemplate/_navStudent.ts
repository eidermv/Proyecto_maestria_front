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
        name: 'Listar Publicaciones',
        url: '/publication/listPublicationsEstudent',
        icon: 'fa fa-list-alt'
      }
    ]
  },
];
