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

function makeStationMesh(station) {
    station.mesh = new THREE.Mesh(geometries.station, new THREE.MeshFaceMaterial());
	scene.add(station.mesh);
}