(function(wm3d) {

  // robotName -> Mesh
  let _robots = {};
  let _selectedRobot = null;

  function addRobot(name) {
    let robotGeom = new THREE.BoxBufferGeometry(640, 600, 620);
    let robotMaterial = new THREE.MeshToonMaterial({color: 0x0000ee, specular: 0x111111});
    robotMaterial.side = THREE.DoubleSide;
    let robot = new THREE.Mesh(robotGeom, robotMaterial);

    let robotNameplate = new THREE.Group();
    let robotNameplateSprite = new THREE.TextSprite({textSize: 300, texture: { text: name }});
    robotNameplate.position.set(0, 2000, 0);
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
    }
    robot.position.x = x;
    robot.position.z = z;
    robot.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
  }

  function setRobotErrored(robotName, isErrored) {
    let robot = _robots[robotName];
    if (!robot) {
      console.error("No robot: " + robotName + " exists to setRobotErrored on");
      return;
    }
    if (isErrored) {
      if (!robot.lightBeam) {
        robot.material.color.set(0xee0000);

        let cylinderGeom = new THREE.CylinderGeometry(600, 600, 10000, 32, 8, 1, false);
        cylinderGeom.openEnded = true;
        cylinderGeom.translate(0, 5000 - 300, 0);
        let lightBeamMaterial = new THREE.MeshLambertMaterial({color: 0xcc0000, depthWrite: false});
        lightBeamMaterial.side = THREE.DoubleSide;
        lightBeamMaterial.transparent = true;
        lightBeamMaterial.opacity = .1;
        let lightBeam = new THREE.Mesh(cylinderGeom, lightBeamMaterial);
        lightBeam.position.copy(robot.position);
        robot.lightBeam = lightBeam;
        wm3d.scene.add(lightBeam);
      }
    } else if (robot.lightBeam) {
      wm3d.scene.remove(robot.lightBeam);
      robot.lightBeam = null;

      robot.material.color.set(0x0000ee);
    }
  }

  function selectRobot(robotName) {
    let robot = _robots[robotName];

    //pass if re-selecting the same robot
    if (robotName != null && robot != null && _selectedRobot != null && robot.name == _selectedRobot.name) {
      return;
    }

    //deselect current if it exists
    if (_selectedRobot != null && _selectedRobot.arrow) {
      wm3d.scene.remove(_selectedRobot.arrow);
      _selectedRobot.arrow = null;
      _selectedRobot = null;
    }

    //select the new robot
    if (robot) {
      _selectedRobot = robot;
      let direction = new THREE.Vector3(0, -1, 0);
      let origin = new THREE.Vector3(0, 2000, 0);
      let arrowMesh = new THREE.ArrowHelper(direction, origin, 1000, 0x0000ff, 200, 50);
      arrowMesh.cone.material = new THREE.MeshPhongMaterial({color: 0x00cc00, specular: 0xcccccc});
      arrowMesh.cone.material.side = THREE.DoubleSide;
      arrowMesh.line.material = new THREE.MeshPhongMaterial({color: 0x00cc00, specular: 0xcccccc});

      let arrow = new THREE.Group();
      arrow.add(arrowMesh);
      arrow.position.copy(robot.position);
      robot.arrow = arrow;
      wm3d.scene.add(arrow);
    }
  }

  wm3d.robotModule = {
    addRobot: addRobot,
    addTestRobots: addTestRobots,
    addMercuryRobots: addMercuryRobots,
    setRobotPosition: setRobotPosition,
    setRobotErrored: setRobotErrored,
    selectRobot: selectRobot,
  };

})(wm3d);