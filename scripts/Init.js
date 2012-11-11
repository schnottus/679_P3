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

/***Box2d setup***/
	//create a world with 0 gravity
   // world = new b2World(
	//			new b2Vec2(0, 0),    //gravity
	//			true                 //allow sleep
    //		);
    //initialized in global because it made stuff compile without undefined world errors in Bodies.js
			
			
	/* An overview of bodies:
		Bodies contain:
			-Fixtures
			-A position
			-Angle
			-Type (static, dynamic, kinematic)
		Fixtures contain:
			-Density
			-Friction
			-Shape
			-Collision control
	(there are many more properties bodies and fixtures contain - i listed the important ones)
	*/
	
    playerShip = makePlayer();

    enemyList.push(makeEnemy(0, 7, 7));
	
	//create a hard boundary so that objects don't escape the screen
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(20, 0.1);
	bodyDef.position.Set(0, 0);
	world.CreateBody(bodyDef).CreateFixture(fixDef); //top wall
	bodyDef.position.Set(0, 400/30);
	world.CreateBody(bodyDef).CreateFixture(fixDef); //bottom wall
	fixDef.shape.SetAsBox(0.1, 400/30);
	bodyDef.position.Set(0, 0);
	world.CreateBody(bodyDef).CreateFixture(fixDef); //left wall
	bodyDef.position.Set(20, 0);
	world.CreateBody(bodyDef).CreateFixture(fixDef); //right
	
	
	
	//create some asteroids
	//bodyDef.type = b2Body.b2_dynamicBody;
	for(var i = 0; i < 10; ++i) 
	{
	    asteroidList.push(makeAsteroid(Math.random() * 10, Math.random() * 10));
	}
	
	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(30.0);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	
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
	container.appendChild(renderer.domElement);
	renderer.setClearColorHex( 0x000000, 1 );
	renderer.autoClear = false;

	//create scene
	//scene = new THREE.Scene();
	
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

//Add event listeners for our controls
	document.addEventListener("keydown", function(e) {
		switch(e.keyCode)
		{
			case 87: //w
				//forward thrust
				//to be fixed - just applies force
				playerShip.body.ApplyImpulse(new b2Vec2(0,-5), playerShip.body.GetWorldCenter());
				break;
			case 83: //s
				//slow down (reverse thrust)
				playerShip.body.ApplyImpulse(new b2Vec2(0, 5), playerShip.body.GetWorldCenter());
				break;
			case 65: //a
				//rotate left
				playerShip.body.ApplyImpulse(new b2Vec2(-5, 0), playerShip.body.GetWorldCenter());
				break;
			case 68: //d
				//rotate right
				playerShip.body.ApplyImpulse(new b2Vec2(5, 0), playerShip.body.GetWorldCenter());
				break;
			case 32: //space bar
				//fire? or click mouse to fire? or both?
				break;
			case 84: //t
				//toggle debug draw div
				var element = document.getElementById("debugDraw");
				element.style.display = (element.style.display != 'none' ? 'none' : '' );
				break;
			default:
		}
    }, true);
	
	document.addEventListener("keyup", function(e) {
		switch(e.keyCode)
		{
			case 32: //space bar
				
				break;
			default:
		}
    }, true);
	
	//enter game loop to start the game
	animate();
	
	//update
	function update() {	
	
		world.Step(1 / 60, 10, 10);  //if using getAnimationFrame fix to account for variable framerate
		world.DrawDebugData();
		world.ClearForces();
	};
	
	
};