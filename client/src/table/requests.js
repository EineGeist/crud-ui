const API_PATH = '/api/records/';

export const getRecords = () => {
  return fetch(API_PATH, { method: 'GET' });
};

export const getRecordsById = id => {
  return fetch(`${API_PATH}${id}`, { method: 'GET' });
};

export const addRecord = data => {
  return fetch(API_PATH, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const changeRecord = (id, data) => {
  const response = fetch(`${API_PATH}${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const deleteRecord = id => {
  return fetch(`${API_PATH}${id}`, { method: 'DELETE' });
};
