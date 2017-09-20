(function(wm3d) {

  // robotName -> Mesh
  let _robots = {};

  function addTestRobots() {
    let robotGeom = new THREE.BoxBufferGeometry(640, 600, 620);
    let robotMaterial = new THREE.MeshBasicMaterial({color: 0x0000ee});
    for (let i = 0; i < 30; i++) {
      let robot = new THREE.Mesh(robotGeom, robotMaterial);
      robot.searchable = true;
      wm3d.scene.add(robot);
      robot.position.set(105000, 300, 1000 * i);
      robot.name = 'picker' + (i+1);
      _robots[robot.name] = robot;
    }
  }

  function addMercuryRobots() {
    let loader = new THREE.JSONLoader();
    loader.load("../res/mercury-translated-decimated2.json", _onMercuryLoaded, _onMercuryLoading, _onMercuryFailed);
  }

  function _onMercuryLoaded(robotGeom) {
    robotGeom.translate(0, 0, -200);
    robotGeom.rotateY(Math.PI);
    let robotMaterial = new THREE.MeshToonMaterial({color: 0x2194ce, specular: 0x111111});
    for (let i = 0; i < 10; i++) {
      let robot = new THREE.Mesh(robotGeom, robotMaterial);
      wm3d.scene.add(robot);
      robot.position.x = 3000;
      robot.position.z = 1000 * i;
      robot.name = 'picker' + (i+1);
      _robots[robot.name] = robot;
    }
  }

  function _onMercuryLoading(xhr) {
    console.log( (xhr.loaded/xhr.total * 100) + '% loaded');
  }

  function _onMercuryFailed(xhr) {
    alert('mercury failed to load');
  }

  function setRobotPosition(robotName, x, z, angle) {
    let robot = _robots[robotName];
    if (!robot) {
      console.error('no robot named "'+robotName+'" to set position on.');
      return;
    }
    robot.position.x = x;
    robot.position.z = z;
    robot.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
  }

  wm3d.robotModule = {
    addTestRobots: addTestRobots,
    addMercuryRobots: addMercuryRobots,
    setRobotPosition: setRobotPosition,
  };

})(wm3d);