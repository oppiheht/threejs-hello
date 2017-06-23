$.ajaxSetup( { "async": false } );
let racks = $.getJSON('js/map2.json').responseJSON; 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
let gui = new dat.GUI();

gui.add(camera.position, 'x').listen();
gui.add(camera.position, 'y').listen();
gui.add(camera.position, 'z').listen();

camera.position.set(27000, 35000, -14407);
camera.lookAt(new THREE.Vector3(30000, 0, 13000));

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 3, window.innerHeight - 3);
document.body.appendChild(renderer.domElement);
let controls = new THREE.OrbitControls(camera);

scene.add(new THREE.AmbientLight(0x404040));

let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
function randomColor() {
  let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let b = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  return '#'+r+g+b;
}
  
let RACK_HEIGHT = 2000;
racks.forEach(function(rack, index) {
  let rackGeom = new THREE.BoxBufferGeometry(rack.length, RACK_HEIGHT, rack.depth);
  rackGeom.applyMatrix( new THREE.Matrix4().makeTranslation( rack.length / 2, RACK_HEIGHT / 2, rack.depth / 2));
  let rackMaterial = new THREE.MeshBasicMaterial({ color: randomColor() });
  let rackMesh = new THREE.Mesh(rackGeom, rackMaterial);
  rackMesh.position.x = rack.origin[0];
  rackMesh.position.z = rack.origin[1];
  rackMesh.rotation.y = (rack.angle * Math.PI / 180);
  scene.add(rackMesh);
});

let WAREHOUSE_SIZE = 100000;
let FLOOR_CHECKER_SIZE = 100000;
let segments = WAREHOUSE_SIZE / FLOOR_CHECKER_SIZE;
let materials = [new THREE.MeshBasicMaterial({ color: 0x666666}), new THREE.MeshBasicMaterial({ color: 0x777777})];
let floorGeom = new THREE.PlaneGeometry(WAREHOUSE_SIZE, WAREHOUSE_SIZE, segments, segments);
for (let x = 0; x < segments; x++) {
  for (let y = 0; y < segments; y++) {
    let i = x * segments + y;
    let j = 2 * i;
    floorGeom.faces[j].materialIndex = floorGeom.faces[j+1].materialIndex = (x+y) % 2;
  }
}
let floor = new THREE.Mesh(floorGeom, materials);
floor.position.x = 25000;
floor.position.z = 20000;
floor.rotation.x = (-Math.PI / 2);
scene.add(floor);

let render = function () {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();
