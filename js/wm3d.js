var wm3d = (function() {
  let scene = new THREE.Scene();
  scene.scale.x = -1;
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
  let renderer = new THREE.WebGLRenderer();

  var loader = new THREE.TextureLoader();

  let _controls = null;

  const _savedCamera = JSON.parse(localStorage.getItem('savedCamera'));
  if (_savedCamera && _controls) {
    camera.position.copy(_savedCamera.cameraPosition);
    _controls.target.copy(_savedCamera.targetPosition);
  }
  else {
    camera.position.set(-57000, 37000, -27000);
    camera.lookAt(new THREE.Vector3(-37000, 0, -27000));
  }
  camera.updateProjectionMatrix();

  window.addEventListener('unload', () => {
    if (_controls) {
      localStorage._savedCamera = JSON.stringify({
        cameraPosition: camera.position,
        targetPosition: _controls.target,
      })
    }
  });

  let directionalLight = new THREE.DirectionalLight(0xffffff, .5);
  directionalLight.position.y = -1;
  scene.add(directionalLight);
  scene.add(new THREE.AmbientLight(0xffffff, .5));

  let gui = new dat.GUI();
  gui.domElement.hidden = true;

  let _onRenderFunctions = [];
  function addOnRenderFunction(fn) {
    _onRenderFunctions.push(fn);
  }

  let _render = function () {
    requestAnimationFrame(_render);
    if (_controls) {
      _controls.update();
    }
    renderer.render(scene, camera);
    
    _onRenderFunctions.forEach((fn) => fn.call());
  };
  _render();
  
  function displayInDomElement(element, width, height) {
    _controls = new THREE.OrbitControls(camera, element);
    _controls.keys = {LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83}
    _controls.keyPanSpeed = 30;
    element.appendChild(renderer.domElement);
    let w = width || element.offsetWidth - 2;
    let h = height || element.offsetHeight - 2;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    gui.domElement.hidden = false;
  }

  return {
    renderer: renderer,
    scene: scene,
    camera: camera,
    gui: gui,
    loader: loader,
    addOnRenderFunction: addOnRenderFunction,
    displayInDomElement: displayInDomElement,
  };

})();