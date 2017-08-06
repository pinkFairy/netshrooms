const service = {};

service.getStringFromObject = (object) => {
  return JSON.stringify(eval('('+object+')'));
}

service.getJSONFromString = (string) => {
  return JSON.parse(string);
}

service.getJSONFromIncorrectObject = (data) => {
   const stringifiedValue = JSON.stringify(eval('('+data+')'));
   return JSON.parse(stringifiedValue);
}

export default service;