import {
  ADD_NODE,
  INVALIDATE_NODE,
} from './../utils/constants/node.constants';

const DEFAULT_STATE = {
  data: null,
};

function node(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case INVALIDATE_NODE:
    case ADD_NODE:
      return {
        ...state,
        data: payload.data
      };
    default:
      return state;
  }
}

export default node;
