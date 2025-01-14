
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#start-btn").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-btn").hide(); // Hide the button after starting the game
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $("#start-btn").show(); // Show the button again to restart
}
// Show the modal when the instructions button is clicked
$("#instructions-btn").click(function() {
  $("#instructions-modal").fadeIn(); // Show the modal
});

// Close the modal when the close button is clicked
$("#close-modal").click(function() {
  $("#instructions-modal").fadeOut(); // Hide the modal
});

// Close the modal when clicking outside of it
$(window).click(function(event) {
  if ($(event.target).is("#instructions-modal")) {
    $("#instructions-modal").fadeOut(); // Hide the modal
  }
});
