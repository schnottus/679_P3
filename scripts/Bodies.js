var ASTEROID =          0x0001;
var	PLAYER_SHIP =       0x0002;
var ENEMY_SHIP =       	0x0004;
var STATION =       	0x0008;
var PLAYER_BULLETS =	0x0010;
var ENEMY_BULLETS =		0x0020;

var NON_BULLETS =		0x000f;
var ENEMY_TARGETS =		0x001a;
var PLAYER_TARGETS =	0x002d;
var ALL =        		0x003f;

var listener = new Box2D.Dynamics.b2ContactListener;
listener.BeginContact = function (contact) {

    //the following line would tell you what two things are colliding
    //console.log(contact.GetFixtureA().GetBody().userData.ID + " " + contact.GetFixtureB().GetBody().userData.ID);	

    //right now I assigned 0's for bodies and 1's for sensors, and 2's for bullets
    //for now the bullets just announce that they hit something

	if (contact.GetFixtureA().GetUserData()==undefined || contact.GetFixtureB().GetUserData()==undefined){
	console.log("collision includes something that has no ID");
	}
	else if (contact.GetFixtureA().GetUserData() == 1) {
		contact.GetFixtureA().GetBody().userData.sensor[contact.GetFixtureB().GetBody().userData.ID] = contact.GetFixtureB().GetBody();
	}
	else if (contact.GetFixtureB().GetUserData() == 1) {
		contact.GetFixtureB().GetBody().userData.sensor[contact.GetFixtureA().GetBody().userData.ID] = contact.GetFixtureA().GetBody();
	}
	else if (contact.GetFixtureA().GetUserData() == 2) {
		destroyList.push(contact.GetFixtureA().GetBody().userData);
		destroyList.push(contact.GetFixtureB().GetBody().userData);
	}
	else if (contact.GetFixtureB().GetUserData() == 2) {
		destroyList.push(contact.GetFixtureA().GetBody().userData);
		destroyList.push(contact.GetFixtureB().GetBody().userData);
	}
	else if ((contact.GetFixtureA().GetUserData() == 3 && contact.GetFixtureB().GetUserData() == 4 )){
		contact.GetFixtureB().GetUserData().crystals ++;
		destroyList.push(contact.GetFixtureA().GetBody().userData);
	}
	else if (contact.GetFixtureA().GetUserData() == 4 && contact.GetFixtureB().GetUserData() == 3) {
		contact.GetFixtureA().GetUserData().crystals ++;
		destroyList.push(contact.GetFixtureB().GetBody().userData);
	}
}
listener.EndContact = function(contact) {
	if( contact.GetFixtureA().GetUserData() == 1){
		delete contact.GetFixtureA().GetBody().userData.sensor[(contact.GetFixtureB().GetBody().userData.ID)];
	}
	if(contact.GetFixtureB().GetUserData() == 1){
		delete contact.GetFixtureB().GetBody().userData.sensor[(contact.GetFixtureA().GetBody().userData.ID)];
	}
}
listener.PostSolve = function(contact, impulse) {
	
}
listener.PreSolve = function(contact, oldManifold) {

}
this.world.SetContactListener(listener);


	
function makeAsteroidBody(x, y, asteroid) {
    var AsteroidBodyDef = new b2BodyDef;
    AsteroidBodyDef.type = b2Body.b2_dynamicBody;
    AsteroidBodyDef.position.Set(x, y);
    var body = world.CreateBody(AsteroidBodyDef);
    var AsteroidFixDef = new b2FixtureDef;
    AsteroidFixDef.shape = new b2CircleShape(1.0);
    AsteroidFixDef.density = 1.0;
    AsteroidFixDef.friction = 0.5;
    AsteroidFixDef.restitution = 0.1;
	AsteroidFixDef.userData = 0;
	AsteroidFixDef.filter.categoryBits = ASTEROID;
	AsteroidFixDef.filter.maskBits = ALL;
    body.CreateFixture(AsteroidFixDef);
	body.userData = asteroid;
	randomImpulse(body, 4);
    return body;
}

function makeCrystalBody(x, y, crystal) {
	x += Math.random();
	y += Math.random();
    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(x, y);
    var body = world.CreateBody(bodyDef);
    var fixDef = new b2FixtureDef;
    fixDef.shape = new b2CircleShape(.2);
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.1;
	fixDef.userData = 3;
	fixDef.filter.categoryBits = ASTEROID;
	fixDef.filter.maskBits = NON_BULLETS;
    body.CreateFixture(fixDef);
	body.userData = crystal;
	randomImpulse(body, .5);
    return body;
}

function makeTankBody(x, y, tank) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
//    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
//	fixDef.shape.SetAsBox(0.7, 0.7);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
	fixDef.shape = new b2CircleShape(1);
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 0;
	fixDef.filter.categoryBits = ENEMY_SHIP;
	fixDef.filter.maskBits = ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	
    var fixDef = new b2FixtureDef;
	fixDef.shape = new b2CircleShape(2);
	fixDef.isSensor = true;
	fixDef.userData = 1;
    body.CreateFixture(fixDef);
	body.userData = tank;
    return body;
}

function makePlayerBody(player) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = 5;  //add a starting position to the body
    bodyDef.position.y = 5;
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2CircleShape(1.5);  //make that fixture a polygon
    fixDef.density = 0.2; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 4;
	fixDef.filter.categoryBits = PLAYER_SHIP;
	fixDef.filter.maskBits = ALL;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	body.userData = player;
    return body;
}

//parameters: owner - the b2Body that fired the bullet
function makeBulletBody(owner, bullet) {

	//var x = owner.getPosX();
	//var y = owner.getPosY();
	var angle = owner.body.GetAngle();
	var thrustX = Math.cos( angle );
	var thrustY = Math.sin( angle );
	
	var bodyDef = new b2BodyDef; 
    bodyDef.type = b2Body.b2_dynamicBody;  
    bodyDef.position.x = owner.getPosX();
    bodyDef.position.y = owner.getPosY();
	bodyDef.angle = angle;
    var body = world.CreateBody(bodyDef);  
    var fixDef = new b2FixtureDef; 
    fixDef.shape = new b2CircleShape(0.1);
    fixDef.density = 1.0; 
	fixDef.userData = 2;
	fixDef.filter.categoryBits = PLAYER_BULLETS;
	fixDef.filter.maskBits = PLAYER_TARGETS;
    body.CreateFixture(fixDef); 
	body.ApplyImpulse(new b2Vec2(thrustX,thrustY), body.GetWorldCenter());
	body.userData = bullet;
    return body;
}

function makeStationBody(station) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_staticBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = 10;  //add a starting position to the body
    bodyDef.position.y = 10;
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
	fixDef.shape = new b2CircleShape(4); //make that fixture a polygon
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 3;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	body.userData = station;
    return body;
}

function randomImpulse(body, scale){
	body.ApplyImpulse(new b2Vec2((Math.random() - .5)*scale, (Math.random() - .5)*scale), body.GetWorldCenter());
}
