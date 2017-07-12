(function() {
  $.ajaxSetup( { "async": false } );
  let racks = $.getJSON('js/maps/map-small.json').responseJSON;
  let tracks = $.getJSON('js/maps/tracks-small.json').responseJSON; 
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
  let gui = new dat.GUI();

  gui.add(camera.position, 'x').listen();
  gui.add(camera.position, 'y').listen();
  gui.add(camera.position, 'z').listen();

  camera.position.set(-57000, 37000, -27000);
  camera.lookAt(new THREE.Vector3(-37000, 0, -27000));

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
  document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera);

  scene.add(new THREE.AmbientLight(0x404040));

  let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
  function randomColor() {
    let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let b = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    return '#'+r+g+b;
  }
    
  let TOP_SHELF_HEIGHT = 1828.8;
  let SHELVES = 5;
  let SHELF_THICKNESS = 63; //63mm = 2.5in
  let RACK_LEG_THICKNESS = 50; // ~2in
  racks.forEach(function(rack, index) {
    let rackGeom = new THREE.Geometry();

    for (let i = 0; i < SHELVES; i++) {
      let shelfRackGeom = new THREE.BoxGeometry(-rack.length, SHELF_THICKNESS, rack.depth);
      shelfRackGeom.translate(0, TOP_SHELF_HEIGHT/(SHELVES-1)*i, 0);
      rackGeom.merge(shelfRackGeom, shelfRackGeom.matrix);
    }
    let backLeftLegGeom = new THREE.BoxGeometry(RACK_LEG_THICKNESS, TOP_SHELF_HEIGHT, RACK_LEG_THICKNESS);
    backLeftLegGeom.translate(-rack.length/2 + RACK_LEG_THICKNESS/2, TOP_SHELF_HEIGHT / 2, -rack.depth / 2 + RACK_LEG_THICKNESS / 2);
    rackGeom.merge(backLeftLegGeom, backLeftLegGeom.matrix);

    let backRightLegGeom = new THREE.BoxGeometry(RACK_LEG_THICKNESS, TOP_SHELF_HEIGHT, RACK_LEG_THICKNESS);
    backRightLegGeom.translate(rack.length/2 - RACK_LEG_THICKNESS/2, TOP_SHELF_HEIGHT / 2, -rack.depth / 2 + RACK_LEG_THICKNESS / 2);
    rackGeom.merge(backRightLegGeom, backRightLegGeom.matrix);

    let frontLeftLegGeom = new THREE.BoxGeometry(RACK_LEG_THICKNESS, TOP_SHELF_HEIGHT, RACK_LEG_THICKNESS);
    frontLeftLegGeom.translate(-rack.length/2 + RACK_LEG_THICKNESS/2, TOP_SHELF_HEIGHT / 2, rack.depth / 2 - RACK_LEG_THICKNESS / 2);
    rackGeom.merge(frontLeftLegGeom, frontLeftLegGeom.matrix);

    let frontRightLegGeom = new THREE.BoxGeometry(RACK_LEG_THICKNESS, TOP_SHELF_HEIGHT, RACK_LEG_THICKNESS);
    frontRightLegGeom.translate(rack.length/2 - RACK_LEG_THICKNESS/2, TOP_SHELF_HEIGHT / 2, rack.depth / 2 - RACK_LEG_THICKNESS / 2);
    rackGeom.merge(frontRightLegGeom, frontRightLegGeom.matrix);

    rackGeom.applyMatrix( new THREE.Matrix4().makeTranslation( -rack.length / 2, SHELF_THICKNESS/2, -rack.depth / 2));
    let rackMaterial = new THREE.MeshBasicMaterial({ color: randomColor() });
    let rackMesh = new THREE.Mesh(rackGeom, rackMaterial);
    rackMesh.position.x = -rack.origin[0];
    rackMesh.position.z = rack.origin[1];
    rackMesh.rotation.y = (rack.angle * Math.PI / 180);
    scene.add(rackMesh);
  });

  let WAREHOUSE_SIZE = 200000;
  let FLOOR_CHECKER_SIZE = 200000;
  let segments = WAREHOUSE_SIZE / FLOOR_CHECKER_SIZE;
  let materials = [new THREE.MeshBasicMaterial({ color: 0x666666}), new THREE.MeshBasicMaterial({ color: 0x777777})];
  let floorGeom = new THREE.PlaneGeometry(WAREHOUSE_SIZE, WAREHOUSE_SIZE, segments, segments);
  for (let x = 0; x < segments; x++) {
    for (let y = 0; y < segments; y++) {
      let i = x * segments + y;
      let j = 2 * i;
      floorGeom.faces[j].materialIndex = floorGeom.faces[j+1].materialIndex = (x+y) % 2;
    }
  }
  let floor = new THREE.Mesh(floorGeom, materials);
  floor.position.x = -30000;
  floor.position.y = -5;
  floor.position.z = 20000;
  floor.rotation.x = (-Math.PI / 2);
  scene.add(floor);

  let robotGeom = new THREE.BoxBufferGeometry(640, 600, 620);
  let robotMaterial = new THREE.MeshBasicMaterial({color: 0x0000ee});
  for (let i = 0; i < 30; i++) {
    let robot = new THREE.Mesh(robotGeom, robotMaterial);
    scene.add(robot);
    robot.position.x = 3000;
    robot.position.y = 250;
    robot.position.z = 1000 * i;
  }

  let TRACK_NODE_HEIGHT = 300;
  let TRACK_NODE_SIZE = 100;
  let nodeGeom = new THREE.SphereBufferGeometry(TRACK_NODE_SIZE, 32, 32);
  let nodeMaterial = new THREE.MeshBasicMaterial({color: 0x00ee00});
  let nodeIdToMeshMap = {};
  tracks.nodes.forEach(function(node) {
    let nodeMesh = new THREE.Mesh(nodeGeom, nodeMaterial);
    nodeMesh.position.x = -node.pos[0];
    nodeMesh.position.y = TRACK_NODE_HEIGHT;
    nodeMesh.position.z = node.pos[1];
    scene.add(nodeMesh);
    nodeIdToMeshMap[node.id] = nodeMesh;
  });

  let ARROW_HEAD_LENGTH = 1000;
  let ARROW_HEAD_WIDTH = 400;
  tracks.links.forEach(function(link) {
    let fromVector = nodeIdToMeshMap[link.source].position;
    let toVector = nodeIdToMeshMap[link.target].position;
    let direction = toVector.clone().sub(fromVector);
    let length = direction.length();
    let arrowMesh = new THREE.ArrowHelper(direction.normalize(), fromVector, length, 0x00ff00, ARROW_HEAD_LENGTH, ARROW_HEAD_WIDTH);
    scene.add(arrowMesh);
  });

  let render = function () {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  };

  render();
})();
