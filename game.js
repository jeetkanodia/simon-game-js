var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];
var level = 0;


$(".btn").click(function (){
    var userChosenColour =  $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    if(level == userClickedPattern.length)
    checkAnswer(level);
});

    

function nextSequence(){
    random = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").html( "Level "+level);
    level++;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

var count=0;
$(document).keypress(function(){
    if(count==0)
    nextSequence();
    count++;
}
)


function checkAnswer(currentLevel){
    var flag = 1;
    for(let i = 0;i<currentLevel ;i++){
        console.log(flag);
        if(gamePattern[i]==userClickedPattern[i])
        {
            continue;
        }
        else{
            flag = 0 ;
        }
    }

    if(flag===0){
        gameOver();
        gamePattern = [];
        userClickedPattern = [];
    }
    else{
        userClickedPattern=[];
        setTimeout(function() {
            nextSequence();
          }, 1300);
    }
}

function gameOver(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
}


function startOver(){
   count = 0;
   level = 0;
  
  
}