export const navItems = [
  {
    title: true,
    name: 'Facturas'
  },
  {
    name: 'Facturación',
    url: '/line/addLine',
    icon: 'fa fa-credit-card',
    children: [
      {
        name: 'Vender',
        url: '/line/addLine',
        icon: 'icon-basket-loaded'
      },
      {
        name: 'Buscar Facturas',
        url: '/line/addLine',
        icon: 'icon-docs'
      }
    ]
  },

  {
    title: true,
    name: 'Inventario'
  },
  {
    name: 'Entradas a inventario',
    url: '/line/addLine',
    icon: 'fa fa-external-link-square',
    children: [
      {
        name: 'Entrada general',
        url: '/line/addLine',
        icon: 'icon-action-redo '
      },
      {
        name: 'Entrada con factura',
        url: '/line/addLine',
        icon: 'fa fa-file-archive-o'
      }
    ]
  },

  {
    name: 'Salidas de inventario',
    url: '/line/addLine',
    icon: ' fa fa-external-link',
    children: [
        {
          name: 'Salida de inventario',
          url: '/line/addLine',
          icon: 'icon-action-undo'
        },
        {
          name: 'Facturas de compra',
          url: '/line/addLine',
          icon: 'icon-notebook'
        },
      ]
  },
  {
    name: 'Informes de inventario',
    url: '/line/addLine',
    icon: 'icon-book-open',
    children: [
      {
        name: 'Alarma de existencias',
        url: '/line/addLine',
        icon: 'fa fa-bell-o'
      },
      {
        name: 'Kardex',
        url: '/line/addLine',
        icon: 'fa fa-table'
      },
    ]
  },

  {
    title: true,
    name: 'Lineas'
  },
  {
    name: 'Lineas',
    url: '/linea',
    icon: 'icon-layers',
    children: [
      {
        name: 'Registrar Linea',
        url: '/line/addLine',
        icon: 'fa fa-plus'
      },
      {
        name: 'Editar Linea',
        url: '/line/editLine',
        icon: 'fa fa-pencil'
      },
      {
        name: 'EliminarLinea',
        url: '/linea/addLine',
        icon: 'fa fa-trash-o'
      }
    ]
  },

  {
    title: true,
    name: 'Proveedores'
  },
  {
    name: 'Proveedores',
    url: '/line/addLine',
    icon: 'fa fa-truck',
    children: [
      {
        name: 'Agregar Proveedor',
        url: '/line/addLine',
        icon: 'fa fa-plus'
      },
      {
        name: 'Editar Proveedor',
        url: '/line/addLine',
        icon: 'fa fa-pencil'
      },
      {
        name: 'Pagar Deuda',
        url: '/line/addLine',
        icon: 'fa fa-money'
      },
      {
        name: 'Consultar Deudas',
        url: '/line/addLine',
        icon: 'fa fa-search'
      }
    ]
  },

  {
    title: true,
    name: 'Reportes'
  },
  {
    name: 'Reportes',
    url: '/line/addLine',
    icon: 'fa fa-bar-chart',
    children: [
      {
        name: 'Reporte de ganancias',
        url: '/line/addLine',
        icon: 'fa fa-line-chart'
      },
      {
        name: 'Reporte de ventas',
        url: '/line/addLine',
        icon: 'fa fa-outdent'
      }
    ]
  },

  {
    title: true,
    name: 'Usuarios'
  },
  {
    name: 'Usuarios',
    url: '/line/addLine',
    icon: 'fa fa-user',
    children: [
      {
        name: 'Agregar Usuario',
        url: '/line/addLine',
        icon: 'fa fa-plus'
      },
      {
        name: 'Editar Usuario',
        url: '/line/addLine',
        icon: 'fa fa-pencil'
      }
    ]
  },
];
