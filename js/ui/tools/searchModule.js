(function(wm3d) {
  
  let _input = null;
  document.addEventListener('keyup', _onKeyUp);

  function _onKeyUp(event) {
    if (event.code == 'KeyF' && _input == null) {
      _addSearchBar();
    }
  }

  function _addSearchBar() {
    _input = document.createElement('input');
    _input.style.position = 'absolute';
    document.body.appendChild(_input);
    _input.style.top = window.innerHeight / 10 + 'px';
    _input.style.left = (window.innerWidth - _input.scrollWidth) / 2 + 'px';
    _input.focus();
    _input.addEventListener('keydown', _keyDown);
  }

  function _keyDown(event) {
    event.stopPropagation();
    if (event.code == 'Escape' || event.code == 'Enter') {
      if (event.target.value.length == 0) {
        clearSearchedItems();
      }
      _input.removeEventListener('keydown', _keyDown);
      _input.remove();
      _input = null;
    }
    else {
      search(event.target.value + event.key);
    }
  }

  function clearSearchedItems() {
    wm3d.scene.children.forEach((child) => _removeOutline(child));
  }

  function search(text) {
    let count = 0;
    wm3d.scene.children.forEach((child) => {
      if (child.searchable == true && child.name && child.name.toUpperCase().includes(text.toUpperCase())) {
        count++;
        if (!child.outline) {
          _outlineMesh(child);
        }
      }
      else {
        _removeOutline(child);
      }
    });
    console.log('Found '+count+' matching search items');
  }

  function _removeOutline(parentMesh) {
    if (parentMesh.outline) {
      wm3d.scene.remove(parentMesh.outline);
      parentMesh.outline = null;
    }
  }

  function _outlineMesh(mesh) {
    let outlineMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    let outline = new THREE.Mesh(mesh.geometry, outlineMaterial);
    outline.position.copy(mesh.position);
    outline.rotation.copy(mesh.rotation);
    outline.scale.multiplyScalar(1.07);
    mesh.outline = outline;
    outline.name = mesh.name;
    outline.searchable = false;
    wm3d.scene.add(outline);
  }

  wm3d.searchModule = {
    search: search,
    clearSearchedItems: clearSearchedItems,
  };

})(wm3d);