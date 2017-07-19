(function(gui, hover) {

  let _measurement = {
    firstVector: new THREE.Vector2(),
    secondVector: new THREE.Vector2(),
    firstPoint: '',
    secondPoint: '',
    distanceMillimeters: 0,
    distanceInches: 0,
  };

  let _measurementsGui = gui.addFolder('measurement (M key)')
  _measurementsGui.add(_measurement, 'firstPoint').listen();
  _measurementsGui.add(_measurement, 'secondPoint').listen();
  _measurementsGui.add(_measurement, 'distanceMillimeters').listen().name('Distance (mm)');
  _measurementsGui.add(_measurement, 'distanceInches').listen().name('Distance (in)');
  
  function onKeyDown(event) {
    if (event.code == 'KeyM') {
      _measurementsGui.closed = false;
      if (_measurement.firstVector.x == 0 && _measurement.secondVector.y == 0) {
        _measurement.firstVector = new THREE.Vector2(hover.x, hover.z);
        _measurement.firstPoint = '('+Math.round(_measurement.firstVector.x)+', '+Math.round(_measurement.firstVector.y)+')';
      }
      else if (_measurement.secondVector.x == 0 && _measurement.secondVector.y == 0) {
        _measurement.secondVector = new THREE.Vector2(hover.x, hover.z);
        _measurement.secondPoint = '('+Math.round(_measurement.secondVector.x)+', '+Math.round(_measurement.secondVector.y)+')';
        _measurement.distanceMillimeters = Math.round(_measurement.firstVector.distanceTo(_measurement.secondVector));
        _measurement.distanceInches = _measurement.distanceMillimeters / 25.4;
      }
      else {
        _measurement.firstVector = new THREE.Vector2(hover.x, hover.z);
        _measurement.firstPoint = '('+Math.round(_measurement.firstVector.x)+', '+Math.round(_measurement.firstVector.y)+')';
        _measurement.secondVector = new THREE.Vector2();
        _measurement.secondPoint = '';
        _measurement.distanceMillimeters = 0;
        _measurement.distanceInches = 0;
      }
    }
  }

  window.addEventListener('keydown', onKeyDown);
})(datguiModule.gui, sceneModule.hover);