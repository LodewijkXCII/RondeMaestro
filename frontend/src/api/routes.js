import { api } from './api';

export default {
  find(url) {
    return api.get(url);
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
