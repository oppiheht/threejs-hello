var scene = (function() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
  
  camera.position.set(-57000, 37000, -27000);
  camera.lookAt(new THREE.Vector3(-37000, 0, -27000));

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
  document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera);

  scene.add(new THREE.AmbientLight(0x404040));

  let render = function () {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  };

  render();

  return scene;
})();

