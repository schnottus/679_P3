//Some notes on the code below:
//this is a skeleton of what I would like to do with object construction
//the objects will eventually be put in different files based on types
//but for now it is small enough that I would like to keep it all together,
//at least until it is a little more filled in (because a lot of similar stuff
//has to be added to all of it.

//destruction simple requires removing all pointers to the objects that the make_____()
//functions return, there is no internal storage objects yet


// Sorry if my descriptions are confusing but I compare prototyping to molding
// and casting, as in the metalworking terms.  A mold is used to make copies,
// where a casting is the copy produced (just in case someone didn't know those terms).

//-------------------------------------------------------------------------------------
//Prototyping Helper (adds variables, useful in adding to a casting to make a new mold)
//-------------------------------------------------------------------------------------
function extend(obj, properties) {
    for (givenProperty in properties) {
        if (properties.hasOwnProperty(givenProperty)) {
            obj[givenProperty] = properties[givenProperty];
        }
    }
}

//---------------------------------------------------------------------------
// Molds for prototyping and inheritance (sets standards for a type of thing)
//---------------------------------------------------------------------------

//Entity mold
var Entity = {
    body: null, //null placeholder for functions to work
    mesh: null,
	meterial : null,
	ID : null,
	node : null,
	maxHP: 1,
	currentHP: 1,
    radius: 2,
    updateMesh: function () {
        var position = this.body.GetPosition();
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
		this.mesh.rotation.z = this.body.GetAngle();
    },
	isAwake: function() {
		return this.body.IsAwake();
	},
    getPosition: function () {
        return this.body.GetPosition();
    },
    getPosX: function () {
        return this.body.GetPosition().x;
    },
    getPosY: function () {
        return this.body.GetPosition().y;
    },
	damage: function (amount){
		this.currentHP -= amount;
		if (this.currentHP <= 0){
			destroyList.push(this);
		}
	},
    destroy: function () {
        this.clean();
    },
	clean: function () {
		console.log("something was removed")
	}
};

//Asteroid mold (inherits Entity)
var Asteroid = Object.create(Entity);   //adds inheritance
extend(Asteroid, 	{ });
Asteroid.maxHP = 3;

Asteroid.destroy = function(){
	var position = this.getPosition();
	var velocity = this.body.GetLinearVelocity();
	world.DestroyBody(this.body);
	for(var i = 0; i < 3; ++i){
		crystalList.add(makeCrystal(position, velocity));
	}
	this.clean();
}

Asteroid.clean = function (){
	scene.remove(this.mesh);
	world.DestroyBody(this.body);
	asteroidList.remove(this.node);
}

var Crystal = Object.create(Entity);   //adds inheritance
extend(Crystal, {});            //adds more variables and functions, just like how entity is declared with variables and functions
Crystal.clean = function (){
	scene.remove(this.mesh);
	world.DestroyBody(this.body);
	Namer.recycledCrystalIDs.push(this.ID);
	crystalList.remove(this.node);
}

//Enemy mold (inherits Entity)
var Enemy = Object.create(Entity);
extend(Enemy, { speed : null,
				sensorDir : null,
                sensorList : null,
                lastShoot: 0,
				weaponDamage: 1,
                runAI: function(){
                    var myPosition = this.getPosition();
                    var temp = this.sensorList.head;
					var targetVec = { x: 0, y : 0};
					var dodge = 0;
                    if(temp != null){
                        while(temp != null){
                            dodge += predictCollision(temp.stored.userData, this, targetVec);
						    temp = temp.next;
                        }
                    }
                    if(dodge == 0){
						targetVec = vectorSubtraction(playerShip.getPosition(), this.getPosition());
                    }
                    	
					var desiredAngle = (Math.atan2(targetVec.y, targetVec.x));
					var nextAngle = this.body.GetAngle() + this.body.GetAngularVelocity() / 6.0;
					var totalRotation = (desiredAngle - nextAngle);
					while ( totalRotation < -Math.PI ) totalRotation += 2*Math.PI;
					while ( totalRotation >  Math.PI ) totalRotation -= 2*Math.PI;
					if (totalRotation > 60){
						totalRotation = 60;
					}
					if (totalRotation < -60){
						totalRotation = -60;
					}
					var desiredAngularVelocity = totalRotation * 3;
					var torque = this.body.GetInertia() * desiredAngularVelocity / (1/60.0);
					this.body.ApplyTorque( torque );
					
					//if (temp == 1){
                        //afreeFloating(this, targetVec);
					//}
                    //else{
                    //    normalizeVector(targetVec);
                    //}
					normalizeVector(targetVec);
					//calculate forward coordinate for foward/reverse(forward is positive)
					targetVec.x = Math.cos( this.body.GetAngle() );
					targetVec.y = Math.sin( this.body.GetAngle() );
                    if (dodge != 0 && totalRotation < Math.PI/32 && totalRotation > -Math.PI/32){
						PlaceMovingParticle(this.getPosition(), targetVec, 200);
						targetVec.x *= .25;
						targetVec.y *= .25;
                        this.body.ApplyImpulse(new b2Vec2(targetVec.x,targetVec.y), this.body.GetWorldCenter());
						
						var velocity = this.body.GetLinearVelocity();
						var length = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
						if (length > this.speed){
							length /= this.speed;
							velocity.x /= length;
							velocity.y /= length;
							this.body.SetLinearVelocity(velocity);
						}
                    }
					else if (dodge == 0 && totalRotation < Math.PI/32 && totalRotation > -Math.PI/32){
						var difference = vectorSubtraction(this.body.GetPosition(), playerShip.body.GetPosition());
						var distance = Math.sqrt(difference.x*difference.x+difference.y*difference.y)
                        if(distance < 16){
						    if (distance > 12){
								PlaceMovingParticle(this.getPosition(), targetVec, 200);
							    var func = Math.sqrt(distance - 12)
							    targetVec.x *= func;
							    targetVec.y *= func;
							    this.body.ApplyImpulse(new b2Vec2(targetVec.x,targetVec.y), this.body.GetWorldCenter());

							    var velocity = this.body.GetLinearVelocity();
							    var length = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
							    if (length > this.speed){
								    length /= this.speed;
								    velocity.x /= length;
								    velocity.y /= length;
								    this.body.SetLinearVelocity(velocity);
							    }
						    }
                            var time = new Date().getTime();
					        if(time - this.lastShoot > this.fireRate){
					            bulletList.add(makeBullet(this, 1, 32, 0));
					            this.lastShoot = time;
                            }
                        }
                    }
                }
});
 Enemy.destroy = function () {
		particleExplosion(this.getPosition(), 150);
		particleExplosion(this.getPosition(), 150);
        this.clean();
}
Enemy.clean = function () {
    scene.remove(this.mesh);
    world.DestroyBody(this.body);
    enemyList.remove(this.node);
}

var JetParticle = Object.create(Entity);   //adds inheritance
extend(JetParticle, {start: null});            //adds more variables and functions, just like how entity is declared with variables and functions
JetParticle.clean = function (){
	scene.remove(this.mesh);
	world.DestroyBody(this.body);
	Namer.recycledJetIDs.push(this.ID);
	jetParticleList.remove(this.node);
}

var Soldier = Object.create(Enemy); //tank is an example enemy type
extend(Enemy, {});
Soldier.maxHP = 10;
Soldier.speed = 3.5;
Soldier.fireRate = 800;

var Scout = Object.create(Enemy); //tank is an example enemy type
extend(Enemy, {});
Scout.maxHP = 5; 
Scout.speed = 4;
Scout.fireRate = 1400; 

//Tank mold (inherits Enemy)
var Tank = Object.create(Enemy); //tank is an example enemy type
extend(Enemy, {});
Tank.maxHP = 25; 
Tank.speed = 3;
Tank.fireRate = 1000; 

//Player mold (inherits Entity)
var Player = Object.create(Entity);
extend(Player, { 	currentHP: 20, 
					crystals: 200,
					maxSpeed: 1,
					weaponDamage: 1,				
					strafeEnabled: false, //boolean for every upgrade for easier sidebar update (except health)
					speedIncrease: false,
					weaponDamageIncrease: false,
					missilesEnabled: false,
					gunEnabled: false,
					currentWeapon: 1
				});
Player.maxHP = 100;
Player.radius = 2;
Player.speed = 8;
Player.destroy = function () {
    playerDeath();
    console.log("player was destroyed");
}

//Bullet mold (inherits Entity)
var Bullet = Object.create(Entity);
extend(Bullet, { owner: null, power: null, type: 0, start: null, deleteFlag : 0} );
Bullet.clean = function () {
    scene.remove(this.mesh);
    world.DestroyBody(this.body);
	Namer.recycledBulletIDs.push(this.ID);
    bulletList.remove(this.node);
}

//Station mold (inherits Entity)
var Station = Object.create(Entity);
extend(Station, { });
Station.radius = 4;
Station.damage = function (amount){

}
Station.clean = function () {
    //console.log("Station was destroyed");
	scene.remove (this.mesh);
	world.DestroyBody(this.body);
}

var WarpGate = Object.create(Entity);
extend(WarpGate, { });
WarpGate.damage = function (amount){

}
WarpGate.clean = function () {
	scene.remove (this.mesh);
	world.DestroyBody(this.body);
}

//--------------------------------------------------------------------
// Initializing functions (sets specifics to this casting from a mold)
//--------------------------------------------------------------------

// Soon these functions will have to be passed variables that will be used in
// initializing the objects, as seen in makeEnemy();

function makeAsteroid(x, y) {
    var asteroid;
    asteroid = Object.create(Asteroid);
	asteroid.ID = Namer.NewAsteroidID();
	asteroid.body = makeAsteroidBody(x, y, asteroid);
	makeAsteroidMesh(asteroid);
	asteroid.updateMesh();
    asteroid.currentHP = asteroid.maxHP;
    return asteroid;
}

function makeCrystal(position, velocity) {
    var crystal;
    crystal = Object.create(Crystal);
	crystal.body = makeCrystalBody(position, velocity, crystal);
	makeCrystalMesh(crystal);
	crystal.updateMesh();
	crystal.ID = Namer.NewCrystalID();
    return crystal;
}

function makeJetParticle() {
    var jetParticle;
    jetParticle = Object.create(JetParticle);
	jetParticle.start = Date.now();
	jetParticle.body = makeJetParticleBody(jetParticle);
	jetParticle.mesh = new THREE.Mesh(new THREE.SphereGeometry(.1,6,6), new THREE.MeshLambertMaterial({
            color: 0xff1111
		}));  //change to sprite?
	scene.add(jetParticle.mesh);
	jetParticle.updateMesh();
	jetParticle.ID = Namer.NewJetParticleID();
    return jetParticle;
}

function makeEnemy(type, x, y) {
    var enemy;
	//var material = new THREE.ShaderMaterial( {
	//	uniforms: { 
	//		tExplosion: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'textures/explosion.png' ) },
	//		time: { type: "f", value: 0.0 },
	//		weight: { type: "f", value: 10.0 / 19 }
	//	},
	//	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	//	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
		
	//} );
	
    switch (type) {
        case 0:
            enemy = Object.create(Soldier);
            enemy.body = makeSoldierBody(x, y, enemy); //actually make Box2d body here eg) makeTankBody();
            makeSoldierMesh(enemy);
            break;
        case 1:
            enemy = Object.create(Scout);
            enemy.body = makeScoutBody(x, y, enemy); //actually make Box2d body here eg) makeTankBody();
            makeScoutMesh(enemy);
            break;
        case 2:
            enemy = Object.create(Tank);
            enemy.body = makeTankBody(x, y, enemy); //actually make Box2d body here eg) makeTankBody();
			makeTankMesh(enemy);
            //enemy.material = material;
			//enemy.mesh = new THREE.Mesh( new THREE.SphereGeometry( 20 / 19, 200, 200 ), material );
            scene.add(enemy.mesh);
    }
    enemy.sensorDir = {};
    enemy.sensorList = newDLL();
	enemy.updateMesh();
	enemy.currentHP = enemy.maxHP;
	enemy.ID = Namer.NewEnemyID();
    return enemy
}

function makePlayer() {
    var player;
    player = Object.create(Player);
    player.body = makePlayerBody(player);
    // player.mesh = new THREE.Mesh(new THREE.SphereGeometry(.5,10,10), new THREE.MeshLambertMaterial({
//             color: 0xff8800
// 		}));
	makePlayerMesh(player);
    scene.add(player.mesh);
	player.updateMesh();
	player.ID = Namer.NewPlayerID();
    return player;
}

//params: owner (b2Body who fired it), AI, speed, offset (in radians - how much to deviate from straight ahead)
function makeBullet( owner, AI, speed, offset )
{

	var bullet;
	bullet = Object.create(Bullet);
	bullet.owner = owner;
	bullet.power = owner.weaponDamage;
	bullet.start = Date.now(); 
	bullet.body = makeBulletBody(owner, bullet, AI, speed, offset); 
	bullet.mesh = new THREE.Mesh(new THREE.SphereGeometry(.1,6,6), new THREE.MeshLambertMaterial({
            color: 0xff88ff
		}));  //change to sprite?
	scene.add(bullet.mesh);
	bullet.updateMesh();
	bullet.ID = Namer.NewBulletID();
	return bullet;
}

function makeStation(x, y) {
    var station;
    station = Object.create(Station);
    station.body = makeStationBody(station, x, y);
    // player.mesh = new THREE.Mesh(new THREE.SphereGeometry(.5,10,10), new THREE.MeshLambertMaterial({
//             color: 0xff8800
// 		}));
	makeStationMesh(station);
    scene.add(station.mesh);
	station.updateMesh();
	station.ID = Namer.NewStationID();
    return station;
}

function makeWarpGate(x, y) {
    var warpGate;
    warpGate = Object.create(WarpGate);
    warpGate.body = makeWarpGateBody(warpGate, x, y);
	makeWarpGateMesh(warpGate);
    scene.add(warpGate.mesh);
	warpGate.updateMesh();
	warpGate.ID = Namer.NewWarpGateID();
    return warpGate;
}