(function(wm3d) {

  // robotName -> Mesh
  let _robots = {};

  function addRobot(name) {
    let robotGeom = new THREE.BoxBufferGeometry(640, 600, 620);
    let robotMaterial = new THREE.MeshBasicMaterial({color: 0x0000ee});
    robotMaterial.side = THREE.DoubleSide;
    let robot = new THREE.Mesh(robotGeom, robotMaterial);

    let robotNameplate = new THREE.Group();
    let robotNameplateSprite = new THREE.TextSprite({textSize: 300, texture: { text: name }});
    robotNameplate.position.set(0, 600, 0);
    robotNameplate.scale.x = -1;
    robotNameplate.add(robotNameplateSprite);
    robot.add(robotNameplate);

    robot.searchable = true;
    wm3d.scene.add(robot);
    robot.position.set(0, 300, 0);
    robot.name = name;
    _robots[robot.name] = robot;
    return robot;
  }

  function addTestRobots() {
    for (let i = 0; i < 30; i++) {
      let robot = addRobot('picker' + (i+1));
      robot.position.set(-1000, 300, 1000 * i);
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
      robot = addRobot(robotName);
      return;
    }
    robot.position.x = x;
    robot.position.z = z;
    robot.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
  }

  wm3d.robotModule = {
    addRobot: addRobot,
    addTestRobots: addTestRobots,
    addMercuryRobots: addMercuryRobots,
    setRobotPosition: setRobotPosition,
  };

})(wm3d);