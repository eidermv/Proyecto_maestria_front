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
        name: 'Listar Estudiantes',
        url: '/student/listStudent',
        icon: 'fa fa-list-ol'
      }
    ]
  },

];
