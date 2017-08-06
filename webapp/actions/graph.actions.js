import graphService from './../services/graph.service';
import appService from './../services/app.service';

function add() {
  return {
    type: 'ADD_GRAPH',
  }
}

function get() {
  const data = appService.getJSONFromString(localStorage.getItem('cyGraph'));
  const actionInProgress = !data;

  const payload = {
    actionInProgress,
    data,
  }

  return {
    type: 'GET_GRAPH',
    payload,
  }
}

function remove() {
  return {
    type: 'REMOVE_GRAPH',
  }
}

function save(data) {
  let parsedValue = {};

  if (typeof data === 'string') {
    parsedValue = appService.getJSONFromIncorrectObject(data);
  } else if (typeof data === 'object') {
    parsedValue = data;
  }

  localStorage.setItem('cyGraph', JSON.stringify(parsedValue));

  return {
    type: 'SAVE_GRAPH',
    payload: {
      data: parsedValue
    },
  };
}

export {
  add as addGraph,
  get as getGraph,
  remove as removeGraph,
  save as saveGraph,
}
