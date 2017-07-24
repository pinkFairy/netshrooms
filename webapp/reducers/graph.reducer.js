
const DEFAULT_STATE = {
  id: null,
  data: null,
};

function graph(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case 'ADD_GRAPH_SUCCESSFULLY':
    case 'RECEIVE_GRAPH_SUCCESSFULLY':
      return {
        ...state,
        data: payload.data,
      };
    default:
      return state;
  }
}

export default graph;
