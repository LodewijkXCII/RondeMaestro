import { api } from './api';

export default {
  find(url) {
    const body = {
      single: true,
    };
    return api.get(url, body);
  },

  create(url, body) {
    return api.post(url, body);
  },

  update(url, body) {
    return api.put(url, body);
  },
  delete(url, body) {
    return api.delete(url, body);
  },
};
