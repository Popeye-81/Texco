export const ROLE_PERMISSIONS = {
  CSO: {
    createOrder: true,
    viewOrders: true,
    approveOrder: false,
    fullAccess: false,
  },

  ASE: {
    createOrder: true,
    viewOrders: true,
    approveOrder: false,
    fullAccess: false,
  },

  SM: {
    createOrder: true,
    viewOrders: true,
    approveOrder: true,
    fullAccess: false,
  },

  ASM: {
    createOrder: true,
    viewOrders: true,
    approveOrder: true,
    fullAccess: false,
  },

  ADMIN: {
    createOrder: true,
    viewOrders: true,
    approveOrder: true,
    fullAccess: true,
  },
};