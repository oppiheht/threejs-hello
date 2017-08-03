(function(wm3d) {

  let hover = {x:0, z:0, name: '', object: null};
  let _oldMaterialColor = null;

  wm3d.gui.add(hover, 'x').listen().name('Mouse X');
  wm3d.gui.add(hover, 'z').listen().name('Mouse Z');
  wm3d.gui.add(hover, 'name').listen().name('Name');

  let raycaster = new THREE.Raycaster();
  let mouseVector = new THREE.Vector2();
  function onMouseMove(event) {
    mouseVector.x = ( event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = - ( event.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('mousemove', onMouseMove, false);

  function onRender() {
    raycaster.setFromCamera(mouseVector, wm3d.camera);
    var intersects = raycaster.intersectObjects(wm3d.scene.children);
    if (intersects.length > 0) {
      hover.x = -intersects[0].point.x;
      hover.z = intersects[0].point.z;
      hover.name = intersects[0].object.name;
      hover.object = intersects[0].object;
    }
  }

  wm3d.addOnRenderFunction(onRender);

  wm3d.hoverModule = {
    hover: hover,
  };

  
})(wm3d);