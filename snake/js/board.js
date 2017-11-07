const Coord = require('./coord.js');
const Snake = require('./snake.js');

class Board {
  constructor() {
    const startX = Math.floor(Math.random() * 10) + 5;
    const startY = Math.floor(Math.random() * 10) + 5;
    const startDir = ["N", "S", "E", "W"][Math.floor(Math.random() * 4)];
    this.snake = new Snake(startDir, [[startX, startY]]);
    this.apple = this.getFreeCell();
    this.goldenApple = null;
    this.applesEaten = 0;
    setInterval(this.makeGoldenApple.bind(this), Coord.randomInterval());
  }

  makeGoldenApple() {
    this.goldenApple = this.getFreeCell();
    setInterval(this.destroyGoldenApple.bind(this), 4000);
  }

  destroyGoldenApple() {
    if (this.goldenApple) {
      this.goldenApple = null;
    }
    setInterval(this.makeGoldenApple.bind(this), Coord.randomInterval());
  }

  isOccupied(pos) {
    let x = pos[0];
    let y = pos[1];
    if (this.snake.includes([x, y])) {
      return true;
    } else if (this.apple && Coord.equals([x, y], this.apple)) {
      return true;
    } else if (this.goldenApple) {
      return Coord.equals([x, y], this.goldenApple);
    } else {
      return false;
    }
  }

  getFreeCell() {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * 20);
      y = Math.floor(Math.random() * 20);
    }
    while (this.isOccupied([x, y]));

    return [x, y];
  }

  isOffGrid(pos) {
    if (pos[0] < 0 || pos[1] < 0 || pos[0] > 19 || pos[1] > 19) return true;
    return false;
  }

  step() {
    let delta;
    try {
      delta = this.snake.move();
    } catch(e) {
      console.log(e);
      throw e;
    }

    if (this.isOffGrid(delta.newHead)) throw "Ran into wall!";

    if (Coord.equals(delta.newHead, this.apple)) {
      delta.ateApple = true;
      this.snake.eatApple();
      this.apple = this.getFreeCell();
      this.applesEaten++;
    }

    if (this.goldenApple && Coord.equals(delta.newHead, this.goldenApple)) {
      this.goldenApple = null;
      this.applesEaten += 3;
    }
    delta.goldenApple = this.goldenApple;
    return delta;
  }

  turnSnake(direction) {
    this.snake.turn(direction);
  }
}

module.exports = Board;
