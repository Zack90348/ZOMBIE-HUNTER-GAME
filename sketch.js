var bgImage;
var survivor, survivorImg;
var zombie, zombieImage, zombiesGrp;
var bullet, bulletImage, bulletsGrp;
var score;
var speed;

function preload(){
    zombieImage = loadAnimation("images/zombieRun10.png",
    "images/zombieRun20.png","images/zombieRun30.png",
    "images/zombieRun40.png","images/zombieRun50.png","images/zombieRun60.png",
    "images/zombieRun70.png","images/zombieRun80.png","images/zombieRun90.png",
    "images/zombieRun100.png");

    bgImage = loadImage("images/zombieBackground.jpg");
    survivorImg = loadImage("images/gunner0.png");
    bulletImg = loadImage("images/bulletImg0.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    survivor = new Survivor();
    bulletsGrp = new Group();
    zombiesGrp = new Group();

    canvas.mouseClicked(()=>{
        survivor.createBullet();
    });    

    score = 0;
    speed = 100;
}

function draw(){

    background(bgImage);
    
    if(frameCount % speed === 0){
        zombie = new Zombie();
        zombie.addToGroup();
    }

    if(score >= 150){
        speed-=20;
    }

    textSize(20);
    fill("white");
    text("Score: " + score,windowWidth-250,50);

    if(score >= 100 && score % 100 == 0){
        score = score + 50;
    }

    survivor.move();
    destroyZombie();
    //zombiesGrp.setYEach(survivor.body.y);
    drawSprites();
}

function destroyZombie(){
    //console.log(zombiesGrp.size());
    for(var i = 0; i < zombiesGrp.size(); i++){        
        var zomb = zombiesGrp.get(i);
       // bulletsGrp.collide(zomb) 
       console.log(bulletsGrp.size());       
        for(var j = 0; j < bulletsGrp.size(); j++){   
            //console.log(zomb);
            var bull = bulletsGrp.get(j);
            if(zomb.isTouching(bull)){
                zomb.destroy();
                bull.destroy(); 
                score+=10; 
            }
        }
                
    }    
}
