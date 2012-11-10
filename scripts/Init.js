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
    world = new b2World(
				new b2Vec2(0, 0),    //gravity
				true                 //allow sleep
			);
			
			
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
			
	The following code walks though the creation of a rectangle player ship	*/
	
	var bodyDef = new b2BodyDef; //create a body Definition
	bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
	bodyDef.position.x = 5;  //add a starting position to the body
	bodyDef.position.y = 5;	
	playerShip = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
	var fixDef = new b2FixtureDef;	//create a fixture (something to collide with)
	fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
	fixDef.shape.SetAsBox( 0.3, 1 );  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
	fixDef.density = 1.0; //how dense is our player ship
	fixDef.friction = 0.5;	//how much friction does its surface have
	fixDef.restitution = 0.3;	//how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	playerShip.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	
	
	//create a hard boundary so that objects don't escape the screen
	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.1;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(20, 2);
	bodyDef.position.Set(10, 400 / 30 + 1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(10, -1.8);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	fixDef.shape.SetAsBox(2, 14);
	bodyDef.position.Set(-1.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(21.8, 13);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	
	
	//create some asteroids
	bodyDef.type = b2Body.b2_dynamicBody;
	for(var i = 0; i < 10; ++i) 
	{
		fixDef.shape = new b2CircleShape( 0.5 ); //b2CircleShape( radius )
		bodyDef.position.x = Math.random() * 10;
		bodyDef.position.y = Math.random() * 10;
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}
	
	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(30.0);
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
	scene = new THREE.Scene();
	
	//camera attributes
	var	ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
	NEAR = 0.01,
	FAR = 5500;
	
	//create camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	//rotate camera view to match box2d coordinate system ( x:0 and y:0 in upper left)
	//with this rotation positive z axis is going away from the camera
	camera.rotation.x = d2r(180);
	camera.rotation.z = d2r(0);
	camera.updateMatrix();
	
	camera.aspect =  (0.7 * SCREEN_WIDTH) / SCREEN_HEIGHT;
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
	
	
/***Controls***/

//Add event listeners for our controls
	document.addEventListener("keydown", function(e) {
		switch(e.keyCode)
		{
			case 87: //w
				//forward thrust
				//to be fixed - just applies force
				playerShip.ApplyImpulse(new b2Vec2(0,-5), playerShip.GetWorldCenter());
				break;
			case 83: //s
				//slow down (reverse thrust)
				playerShip.ApplyImpulse(new b2Vec2(0, 5), playerShip.GetWorldCenter());
				break;
			case 65: //a
				//rotate left
				playerShip.ApplyImpulse(new b2Vec2(-5, 0), playerShip.GetWorldCenter());
				break;
			case 68: //d
				//rotate right
				playerShip.ApplyImpulse(new b2Vec2(5, 0), playerShip.GetWorldCenter());
				break;
			case 32: //space bar
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