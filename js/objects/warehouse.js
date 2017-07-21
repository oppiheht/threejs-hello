var warehouseModule = (function(scene) {

  let WAREHOUSE_SIZE = {x: 109728, z: 62179};
  let WAREHOUSE_CORNER_OFFSET = {x: -3353, z: -15468};

  var loader = new THREE.TextureLoader();

  function addFloor() {
    let floorTexture = loader.load('../../res/concrete.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(WAREHOUSE_SIZE.x / 1024, WAREHOUSE_SIZE.z / 1024);

    let floorMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, map: floorTexture});
    let floorGeom = new THREE.PlaneBufferGeometry(WAREHOUSE_SIZE.x, WAREHOUSE_SIZE.z);
    floorGeom.rotateX(-Math.PI / 2);
    floorGeom.translate((-WAREHOUSE_SIZE.x/2) - WAREHOUSE_CORNER_OFFSET.x, 0, (WAREHOUSE_SIZE.z/2) + WAREHOUSE_CORNER_OFFSET.z);
    let floor = new THREE.Mesh(floorGeom, floorMaterial);
    floor.name = 'Floor';

    floor.position.y = -5;
    scene.add(floor);
  }

  PILLAR_HEIGHT = 6000;
  PILLAR_WIDTH = 200;
  function addPillars(startPoint, spacing, numRows, numCols) {
    startPoint = startPoint || WAREHOUSE_CORNER_OFFSET;
    spacing = spacing || {x: 18288, z: 12192};
    numRows = numRows || 5;
    numCols = numCols || 5;

    let pillarGeom = new THREE.BoxBufferGeometry(PILLAR_WIDTH, PILLAR_HEIGHT, PILLAR_WIDTH);
    let pillarMaterial = new THREE.MeshPhongMaterial({color: 0xf4e242, specular: 0x080808});
    for (let row = 1; row <= numRows; row++) {
      for (let col = 1; col <= numCols; col++) {
        let pillar = new THREE.Mesh(pillarGeom, pillarMaterial);
        pillar.position.x = - (startPoint.x + (spacing.x * col));
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
