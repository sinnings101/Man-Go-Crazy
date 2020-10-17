var man, man_img, coin, coin_img, car, car_img, score;
var backImg, town, ground;
var obstacleGroup, coinGroup;
var gameState = "play";
function preload(){ 
  backImg = loadImage("town.jpg");
  
  man_img = loadAnimation("man.png");

  coin_img = loadImage("coin.png");
  car_img = loadImage("car.png");
}  

function setup() {
  createCanvas(600, 300);
  town = createSprite(300,0);
  town.addImage("img", backImg);
  town.scale = 1.5
  town.x = town.width /2;
  town.velocityX = -6;
  
  man = createSprite(50,230,20,40);
  man.addAnimation("running", man_img);
  man.scale = 0.2;
  
  man.debug = true
  man.setCollider("rectangle",0,0,200,400);
  
  ground = createSprite(100,260,600,10);
  ground.visible = false; 

  obstacleGroup = new Group();
  coinGroup = new Group();
  
  score = 0
}
  
function draw() {
  background(0)
  if(gameState === "play"){
      if(keyDown("space")) {
      man.velocityY = -15;
  }
  
  man.velocityY = man.velocityY + 0.8
    
      if (town.x < 200){
      town.x = 450;
  }
  
  if(coinGroup.isTouching(man)) {
    score = score+2
    console.log(score)
    coinGroup.destroyEach();  
    switch(score) {
    case 10: man.scale=0.12;
      break;
    case 20: man.scale=0.14;
      break;
    case 30: man.scale=0.16;
      break;
    case 40: man.scale=0.18
      break;
    default: break;
    }    
  }
  

  
  if(obstacleGroup.isTouching(man)) {
    gameState = "end";
  }
  
  spawnCoins();
  spawnObstacles();
  drawSprites();
  }
  else if(gameState === "end"){
    man.scale = 0.075;
    obstacleGroup.destroyEach();
    score=0;
    man.velocityX = 0;
    town.velocityX = 0;
    obstacleGroup.setVelocityEach(0);
    coinGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
  }
  
  man.collide(ground);


  
  textSize(20);
  text("Score: "+ score, 500,50);

}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(120,200));
    coin.addImage("coin's_image", coin_img);
    coin.scale = 0.020
    coin.velocityX = -3;
    
    //assign lifetime to the variable
    coin.lifetime = 200;
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    car = createSprite(600,240,10,40);
    car.addImage("car_image", car_img);
    car.scale = 0.025
    car.velocityX = -6;

    car.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(car);
  }
}