const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const API_ROUTES = {
  TARGETS: {
    get: (id) => `${API_BASE_URL}/targets/${id}`,
    getAll: `${API_BASE_URL}/targets`,
    create: `${API_BASE_URL}/targets`,
    update: (id) => `${API_BASE_URL}/targets/${id}`,
    delete: (id) => `${API_BASE_URL}/targets/${id}`,
  },
  FORMULA: {
    get: (id) => `${API_BASE_URL}/formula/${id}`,
    getAll: `${API_BASE_URL}/formula`,
    create: `${API_BASE_URL}/formula`,
    update: (id) => `${API_BASE_URL}/formula/${id}`,
    delete: (id) => `${API_BASE_URL}/formula/${id}`,
  },
  PERSPECTIVES: {
    get: (id) => `${API_BASE_URL}/perspectives/${id}`,
    getAll: `${API_BASE_URL}/perspectives`,
    create: `${API_BASE_URL}/perspectives`,
    update: (id) => `${API_BASE_URL}/perspectives/${id}`,
    delete: (id) => `${API_BASE_URL}/perspectives/${id}`,
  },
  TAGS: {
    get: (id) => `${API_BASE_URL}/tags/${id}`,
    getAll: `${API_BASE_URL}/tags`,
    create: `${API_BASE_URL}/tags`,
    update: (id) => `${API_BASE_URL}/tags/${id}`,
    delete: (id) => `${API_BASE_URL}/tags/${id}`,
  },
};
