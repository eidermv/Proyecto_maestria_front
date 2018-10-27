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
        url: '/student/addStudent',
        icon: 'fa fa-plus'
      },
      {
        name: 'Editar Estudiante',
        url: '/student/addStudent',
        icon: 'fa fa-pencil'
      },
      {
        name: 'Eliminar Estudiante',
        url: '/student/addStudent',
        icon: 'fa fa-trash-o'
      }
    ]
  },

];
