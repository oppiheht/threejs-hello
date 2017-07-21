var toteModule = (function(scene) {
 
  let TOTE_LENGTH = 460;
  let TOTE_WIDTH = 260;
  let TOTE_HEIGHT = 260;
  let toteGeom = new THREE.BoxBufferGeometry(TOTE_WIDTH, TOTE_HEIGHT, TOTE_LENGTH);
  toteGeom.applyMatrix( new THREE.Matrix4().makeTranslation( -TOTE_WIDTH / 2, -TOTE_HEIGHT/2, -TOTE_LENGTH / 2));
  let toteMaterial = new THREE.MeshBasicMaterial({color: 0x333333});

  function addTotes(totesUrl, offset) {
    offset = (typeof offset !== 'undefined') ? offset : {x:0, z:0};
    let totes = $.getJSON(totesUrl).responseJSON; 
    totes.forEach(function(tote) {
        _addTote(tote, offset);
    });
  }

  function _addTote(tote, offset) {
    let toteMesh = new THREE.Mesh(toteGeom, toteMaterial);
    toteMesh.position.x = tote.slot_global_position[0] + offset.x;
    toteMesh.position.y = tote.slot_local_position.z;
    toteMesh.position.z = tote.slot_global_position[1] + offset.z;
    toteMesh.name = 'Tote '+ tote.slot_label;
    scene.add(toteMesh);
  }

  return {
    addTotes: addTotes,
  };
})(sceneModule.scene);