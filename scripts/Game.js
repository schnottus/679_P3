/******************
* File: Game.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*******************/

//game loop
function animate() 
{
	stats.begin();
	requestAnimationFrame( animate ); //I've read it should be placed immediately before render(), not sure why though
	render(); //draw game
	update(); //update game state
	stats.end();
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
	//check for collisions and apply damage accordingly
	updateBullets();
	//enforce rotation and velocity limits, check health
	updatePlayer();
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

function updatePlayer()
{
	//limit angular velocity
	var rotationSpeed = playerShip.body.GetAngularVelocity();
	if( Math.abs(rotationSpeed) > MAX_PLAYER_ROTATION_VELOCITY )
	{
		
		if( rotationSpeed < 0 )  //negative if radotating left
		{
			playerShip.body.SetAngularVelocity(-MAX_PLAYER_ROTATION_VELOCITY);
		}else{  //else rotating right
			playerShip.body.SetAngularVelocity(MAX_PLAYER_ROTATION_VELOCITY);
		}
		
	}
	//damp angular velocity if player not turning
	if ( dampPlayerRotation )
	{
		playerShip.body.SetAngularVelocity( playerRotationDampValue * rotationSpeed );
	}
	
	//limit linear velocity
		//todo
		
	//check health
		//todo
		
	
		
}

function updateBullets()
{
	
	for (var i = 0; i < bulletList.length; i++){
		
		var b = bulletList[i];
        b.updateMesh(); //update meshes (for drawing)
		
		//check bullet times to see if they need to be destroyed
		//different times for different types - determines "range"
		//don't use date.now (changes when paused)
		if( ((Date.now() - b.start) / 1000 ) > 4 )  //after 4 seconds alive 
		{
			//b.destroy();
			//remove from bulletList without messing up for loop
		}
	}
	
	//check for collisions (apply damage if collided and then delete)
	
	
	
}

//check here if game won and other important events
function updateGameState()
{
	
}