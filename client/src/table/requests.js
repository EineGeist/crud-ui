const API_PATH = '/api/records/';

const processRecords = records => {
  const validateData = data => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return false;

    return !Object.keys(data).find(key => key === '0');
  };

  const removeServiceInformation = record => {
    for (let key in record) {
      if (record.hasOwnProperty(key))
        if (key.slice(0, 2) === '__') delete record[key];
    }

    return record;
  };

  return records.reduce((processed, record) => {
    if (!record._id || !validateData(record.data)) return processed;
    processed.push(removeServiceInformation(record));
    return processed;
  }, []);
};

const processRecord = record => processRecords([record])[0]; 

export const getRecords = async (id = '') => {
  const response = await fetch(`${API_PATH}${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) return false;
  const result = await response.json();  
  return id ? processRecord(result) : processRecords(result);
};

export const addRecord = async data => {
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) return false;
  const result = await response.json();  
  return processRecord(result);
};

export const changeRecord = async (id, data) => {
  const res = await fetch(`${API_PATH}${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.ok;
};

export const deleteRecord = async id => {
  const res = await fetch(`${API_PATH}${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });

  return res.ok;
};

