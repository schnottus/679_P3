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
    getPosition: function (b) {
        //put actual Box2D position getter here
        return this.body;
    }
};

//Asteroid mold (inherits Entity)
var Asteroid = Object.create(Entity);   //adds inheritance
extend(Asteroid, { HP: 3 });            //adds more variables and functions, just like how entity is declared with variables and functions

//Enemy mold (inherits Entity)
var Enemy = Object.create(Entity);
extend(Enemy, {});

//Tank mold (inherits Enemy)
var Tank = Object.create(Enemy); //tank is an example enemy type
extend(Enemy, { HP: 15 });

//Player mold (inherits Entity)
var Player = Object.create(Entity);
extend(Player, { HP: 10 });

//--------------------------------------------------------------------
// Initializing functions (sets specifics to this casting from a mold)
//--------------------------------------------------------------------

// Soon these functions will have to be passed variables that will be used in
// initializing the objects, as seen in makeEnemy();

function makeAsteroid(x, y) {
    var asteroid;
    asteroid = Object.create(Asteroid);
    asteroid.body = makeAsteroidBody(x, y);
    asteroid.mesh = 1; //actually make the mesh here
    return asteroid;
}

function makeEnemy(type, x, y) {
    var enemy;
    switch (type) {
        case 0:
            enemy = Object.create(Tank);
            enemy.body = makeTankBody(x, y); //actually make Box2d body here eg) makeTankBody();
            enemy.mesh = 1; //actually make the mesh here
    }
    return enemy
}

function makePlayer() {
    var player;
    player = Object.create(Player);
    player.body = makePlayerBody();
    player.mesh = 1; //actually make the mesh here
    return player;
}
	