export const routePermissionsMap = {
  '/dashboard': { resource: '/dashboard', method: 'GET' },

  '/dashboard/target': { resource: '/targets', method:'GET' },
  '/dashboard/target/perspective/:id/create': { resource: '/targets', method:'POST' },
  '/dashboard/target/perspective/:id/update/:id': { resource: '/targets', method:'PUT' },
  '/dashboard/target/:id': { resource: '/targets/:id', method:'DELETE' },
  '/dashboard/target/:id': { resource: '/targets/detail', method:'GET' },

  '/dashboard/formula': { resource: '/formula', method:'GET' },
  '/dashboard/formula/create': { resource: '/formula', method:'POST' },
  '/dashboard/formula/update/:id': { resource: '/formula', method:'PUT' },
  '/dashboard/formula/:id': { resource: '/formula/:id', method:'DELETE' },

  '/dashboard/perspective/:id': { resource: '/targets/perspectives/:id', method:'GET' },
  '/dashboard/perspective/info/create': { resource: '/perspectives', method:'POST' },
  '/dashboard/perspective/info/update/:id': { resource: '/perspectives/:id', method:'PUT' },
  '/dashboard/perspective/info': { resource: '/perspectives', method:'GET' },
  '/dashboard/perspective/info/:id': { resource: '/perspectives/:id', method:'DELETE' },
  '/dashboard/perspective/info/:id': { resource: '/perspectives/:id', method:'GET' },

  '/dashboard/tag': { resource: '/tags', method:'GET' },
  '/dashboard/tag/create': { resource: '/tags', method:'POST' },
  '/dashboard/tag/update/:id': { resource: '/tags', method:'PUT' },
  '/dashboard/tag/:id': { resource: '/tags/:id', method:'DELETE' },
  '/dashboard/tag/:id': { resource: '/tags/:id', method:'GET' },


  '/dashboard/icon': { resource: '/icons', method:'GET' },
  '/dashboard/icon/create': { resource: '/icons', method:'POST' },
  '/dashboard/icon/update/:id': { resource: '/icons', method:'PUT' },
  '/dashboard/icon/:id': { resource: '/icons/:id', method:'DELETE' },
  '/dashboard/icon/:id': { resource: '/icons/:id', method:'GET' },


  '/dashboard/reports/sale': { resource: '/reports/sale', method:'GET' },
  '/dashboard/reports/purchase': { resource: '/reports/purchase', method:'GET'},
  '/dashboard/reports/warehouse': { resource: '/reports/warehouse', method:'GET' },
  '/dashboard/reports/order': { resource: '/reports/order', method:'GET' },
  '/dashboard/reports/quote': { resource: '/reports/quote', method:'GET' },

  '/dashboard/etl/logs': { resource: '/etl/logs', method:'POST' },
  '/dashboard/etl/extract': { resource: '/etl/extract', method:'POST' },
  '/dashboard/etl/sync': { resource: '/etl/sync', method:'POST' },
  '/dashboard/etl/resource': { resource: '/etl/resource', method:'POST' },
  '/dashboard/etl/clear': { resource: '/etl/clear', method:'POST' },

};
