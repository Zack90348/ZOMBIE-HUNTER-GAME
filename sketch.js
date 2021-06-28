//Declaring the variables
var bgImage;
var survivor, survivorImg, survivorGrp,survivorc;
var zombie, zombieImage, zombiesGrp;
var bullet, bulletImage, bulletsGrp;
var score;
var speed, speedFlag;
var life1,life2,life3, lives,lifeImage;
var gameOverImg,gameover;
var gameState;
var canvas ;

function preload(){
    //Adding the zombie animation
    zombieImage = loadAnimation("images/zombieRun10.png",
    "images/zombieRun20.png","images/zombieRun30.png",
    "images/zombieRun40.png","images/zombieRun50.png","images/zombieRun60.png",
    "images/zombieRun70.png","images/zombieRun80.png","images/zombieRun90.png",
    "images/zombieRun100.png");

    //Loading all the images
    bgImage = loadImage("images/zombieBackground.PNG");
    survivorImg = loadImage("images/gunner0.png");
    bulletImg = loadImage("images/bulletImg0.png");
    lifeImage = loadImage("images/heartImg0.png");
    gameOverImg = loadImage("images/gameoverImg.PNG");
}

function setup(){
    //Creating the important game elements
    canvas = createCanvas(windowWidth,windowHeight);
    survivor = new Survivor();
    bulletsGrp = new Group();
    zombiesGrp = new Group();
    survivorGrp = new Group();

    //Creating the bullet
    canvas.mouseClicked(()=>{
        survivor.createBullet();
    });    

    //Initialize the variables
    score = 0;
    speed = 100;
    speedFlag = 0;
    lif = 3;
    n = 400;
    gameState = 0;//gameState 1 = Endstate and gamestate 2 = Playstate

    //Creating the lives
    createLives()  
}

function draw(){  
    //Checking for the gamestate and coding to do the following
    if(gameState == 1){
        //Adding the background image when game over
        background(gameOverImg);

        //Destroying and making visibility false of the game elements
        zombiesGrp.destroyEach();
        bulletsGrp.destroyEach();
        survivor.body.destroy();
        life1.visible = false;
        life2.visible = false;
        life3.visible = false;

        //Code to restart the game
        if (keyIsPressed === true)
            reset();      

    //Checking for the gamestate and coding to do the following
    }else if(gameState === 0){
        //Adding backgroung image 
        background(bgImage);

        //Making the lives visible
        for(lif in lives){
            lives[lif].visible = true
        }

        //Adding the game adaptivity code
        switch(score){
            case 100: speed=80;
                break;
            case 202: speed=60;
                break;
            case 303: speed=40;
                break;
            case 400: speed=20;
                break;
        }

        //Spawning the zombies
        spawnZombie();

        //Adding code to end the game
        if(lives.length == 0 || score < 0){
            gameState = 1;
        }
        
        //Adding the score
        textSize(20);
        fill("white");
        text("Score: " + score,windowWidth-250,50);

        //Giving bonus score at 100 points 
        if(score >= 100 && score % 100 == 0){
            score = score + 50;
        }
        
        //Checking if the zombies are survivor and reducing a life accordingly
        for(var i = 0; i < zombiesGrp.size(); i++){ 
            var zomb = zombiesGrp.get(i);      
            if(zomb.x > width ){
                score = score-5;
                zombiesGrp.get(i).destroy();                
            }else if(zomb.isTouching(survivor.body)){
                for(lif in lives){
                   
                    lives[lif].visible = false
                }
                lives.pop();
                zombiesGrp.get(i).destroy(); 
            }
        }

        //Moving the survivor
        survivor.move();
        //Destroying zombie if touching bullet
        destroyZombie();
    }
    drawSprites();
}

