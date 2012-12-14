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
	//updateJetParticles();
	updateParticles();
	boundaryPush();
	if (playerShip.missilesEnabled == true){
		tractorBeam();
	}

	//only update hud every 10th frame (dom manipulation is expensive)
	//check player boundary every 10th frame (current search is costly)
	if( hudFrames >= 10)
	{
		hudFrames = 0;
		updateHUD();
		
		
	}
	hudFrames++;
	
	//checkWorldBoundary();
	
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
	renderer.clear();                     // clear buffers
	renderer.render(background, camera);     // render scene 1
	renderer.clear(false, true, false); // clear depth buffer
	renderer.render(scene, camera);    // render scene 2

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
	
	temp = jetParticleList.head;
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
	/*var rotationSpeed = playerShip.body.GetAngularVelocity();
	if( Math.abs(rotationSpeed) > MAX_PLAYER_ROTATION_VELOCITY )
	{
		
		if( rotationSpeed < 0 )  //negative if radotating left
		{
			playerShip.body.SetAngularVelocity(-MAX_PLAYER_ROTATION_VELOCITY);
		}else{  //else rotating right
			playerShip.body.SetAngularVelocity(MAX_PLAYER_ROTATION_VELOCITY);
		}
		
	}*/
	
	
	playerShip.body.SetAngle( angleTwoPoints( (window.innerWidth / 2), (window.innerHeight / 2), mouseX, mouseY));
	
	//damp angular velocity if player not turning
	/*if ( dampPlayerRotation )
	{
		playerShip.body.SetAngularVelocity( playerRotationDampValue * rotationSpeed );
	}*/
	
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

function updateJetParticles()
{

	var temp = jetParticleList.head;
    while(temp != null){
		temp.stored.updateMesh();
		if( ((Date.now() - temp.stored.start) / 600 ) > 1 )  //after 1 seconds alive 
		{
			temp.stored.destroy();
		}
		temp = temp.next;
	}
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
    updateUpgradeInfo("damageIcon", playerShip.weaponDamageIncrease);
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

function boundaryPush(){
	var temp = outOfBoundsList.head;
    while (temp != null) {
        var position = temp.stored.GetPosition();
		var body = temp.stored;
		if( position.x < 0){
			body.ApplyImpulse(new b2Vec2(-position.x*body.GetMass()/2, 0), body.GetWorldCenter());
		}
		if( position.x > width){
			body.ApplyImpulse(new b2Vec2((width-position.x)*body.GetMass()/2, 0), body.GetWorldCenter());
		}
		if( position.y < 0){
			body.ApplyImpulse(new b2Vec2(0, -position.y*body.GetMass()/2), body.GetWorldCenter());
		}
		if( position.y > height){
			body.ApplyImpulse(new b2Vec2(0, (height-position.y)*body.GetMass()/2), body.GetWorldCenter());
		}
        temp = temp.next;
    }
}

function tractorBeam(){
	var temp = playerShip.sensorList.head;
	var positionShip = playerShip.body.GetPosition();
    while (temp != null) {
		var body = temp.stored;
        var vec = vectorSubtraction(positionShip, body.GetPosition());
		body.ApplyImpulse(new b2Vec2(vec.x/16, vec.y/16), body.GetWorldCenter());
        temp = temp.next;
    }
}

function playerDeath()
{
    bgElement.pause();
    
    var divContainer = document.getElementById("container");
	divContainer.style.display = "none";
	
	var deathScreen = document.getElementById("deathScreen");
	deathScreen.style.display = "block";
}

function winScreen(){
    if(playerShip.crystals < 200){
        showInfo("Not enough resources");
    }
    else{
        var divContainer = document.getElementById("container");
        divContainer.style.display = "none";
        
        var deathScreen = document.getElementById("winScreen");
        deathScreen.style.display = "block";
    }
    
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
	
	bgElement.play();
}

function pauseGame()
{
	(gamePaused) ? gamePaused = false : gamePaused = true;
	var alertContainer = document.getElementById("alerts");
	if(gamePaused)
	{
		alerts.innerHTML = 'Game Paused';
		bgElement.pause();
	}else
	{
		alerts.innerHTML = ''; 
		document.getElementById('btnPause').blur(); //remove focus from button so hitting space or enter doesnt pause/unpause game
		bgElement.play();
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
    // hide current world button and unhide other worlds buttons
    var hide;
    var show;
    switch(currentWorld){
        case 1: hide = document.getElementById("world1");
                hide.style.display = "none";
                show = document.getElementById("world2");
                show.style.display = "block";
                show = document.getElementById("world3");
                show.style.display = "block";
                break;
        case 2: hide = document.getElementById("world2");
                hide.style.display = "none";
                show = document.getElementById("world1");
                show.style.display = "block";
                show = document.getElementById("world3");
                show.style.display = "block";
                break;
        case 3: hide = document.getElementById("world3");
                hide.style.display = "none";
                show = document.getElementById("world1");
                show.style.display = "block";
                show = document.getElementById("world2");
                show.style.display = "block";
                
                //and display "winning" button for last level...
                show = document.getElementById("win");
                show.style.display = "block";
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

//check to make sure player, enemies, crystals, asteroids are inside boundary
//rough code, linear update -- should be replaced with sensors that detect object leaving area
/*function checkWorldBoundary()
{
	
	keepInsideBoundary(playerShip);
	if(enemyList.head != null)
	{
		var temp = enemyList.head;
		while(temp.next != null )
		{
			keepInsideBoundary(temp.stored);
			temp = temp.next;
		}
		keepInsideBoundary(temp.stored);
	}
	if(asteroidList.head != null)
	{
		var temp = asteroidList.head;
		while(temp.next != null )
		{
			keepInsideBoundary(temp.stored);
			temp = temp.next;
		}
		keepInsideBoundary(temp.stored);
	}
	if(crystalList.head != null)
	{
		var temp = crystalList.head;
		while(temp.next != null )
		{
			keepInsideBoundary(temp.stored);
			temp = temp.next;
		}
		keepInsideBoundary(temp.stored);
	}
}*/

/*function keepInsideBoundary( pBody )
{
	var pushStrength = 0.6;
	var difference;
	var x = pBody.body.GetPosition().x;
	var y = pBody.body.GetwPosition().y;
	
	if(x < 0)
	{
		difference = -x;
		pBody.body.ApplyImpulse(new b2Vec2(difference * pushStrength,0), pBody.body.GetWorldCenter());
		
	}else
	if(x > worldWidth)
	{
		difference = x - worldWidth;
		pBody.body.ApplyImpulse(new b2Vec2(difference * -pushStrength,0), pBody.body.GetWorldCenter());
	}
	
	if(y < 0)
	{
		difference = -y;
		pBody.body.ApplyImpulse(new b2Vec2(0, difference * pushStrength), pBody.body.GetWorldCenter());
	}else
	if(y > worldHeight)
	{
		difference = y - worldHeight;
		pBody.body.ApplyImpulse(new b2Vec2(0,difference * -pushStrength), pBody.body.GetWorldCenter());
	}
}*/
