function get() {
  const payload = {
    data: localStorage.getItem('cyGraph'),
  }

  return {
    type: 'RECEIVE_GRAPH_SUCCESSFULLY',
    payload,
  }
}

function add(data) {
  const payload = {data};

  return {
    type: 'ADD_GRAPH_SUCCESSFULLY',
    payload,
  };
}

export {
  add as addGraph,
  get as getGraph
}
