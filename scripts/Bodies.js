

function makeAsteroidBody(x, y) {
    var AsteroidFixDef = new b2FixtureDef;
    AsteroidFixDef.density = 1.0;
    AsteroidFixDef.friction = 0.5;
    AsteroidFixDef.restitution = 0.1;
    var AsteroidBodyDef = new b2BodyDef;
    AsteroidBodyDef.type = b2Body.b2_dynamicBody;
    AsteroidFixDef.shape = new b2CircleShape(0.5);
    AsteroidBodyDef.position.Set(x, y);
    return world.CreateBody(AsteroidBodyDef).CreateFixture(AsteroidFixDef);
}

function makeTankBody(x, y) {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = x;  //add a starting position to the body
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
    fixDef.shape.SetAsBox(0.7, 0.7);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
    return body;
}

function makePlayerBody() {
    var bodyDef = new b2BodyDef; //create a body Definition
    bodyDef.type = b2Body.b2_dynamicBody;  //set bodyDef to dynamic since this ship will move, we could do static if it doesn't move, or kinematic if it has a predefined movement
    bodyDef.position.x = 5;  //add a starting position to the body
    bodyDef.position.y = 5;
    var body = world.CreateBody(bodyDef);  //add this b2Body to the world and save a reference to it in playerShip
    var fixDef = new b2FixtureDef; //create a fixture (something to collide with)
    fixDef.shape = new b2PolygonShape;  //make that fixture a polygon
    fixDef.shape.SetAsBox(0.3, 1);  //makes a box, takes parameters( halfWidth, halfHeight ), this means the box will be 0.6 wide and 2 meters high
    fixDef.density = 1.0; //how dense is our player ship
    fixDef.friction = 0.5; //how much friction does its surface have
    fixDef.restitution = 0.3; //how much will it bounce when it hits things (from 0 to 1 -> 0 being no bounce)
    body.CreateFixture(fixDef); //add the fixture to the playerShip body.  We could add multiple fixtures here for complicated ships
    return body;
}