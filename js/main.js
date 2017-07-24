(function(rackModule, warehouseModule, robotModule, toteModule) {

  let config = {
    'full-testmap-tracks': {
      warehouseSize: {x: 109728, z: 62179},
      warehouseCornerOffset: {x: -3353, z: -15468},
      pillarSpacing: {x: 18288, z: 12192},
      pillarSize: 200,
      rackFile: 'js/maps/testmap.json',
      rackOffset: {x: 0, z: 0},
      trackFile: 'js/maps/testarea-shifted-tracks.json',
      trackOffset: {x: 81848, z: 0},
      toteFile: 'js/maps/totes.json',
      toteOffset: {x: 81848, z: 0},
    },
    'small-testarea-tracks': {
      rackFile: 'js/maps/testarea-shifted-map.json',
      rackOffset: {x: 0, z: 0},
      trackFile: 'js/maps/testarea-shifted-tracks.json',
      trackOffset: {x: 0, z: 0},
    }
  }

  let currentConfig = config['full-testmap-tracks'];

  $.ajaxSetup( { "async": false } );

  rackModule.addRacks(currentConfig.rackFile, currentConfig.rackOffset);
  warehouseModule.addFloor(currentConfig.warehouseSize, currentConfig.warehouseCornerOffset);
  warehouseModule.addPillars(currentConfig.warehouseCornerOffset, currentConfig.pillarSpacing, currentConfig.pillarSize, 5, 5);
  robotModule.addTestRobots();
  //robotModule.addMercuryRobots();
  trackModule.addTracks(currentConfig.trackFile, currentConfig.trackOffset);
  //toteModule.addTotes(currentConfig.toteFile, currentConfig.toteOffset);

})(rackModule, warehouseModule, robotModule, toteModule);
