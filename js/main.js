document.addEventListener("DOMContentLoaded", function(event) {

  let config = {
    'hollar': {
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
      warehouseSize: {x: 20000, z: 25000},
      warehouseCornerOffset: {x: -5000, z: -16000 },
      rackFile: 'js/maps/easypost.json',
      rackOffset: {x: 0, z: 0},
      trackFile: 'js/maps/easypost-tracks.json',
      trackOffset: {x: 0, z: 0},
    }
  }

  let currentConfig = config['easypost'];

  $.ajaxSetup( { "async": false } );
  let racks = $.getJSON(currentConfig.rackFile).responseJSON;
  let tracks = $.getJSON(currentConfig.trackFile).responseJSON; 
  let totes = $.getJSON(currentConfig.toteFile).responseJSON;

  wm3d.displayInDomElement(document.getElementById("3d-container"), window.innerWidth, window.innerHeight);
  wm3d.rackModule.addRacks(racks, currentConfig.rackOffset);
  wm3d.warehouseModule.addFloor(currentConfig.warehouseSize, currentConfig.warehouseCornerOffset);
  if (currentConfig.pillarSpacing && currentConfig.pillarSize) {
    wm3d.warehouseModule.addPillars(currentConfig.warehouseCornerOffset, currentConfig.pillarSpacing, currentConfig.pillarSize, 5, 5);
  }
  wm3d.robotModule.addTestRobots();
  wm3d.trackModule.addTracks(tracks, currentConfig.trackOffset);
});