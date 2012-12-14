var Namer = {
	AsteroidIDCount : 0,
	EnemyIDCount : 0,
	BulletIDCount : 0,
	CrystalIDCount : 0,
	JetParticleIDCount : 0,
	recycledJetIDs : new Array(),
	recycledBulletIDs : new Array(),
	recycledCrystalIDs : new Array(),
		
	NewAsteroidID : function(){
		var ID = "A" + this.AsteroidIDCount.toString(16);
		this.AsteroidIDCount++;
		return ID;
	},
	
	NewCrystalID : function(){
		if (this.recycledCrystalIDs.length == 0){
			var ID = "C" + this.CrystalIDCount.toString(16);
			this.CrystalIDCount ++;
			return ID;
		}
		else{
			return this.recycledCrystalIDs.pop();
		}
	},
	
	NewJetParticleID : function(){
		if (this.recycledJetIDs.length == 0){
			var ID = "B" + this.JetParticleIDCount.toString(16);
			this.JetParticleIDCount ++;
			return ID;
		}
		else{
			return this.recycledJetIDs.pop();
		}
	},
	
	NewEnemyID : function(){
		var ID = "E" + this.EnemyIDCount.toString(16);
		this.EnemyIDCount++;
		return ID;
	},
	
	NewPlayerID : function(){
		return "P";
	},
	
	NewBulletID : function(){
		if (this.recycledBulletIDs.length == 0){
			var ID = "B" + this.BulletIDCount.toString(16);
			this.BulletIDCount ++;
			return ID;
		}
		else{
			return this.recycledBulletIDs.pop();
		}
	},

	NewStationID : function(){
		return "S";
	},
	NewWarpGateID : function(){
		return "W";
	},
	
	
	reset : function(){
		this.AsteroidIDCount = 0,
		this.EnemyIDCount = 0,
		this.BulletIDCount = 0,
		this.recycledBulletIDs = new Array();
	}
	
};