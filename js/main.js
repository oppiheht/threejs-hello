$.ajaxSetup( { "async": false } );
let racks = $.getJSON('js/map.json').responseJSON; 

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
document.body.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera);

let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
function randomColor() {
  let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let b = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  return '#'+r+g+b;
}

let RACK_HEIGHT = 2000;
racks.forEach(function(rack, index) {
  let rackGeom = new THREE.BoxGeometry(rack.length, RACK_HEIGHT, rack.depth);
  rackGeom.applyMatrix( new THREE.Matrix4().makeTranslation( rack.length / 2, RACK_HEIGHT / 2, rack.depth / 2));
  let rackMaterial = new THREE.MeshBasicMaterial({ color: randomColor() });
  let rackMesh = new THREE.Mesh(rackGeom, rackMaterial);
  rackMesh.position.x = rack.origin[0];
  rackMesh.position.z = rack.origin[1];
  rackMesh.rotation.y = (rack.angle * Math.PI / 180);
  scene.add(rackMesh);
});

var render = function () {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();
