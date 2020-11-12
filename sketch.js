//Create variables here
var dog, happyDog;
var Dog;
var database;
var foodS, foodStock;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock )
	createCanvas(500, 500);
  Dog = createSprite(250,350,50,50);
  Dog.scale = 0.2
  Dog.addImage(dog);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);
  
  
  
}


function draw() {  
  background(46,139,87)
  textSize(15)
  fill("white")
  stroke("blue")
  text("Food Remaining:"+foodS,20,30)
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();

  })

  fill(255,255,254)
        textSize(15)
        if(lastFed>=12)  {
            text("Last Feed: "+ lastFed%12 + "PM",350,30)
        }else if(lastFed==0)  {
            text("Last Feed: 12 AM",350,30);
        }else{
            text("Last Feed: "+ lastFed + "AM",350,30)
        }

  drawSprites();
  //add styles here
 display();
}

function readStock(data)  {
  foodS = data.val();

}

function writeStock(x)  {
  if(x<=0)  {
    x=0
  } else {
    x=x-1
  }

  database.ref("/").update({
    Food : x
  })
}

function feedDog()  {
  Dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })

}

function addFoods()  {
  foodS++;
  database.ref('/').update({
    Food:foodS

  })

}