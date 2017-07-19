var scene = (function() {
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

  let measurement = {
    firstVector: new THREE.Vector2(),
    secondVector: new THREE.Vector2(),
    firstPoint: '',
    secondPoint: '',
    distanceMillimeters: 0,
    distanceInches: 0,
  }

  let measurementsGui = gui.addFolder('Measurement (M key)')
  measurementsGui.add(measurement, 'firstPoint').listen();
  measurementsGui.add(measurement, 'secondPoint').listen();
  measurementsGui.add(measurement, 'distanceMillimeters').listen().name('Distance (mm)');
  measurementsGui.add(measurement, 'distanceInches').listen().name('Distance (in)');
  function onKeyDown(event) {
    if (event.code == 'KeyM') {
      measurementsGui.closed = false;
      if (measurement.firstVector.x == 0 && measurement.secondVector.y == 0) {
        measurement.firstVector = new THREE.Vector2(hover.x, hover.z);
        measurement.firstPoint = '('+Math.round(measurement.firstVector.x)+', '+Math.round(measurement.firstVector.y)+')';
      }
      else if (measurement.secondVector.x == 0 && measurement.secondVector.y == 0) {
        measurement.secondVector = new THREE.Vector2(hover.x, hover.z);
        measurement.secondPoint = '('+Math.round(measurement.secondVector.x)+', '+Math.round(measurement.secondVector.y)+')';
        measurement.distanceMillimeters = Math.round(measurement.firstVector.distanceTo(measurement.secondVector));
        measurement.distanceInches = measurement.distanceMillimeters / 25.4;
      }
      else {
        measurement.firstVector = new THREE.Vector2(hover.x, hover.z);
        measurement.firstPoint = '('+Math.round(measurement.firstVector.x)+', '+Math.round(measurement.firstVector.y)+')';
        measurement.secondVector = new THREE.Vector2();
        measurement.secondPoint = '';
        measurement.distanceMillimeters = 0;
        measurement.distanceInches = 0;
      }
    }
  }
  window.addEventListener('keydown', onKeyDown);

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

  return scene;
})();

