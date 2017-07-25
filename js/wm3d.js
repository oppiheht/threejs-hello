var wm3d = (function() {
  let scene = new THREE.Scene();
  scene.scale.x = -1;
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);

  let controls = new THREE.OrbitControls(camera);
  controls.keys = {LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83}
  controls.keyPanSpeed = 30;

  const savedCamera = JSON.parse(localStorage.getItem('savedCamera'));
  if (savedCamera) {
    camera.position.copy(savedCamera.cameraPosition);
    controls.target.copy(savedCamera.targetPosition);
  }
  else {
    camera.position.set(-57000, 37000, -27000);
    camera.lookAt(new THREE.Vector3(-37000, 0, -27000));
  }

  window.addEventListener('unload', () => {
    localStorage.savedCamera = JSON.stringify({
      cameraPosition: camera.position,
      targetPosition: controls.target,
    })
  });

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
  document.body.appendChild(renderer.domElement);

  let directionalLight = new THREE.DirectionalLight(0xffffff, .5);
  directionalLight.position.y = -1;
  scene.add(directionalLight);
  scene.add(new THREE.AmbientLight(0xffffff, .5));

  let hover = {x:0, z:0, name: ''};
  
  let gui = new dat.GUI();
  gui.add(hover, 'x').listen().name('Mouse X');
  gui.add(hover, 'z').listen().name('Mouse Z');
  gui.add(hover, 'name').listen().name('Name');

  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  function onMouseMove(event) {
    mouse.x = ( event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('mousemove', onMouseMove, false);

  let render = function () {

    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      hover.x = -intersects[0].point.x;
      hover.z = intersects[0].point.z;
      hover.name = intersects[0].object.name;
    }
  };

  render();

  return {
    scene: scene,
    camera: camera,
    hover: hover,
    gui: gui,
  };

})();