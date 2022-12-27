var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOver,restart;
var gameOverImg,restartImg;



function preload(){

  //adding trex animation
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  //loading gorud Image
  
  groundImage = loadImage("ground2.png");

  //loading cloud Image
  
  cloudImage = loadImage("cloud.png");
  
  //loading obstacles Image 

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}

function setup() {

  //creating canvas

  createCanvas(600, 200);
  
  // making trex

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;

  // making groud
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  //making groud invisible

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  //making obstacles and cloud groups 

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  

  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {

  //adding background colour

  background(180);

  //displaying score 

  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    //making groud move
       
    ground.velocityX = -4;
   
    //increasing score

    score = score + Math.round(frameCount/60);
    
    //making gorud infinite

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //making trex jump by any spcecifie key

    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
  
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
   if(obstaclesGroup.isTouching(trex)){
   gameState = END;
   }
 
  }

   else if (gameState === END)
   {

    
      gameOver = createSprite(300,100,0,50,50);
      gameOver.addImage("gameOver",gameOverImg);
      gameOver.scale = 0.5;
  
  
     restart = createSprite(300,150,50,50);
     restart.addImage("restart",restartImg);
      restart.scale = 0.5;
       
      ground.velocityX = 0;

      gameOver.visible = true;
      restart.visible = true;
     
       obstaclesGroup.setVelocityXEach(0);
       cloudsGroup.setVelocityXEach(0);
    }
  
 

  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

