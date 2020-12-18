var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground, box_left, box_right, box_bottom;
var landing_zone;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

class Box {
  constructor(x, y, w, h, strk = 255, fll = [125]){
	this.strk = strk;
	this.fll = fll;

	
	var options = {
      friction: 0.3,
      restitution: 0.6
   }
 this.body = Bodies.rectangle(x, y, w, h, options);
 this.w = w;
  this.h = h;  
  World.add(world, this.body);
  }
   
get left() {
	return this.body.position.x;
}

 show () {
   var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
   rectMode(CENTER);
    //strokeWeight(15);    
    stroke(this.strk);  
   fill(this.fll);
   rect(0, 0, this.w, this.h);
    pop();
  }

}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	
	
	helicopterSprite = createSprite(width/2, 180, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6
	
	
	
	packageSprite = createSprite(helicopterSprite.x, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2;
	packageSprite.depth = 0;
	
	// groundSprite = createSprite(width/2, height-35, width, 20);
	// groundSprite.shapeColor = color(255)
	
	
	engine = Engine.create();
	world = engine.world;
	
	packageBody = Bodies.circle(width/2, 200, 5, {restitution: 0.5, isStatic: true});
	World.add(world, packageBody);
	
	
	//Create a Ground
	// ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic: true} );
	// World.add(world, ground);
	ground = new Box(width/2, 650, width, 25);
	Body.setStatic(ground.body, true);
	
	landing_zone = new Box(400, 630, 200, 20, [0, 0, 0], [225, 0, 0]);
	Body.setStatic(landing_zone.body, true);

	landing_zone_left = new Box(290, 587, 20, 100, [0, 0, 0], [225, 0, 0]);
	Body.setStatic(landing_zone_left.body, true);

	landing_zone_right = new Box(510, 587, 20, 100, [0, 0, 0], [225, 0, 0]);
	Body.setStatic(landing_zone_right.body, true);

	Engine.run(engine);
	
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y - 15;
  drawSprites();
  landing_zone.show();
  ground.show();
  landing_zone_left.show();
  landing_zone_right.show();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Body.setStatic(packageBody, false);

	}
}



