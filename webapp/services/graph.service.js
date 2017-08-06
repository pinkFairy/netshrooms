const service = {};

service.dataAdapter = (entity = {}) => {
  const {nodes, edges} = entity;
  const adaptedData = {
    nodes: [],
    edges: [],
  }

  if (nodes && nodes.length) {
    nodes.forEach((node) => {
      const adaptedNode = service.nodeAdapter(node);

      if (adaptedNode) {
        adaptedData.nodes.push(adaptedNode);
      }
    })
  }

  if (edges && edges.length) {
    adaptedData.edges = edges;
  }

  return adaptedData;
};

service.nodeAdapter = (node) => {
  const {type, children, operation, name} = node;

  if (name) {
    const adaptedNode = {
      data: {
        name,
        id: name,
      }
    };

    if (children) {
      adaptedNode.classes = 'parent';
    } else if (operation) {
      adaptedNode.classes = 'operation';
    } else if (type) {
      // TODO add value formatter based on type
      adaptedNode.classes = 'file';
    }

    return adaptedNode;
  }

  return null;
}

export default service;