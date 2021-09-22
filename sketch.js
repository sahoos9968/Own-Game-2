var bg, bgImage, player, playerImage;

var coin, coinImage, coingroup;
var rock, rockImage, rockgroup;

var coinGroup, rockGroup;
var gameState;

var ground;

var score;
function preload(){
  bgImage = loadImage("bg.jpg");
  playerImage = loadImage("player.png");

  coinImage = loadImage("coin.png");
  rockImage = loadImage("rock.png");
}

function setup() {
  createCanvas(1900,850);

  bg = createSprite(displayWidth/2, displayHeight/2 - 100, displayWidth, displayHeight);
  bg.addImage(bgImage);
  bg.scale = 4;

  player = createSprite(100,displayHeight-290);
  player.addImage(playerImage);
  player.debug = true;
  player.setCollider("rectangle", 50,-50,100,270);

  coinGroup = createGroup();
  rockGroup = createGroup();

  gameState = "play";

  ground = createSprite(100, displayHeight -340, 300, 5);
  ground.visible = false;
  
  score = 0;
  player.collide(ground);
}

function draw() {
  background(0,0,0);  

  player.velocityY = 7;
  player.collide(ground);

  if (gameState === "play"){
    bg.velocityX = -5;

    if (keyDown(UP_ARROW)&& player.y >500){
      player.velocityY = -15;
    }

    if (bg.x < 500){
      bg.x = displayWidth/2;
    }

    Coin();
    Rock();

    if (coinGroup.isTouching(player)){
      score = score + 0.5;
    }

    if (rockGroup.isTouching(player)){
      gameState = "end";
    }

  }

  if (gameState === "end"){
    rockGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);

    rockGroup.destroyEach()
    coinGroup.destroyEach();
    bg.visible = false;

    

  }

  drawSprites();

  textSize(35);
  fill("blue");
  text("Score: " + score, 1600,100);
}

function Coin(){
  if (frameCount % 200 === 0){
    coin = createSprite(1600, random(300,350));
    coin.addImage(coinImage);
    coin.scale = 0.6;
    coin.velocityX = -5;
    coin.lifetime = 600;
    coinGroup.add(coin);
  }
}

function Rock(){
  if (frameCount % 250 === 0){
    rock = createSprite(1600, 770);
    rock.addImage(rockImage);
    rock.scale = 0.6;
    rock.velocityX = -5;
    rock.lifetime = 600;
    rockGroup.add(rock);
  }
}
