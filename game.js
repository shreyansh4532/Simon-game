var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

// Detecting which btn was clicked

var userClickedPattern = [];

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

checkAnswer(userClickedPattern.lastIndexOf(userChosenColour))  ;

});


function nextSequence() {

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// Playing the sound

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// Animating the clicked button

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)

}

var level = 0;

var started = false;

$(document).on("keypress", function() {

  if (!started) {

    $("h1").text("Level 0");
    nextSequence();
    started = true;

  }

});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
              nextSequence();
            }, 1000);
            userClickedPattern = [];

      }

    }

   else {
    var wrongSound = new Audio("sounds/wrong.mp3")
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    restart();
  }

}

function restart() {

  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;

}
