var game = function(height, width, numOfEnemies) {
  // make object gameOptions to hold all the game options
  var gameOptions = {
    height: height,
    width: width,
    numberOfEnemies: numOfEnemies
  };
  var highScore = 0;
  var currentScore = 0;
  // make the svg element
  var svg = d3.select("#gameBoard").append("svg").attr("height", gameOptions.height).attr("width", gameOptions.width);

  d3.select("#score").append("h3").text("High Score: " + highScore).attr("class", "highscore");
  d3.select("#score").append("h3").text("My Score: " + currentScore).attr("class", "myscore");

  // make our enemy class
  var Enemy = function(i) {
    var enemy = {
      "id": i,
      "x": Math.random() * width, // *100 to navigate on x-axis when range is 0-100
      "y": Math.random() * height, // *100 to navigate on y-axis when range is 0-100
      "r": 14
    };
    return enemy;
  };

  var Player = function() {
    var player = {
      "id" : 'player',
      "x": gameOptions.width * 0.5,
      "y": gameOptions.height * 0.5,
      "r": 12
    };
    return player;
  };

  // makes the array of objects
  var enemyData = _.range(0, gameOptions.numberOfEnemies).map(function(i){
    return Enemy(i);
  });
  var playerData = [Player()];

  // sets pairs for all enemies and player
  var enemies = svg.selectAll("circle.enemy").data(enemyData);
  var player = svg.selectAll("circle.player").data(playerData);

  // performs the dragging
  var dragMove = d3.behavior.drag()
    .on('drag', function(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;
      d3.select(this).attr('cx', function(d) {return d.x;}).attr('cy', function(d) {return d.y;});
    });

  // collisionChecker
  var collisionChecker = function() {
    var playerX = d3.select("circle.player").attr("cx");
    var playerY = d3.select("circle.player").attr("cy");
    var playerR = d3.select("circle.player").attr("r");
    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    var enemyR = d3.select(this).attr("r");
    var distance;
    distance = Math.sqrt(Math.pow(enemyX - playerX, 2) + Math.pow(enemyY - playerY, 2)) - enemyR - playerR;
    if (distance < 0) {
        console.log("collision!");
        if (currentScore > highScore) {
          highScore = currentScore;
          d3.select(".highscore").text("High Score: " + highScore);
        }
        currentScore = 0;
        d3.select(".myscore").text("My Score: " + currentScore);
    } else {
      currentScore++;
      d3.select(".myscore").text("My Score: " + currentScore);
    }
  };

  //updates enemies
  var updateEnemies = function(data) {
    enemies.transition()
      .duration(500)
      .attr('cx', function(d) {return Math.random() * gameOptions.width;})
      .attr('cy', function(d) {return Math.random() * gameOptions.height;});
  };

  // appends enemies with styles
  enemies.enter().append("circle")
    .attr("class", "enemy")
    .attr("fill", "#0671FF")
    .attr("cx", function(d){return d.x;})
    .attr("cy", function(d) {return d.y;})
    .attr("r", function(d){return d.r;});

  //// appends player with styles
  player.enter().append("circle")
    .attr("class", "player")
    .attr("fill", "#FF2B18")
    .attr("cx", function(d) {return d.x;})
    .attr("cy", function(d) {return d.y;})
    .attr("r", function(d){return d.r;})
    .call(dragMove);

// function calls with setInterval
  setInterval(updateEnemies, 1000);
  var checkCollisions = function(data) {
    enemies.each(collisionChecker);
  };
  setInterval(checkCollisions, 50);
};

game(455, 765, 20);
