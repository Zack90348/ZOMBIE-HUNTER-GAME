class Survivor{
    constructor(){
        this.body = createSprite(windowWidth-100,100);
        this.body.addImage(survivorImg);  
    }
    
    move(){
        this.body.y = mouseY;
        
       /* if(mousePressedOver(this.body)){
            bullet = createSprite(this.body.x-50,this.body.y+30);
            bullet.addImage(bulletImg);  
            bullet.scale = 0.05;
            bullet.velocityX = -5;
            bulletsGrp.add(bullet);  
            //bullet.debug = true;  
            bullet.lifetime = windowWidth / 3;       
        }*/
    }

    createBullet(){
        bullet = createSprite(survivor.body.x-50,survivor.body.y+30);
        bullet.addImage(bulletImg);  
        bullet.scale = 0.05;
        bullet.velocityX = -5;
        bulletsGrp.add(bullet);  
        //bullet.debug = true;  
        bullet.lifetime = windowWidth / 3;
    }

    addToGrp(){
        survivorGrp.add(this.body);
    }
}