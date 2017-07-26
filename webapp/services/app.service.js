const service = {};

service.getStringFromObject = (object) => {
  return JSON.stringify(eval('('+object+')'));
}

service.getJSONFromString = (string) => {
  return JSON.parse(string);
}

service.getJSONFromIncorrectObject = (object) => {
  const correctStringValue = JSON.stringify(eval('('+object+')'));
  return JSON.parse(correctStringValue);
}

export default service;