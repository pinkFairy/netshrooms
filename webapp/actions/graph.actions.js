function get() {
  // TODO get it from server

  const payload = {
    data: {
      nodes: [
        { data: { id: 'cat', name: 'cat' } },
        { data: { id: 'bird', name: 'bird' } },
        { data: { id: 'ladybug', name: 'ladybug' } },
        { data: { id: 'aphid', name: 'aphid' } },
        { data: { id: 'rose', name: 'rose' } },
        { data: { id: 'grasshopper', name: 'grasshopper' } },
        { data: { id: 'plant', name: 'plant' } },
        { data: { id: 'wheat', name: 'wheat' } }
      ],
      edges: [
        { data: { source: 'cat', target: 'bird', name: 'eats' } },
        { data: { source: 'bird', target: 'ladybug' } },
        { data: { source: 'bird', target: 'grasshopper' } },
        { data: { source: 'grasshopper', target: 'plant' } },
        { data: { source: 'grasshopper', target: 'wheat' } },
        { data: { source: 'ladybug', target: 'aphid' } },
        { data: { source: 'aphid', target: 'rose' } }
      ]
    },
    id: 'anId',
  }

  return {
    type: 'RECEIVE_GRAPH_SUCCESSFULLY',
    payload,
  }
}

export {
  get as getGraph
}
