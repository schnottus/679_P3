var particleCount = 7500,
	    particles = new THREE.Geometry(),
		pMaterial = new THREE.ParticleBasicMaterial({
            size: 1,
            map: THREE.ImageUtils.loadTexture(
				"textures/particle.png"
            ),
		    color: 0xFFFFFF,
		    blending: THREE.AdditiveBlending,
		    //depthTest: false,
            transparent : true
		});

for (var p = 0; p < particleCount; p++) {

		    // create a particle with random
		    // position values, -250 -> 250
		    var pX = - 1000,
			pY = - 1000,
			pZ = 1,
		    particle = 
				new THREE.Vector3(pX, pY, pZ)
			;
		    // create a velocity vector
		    particle.velocity = new THREE.Vector2(
			0, 			// x
			-Math.random()); // y

		    particle.death = -1;
		    // add it to the geometry
		    particles.vertices.push(particle);
		}

var particleSystem = new THREE.ParticleSystem(
particles,
pMaterial);

particleSystem.dynamic = true;
particleSystem.sortParticles = true;

var particlesUsed = -1;
var recycledParticles = new Array();

// add it to the scene
scene.add(particleSystem);


//----------------------------------------------


function PlaceMovingParticle(position, velocity, life) {
    var temp = 50;
	var pos = {
        x: position.x - velocity.x,
        y: position.y - velocity.y
    }
    var vel = {
        x:-.1 * velocity.x,
        y:-.1 * velocity.y
    }
    while (temp--) {
        var particle = getAvailableParticle();
        particle.x = pos.x + .1 * (.5 - Math.random());
        particle.y = pos.y + .1 * (.5 - Math.random());
        particle.velocity.x = vel.x + .1 * (.5 - Math.random());
        particle.velocity.y = vel.y + .1 * (.5 - Math.random());
        particle.death = (new Date()).getTime() + life;
    }
}

function getAvailableParticle() {
    if (recycledParticles.length == 0) {
		if(particlesUsed < 7499){
			particlesUsed++;
		}
        return particles.vertices[particlesUsed];
    }
    else {
        return recycledParticles.pop();
    }
}

//----------------------------------------------

function particleExplosion(position, life) {
    var temp = 20;
	if(cSound === null)
	{
		cSound = new Sound( ['sound/c.wav'], 50, 1 );
	}
	cSound.play();
    while (temp--) {
        var particle = getAvailableParticle();
        particle.x = position.x;
        particle.y = position.y;
        particle.velocity.x = .5*(.5 - Math.random());
        particle.velocity.y =  .5*(.5 - Math.random());
        particle.death = (new Date()).getTime() + life;
    }
}







function updateParticles() {

    // add some rotation to the system
    //particleSystem.rotation.z += 0.01;
    var pCount = particleCount;
    while (pCount--) {
        // get the particle
        var particle = particles.vertices[pCount];
        if (particle.death == -1) {

        }
        else if ((new Date()).getTime() < particle.death) {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
        }
        else {
            particle.death = -1;
            particle.x = -1000;
            recycledParticles.push(particle);
        }
    }

    // flag to the particle system that we've
    // changed its vertices. This is the
    // dirty little secret.
    particleSystem.geometry.__dirtyVertices = true;
}

