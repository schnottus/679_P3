var particleCount = 500,
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
		    var pX = 5 - Math.random() * 10,
			pY = 5 - Math.random() * 10,
			pZ = 1,
		    particle = 
				new THREE.Vector3(pX, pY, pZ)
			;
		    // create a velocity vector
		    particle.velocity = new THREE.Vector3(
			0, 			// x
			-Math.random(), // y
			0); 			// z

		    // add it to the geometry
		    particles.vertices.push(particle);
		}

var particleSystem = new THREE.ParticleSystem(
particles,
pMaterial);

particleSystem.dynamic = true;
particleSystem.sortParticles = true;

// add it to the scene
scene.add(particleSystem);

function updateParticles() {

    // add some rotation to the system
    particleSystem.rotation.z += 0.01;

    var pCount = particleCount;
    while (pCount--) {
        // get the particle
        var particle = particles.vertices[pCount];
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // check if we need to reset
        if (particle.x < -30) {
            particle.x = 30;
        }

        if (particle.y < -30) {
            particle.y = 30;
        }

        if (particle.x > 30) {
            particle.x = -30;
        }

        if (particle.y > 30) {
            particle.y = -30;
        }
    }

    // flag to the particle system that we've
    // changed its vertices. This is the
    // dirty little secret.
    particleSystem.geometry.__dirtyVertices = true;
}

