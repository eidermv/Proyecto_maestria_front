export const navStudent = [

    {
    title: true,
    name: 'Estudiante'
  },
  {
    name: 'Publicaciones',
    url: '/publication',
    icon: 'icon-layers',
    children: [
      {
        name: 'Agregar Publicacion',
        url: '/publication/addPublications',
        icon: 'fa fa-list-ol'
      },
      {
        name: 'Listar Publicaciones',
        url: '/publication/listPublications',
        icon: 'fa fa-list-ol'
      }
    ]
  },
];
