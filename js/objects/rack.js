var rackModule = (function(scene) {

  let TOP_SHELF_HEIGHT = 1828.8;
  let SHELVES = 4;
  let SHELF_THICKNESS = 63; //63mm = 2.5in
  let RACK_LEG_THICKNESS = 50; // ~2in

  function addRack(rack) {
    //let xOffset = 81848;
    //let yOffset = 0;
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
    let rackMaterial = new THREE.MeshBasicMaterial({ color: _randomColor() });
    let rackMesh = new THREE.Mesh(rackGeom, rackMaterial);
    rackMesh.name = rack.name;
    rackMesh.position.x = -(rack.origin[0] + xOffset);
    rackMesh.position.z = rack.origin[1] + yOffset;
    rackMesh.rotation.y = (rack.angle * Math.PI / 180);
    scene.add(rackMesh);
  }

  let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
  function _randomColor() {
    let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    let b = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
    return '#'+r+g+b;
  }

  return {
    addRack: addRack,
  }
})(scene);
