function makeAsteroidMesh(asteroid) {
	asteroid.mesh = new THREE.Mesh(geometries.asteroid, new THREE.MeshFaceMaterial());
	scene.add(asteroid.mesh);
}

function makeTankMesh() {
    return mesh;
}

function makePlayerMesh(player) {
    player.mesh = new THREE.Mesh(geometries.player, new THREE.MeshFaceMaterial());
    //player.mesh.rotation.x = -Math.PI/2; //will probably replace this 2 lines with actual rotation in the model
    //player.mesh.rotation.z = Math.PI/2;
	scene.add(player.mesh);
}