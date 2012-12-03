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
	
    
	loadLevel(1);
	
	
/***Three.js Setup***/
//check to make sure webGL is available, if not populate message div with message
	//TODO: modify standard message?
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	
	// get the DOM element to attach to
	container = document.getElementById('container');
	// start the renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	// attach the render-supplied DOM element
	container.style.display = "none"; //do not display it (yet)
	container.appendChild(renderer.domElement);
	renderer.setClearColorHex( 0x000000, 1 );
	renderer.autoClear = false;

	
	//camera attributes
	var	ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	NEAR = 0.01,
	FAR = 5500;
	
	//create camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
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
	var axes = new THREE.AxisHelper();
	axes.scale.set( 0.1, 0.1, 0.1 );
	scene.add( axes );
	
	
//three.js events  (from stemkoski viewport-dual example)
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	
	
/***Controls***/

	//player controls
	var leftInterval;
	var rightInterval;
	var forwardInterval;
	var reverseInterval;
	var shootInterval;
	var intervalSpeed = 50;  //milliseconds between each call
	var firstWKey = true;
	var firstAKey = true;
	var firstSKey = true;
	var firstDKey = true;
	var firstShotPress = true;
	
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
				//rotate left
				if(firstAKey)
				{
					leftInterval = setInterval('rotatePlayer(0,playerRotateForce)', intervalSpeed);
				}
				firstAKey = false;
				dampPlayerRotation = false;
				break;
			case 68: //d
				//rotate right
				if(firstDKey)
				{
					rightInterval = setInterval('rotatePlayer(1,playerRotateForce)', intervalSpeed);
				}
				firstDKey = false;
				dampPlayerRotation = false;
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
				//fire (used temporarily - change to mouse?)
				if(firstShotPress)
				{
					shootInterval = setInterval('playerShoot(1)', 100);  //100ms between bullets
				} 
				firstShotPress = false;
				
				
				
				//asteroidList.empty();
				
				break;
			case 84: //t
				//toggle debug draw div
				var element = document.getElementById("debugDraw");
				element.style.display = (element.style.display != 'none' ? 'none' : '' );
				element = document.getElementById("stats");
				element.style.display = (element.style.display != 'none' ? 'none' : '' );
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
				//end rotate left
				clearInterval(leftInterval);
				firstAKey = true;
				dampPlayerRotation = true;
				break;
			case 68: //d
				//end rotate right
				clearInterval(rightInterval);
				firstDKey = true;
				dampPlayerRotation = true;
				break;
			case 32: //space bar
				clearInterval(shootInterval);
				firstShotPress = true;
				//if(!(player.firstShotFired))
				
					//alert(playerShip.firstShotFired);
					bulletList.add(makeBullet( playerShip, 0, 10, 10));
					playerShip.firstShotFired = false;
				
				break;
			default:
		}
    }, true);
	
// framerate stats
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	var statsDiv = document.getElementById('statsDiv');
	statsDiv.appendChild(stats.domElement);
	
	//enable start button which calls startGame() and thus, animate();
	//do not add any code below this button enable line (won't always get run)
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
		frame = requestAnimationFrame( internalLoadLoop );
		//render loading screen here
		 if (finishedLoading){ //this is how the loading loop exits
			window.cancelAnimationFrame(frame);
			init2();
		}
	}
	internalLoadLoop();
}