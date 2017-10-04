(function(wm3d) {

    //path name -> SplineCurve
    _paths = {};

    function setPath(key, points) {
        if (_paths[key]) {
            wm3d.scene.remove(_paths[key]);
            _paths[key] = null;
        }
        if (!points) {
            return;
        }

        var numPoints = 100;

        let vectors = [];
        points.forEach(function(point) {
          vectors.push(new THREE.Vector3(point.x, 200, point.y));
        });
        let spline = new THREE.CatmullRomCurve3(vectors);

        var material = new THREE.LineBasicMaterial({
            color: 0xff00f0,
            linewidth: 300,
        });

        var geometry = new THREE.Geometry();
        var splinePoints = spline.getPoints(numPoints);

        for(var i = 0; i < splinePoints.length; i++){
            geometry.vertices.push(splinePoints[i]);  
        }

        var line = new THREE.Line(geometry, material);

        _paths[key] = line;
        wm3d.scene.add(line);
    }


    wm3d.pathModule = {
        setPath: setPath,
    }

})(wm3d);