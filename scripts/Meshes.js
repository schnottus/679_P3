function makeAsteroidMesh(asteroid) {
	asteroid.mesh = new THREE.Mesh(geometries.asteroid, new THREE.MeshFaceMaterial());
	scene.add(asteroid.mesh);
}

function makeCrystalMesh(crystal) {
	crystal.mesh = new THREE.Mesh(geometries.crystal, new THREE.MeshFaceMaterial());
	scene.add(crystal.mesh);
}

function makeSoldierMesh(soldier) {
    soldier.mesh = new THREE.Mesh(geometries.soldier, new THREE.MeshFaceMaterial());
    scene.add(soldier.mesh);
}

function makeScoutMesh(scout) {
    scout.mesh = new THREE.Mesh(geometries.scout, new THREE.MeshFaceMaterial());
    scene.add(scout.mesh);
}

function makeTankMesh(tank) {
    tank.mesh = new THREE.Mesh(geometries.tank, new THREE.MeshFaceMaterial());
    scene.add(tank.mesh);
}

function makePlayerMesh(player) {
    player.mesh = new THREE.Mesh(geometries.player, new THREE.MeshFaceMaterial());
	scene.add(player.mesh);
}

function makeStationMesh(station) {
    station.mesh = new THREE.Mesh(geometries.station, new THREE.MeshFaceMaterial());
	scene.add(station.mesh);
}