const validateData = (data, fields) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return false;

    return !fields.find(field => data[field] === undefined);
  };

const removeServiceInformation = record => {
  for (let key in record) {
    if (record.hasOwnProperty(key))
      if (key.slice(0, 2) === '__') delete record[key];
  }

  return record;
};

const getFields = records => {
  const fields = new Set();

  records.forEach(({ data }) => {
    const keys = Object.keys(data);
    for (let key of keys) {
      fields.add(key);
    }
  });

  return [...fields];
};
  
export const processRecords = records => {
  const fields = getFields(records);
  const processedRecords = records.reduce((processed, record) => {
    if (!record._id || !validateData(record.data, fields)) return processed;

    const recordCopy = Object.assign({}, record);
    processed.push(removeServiceInformation(recordCopy));
    return processed;
  }, []);

  return [processedRecords, fields];
};

export const processRecord = record => processRecords([record])[0]; 