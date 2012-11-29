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
    destroy: function () {
        console.log("something was destroyed");
    }
};

//Asteroid mold (inherits Entity)
var Asteroid = Object.create(Entity);   //adds inheritance
extend(Asteroid, { HP: 3});            //adds more variables and functions, just like how entity is declared with variables and functions
Asteroid.destroy = function (){
	scene.remove(this.mesh);
	world.DestroyBody(this.body);
	asteroidList.remove(this.node);
}

//Enemy mold (inherits Entity)
var Enemy = Object.create(Entity);
extend(Enemy, {});
Enemy.destroy = function () {
    scene.remove(this.mesh);
    world.DestroyBody(this.body);
    enemyList.remove(this.node);
}

//Tank mold (inherits Enemy)
var Tank = Object.create(Enemy); //tank is an example enemy type
extend(Enemy, { HP: 15, sensor: {} });

//Player mold (inherits Entity)
var Player = Object.create(Entity);
extend(Player, { HP: 10 });
Player.destroy = function () {
    console.log("player was destroyed");
}

//Bullet mold (inherits Entity)
var Bullet = Object.create(Entity);
extend(Bullet, { owner: null, type: 0, start: null, deleteFlag : 0} );
Bullet.destroy = function () {
    scene.remove(this.mesh);
    world.DestroyBody(this.body);
	Namer.recycledBulletIDs.push(this.ID);
    bulletList.remove(this.node);
}
//--------------------------------------------------------------------
// Initializing functions (sets specifics to this casting from a mold)
//--------------------------------------------------------------------

// Soon these functions will have to be passed variables that will be used in
// initializing the objects, as seen in makeEnemy();

function makeAsteroid(x, y) {
    var asteroid;
    asteroid = Object.create(Asteroid);
	asteroid.body = makeAsteroidBody(x, y, asteroid);
	makeAsteroidMesh(asteroid);
	asteroid.ID = Namer.NewAsteroidID();
    return asteroid;
}

function makeEnemy(type, x, y) {
    var enemy;
	var material = new THREE.ShaderMaterial( {
		uniforms: { 
			tExplosion: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( 'textures/explosion.png' ) },
			time: { type: "f", value: 0.0 },
			weight: { type: "f", value: 10.0 / 19 }
		},
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
		
	} );
	
    switch (type) {
        case 0:
            enemy = Object.create(Tank);
            enemy.body = makeTankBody(x, y, enemy); //actually make Box2d body here eg) makeTankBody();
			enemy.material = material;
            //enemy.mesh = new THREE.Mesh(new THREE.SphereGeometry(.5,10,10), new THREE.MeshLambertMaterial({
            //    color: 0xff0000
            //}));
			enemy.mesh = new THREE.Mesh( new THREE.SphereGeometry( 20 / 19, 200, 200 ), material );
            scene.add(enemy.mesh);
    }
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
	player.ID = Namer.NewPlayerID();
    return player;
}

//owner (b2Body who fired it), t = the type of bullet
function makeBullet( owner, t )
{

	var bullet;
	bullet = Object.create(Bullet);
	bullet.owner = owner;
	bullet.type = t;
	bullet.start = Date.now(); 
	bullet.body = makeBulletBody(owner, bullet); 
	bullet.mesh = new THREE.Mesh(new THREE.SphereGeometry(.1,6,6), new THREE.MeshLambertMaterial({
            color: 0xff88ff
		}));  //change to sprite?
	scene.add(bullet.mesh);
	bullet.ID = Namer.NewBulletID();
	return bullet;
}