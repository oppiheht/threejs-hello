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

    _input.addEventListener('keydown', _search);
  }

  function _search(event) {
    event.stopPropagation();
    if (event.code == 'Escape') {
      _input.removeEventListener('keydown', _search);
      _input.remove();
      _input = null;
      return;
    }

    let count = 0;
    wm3d.scene.children.forEach((child) => {
      if (child.searchable != false && child.name.toUpperCase().includes((event.target.value + event.key).toUpperCase())) {
        count++;

        if (!child.outline) {
          let outlineMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
          let outline = new THREE.Mesh(child.geometry, outlineMaterial);
          outline.position.copy(child.position);
          outline.rotation.copy(child.rotation);
          outline.scale.multiplyScalar(1.07);
          child.outline = outline;
          outline.name = child.name;
          outline.searchable = false;
          wm3d.scene.add(outline);
        }
      }
      else if (child.outline) {
        wm3d.scene.remove(child.outline);
        child.outline = null;
      }
    });
    console.log('Found '+count+' matching search items');
  }

  wm3d.searchModule = {
  };

})(wm3d);