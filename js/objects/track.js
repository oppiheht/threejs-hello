var trackModule = (function(scene) {

  let  _nodeIdToMeshMap = {};

  let NODE_HEIGHT = 300;
  let NODE_SIZE = 100;
  let NODE_FIDELITY = 32;
  function addNodes(nodes) {
    let nodeGeom = new THREE.SphereBufferGeometry(NODE_SIZE, NODE_FIDELITY, NODE_FIDELITY);
    let nodeMaterial = new THREE.MeshBasicMaterial({color: 0x00ee00});
    nodes.forEach(function(node) {
      let nodeMesh = new THREE.Mesh(nodeGeom, nodeMaterial);
      nodeMesh.position.x = -node.pos[0];
      nodeMesh.position.y = NODE_HEIGHT;
      nodeMesh.position.z = node.pos[1];
      scene.add(nodeMesh);
      _nodeIdToMeshMap[node.id] = nodeMesh;
    });
  }


  let ARROW_HEAD_LENGTH = 1000;
  let ARROW_HEAD_WIDTH = 400;
  function addLinks(links) {
    links.forEach(function(link) {
      let fromVector = _nodeIdToMeshMap[link.source].position;
      let toVector = _nodeIdToMeshMap[link.target].position;
      let direction = toVector.clone().sub(fromVector);
      let length = direction.length();
      let arrowMesh = new THREE.ArrowHelper(direction.normalize(), fromVector, length, 0x00ff00, ARROW_HEAD_LENGTH, ARROW_HEAD_WIDTH);
      scene.add(arrowMesh);
    });
  }


  return {
    addNodes: addNodes,
    addLinks: addLinks,
  };
})(scene);

