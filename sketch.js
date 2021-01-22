var hypnoticBall;
var database;
var position;
function setup(){
    //createethe database and save it
    database=firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //ref()function is used to refer to a locationinside the database 
    var hypnoticBallPosition=database.ref('ball/position');
    //on function creates a listner which keeps on listning to any changes in the value where we are pointing
    //if any change in the value all read postion function,if problemin read position thenwe call show error
    hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    //draw the ball or write to the database only when the position is defined
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();     
    }
}
//write the new values of the position inside the database
//set()function is used to give the new values for the first time
function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    });
}
//read the values of the position from the database
//val function is used to get the values from the data
function readPosition(data){
    position=data.val()
    hypnoticBall.x=position.x;
    hypnoticBall.y=position.y;
}
function showError(){
    console.log("Error in reading the database");
}