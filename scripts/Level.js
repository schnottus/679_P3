/******************
* File: Level.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*******************/



//all level setters, getters, creation, etc
function loadLevel( level )
{
	
	//update current level var
	currentWorld = level;
	
	//load new level
	switch(level)
		{
			case 1: 
				level1();
				break;
			case 2: 
				level2();
				break;
			case 3:
				level3();
				break;
			default:
			alert("Invalid level number - defaulted to 1");
			level1();
		}
}

function level1()
{

	var width = 60;
	var height = 40;

	//create a hard boundary so that objects don't escape the screen

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width, 0.1);
	bodyDef.position.Set(0, 0);
	topWall = world.CreateBody(bodyDef);
	topWall.CreateFixture(fixDef); //top wall
	bodyDef.position.Set(0, height);
	bottomWall = world.CreateBody(bodyDef);
	bottomWall.CreateFixture(fixDef); //bottom wall
	fixDef.shape.SetAsBox(0.1, height);
	bodyDef.position.Set(0, 0);
	leftWall = world.CreateBody(bodyDef);
	leftWall.CreateFixture(fixDef); //left wall
	bodyDef.position.Set(width, 0);
	rightWall = world.CreateBody(bodyDef);
	rightWall.CreateFixture(fixDef); //right

	//debug draw div is 600x400, set draw scale using width
	
	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(600.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);

	enemyList.add(makeEnemy(0, 13, 14));
	enemyList.add(makeEnemy(1, 15, 17));
    enemyList.add(makeEnemy(2, 17, 13));
	
	//add asteroids
	for(var i = 0; i < 50; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	//simple background image (changed to a tileable + less noise backgrd, easier for expansion of plane)
	var floorTexture = new THREE.ImageUtils.loadTexture( 'resources/space2.jpg' ); 
	floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.repeat.set(5, 5);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(width * 20, height * 20, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);    
	floor.position.z = 400.0;
	floor.doubleSided = true;
	scene.add(floor);
	
	//testing sprites
	var mapA = THREE.ImageUtils.loadTexture( "resources/blue_nebula.png" );
	var mapB = THREE.ImageUtils.loadTexture( "resources/earth.png" );
	
    var group = new THREE.Object3D();

    var sprite = new THREE.Sprite( { map: mapA, useScreenCoordinates: false} );
    var sprite2 = new THREE.Sprite( { map: mapB, useScreenCoordinates: false} );

    sprite.position.set( Math.random(),
                         Math.random(),
                         100.0 );
    sprite2.position.set(300,
                         100,
                         350.0 );
    
        
    //sprite.position.normalize();
    //sprite.position.multiplyScalar( 100 );

    group.add( sprite );
    group.add( sprite2 );

    scene.add( group );
	
}

function level2()
{
	var width = 120;
	var height = 80;

	//create a hard boundary so that objects don't escape the screen

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width, 0.1);
	bodyDef.position.Set(0, 0);
	topWall = world.CreateBody(bodyDef);
	topWall.CreateFixture(fixDef); //top wall
	bodyDef.position.Set(0, height);
	bottomWall = world.CreateBody(bodyDef);
	bottomWall.CreateFixture(fixDef); //bottom wall
	fixDef.shape.SetAsBox(0.1, height);
	bodyDef.position.Set(0, 0);
	leftWall = world.CreateBody(bodyDef);
	leftWall.CreateFixture(fixDef); //left wall
	bodyDef.position.Set(width, 0);
	rightWall = world.CreateBody(bodyDef);
	rightWall.CreateFixture(fixDef); //right

	//debug draw div is 600x400, set draw scale using width
	
	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(600.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);

    enemyList.add(makeEnemy(0, 7, 7));
	
	//add asteroids
	for(var i = 0; i < 50; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	//simple background image
	var floorTexture = new THREE.ImageUtils.loadTexture( 'resources/space1.jpg' );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(height , width, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);
	floor.position.z = 500.0;
	floor.doubleSided = true;
	scene.add(floor);
}
 
function level3() 
{
	var width = 150;
	var height = 100;

	//create a hard boundary so that objects don't escape the screen

	var fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;  //staticBody (never moves)
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(width, 0.1);
	bodyDef.position.Set(0, 0);
	topWall = world.CreateBody(bodyDef);
	topWall.CreateFixture(fixDef); //top wall
	bodyDef.position.Set(0, height);
	bottomWall = world.CreateBody(bodyDef);
	bottomWall.CreateFixture(fixDef); //bottom wall
	fixDef.shape.SetAsBox(0.1, height);
	bodyDef.position.Set(0, 0);
	leftWall = world.CreateBody(bodyDef);
	leftWall.CreateFixture(fixDef); //left wall
	bodyDef.position.Set(width, 0);
	rightWall = world.CreateBody(bodyDef);
	rightWall.CreateFixture(fixDef); //right

	//debug draw div is 600x400, set draw scale using width
	
	//setup debug draw
	var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(600.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);

    enemyList.add(makeEnemy(0, 7, 7));
	
	//add asteroids
	for(var i = 0; i < 60; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	
}

function destroyLevel()
{
	//delete current level
	asteroidList.empty();    
	enemyList.empty();
	crystalList.empty();
	bulletList.empty();
	homeStation.destroy();
	//empty destroy list?
	//delete warp gate
	//delete background sprites
	
	//empty box2d world of bodies (remaining hard boundaries)
	world.DestroyBody(leftWall);
	world.DestroyBody(rightWall);
	world.DestroyBody(topWall);
	world.DestroyBody(bottomWall);
}