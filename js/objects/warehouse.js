var warehouseModule = (function(scene) {

  let WAREHOUSE_SIZE = 200000;
  let FLOOR_CHECKER_SIZE = 200000;
  let SEGMENTS = WAREHOUSE_SIZE / FLOOR_CHECKER_SIZE;

  function addFloor() {
    let materials = [new THREE.MeshBasicMaterial({ color: 0x666666}), new THREE.MeshBasicMaterial({ color: 0x777777})];
    let floorGeom = new THREE.PlaneGeometry(WAREHOUSE_SIZE, WAREHOUSE_SIZE, SEGMENTS, SEGMENTS);

    for (let x = 0; x < SEGMENTS; x++) {
      for (let y = 0; y < SEGMENTS; y++) {
        let i = x * SEGMENTS + y;
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
  }

  return {
    addFloor: addFloor,
  };

})(scene);
