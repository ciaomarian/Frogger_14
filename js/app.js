'use strict';
let speed = 1;
let mapWidth = 600;
let collision = 0;
let win = 0;
let successSound = new Audio('sounds/Success.mp3');
let mistakeSound = new Audio('sounds/Mistake.mp3');
let starOne = document.getElementById('star1');
let starTwo = document.getElementById('star2');
let starThree = document.getElementById('star3');

//Randomize speed of the bug movement across the screen
function randomSpeed() {
  return Math.floor(Math.random() * 200);
}

// Enemies our player must avoid
const Enemy = function (enemySpeed, x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.baseSpeed = 250;
  this.speed = enemySpeed + this.baseSpeed;
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;
  if (this.x >= mapWidth) {
    this.x = -100;
    this.y = this.y;
    this.speed = randomSpeed() + this.baseSpeed;
  }

  // Enemy bug collision 
  if (player.x < this.x + 60 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
    player.x = 200;
    player.y = 400;
    mistakeSound.play();
    collision++;
    lives();
  }

  //Star ratings decrease as enemy obstacles are hit
  function lives() {
    if (collision === 1) {
      starOne.style.visibility = 'hidden';
    }
    if (collision === 2) {
      starTwo.style.visibility = 'hidden';
    }
    if (collision === 3) {
      starThree.style.visibility = 'hidden';
      youLose();
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy bug variables controlling random speed and position
const bug1 = new Enemy(randomSpeed(), -100, 220);
const bug2 = new Enemy(randomSpeed(), -100, 140);
const bug3 = new Enemy(randomSpeed(), -100, 50);
const bug4 = new Enemy(randomSpeed(), -100, 55);

//Player Class for hero image
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
  }

  update() {
    this.render;
    //Sucess sound when reaching the water
    if (this.y < 1) {
      this.x = 200;
      this.y = 400;
      win++;
      successSound.play();
      youWin();
    }
  }
  //Render player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

//Player wins the game after reaching water 3 times sucessfully without collision with enemy
function youWin() {
  if (win === 3) {
    let winModal = document.getElementById('winModal');
    winModal.style.display = "block";
  }
}

//Player loses the game by colliding with enemy bugs 3 times
function youLose() {
  let loseModal = document.getElementById('loseModal');
  loseModal.style.display = "block";
}

//Game restarts after clicking the modal restart button
function restartGame() {
  starOne.style.visibility = "visible";
  starTwo.style.visibility = "visible";
  starThree.style.visibility = "visible";
  player.x = 200;
  player.y = 400;
  collision = 0;
  win = 0;
  //Modals are hidden from canvas
  document.getElementById('loseModal').style.display = "none";
  document.getElementById('winModal').style.display = "none";
}

//Keyboard input moves the player left, right, up, down across the game canvas
Player.prototype.handleInput = function (keyInput) {
  switch (keyInput) {
    case 'left':
      if (player.x >= 50) {
        player.x -= 100;
      }
      break;
    case 'right':
      if (player.x <= 300) {
        player.x += 100;
      }
      break;
    case 'up':
      if (player.y > 0) {
        player.y -= 83;
      }
      break;
    case 'down':
      if (this.y <= 300) {
        this.y += 83;
      }
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


//No need to create enemies in separate variables. You can do it like this:

const player = new Player(200, 400);
const allEnemies = [bug1, bug2, bug3, bug4];

// Event Listener responds to key presses and directs navigation of player
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
