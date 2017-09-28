(function(wm3d) {
    
    // lockName -> Mesh
    let _locks = {};
    
    let _ownedColor = 0x993333;
    let _unownedColor = 0x339933;

    function addLock(name, points) {
        if (!points || points.length < 3) {
            console.error("Unable to make lock named: "+name+" with less than 3 points. Given points: "+points);
            return false
        }

        let lockShape = new THREE.Shape();
        lockShape.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            lockShape.lineTo(points[i][0], points[i][1]);
        }

        let extrudeSettings = {steps: 1, amount: -200};
        let lockGeometry = new THREE.ExtrudeGeometry(lockShape, extrudeSettings);
        let lockMaterial = new THREE.MeshBasicMaterial({color: _unownedColor});
        let lockMesh = new THREE.Mesh(lockGeometry, lockMaterial);
        lockMesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
        lockMesh.baseName = name;
        lockMesh.name = name;

        _locks[name] = lockMesh;
        wm3d.scene.add(lockMesh);
    }

    function setLockOwner(lockName, owner) {
        let lock = _locks[lockName];
        if (!lock) {
            console.error("Unable to set owner of unknown lock: "+lockName);
        }
        if (owner) {
            lock.name = lock.baseName + ": " + owner;
            lock.material.setValues({color: _ownedColor});
        } else {
            lock.name = lock.baseName;
            lock.material.setValues({color: _unownedColor});
        }
        return lock.name;
    }

    wm3d.lockModule = {
        addLock: addLock,
        setLockOwner: setLockOwner,
    }

})(wm3d);