(function(wm3d) {

  let  _nodeIdToMeshMap = {};

  let NODE_HEIGHT = 300;
  let NODE_SIZE = 200;
  let NODE_FIDELITY = 32;

  function addTracks(tracksUrl, offset) {
    let tracks = $.getJSON(tracksUrl).responseJSON; 
    _addNodes(tracks.nodes, offset);
    _addLinks(tracks.links);
  }

  function _addNodes(nodes, offset) {
    offset = (typeof offset !== 'undefined') ? offset : {x:0, z:0};
    let nodeGeom = new THREE.SphereBufferGeometry(NODE_SIZE, NODE_FIDELITY, NODE_FIDELITY);
    let nodeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, specular: 0xcccccc});
    nodeMaterial.side = THREE.DoubleSide;
    nodes.forEach(function(node) {
      let nodeMesh = new THREE.Mesh(nodeGeom, nodeMaterial);
      nodeMesh.position.x = node.pos[0] + offset.x;
      nodeMesh.position.y = NODE_HEIGHT;
      nodeMesh.position.z = node.pos[1] + offset.z;
      nodeMesh.name = node.id;
      nodeMesh.searchable = true;
      wm3d.scene.add(nodeMesh);
      _nodeIdToMeshMap[node.id] = nodeMesh;
    });
  }


  let ARROW_HEAD_LENGTH = 1000;
  let ARROW_HEAD_WIDTH = 400;
  function _addLinks(links) {
    links.forEach(function(link) {
      let fromVector = _nodeIdToMeshMap[link.source].position;
      let toVector = _nodeIdToMeshMap[link.target].position;
      let direction = toVector.clone().sub(fromVector);
      let length = direction.length();
      let arrowMesh = new THREE.ArrowHelper(direction.normalize(), fromVector, length, 0x00ff00, ARROW_HEAD_LENGTH, ARROW_HEAD_WIDTH);
      arrowMesh.cone.material = new THREE.MeshPhongMaterial({color: 0x00cc00, specular: 0xcccccc});
      arrowMesh.cone.material.side = THREE.DoubleSide;
      arrowMesh.line.material = new THREE.MeshPhongMaterial({color: 0x00cc00, specular: 0xcccccc});
      arrowMesh.searchable = true;
      wm3d.scene.add(arrowMesh);
    });
  }


  return wm3d.trackModule = {
    addTracks: addTracks,
  };
})(wm3d);