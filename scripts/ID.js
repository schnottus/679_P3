var Namer = {
	AsteroidIDCount : 0,
	EnemyIDCount : 0,
	BulletIDCount : 0,
	recycledBulletIDs : new Array(),
		
	NewAsteroidID : function(){
		var ID = "A" + this.AsteroidIDCount.toString(16);
		this.AsteroidIDCount++;
		return ID;
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
	reset : function(){
		this.AsteroidIDCount = 0,
		this.EnemyIDCount = 0,
		this.BulletIDCount = 0,
		this.recycledBulletIDs = new Array();
	}
	
};