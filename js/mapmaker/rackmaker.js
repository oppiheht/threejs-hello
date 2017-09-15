(function(wm3d) {

  let racks = [];
  let shelfNum = 0;
  let fiducialHeight = 570;

  function addRacks(x, y, rackWidth, rackDepth, numShelves, doubleSided) {
    let newRacks = [];
    for (let i = 0; i < numShelves; i++) {
      let shelf = {
        "origin": [x + (rackWidth * i), y], 
        "function": "shelf", 
        "angle": 0.0, 
        "name": "rack" + shelfNum++, 
        "shelves": [{"fiducials": [{"name": i*2, "location": 0.0}, {"name": i*2+1, "location": rackWidth}], "height": 0}], 
        "travelDistance": 700, 
        "depth": rackDepth, 
        "length": rackWidth, 
        "fiducialHeight": 570, 
        "transfers": {}, 
        "type": "shelving_unit"
      };
      newRacks.push(shelf);
    };

    if (doubleSided) {
      let clonedShelves = JSON.parse(JSON.stringify(newRacks));
      clonedShelves.forEach((shelf) => {
        shelf.origin[0] += rackWidth;
        shelf.origin[1] -= rackDepth * 2;
        shelf.angle = -180;
        shelf.name = "rack" + shelfNum++;
      });
      newRacks = newRacks.concat(clonedShelves);
    }

    racks = racks.concat(newRacks);
    return newRacks;
  }

  function getAllRacks() {
    return racks;
  }

  wm3d.rackMaker = {
    addRacks: addRacks,
    getAllRacks: getAllRacks,
  }

})(wm3d);