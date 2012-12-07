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
	if(!gamePaused)
	{
		render(); //draw game
		update(); //update game state
	}
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
	updateEnemies();
	
	//only update hud every 10th frame (dom manipulation is expensive)
	if( hudFrames >= 10)
	{
		hudFrames = 0;
		updateHUD();
	}
	hudFrames++;
	
	updateBackground();
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
	while (destroyList.length > 0) {
		var thingy = destroyList.pop()
		//console.log(thingy.ID);
		thingy.destroy();
	    //destroyList.pop().destroy();
	}
	
	var temp = asteroidList.head;
    while(temp != null){
		temp.stored.updateMesh();
		temp = temp.next;
	}
	//for(var i = 0; i < asteroidList.length; i ++){
    //    asteroidList[i].updateMesh();
	//	if(asteroidList[i].isAwake()){
			//console.log(i);
	//	}
	//}
	
	temp = crystalList.head;
    while(temp != null){
		temp.stored.updateMesh();
		temp = temp.next;
	}

    temp = enemyList.head;
	while(temp != null){
		temp.stored.updateMesh();
		//temp.stored.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
		temp = temp.next;
	}
    //for (var i = 0; i < enemyList.length; i++){
    //    enemyList[i].updateMesh();
	//	enemyList[i].material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
	//}
    playerShip.updateMesh();
	homeStation.updateMesh();
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
	
	//limit linear velocity (-Joey This could be added to the player controls that apply impulses so that impulses never produce velocities greater than max velocity)
		//todo
		//if playerShip velocity > maxVelocity
			//velocity = maxVelocity
		
	//check health (-Joey this is already checked in prototyping code, because every entity has a .destroy(),
    //                it just needs a playerDeath() function to be written and then it is only checked when the player is damaged)
		//todo
		//if 0
			//kill player (death animation?, notification?)
			//reset position to home base
			//reset health
		
	
		
}

function updateBullets()
{

	var temp = bulletList.head;
    while(temp != null){
		temp.stored.updateMesh();
		if( ((Date.now() - temp.stored.start) / 1000 ) > 1 )  //after 1 seconds alive 
		{
			temp.stored.destroy();
		}
		temp = temp.next;
	}
	
	/*
	
	var i = bulletList.length;
	
	while (i-- && i > -1){
		var b = bulletList[i];
		b.updateMesh(); //update meshes (for drawing)
		
		//check bullet times to see if they need to be destroyed
		//different times for different types - determines "range"
		//don't use date.now (changes when paused)
		if( ((Date.now() - b.start) / 1000 ) > 1 )  //after 4 seconds alive 
		{
			Namer.recycledBulletIDs.push(bulletList[i].ID);
			bulletList = b.destroy(bulletList, i);
			i--;
			//remove from bulletList without messing up for loop
		}
	}
	
	//check for collisions (apply damage if collided and then delete)
	
	*/

}

function updateEnemies() {
    var temp = enemyList.head;
    while (temp != null) {
        temp.stored.runAI();
        temp = temp.next;
    }
}

function updateHUD()
{
	var health = document.getElementById("playerHealth");
	health.innerHTML = "Health: " + playerShip.currentHP;
	
	var health = document.getElementById("playerResources");
	health.innerHTML = "Resources: " + playerShip.crystals;
	
	var health = document.getElementById("numWorld");
	health.innerHTML = "World: " + currentWorld;
}

//update 'sidebar' showing what upgrades player has - call this when reload a new game
function updateSidebar(){
    //linearly a bad idea? since upgrades not that many?
    updateUpgradeInfo("strafeIcon", playerShip.strafeEnabled);
    updateUpgradeInfo("speedIcon", playerShip.speedIncrease);
    updateUpgradeInfo("damageIcon", playerShip.weaponDamage);
    updateUpgradeInfo("missilesIcon", playerShip.missilesEnabled);
    updateUpgradeInfo("gunIcon", playerShip.gunEnabled);
    
}

//used by updateSidebar()
function updateUpgradeInfo(element, enable)
{
    var upgradedItem = document.getElementById(element);
    if(enable)
        upgradedItem.style.display = "block";
    else
        upgradedItem.style.display = "none";
}

//check here if game won and other important events
function updateGameState()
{
	
}

function startGame()
{
	//stop displaying start menu
	var divStartMenu = document.getElementById("startMenu");
	divStartMenu.style.display = "none";  
	
	//start showing game container
	var divContainer = document.getElementById("container");
	divContainer.style.display = "block";
	
	//start game loop
	animate();
}

function pauseGame()
{
	(gamePaused) ? gamePaused = false : gamePaused = true;
	var alertContainer = document.getElementById("alerts");
	if(gamePaused)
	{
		alerts.innerHTML = 'Game Paused';
	}else
	{
		alerts.innerHTML = ''; 
		document.getElementById('btnPause').blur(); //remove focus from button so hitting space or enter doesnt pause/unpause game
	}
		
}

function purchaseMenu()
{
    var purchaseMenuContainer = document.getElementById("purchaseMenuContainer");
    if(playerDocked){ 
        purchaseMenuContainer.style.display="inline";
    }
    else{
        purchaseMenuContainer.style.display="none";
    }
}

function levelMenu()
{
    // hide current world button
    var hide;
    switch(currentWorld){
        case 1: hide = document.getElementById("world1");
                hide.style.display = "none";
                break;
        case 2: hide = document.getElementById("world2");
                hide.style.display = "none";
                break;
        case 3: hide = document.getElementById("world3");
                hide.style.display = "none";
                break;
    }
    
    var levelMenuContainer = document.getElementById("levelMenuContainer");
    if(atGate){ 
        levelMenuContainer.style.display="inline";
    }
    else{
        levelMenuContainer.style.display="none";
    }
}
