var sceneModule = (function(gui) {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
  
  camera.position.set(-57000, 37000, -27000);
  camera.lookAt(new THREE.Vector3(-37000, 0, -27000));

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
  document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera);

  scene.add(new THREE.DirectionalLight(0xffffff, .5));
  scene.add(new THREE.AmbientLight(0xffffff, .5));

  let hover = {x:0, z:0, name: ''};
  
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
    raycaster: raycaster,
  };

})(datguiModule.gui);

