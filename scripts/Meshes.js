function makeAsteroidMesh(asteroid) {
	asteroid.mesh = new THREE.Mesh(geometries.asteroid, new THREE.MeshFaceMaterial());
	scene.add(asteroid.mesh);
}

function makeTankMesh() {
    return mesh;
}

function makePlayerMesh(player) {
    player.mesh = new THREE.Mesh(geometries.player, new THREE.MeshFaceMaterial());
	scene.add(player.mesh);
}