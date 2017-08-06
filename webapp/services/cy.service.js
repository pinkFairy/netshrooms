import cytoscape from 'cytoscape';
import graphService from './../services/graph.service';

const service = {};

service.get = (graph, layout) => {
  const adaptedData = graphService.dataAdapter(graph);

  return cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: false,
    minZoom: 1e-20,

    style: cytoscape.stylesheet()
       .selector('node')
       .css({
         'height': 80,
         'width': 80,
         'background-fit': 'cover',
         'border-color': '#000',
         'border-width': 3,
         'border-opacity': 0.5,
         'content': 'data(name)',
         'text-valign': 'center',
       })
       .selector('edge')
       .css({
         'width': 6,
         'target-arrow-shape': 'triangle',
         'line-color': '#ffaaaa',
         'target-arrow-color': '#ffaaaa',
         'curve-style': 'bezier',
         'content': 'data(name)'
       })
       .selector('.parent')
       .css({
         'shape': 'star'
       })
       .selector('.file')
       .css({
         'shape': 'roundrectangle'
       }),
    elements: adaptedData,

    layout: layout
  });
}

export default service;