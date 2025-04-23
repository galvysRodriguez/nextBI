const resourceBI = [
    {
      module: 'BI',
      controlator: '*',
      action: '*',
      resource: '*',
      activo: 1,
      custom: 1,
      description: 'Acceso global a todos los resources del módulo BI'
    },
  
    ...['targets', 'formula', 'perspectives', 'tags', 'icons'].map(controlator => ([
      {
        module: 'BI',
        controlator,
        action: '*',
        resource: `/${controlator}/*`,
        activo: 1,
        custom: 1,
        description: `Acceso completo a todas las operaciones de ${controlator}`
      },
      {
        module: 'BI',
        controlator,
        action: 'get',
        resource: `/${controlator}/:id`,
        activo: 1,
        custom: 1,
        description: `Obtener un ${controlator.slice(0, -1)} específico por ID`
      },
      {
        module: 'BI',
        controlator,
        action: 'getAll',
        resource: `/${controlator}`,
        activo: 1,
        custom: 1,
        description: `Obtener todos los ${controlator}`
      },
      {
        module: 'BI',
        controlator,
        action: 'create',
        resource: `/${controlator}`,
        activo: 1,
        custom: 1,
        description: `Crear un nuevo ${controlator.slice(0, -1)}`
      },
      {
        module: 'BI',
        controlator,
        action: 'update',
        resource: `/${controlator}/:id`,
        activo: 1,
        custom: 1,
        description: `Actualizar un ${controlator.slice(0, -1)} existente`
      },
      {
        module: 'BI',
        controlator,
        action: 'delete',
        resource: `/${controlator}/:id`,
        activo: 1,
        custom: 1,
        description: `Eliminar un ${controlator.slice(0, -1)}`
      },
      {
        module: 'BI',
        controlator,
        action: 'exist',
        resource: `/${controlator}/exist`,
        activo: 1,
        custom: 1,
        description: `Verificar existencia de un ${controlator.slice(0, -1)}`
      }
    ])).flat(),
  
    {
      module: 'BI',
      controlator: 'reports',
      action: '*',
      resource: '/reports/*',
      activo: 1,
      custom: 1,
      description: 'Acceso completo a todos los reportes'
    },
    ...['sale', 'purchase', 'warehouse'].map(type => ({
      module: 'BI',
      controlator: 'reports',
      action: 'get',
      resource: `/reports/${type}`,
      activo: 1,
      custom: 1,
      description: `Obtener reporte de ${type === 'sale' ? 'ventas' : type === 'purchase' ? 'compras' : 'almacén'}`
    })),
  
    {
      module: 'BI',
      controlator: 'perspectives',
      action: 'get',
      resource: '/perspectives/icons',
      activo: 1,
      custom: 1,
      description: 'Acceso completo a todas las operaciones ETL'
    },
    ...['logs', 'extract', 'sync', 'resource', 'clear'].map(action => ({
      module: 'BI',
      controlator: 'etl',
      action: 'post',
      resource: `/etl/${action}`,
      activo: 1,
      custom: 1,
      description: action === 'logs' ? 'Registrar logs del proceso ETL' :
               action === 'extract' ? 'Ejecutar proceso de extracción de datos' :
               action === 'sync' ? 'Sincronizar datos en el proceso ETL' :
               action === 'resource' ? 'Crear resources en la bdd del ERP' :
               'Limpiar datos en el proceso ETL'
    }))
  ];