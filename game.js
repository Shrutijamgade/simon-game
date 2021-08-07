
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];


//User clicks on button
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//Call nextSequence on keypress
$(document).keypress(function () {
    // console.log("Key is pressed");
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }

    }
    else {
        $("body").addClass("game-over");
        playSound("wrong");
        console.log("Wrong");
        $("h1").text("Game Over, Press Any Key To Restart.");
        startOver();
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200)
    }
    
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

const startOver = () => {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern=[]

}

const playSound = (name) => {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);

}

