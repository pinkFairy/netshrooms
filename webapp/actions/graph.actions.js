function add() {
  return {
    type: 'ADD_GRAPH',
  }
}

function get() {
  const data = localStorage.getItem('cyGraph');
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
  const payload = {data};

  return {
    type: 'SAVE_GRAPH',
    payload,
  };
}

export {
  add as addGraph,
  get as getGraph,
  remove as removeGraph,
  save as saveGraph,
}
