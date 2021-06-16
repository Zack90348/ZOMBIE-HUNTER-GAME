class Zombie{
    constructor(){
        this.body = createSprite(0,100);
        this.body.addAnimation("zombie",zombieImage);
        this.body.y = random(80,windowHeight - 80);
        this.body.velocityX = 5;
        this.body.lifetime = windowWidth/2;
        //this.body.debug = true;
        this.body.setCollider("rectangle",0,0,30,this.body.height);
    }

    addToGroup(){
        zombiesGrp.add(this.body);
    }
}