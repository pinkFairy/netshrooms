import {
  ADD_NODE,
  INVALIDATE_NODE,
} from './../utils/constants/node.constants';

function add() {
  const payload = {
    data: {},
  }

  return {
    type: ADD_NODE,
    payload,
  }
}

function invalidate() {
  const payload = {
    data: null,
  }

  return {
    type: INVALIDATE_NODE,
    payload,
  }
}

export {
  add as addNode,
  invalidate as invalidateNode,
}
