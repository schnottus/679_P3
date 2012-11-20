function makeAsteroidMesh(asteroid) {
	asteroid.mesh = new THREE.Mesh(geometries.asteroid, new THREE.MeshFaceMaterial());
	scene.add(asteroid.mesh);
}

function makeTankMesh() {
    return mesh;
}

function makePlayerMesh() {
    return mesh;
}