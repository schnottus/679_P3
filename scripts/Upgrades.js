//Selections in purchase menu

//CURRENTLY: nothing happens if player purchases something twice, except wasting their resources
// maybe we might want to add doubled speed/ weapon damage/ missiles etc (after the playtest)?

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
        playerShip.weaponDamage = true;
        updateHUD();
        updateSidebar();
    }
}

function missiles(){
    //if not enough crystals
    if(playerShip.crystals < 40){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Missiles acquired");
        playerShip.crystals -= 30;
        playerShip.missilesEnabled = true;
        updateHUD();
        updateSidebar();
    }
}

function gun(){
    //if not enough crystals
    if(playerShip.crystals < 40){
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

function changeLevel(level)
{
    if(level == 1 && playerShip.crystals < 80){
        showInfo2("Not enough resources");
    }
    else if(level == 2 && playerShip.crystals < 100){
        showInfo2("Not enough resources");
    }
    else if(level == 3 && playerShip.crystals < 200){
        showInfo2("Not enough resources");
    }
    else{
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

