/******************
* File: Init.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*
* Purpose:
*******************/

/*TODO
-fix world step to check the time difference caused by requestAnimationFrame
- move player creation to appropriate file
- make function calls to control player (edit keyboard eventListener)
- add draw functions to draw asteroids and player in three.js window
- make window resizeable (fit to screen)
*/
	
function init() {
	//had to break init into pre loadingLoop and post loadingLoop
	new THREE.JSONLoader().load('mesh/asteroid2.js', function (geometry) {
		geometries.asteroid = geometry;
	}, 'mesh/images');
	new THREE.JSONLoader().load('mesh/ship.js', function (geometry) {
		geometries.player = geometry;
	}, 'mesh/images');
	new THREE.JSONLoader().load('mesh/station.js', function (geometry) {
		geometries.station = geometry;
	}, 'mesh/images');
	new THREE.JSONLoader().load('mesh/portal.js', function (geometry) {
        geometries.warpGate = geometry;
    }, 'mesh/images');
	new THREE.JSONLoader().load('mesh/crystal_purple.js', function (geometry) {
		geometries.crystal = geometry;
	}, 'mesh/images');
    new THREE.JSONLoader().load('mesh/soldier.js', function (geometry) {
        geometries.soldier = geometry;
    }, 'mesh/images');
    new THREE.JSONLoader().load('mesh/scout.js', function (geometry) {
        geometries.scout = geometry;
    }, 'mesh/images');
    new THREE.JSONLoader().load('mesh/tank.js', function (geometry) {
        geometries.tank = geometry;
    }, 'mesh/images');
	//load all other models here too, and all things that dont require models
	loadingLoop(); //checks if models are loaded before continuing (and animates a loading screen)
}

function init2() {
	
    playerShip = makePlayer();
	loadLevel(currentWorld);
	
	bgElement = document.getElementById('bgSound');
/***Three.js Setup***/
//check to make sure webGL is available, if not populate message div with message
	//TODO: modify standard message?
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	
	// get the DOM element to attach to
	container = document.getElementById('container');
	// start the renderera
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.autoClear = false;
	// attach the render-supplied DOM element
	container.style.display = "none"; //do not display it (yet)
	container.appendChild(renderer.domElement);
	renderer.setClearColorHex( 0x000000, 1 );


	
	//camera attributes
	var	ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	NEAR = 0.01,
	FAR = 5500;
	
	//create camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	//rotate camera view to match box2d coordinate system ( x:0 and y:0 in upper left)
	//with this rotation positive z axis is going away from the camera
	//camera.rotation.x = d2r(180);
	camera.rotation.z = d2r(0);
	camera.updateMatrix();
	
	camera.aspect =  (SCREEN_WIDTH) / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

			
	// create a light
	var light = new THREE.PointLight(0xffffff);
	light.position.set(100,-10,-150);
	scene.add(light);
	
	// create a set of coordinate axes to help orient developer
	// change size by setting scale
	//var axes = new THREE.AxisHelper();
	//axes.scale.set( 0.1, 0.1, 0.1 );
	//scene.add( axes );
	
	
//three.js events  (from stemkoski viewport-dual example)
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	
	
/***Controls***/

	//player controls
	var leftInterval;
	var rightInterval;
	var forwardInterval;
	var reverseInterval;
	var strafeLInterval;
	var strafeRInterval;
	var intervalSpeed = 50;  //milliseconds between each call
	var firstWKey = true;
	var firstAKey = true;
	var firstSKey = true;
	var firstDKey = true;
	var firstQKey = true;
	var firstEKey = true;
	//var firstShotPress = true;
	
	//left click firing
	container.onmousedown=function(event){
			
		switch (event.which) {
        case 1:
			if(canShoot)
			{
				canShoot = false;
				shootDisabler = false;
				playerShoot1();
				shootInterval = setInterval('playerShoot1()', 250);  //200ms between bullets
			}
            break;
  
        case 3:
            if(canScatter && playerShip.gunEnabled) //scatter gun 
			{
				nextIsScatter = true;
				canScatter = false;
				setTimeout('playerShoot2()', 1200);  //400ms between bullets
			} 
            break;
        default:
		}
			
	};
		
	container.onmouseup=function(event){
		switch (event.which){
		case 1:
			shootDisabler = true;
			break;
		default:
		
		}
	}
	
	//Add event listeners for our controls
	document.addEventListener("keydown", function(e) {
		switch(e.keyCode)
		{
			case 87: //w
				//forward thrust
				if(firstWKey)
				{
					//thrustplayer(direction, amount)
					forwardInterval = setInterval('thrustPlayer(1, playerThrustForce)', intervalSpeed);
				}
				firstWKey = false;
				break;
			case 83: //s
				//reverse thrust
				if(firstSKey)
				{
					reverseInterval = setInterval('thrustPlayer(0, playerThrustForce)', intervalSpeed);
				}
				firstSKey = false;
				break;
			case 65: //a
				//strafe left
				if(firstQKey && playerShip.strafeEnabled)
				{
					strafeLInterval = setInterval('thrustPlayer(2, playerStrafeForce)', intervalSpeed);
				}
				firstQKey = false;
				
				//rotate left
				/*if(firstAKey)
				{
					leftInterval = setInterval('rotatePlayer(0,playerRotateForce)', intervalSpeed);
				}
				firstAKey = false;
				dampPlayerRotation = false;*/
				break;
			case 68: //d
				//strafe right
				if(firstEKey && playerShip.strafeEnabled)
				{
					strafeRInterval = setInterval('thrustPlayer(3, playerStrafeForce)', intervalSpeed);
				}
				firstEKey = false;
				
				//rotate right
				/*if(firstDKey)
				{
					rightInterval = setInterval('rotatePlayer(1,playerRotateForce)', intervalSpeed);
				}
				firstDKey = false;
				dampPlayerRotation = false;*/
				break;
			case 81: //q
				
				break;
			case 69: //e
			
				break;
			case 49: //1
				//temporarily used to switch levels
				//destroyLevel();
				//loadLevel(1);
				
				break;
			case 50: //2
				//destroyLevel();
				//loadLevel(2);
				break;
			case 51: //3
				//destroyLevel();
				//loadLevel(3);
				playerShip.crystals += 40;
				//if(playerShip.missilesEnabled) playerShip.currentWeapon = 3;
				break;
			case 40: //down arrow
				var angle = playerShip.body.GetAngle();
				var thrustX = Math.cos( angle ); 
				var thrustY = Math.sin( angle );
				playerShip.body.ApplyImpulse(new b2Vec2(-thrustX,-thrustY), playerShip.body.GetWorldCenter());
				break;
			case 38: //up arrow
				var angle = playerShip.body.GetAngle();
				var thrustX = Math.cos( angle );
				var thrustY = Math.sin( angle );
				playerShip.body.ApplyImpulse(new b2Vec2(thrustX,thrustY), playerShip.body.GetWorldCenter());
			break;
			case 32: //space bar
						
				break;
			case 84: //t
				//toggle debug draw div
				var element = document.getElementById("debugDraw");
				element.style.display = (element.style.display != 'none' ? 'none' : '' );
				element = document.getElementById("stats");
				element.style.display = (element.style.display != 'none' ? 'none' : '' );
				break;
			case 90: //z
			    //pop up menus when key is pressed
			    if(atGate) 
                    levelMenu();
                if(playerDocked)
                    purchaseMenu();
                alerts.innerHTML = "";
			    break;
			case 82: //r
			    if(atGate || playerDocked){
                    gamePaused = false;
                    alerts.innerHTML = "";
                    resume();
                        
			        }
			    // else if(!atGate || !playerDocked){
// 			        
// 			    }
			    break;
			default:
		}
				
    }, true);
	
	document.addEventListener("keyup", function(e) {
		switch(e.keyCode)
		{
			case 87: //w
				//end forward thrust
				clearInterval(forwardInterval);
				firstWKey = true;
				break;
			case 83: //s
				//end reverse thrust
				clearInterval(reverseInterval);
				firstSKey = true;
				break;
			case 65: //a
				//end strafe left
				clearInterval(strafeLInterval);
				firstQKey = true;
				
				//end rotate left
				/*clearInterval(leftInterval);
				firstAKey = true;
				dampPlayerRotation = true;*/
				break;
			case 68: //d
				//end strafe right
				clearInterval(strafeRInterval);
				firstEKey = true;
				
				//end rotate right
				/*clearInterval(rightInterval);
				firstDKey = true;
				dampPlayerRotation = true;*/
				break;
			case 81: //q
				
				break;
			case 69: //e
				
				break;
			case 32: //space bar
				
				break;
			default:
		}
    }, true);
    
//mouse movement
	document.onmousemove = getMousePosition;
	
// framerate stats
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	var statsDiv = document.getElementById('statsDiv');
	statsDiv.appendChild(stats.domElement);
	
	
//hackery to take care of asyncronous image loading
	/*var allImagesLoaded = false;
	while(!allImagesLoaded)
	{
		var hudImg = new Image();   // Create new img element
		hudImg.onload = function(){
		// execute drawImage statements here
		};
		hudImg.src = '/resources/hudImage.png';
	
		//pause button image
		
	}*/
	
	
	//enable start button which calls startGame() and thus, animate();
	//do not add any code below this button enable line (won't always get run)
	
	setTimeout("allowStart()", 2500);
	
	
}

function allowStart()
{
	document.getElementById("btnStart").disabled = false; 
}

//checks if models are loaded before continuing (and animates a loading screen)
function loadingLoop(){
	var finishedLoading = false;
	var frame = null;
	function internalLoadLoop() {
	    finishedLoading = true;
	    if (geometries.asteroid == null) {
	        finishedLoading = false;
	    }
	    if (geometries.player == null) {
	        finishedLoading = false;
	    }
	    if (geometries.station == null) {
	        finishedLoading = false;
	    }
		if (geometries.warpGate == null) {
	        finishedLoading = false;
	    }
	    if (geometries.crystal == null) {
	        finishedLoading = false;
	    }
	    if (geometries.soldier == null) {
	        finishedLoading = false;
	    }
	    if (geometries.scout == null) {
	        finishedLoading = false;
	    }
	    if (geometries.tank == null) {
	        finishedLoading = false;
	    }
		
		//render loading screen here
		 if (finishedLoading){ //this is how the loading loop exits
			window.cancelAnimationFrame(frame);
			init2();
		}
		else{
			frame = requestAnimationFrame( internalLoadLoop );
		}
	}
	internalLoadLoop();
}

function getMousePosition(e)
{
	mouseX = e.clientX;
	mouseY = e.clientY;
	//alert("X: " + mouseX + "  Y: " + mouseY );
}