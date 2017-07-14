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

  return {
    addTestRobots: addTestRobots,
  };

})(scene);
