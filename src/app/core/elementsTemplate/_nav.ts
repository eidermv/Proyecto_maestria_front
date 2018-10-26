export const navItems = [

  {
    title: true,
    name: 'Administrador'
  },
  {
    name: 'Estudiante',
    url: '/linea',
    icon: 'icon-layers',
    children: [
      {
        name: 'Registrar Estudiante',
        url: '/line/addLine',
        icon: 'fa fa-plus'
      },
      {
        name: 'Editar Estudiante',
        url: '/line/editLine',
        icon: 'fa fa-pencil'
      },
      {
        name: 'Eliminar Estudiante',
        url: '/linea/addLine',
        icon: 'fa fa-trash-o'
      }
    ]
  },

];
