(function(wm3d) {

  let config = {
    'full-testmap-tracks': {
      warehouseSize: {x: 109728, z: 62179},
      warehouseCornerOffset: {x: -3353, z: -15468},
      pillarSpacing: {x: 18288, z: 12192},
      pillarSize: 200,
      rackFile: 'js/maps/more-hollar.json',
      rackOffset: {x: 0, z: 0},
      trackFile: 'js/maps/more-tracks.json',
      trackOffset: {x: 0, z: 0},
      toteFile: 'js/maps/totes.json',
      toteOffset: {x: 81848, z: 0},
    },
    'easypost': {
      warehouseSize: {x: 20000, z: 50000},
      warehouseCornerOffset: {x: -5000, z: -20000 },
      rackFile: 'js/maps/easypost.json',
      rackOffset: {x: 0, z: 0},
    }
  }

  let currentConfig = config['easypost'];

  $.ajaxSetup( { "async": false } );
  let racks = $.getJSON(currentConfig.rackFile).responseJSON;
  let totes = $.getJSON(currentConfig.toteFile).responseJSON;
  let tracks = $.getJSON(currentConfig.trackFile).responseJSON; 

  wm3d.displayInDomElement(document.body);
  wm3d.rackModule.addRacks(racks, currentConfig.rackOffset);
  wm3d.warehouseModule.addFloor(currentConfig.warehouseSize, currentConfig.warehouseCornerOffset);
  wm3d.warehouseModule.addPillars(currentConfig.warehouseCornerOffset, currentConfig.pillarSpacing, currentConfig.pillarSize, 5, 5);
  wm3d.robotModule.addTestRobots();
  wm3d.trackModule.addTracks(tracks, currentConfig.trackOffset);

})(wm3d);
