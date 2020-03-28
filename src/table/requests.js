const requests = {
  API_PATH: 'http://178.128.196.163:3000/api/records/',

  GET_RECORDS() {
    return fetch(this.API_PATH, {method: 'GET'});
  },

  GET_RECORD_BY_ID(id) {
    return fetch(`${this.API_PATH}${id}`, {method: 'GET'});
  },

  ADD_RECORD(data) {
    return fetch(this.API_PATH, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },

  CHANGE_RECORD(id, data) {
    return fetch(`${this.API_PATH}${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: 'json=' + JSON.stringify(data),
    });
  },

  DELETE_RECORD(id) {
    return fetch(`${this.API_PATH}${id}`, {method: 'DELETE'});
  },
};

export default requests;
