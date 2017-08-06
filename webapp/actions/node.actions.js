// actions
import {saveGraph} from './../actions/graph.actions';

// constants
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

function save(node) {
  return ((dispatch, getState) => {
    const graph = {...getState().graph.data};

    graph.nodes.push(node);
    dispatch(saveGraph(graph));
  })
}

export {
  add as addNode,
  invalidate as invalidateNode,
  save as saveNode,
}
