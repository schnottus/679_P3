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
	
	renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.clear();
	
	//setViewport(x,y,width,height);
	renderer.setViewport( 0, 0,  SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.render( scene, camera );

}

function updateWorld() 
{
	//TODO Fix Step to use delta time
	world.Step(1 / 60, 10, 10);
	world.DrawDebugData();
	world.ClearForces();
};

//move camera to follow player
function updateCamera()
{
	//camera at x=5, y=5 looking straight ahead
	camera.position.set( 5, 5, -20 );
	camera.lookAt( new THREE.Vector3( 5,5,0 ) );
	camera.rotation.z = d2r(0);
}

//check here if game won and other important events
function updateGameState()
{
	
}