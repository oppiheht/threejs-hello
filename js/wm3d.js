var wm3d = (function() {
  let scene = new THREE.Scene();
  scene.scale.x = -1;
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);

  var loader = new THREE.TextureLoader();

  let _controls = new THREE.OrbitControls(camera);
  _controls.keys = {LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83}
  _controls.keyPanSpeed = 30;

  const _savedCamera = JSON.parse(localStorage.getItem('savedCamera'));
  if (_savedCamera) {
    camera.position.copy(_savedCamera.cameraPosition);
    _controls.target.copy(_savedCamera.targetPosition);
  }
  else {
    camera.position.set(-57000, 37000, -27000);
    camera.lookAt(new THREE.Vector3(-37000, 0, -27000));
  }

  window.addEventListener('unload', () => {
    localStorage._savedCamera = JSON.stringify({
      cameraPosition: camera.position,
      targetPosition: _controls.target,
    })
  });

  let _renderer = new THREE.WebGLRenderer();
  _renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
  document.body.appendChild(_renderer.domElement);

  let directionalLight = new THREE.DirectionalLight(0xffffff, .5);
  directionalLight.position.y = -1;
  scene.add(directionalLight);
  scene.add(new THREE.AmbientLight(0xffffff, .5));

  let gui = new dat.GUI();

  let _onRenderFunctions = [];
  function addOnRenderFunction(fn) {
    _onRenderFunctions.push(fn);
  }

  let _render = function () {
    requestAnimationFrame(_render);
    _controls.update();
    _renderer.render(scene, camera);
    
    _onRenderFunctions.forEach((fn) => fn.call());
  };
  _render();

  return {
    scene: scene,
    camera: camera,
    gui: gui,
    loader: loader,
    addOnRenderFunction: addOnRenderFunction
  };

})();