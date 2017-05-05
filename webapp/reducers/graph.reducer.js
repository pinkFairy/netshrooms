
const DEFAULT_STATE = {
  id: null,
  data: null,
};

function graph(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case 'RECEIVE_GRAPH_SUCCESSFULLY':
      return {
        ...state,
        data: payload.data,
        id: payload.id
      };
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export default graph;
