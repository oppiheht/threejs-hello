$.ajaxSetup( { "async": false } );
let racks = $.getJSON('js/map.json').responseJSON; 
console.log(racks[0]);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let colorCodes = ['0', '2', '4', '6', '8', 'A', 'C', 'E']
function randomColor() {
  let r = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let g = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  let b = colorCodes[Math.floor(colorCodes.length * Math.random())]; 
  return '#'+r+g+b;
}

racks.forEach(function(rack, index) {
  let rackGeom = new THREE.BoxGeometry(rack.length, 2000, rack.depth);
  let rackMaterial = new THREE.MeshBasicMaterial({ color: randomColor() });
  let rackMesh = new THREE.Mesh(rackGeom, rackMaterial);
  rackMesh.position.x = rack.origin[0];
  rackMesh.position.z = rack.origin[1];
  scene.add(rackMesh);
});

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

render();

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.key == 'w') {
    camera.translateZ(-1000);
  }
  if (e.key == 's') {
    camera.translateZ(1000);
  }
  if (e.key == 'a') {
    camera.rotateY(.1);
  }
  if (e.key == 'd') {
    camera.rotateY(-.1);
  }
  if (e.key == 'q') {
    camera.translateX(-1000);
  }
  if (e.key == 'e') {
    camera.translateX(1000);
  }
  if (e.key == 'z') {
    camera.rotateX(.1);
  }
  if (e.key == 'c') {
    camera.rotateX(-.1);
  }
  camera.updateProjectionMatrix();
}
