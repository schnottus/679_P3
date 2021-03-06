//Selections in purchase menu


function strafe(){
    //if not enough crystals
    if(playerShip.crystals < 10){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Strafe enabled");
        playerShip.crystals -= 10;
        playerShip.strafeEnabled = true;
        updateHUD();
        updateSidebar();
    }
}

function speed(){
    //if not enough crystals
    if(playerShip.crystals < 20){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Speed increased");
        playerShip.crystals -= 20;
        playerShip.speedIncrease = true;
		playerShip.speed += 2;
        updateHUD();
        updateSidebar();
    }
}

function damage(){
    //if not enough crystals
    if(playerShip.crystals < 30){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Weapon damage increased");
        playerShip.crystals -= 30;
		playerShip.weaponDamageIncrease = true;
        playerShip.weaponDamage += .5;
        updateHUD();
        updateSidebar();
    }
}

function tractor(){
    //if not enough crystals
    if(playerShip.crystals < 30){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Tractor beam acquired");
        playerShip.crystals -= 30;
        playerShip.tractorEnabled = true;
        updateHUD();
        updateSidebar();
    }
}

function gun(){
    //if not enough crystals
    if(playerShip.crystals < 30){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Scatter gun acquired");
        playerShip.crystals -= 30;
        playerShip.gunEnabled = true;
        updateHUD();
        updateSidebar();
    }
}

function xtraHealth(){
    //if not enough crystals
    if(playerShip.crystals < 20){
        showInfo("Not enough resources");
    }else if(playerShip.currentHP >= playerShip.maxHP){
		showInfo("Max health reached, cannot purchase more");
	}else{
        showInfo("Health increased by 10");
        playerShip.crystals -= 20;
        playerShip.currentHP += 10;
		if(playerShip.maxHP < playerShip.currentHP)
		{
			playerShip.currentHP = playerShip.maxHP;
		}
        updateHUD();
        updateSidebar();
    }
}

function changeLevel(level)
{
    if(level == 1 && playerShip.crystals < 25){
        showInfo2("Not enough resources");
    }
    else if(level == 2 && playerShip.crystals < 50){
        showInfo2("Not enough resources");
    }
    else if(level == 3 && playerShip.crystals < 100){
        showInfo2("Not enough resources");
    }
    else{
        switch(level){

            case 1: playerShip.crystals -= 25; break;
            case 2: playerShip.crystals -= 50; break;
            case 3: playerShip.crystals -= 100; break;
        }
        
        updateHUD();
        updateSidebar();
        destroyLevel(); //reset player position in destroy level?
        loadLevel(level)
        resume();
        }
}


function resume(){
    if(playerDocked){	    
        gamePaused = false;
        playerDocked = false;
        purchaseMenu();		    
	}
	if(atGate){
	    gamePaused = false;
        atGate = false;
        levelMenu();	
	}
}

function showInfo(message){
    var info = document.getElementById("purchaseInfo");
    info.innerHTML = message;
    setTimeout(function(){info.innerHTML = ""},3000);
}

function showInfo2(message){
    var info = document.getElementById("levelInfo");
    info.innerHTML = message;
    setTimeout(function(){info.innerHTML = ""},3000);
}

