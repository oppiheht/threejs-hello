var warehouseModule = (function(scene) {

  var loader = new THREE.TextureLoader();

  function addFloor(warehouseSize, warehouseCornerOffset) {
    let floorTexture = loader.load('../../res/concrete.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(warehouseSize.x / 1024, warehouseSize.z / 1024);

    let floorMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, map: floorTexture});
    floorMaterial.side = THREE.DoubleSide;
    let floorGeom = new THREE.PlaneBufferGeometry(warehouseSize.x, warehouseSize.z);
    floorGeom.rotateX(Math.PI / 2);
    floorGeom.translate(warehouseSize.x/2 + warehouseCornerOffset.x, 0, (warehouseSize.z/2) + warehouseCornerOffset.z);
    let floor = new THREE.Mesh(floorGeom, floorMaterial);
    floor.name = 'Floor';

    floor.position.y = -5;
    scene.add(floor);
  }

  PILLAR_HEIGHT = 6000;
  function addPillars(startPoint, spacing, pillarSize, numRows, numCols) {
    let pillarGeom = new THREE.BoxBufferGeometry(pillarSize, PILLAR_HEIGHT, pillarSize);
    let pillarMaterial = new THREE.MeshPhongMaterial({color: 0xf4e242, specular: 0x080808});
    pillarMaterial.side = THREE.DoubleSide;
    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        let pillar = new THREE.Mesh(pillarGeom, pillarMaterial);
        pillar.position.x = startPoint.x + (spacing.x * col);
        pillar.position.y = PILLAR_HEIGHT / 2;
        pillar.position.z = startPoint.z + (spacing.z * row);
        pillar.name = 'Pillar ' + row + ',' + col;
        scene.add(pillar);
      }
    }
  }

  return {
    addFloor: addFloor,
    addPillars: addPillars,
  };

})(sceneModule.scene);
