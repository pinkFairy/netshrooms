
const DEFAULT_STATE = {
  actionInProgress: true,
  data: null,
};

function graph(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case 'ADD_GRAPH':
      return {
        ...state,
        actionInProgress: true,
      };
    case 'GET_GRAPH':
      return {
        ...state,
        actionInProgress: payload.actionInProgress,
        data: payload.data,
      };
    case 'REMOVE_GRAPH':
      return {
        ...state,
        actionInProgress: false,
      };
    case 'SAVE_GRAPH':
      return {
        ...state,
        actionInProgress: false,
        data: payload.data,
      };
    default:
      return state;
  }
}

export default graph;
