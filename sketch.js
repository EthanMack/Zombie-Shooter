var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var heart_1, heart_1Img;
var heart_2, heart_2Img;
var heart_3, heart_3Img;
var hearts;
var bullets = 75;
var bulletGroup;
var score = 0;
var gameState

function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart_1Img = loadImage("assets/heart_1.png")
  heart_2Img = loadImage("assets/heart_2.png")
  heart_3Img = loadImage("assets/heart_3.png")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //creating the player sprite
  player = createSprite(displayWidth - 1500, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart_1 = createSprite(displayWidth-150,40,20,20)
  heart_1.addImage(heart_1Img)
  heart_1.scale = 0.4
  heart_1.visible = false

  heart_2 = createSprite(displayWidth-100,40,20,20)
  heart_2.addImage(heart_2Img)
  heart_2.scale = 0.4
  heart_2.visible = false

  heart_3 = createSprite(displayWidth-150,40,20,20)
  heart_3.addImage(heart_3Img)
  heart_3.scale = 0.4

  zombieGroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background(0);
  console.log(frameCount)



  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.velocityX=30
    bulletGroup.add(bullet)
    player.addImage(shooter_shooting)
    bullets=bullets-1

  }
  

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)


  }

  if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        hearts=hearts-1
      }
    }
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
      }
    }
    score += 5;
  }

  if(bullets==0){
    alert("Game Over")
  }

  spawnZombies()

  drawSprites();
  textSize(40)
  fill("black")
  text("Score:" +score,1300,50)

}

function spawnZombies() {
  interval = Math.round(random(100, 130))
  if (frameCount % interval == 0) {


    zombie = createSprite(displayWidth - 300, displayHeight - Math.round(random(250, 1000)), 50, 50)
    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -2
    zombie.lifetime = 690
    zombie.setCollider("rectangle", 0, 0, 300, 300)
    zombie.debug = true
    zombieGroup.add(zombie)
  }
}


