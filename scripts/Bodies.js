
var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
		//right now I assigned 0's for bodies and 1's for sensors
		if( contact.GetFixtureA().GetUserData() == 1){
			console.log("object entered enemy sensor");
		}
        if(contact.GetFixtureB().GetUserData() == 1){
			console.log("object entered enemy sensor");
		}
    }
    listener.EndContact = function(contact) {
        if( contact.GetFixtureA().GetUserData() == 1){
			console.log("object left enemy sensor");
		}
        if(contact.GetFixtureB().GetUserData() == 1){
			console.log("object left enemy sensor");
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
    AsteroidFixDef.shape = new b2CircleShape(0.5);
    AsteroidFixDef.density = 1.0;
    AsteroidFixDef.friction = 0.5;
    AsteroidFixDef.restitution = 0.1;
	AsteroidFixDef.userData = 0;
    body.CreateFixture(AsteroidFixDef);
	body.userData = asteroid;
    return body;
}

function makeTankBody(x, y) {
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
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
	
    var fixDef = new b2FixtureDef;
	fixDef.shape = new b2CircleShape(2);
	fixDef.isSensor = true;
	fixDef.userData = 1;
    body.CreateFixture(fixDef);
    return body;
}

function makePlayerBody() {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = 5;  //add a starting position to the body
    bodyDef.position.y = 5;
	//bodyDef.fixedRotation = true;  //body can collide but no rotation is imparted upon it
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
    fixDef.shape.SetAsBox(0.3, 1);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
	fixDef.userData = 0;
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
    return body;
}

//parameters: owner - the b2Body that fired the bullet
function makeBulletBody(owner) {

	var x = owner.getPosX();
	var y = owner.getPosY();
	var angle = owner.body.GetAngle();
	var thrustX = Math.cos( angle );
	var thrustY = Math.sin( angle );
	
	var bodyDef = new b2BodyDef; 
    bodyDef.type = b2Body.b2_dynamicBody;  
    bodyDef.position.x = x + thrustX;  //add thrustX,Y to offset bullet a little ahead of owner
    bodyDef.position.y = y + thrustY;
	bodyDef.angle = angle;
    var body = world.CreateBody(bodyDef);  
    var fixDef = new b2FixtureDef; 
    fixDef.shape = new b2CircleShape(0.1);
    fixDef.density = 1.0; 
	fixDef.userData = 0;
    body.CreateFixture(fixDef); 
	body.ApplyImpulse(new b2Vec2(thrustX,thrustY), body.GetWorldCenter());
    return body;
}