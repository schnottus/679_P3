function makeAsteroidMesh(asteroid) {
    new THREE.JSONLoader().load('mesh/asteroid2.js', function (geometry) {
        var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial());
        asteroid.mesh = mesh;
        scene.add(mesh);
    });
}

function makeTankMesh() {
    return mesh;
}

function makePlayerMesh() {
    return mesh;
}