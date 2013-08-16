// Draw the enemies in an svg element.
// Make it so that the enemies move to a new random location every second.
// Make a differently-colored dot to represent the player. Make it draggable.
// Detect when a enemy touches you.
// Keep track of the user's score, and display it.
//
// make a player
//   move relative, move absolute, get and set x and y.
//   needs to be an SVG
// make an enemy
//   has x, y, radius
//   next position
// make an array of enemies
// render the enemies
// make a gameboard (axes)
// make game options and game stats
// make function to actually play (increment scores, generate new enemies, etc.) enter, update, edit
// make collission detection function
// make dragging functionality
// update scores

// append svg tag to the body within a variable

var game = function(height, width, numOfEnemies) {
  // make object gameOptions to hold all the game options
  var gameOptions = {
    height: height,
    width: width,
    numberOfEnemies: numOfEnemies
  };

  // make the svg element
  var svg = d3.select("#gameBoard").append("svg").attr("height", gameOptions.height).attr("width", gameOptions.width);

  // make our enemy class
  var Enemy = function(i) {
    var enemy = {
      "id": i,
      "x": Math.random() * width, // *100 to navigate on x-axis when range is 0-100
      "y": Math.random() * height, // *100 to navigate on y-axis when range is 0-100
      "r": 10
    };
    return enemy;
  };

  // makes the array of objects
  var data = _.range(0, gameOptions.numberOfEnemies).map(function(i){
    return Enemy(i);
  });

  console.log(data);
  var enemies = svg.selectAll("circle.enemy").data(data);
  enemies.enter().append("circle").attr("class", "enemy").attr("fill", "black").attr("cx", function(d){return d.x;}).attr("cy", function(d) {return d.y;}).attr("r", function(d){return d.r;});

  // d3 to make one black circle in the svg
  // d3.select("svg").append("circle").attr("class", "enemy").attr("cx", "100px").attr("cy", "100px").attr("r", "5px").attr("fill", "black");
  //Function to generate all enemies
  //
};

game(700, 700, 10);
