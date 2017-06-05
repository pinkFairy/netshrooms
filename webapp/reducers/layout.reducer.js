import {
  RECEIVE_LAYOUT_SUCCESSFULLY,
  CHANGE_LAYOUT,
} from './../utils/constants/layout.constants';

const DEFAULT_STATE = {
  current: null,
  data: null,
};

function layout(state = DEFAULT_STATE, action) {
  const {type, payload} = action;

  switch (type) {
    case RECEIVE_LAYOUT_SUCCESSFULLY:
      return {
        ...state,
        current: payload.current,
        data: payload.data
      };
    case CHANGE_LAYOUT:
      return {
        ...state,
        current: payload.current,
      };
    default:
      return state;
  }
}

export default layout;
