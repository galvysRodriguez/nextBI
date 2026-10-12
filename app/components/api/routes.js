const DEFAULT_API_BASE_URL = "https://python-bi-9695-m65p566dh-galvys-rodriguezs-projects.vercel.app";

function normalizeApiBaseUrl(value) {
  const configuredUrl = value?.trim();
  if (!configuredUrl) return DEFAULT_API_BASE_URL;

  const absoluteUrl = /^(https?:)?\/\//i.test(configuredUrl)
    ? configuredUrl.startsWith("//")
      ? `https:${configuredUrl}`
      : configuredUrl
    : `https://${configuredUrl.replace(/^\/+/, "")}`;

  try {
    const parsedUrl = new URL(absoluteUrl);
    return parsedUrl.pathname === "/" ? parsedUrl.origin : DEFAULT_API_BASE_URL;
  } catch {
    return DEFAULT_API_BASE_URL;
  }
}

export const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);

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
    getTag: `${API_BASE_URL}/formula/tag/`,
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
  ICONS: {
    get: (id) => `${API_BASE_URL}/icons/${id}`,
    getAll: `${API_BASE_URL}/icons`,
    create: `${API_BASE_URL}/icons`,
    update: (id) => `${API_BASE_URL}/icons/${id}`,
    delete: (id) => `${API_BASE_URL}/icons/${id}`,
    exist: `${API_BASE_URL}/icons/exist/`,
  },
  USERS: {
    get: (id) => `${API_BASE_URL}/users/${id}`,
    getAll: `${API_BASE_URL}/users`,
    login: `${API_BASE_URL}/users/login`
  },
  INDICATORS: {
    perspectives: `${API_BASE_URL}/indicators/perspective`,
    getAll:`${API_BASE_URL}/indicators/`,
  },
  REPORTS: {
    sale: `${API_BASE_URL}/reports/sale`,
    purchase: `${API_BASE_URL}/reports/purchase`,
    warehouse: `${API_BASE_URL}/reports/warehouse`,
  },
};
