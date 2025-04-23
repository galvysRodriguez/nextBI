const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const API_ROUTES = {
  TARGETS: {
    get: (id) => `${API_BASE_URL}/targets/${id}`,
    detail: (id) => `${API_BASE_URL}/targets/detail/${id}`,
    getAll: `${API_BASE_URL}/targets`,
    create: `${API_BASE_URL}/targets`,
    update: (id) => `${API_BASE_URL}/targets/${id}`,
    delete: (id) => `${API_BASE_URL}/targets/${id}`,
    exist: `${API_BASE_URL}/targets/exist/`,
  },
  FORMULA: {
    get: (id) => `${API_BASE_URL}/formula/${id}`,
    getAll: `${API_BASE_URL}/formula`,
    create: `${API_BASE_URL}/formula`,
    update: (id) => `${API_BASE_URL}/formula/${id}`,
    delete: (id) => `${API_BASE_URL}/formula/${id}`,
    exist: `${API_BASE_URL}/formula/exist/`,
    tag: (value) => `${API_BASE_URL}/formula/tag/${value}`
  },
  PERSPECTIVES: {
    get: (id) => `${API_BASE_URL}/perspectives/${id}`,
    getAll: `${API_BASE_URL}/perspectives`,
    create: `${API_BASE_URL}/perspectives`,
    update: (id) => `${API_BASE_URL}/perspectives/${id}`,
    delete: (id) => `${API_BASE_URL}/perspectives/${id}`,
    icons:  `${API_BASE_URL}/perspectives/icons/`,
    exist: `${API_BASE_URL}/perspectives/exist/`,
  },
  TAGS: {
    get: (id) => `${API_BASE_URL}/tags/${id}`,
    getAll: `${API_BASE_URL}/tags`,
    create: `${API_BASE_URL}/tags`,
    update: (id) => `${API_BASE_URL}/tags/${id}`,
    delete: (id) => `${API_BASE_URL}/tags/${id}`,
    exist: `${API_BASE_URL}/tags/exist/`,
  },
  USERS: {
    get: (id) => `${API_BASE_URL}/users/${id}`,
    getAll: `${API_BASE_URL}/users`,
    login: `${API_BASE_URL}/users/login`
  },
  INDICATORS: {
    perspectives: `${API_BASE_URL}/indicators/perspective`,
    get: (id) => `${API_BASE_URL}/indicators/${id}`,
  },
};
