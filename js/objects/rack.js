(function(wm3d) {

  let TOP_SHELF_HEIGHT = 1828.8;
  let SHELVES = 4;
  let SHELF_THICKNESS = 63; //63mm = 2.5in
  let RACK_LEG_THICKNESS = 50; // ~2in

  function addRacks(racksUrl, offset) {
    let racks = $.getJSON(racksUrl).responseJSON; 
    offset = (typeof offset !== 'undefined') ? offset : {x:0,y:0,z:0};

    let rackTexture = wm3d.loader.load('../../res/wood5.png');
    rackTexture.wrapS = rackTexture.wrapT = THREE.RepeatWrapping;
    rackTexture.repeat.set(1, 1);
    let rackMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, map: rackTexture});
    rackMaterial.side = THREE.DoubleSide;

    racks.forEach(function(rack) {
      _addRack(rack, offset, rackMaterial);
    });
  }

  function _addRack(rack, offset, material) {
    let rackGeom = _getRackGeom(rack);
    let rackMesh = new THREE.Mesh(rackGeom, material);
    rackMesh.name = rack.name;
    rackMesh.position.x = (rack.origin[0] + offset.x);
    rackMesh.position.z = rack.origin[1] + offset.z;
    rackMesh.rotation.y = (-rack.angle * Math.PI / 180);
    wm3d.scene.add(rackMesh);
  }

  //currently unused now that rack materials are from a texture and all the same color
  let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
  function _randomColor() {
    let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let b = colorCodes[Math.floor(colorCodes.length * Math.random())];
    return '#'+r+g+b;
  }


  let _rackGeomCache = {};
  function _getRackGeom(rack) {
    let rackKey = rack.length+','+rack.depth;
    if (!_rackGeomCache[rackKey]) {
      _rackGeomCache[rackKey] = _buildRackGeom(rack);
    }
    return _rackGeomCache[rackKey];
  }

  function _buildRackGeom(rack) {
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

    rackGeom.applyMatrix( new THREE.Matrix4().makeTranslation(rack.length / 2, SHELF_THICKNESS/2, -rack.depth / 2));
    rackGeom.computeFaceNormals();
    rackGeom.computeVertexNormals();
    return rackGeom;
  }

  wm3d.rackModule = {
    addRacks: addRacks,
  }
})(wm3d);