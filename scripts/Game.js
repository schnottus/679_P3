/******************
* File: Game.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*******************/

//game loop
function animate() 
{
	requestAnimationFrame( animate ); //I've read it should be placed immediately before render(), not sure why though
	render(); //draw game
	update(); //update game state
}

//gl loop, updates on every requestAnimationFrame
function update()
{
	//update box2d world
	updateWorld();
	//move camera into position
	updateCamera();
	//check game state for win/lose cases
    updateGameState();
}

//gl render scene
function render() 
{	
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	camera.aspect = SCREEN_WIDTH/SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	
	//setViewport( lowerLeftX, lowerLeftY, viewportWidth, viewportHeight )
	renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.clear();
	renderer.render( scene, camera );

}

function updateWorld() 
{
	//TODO Fix Step to use delta time
	world.Step(
		1 / 60,  //frame rate
		10,		//velocity iterations
		10		//position iterations
	);
	world.DrawDebugData();
	world.ClearForces();

    for(var i = 0; i < asteroidList.length; i ++){
        asteroidList[i].updateMesh();
		if(asteroidList[i].isAwake()){
			//console.log(i);
		}
	}
    for (var i = 0; i < enemyList.length; i++){
        enemyList[i].updateMesh();
		enemyList[i].material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
	}
    playerShip.updateMesh();
};

//move camera to follow player
function updateCamera()
{
    camera.position.set(playerShip.getPosX(), playerShip.getPosY(), -20);
    camera.lookAt(new THREE.Vector3(playerShip.getPosX(), playerShip.getPosY(), 0));
	camera.rotation.z = d2r(0);
}

//check here if game won and other important events
function updateGameState()
{
	
}