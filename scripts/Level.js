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

	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));

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
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;


	enemyList.add(makeEnemy(1, 40, 20));
	enemyList.add(makeEnemy(1, 50, 30));
	
	//add asteroids
	for(var i = 0; i < 30; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	//load background image and sprites
	background1(width, height);
}

function level2()
{
	
	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));
	
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
	var debugDraw = new b2DebugDraw();3
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		//debug draw div is 600x400, calculate draw scale and fill to width
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;
	
	
	enemyList.add(makeEnemy(1, 40, 20));
	enemyList.add(makeEnemy(1, 50, 30));
	enemyList.add(makeEnemy(0, 70, 30));
    enemyList.add(makeEnemy(0, 80, 40));
	
	//add asteroids
	for(var i = 0; i < 50; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	//load background image and sprites
	background2(width, height);
}
 
function level3() 
{

	playerShip.body.SetPosition(new b2Vec2( 10, 10 ));
	
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
		debugDraw.SetDrawScale(300.0 / width);  //smaller scale "zooms out"
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
	
	homeStation = makeStation(10, height / 2);
	portal = makeWarpGate(width - 10, height / 2);
	portal.mesh.position.z = 2;
	
	enemyList.add(makeEnemy(1, 40, 20));
	enemyList.add(makeEnemy(1, 50, 30));
	enemyList.add(makeEnemy(0, 70, 30));
    enemyList.add(makeEnemy(0, 80, 40));
	enemyList.add(makeEnemy(2, 140, 90));
	
	
	
	//add asteroids
	for(var i = 0; i < 60; ++i) 
	{
	    asteroidList.add(makeAsteroid(Math.random() * width, Math.random() * height));
	}
	
	//load background image and sprites
	background3(width, height);
}

function destroyLevel()
{
	//delete current level
	asteroidList.empty();    
	enemyList.empty();
	crystalList.empty();
	bulletList.empty();
	homeStation.clean();
	//empty destroy list?
	portal.clean();
	//delete background sprites
	background.remove(spriteGroup);
	
	
	//empty box2d world of remaining hard boundaries
	world.DestroyBody(leftWall);
	world.DestroyBody(rightWall);
	world.DestroyBody(topWall);
	world.DestroyBody(bottomWall);
}