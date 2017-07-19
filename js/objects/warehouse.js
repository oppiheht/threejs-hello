var warehouseModule = (function(scene) {

  let WAREHOUSE_SIZE = 200000;
  let FLOOR_CHECKER_SIZE = 200000;
  let SEGMENTS = WAREHOUSE_SIZE / FLOOR_CHECKER_SIZE;

  var loader = new THREE.TextureLoader();

  function addFloor() {
    let floorTexture = loader.load('../../res/concrete.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(100, 100);

    let floorMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x111111, map: floorTexture});
    let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(WAREHOUSE_SIZE, WAREHOUSE_SIZE), floorMaterial);
    floor.name = 'Floor';

    _positionFloor(floor);
    scene.add(floor);
  }

  function addCheckeredFloor() {
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
    _positionFloor(floor);
    scene.add(floor);
  }

  function _positionFloor(floor) {
    floor.position.x = -30000;
    floor.position.y = -5;
    floor.position.z = 20000;
    floor.rotation.x = (-Math.PI / 2);
  }

  PILLAR_HEIGHT = 6000;
  PILLAR_WIDTH = 200;
  function addPillars(startPoint, spacing, numRows, numCols) {
    startPoint = startPoint || {x: -3353, z: -15468};
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
    addCheckeredFloor: addCheckeredFloor,
    addPillars: addPillars,
  };

})(sceneModule.scene);
