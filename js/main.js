(function(rackModule, warehouseModule, robotModule) {
  $.ajaxSetup( { "async": false } );
  let racks = $.getJSON('js/maps/hollar-full-map.json').responseJSON;
  let tracks = $.getJSON('js/maps/tracks-small.json').responseJSON; 

  racks.forEach(rackModule.addRack);
  warehouseModule.addFloor();
  robotModule.addTestRobots();
  //trackModule.addNodes(tracks.nodes);
  //trackModule.addLinks(tracks.links);

})(rackModule, warehouseModule, robotModule);
