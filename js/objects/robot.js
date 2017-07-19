robotModule = (function(scene) {

  function addTestRobots() {
    let robotGeom = new THREE.BoxBufferGeometry(640, 600, 620);
    let robotMaterial = new THREE.MeshBasicMaterial({color: 0x0000ee});
    for (let i = 0; i < 30; i++) {
      let robot = new THREE.Mesh(robotGeom, robotMaterial);
      scene.add(robot);
      robot.position.x = 3000;
      robot.position.y = 300;
      robot.position.z = 1000 * i;
    }
  }

  function addMercuryRobots() {
    let loader = new THREE.JSONLoader();
    loader.load("../res/mercury-translated-decimated2.json", _onMercuryLoaded, _onMercuryLoading, _onMercuryFailed);
  }

  function _onMercuryLoaded(robotGeom) {
    let robotMaterial = new THREE.MeshToonMaterial({color: 0x2194ce, specular: 0x111111});
    for (let i = 0; i < 30; i++) {
      let robot = new THREE.Mesh(robotGeom, robotMaterial);
      scene.add(robot);
      robot.position.x = 3000;
      robot.position.z = 1000 * i;
      robot.name = 'picker-invia-' + (i+1);
    }
  }

  function _onMercuryLoading(xhr) {
    console.log( (xhr.loaded/xhr.total * 100) + '% loaded');
  }

  function _onMercuryFailed(xhr) {
    alert('mercury failed to load');
  }

  return {
    addTestRobots: addTestRobots,
    addMercuryRobots: addMercuryRobots,
  };

})(scene);
