import graphService from './../services/graph.service';
import appService from './../services/app.service';

function add() {
  return {
    type: 'ADD_GRAPH',
  }
}

function get() {
  const test = localStorage.getItem('cyGraph');
  console.log('test', test);

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
  const adaptedData = graphService.dataAdapter(data);

//  localStorage.cyGraph = appService.getStringFromObject(adaptedData);

  return {
    type: 'SAVE_GRAPH',
    payload: {
      data: adaptedData
    },
  };
}

export {
  add as addGraph,
  get as getGraph,
  remove as removeGraph,
  save as saveGraph,
}
