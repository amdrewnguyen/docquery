const Coord = require('./coord.js');
const Board = require('./board.js');

class Snake {
  constructor(direction, segments) {
    this.direction = direction;
    this.segments = segments;
    this.grow = 1;
    this.length = 1;
    this.lastMoveDirection = direction;
    this.turnLock = false;
  }

  directionCoords() {
    switch (this.direction) {
      case "N":
        return [-1, 0];
      case "S":
        return [1, 0];
      case "E":
        return [0, 1];
      case "W":
        return [0, -1];
    }
  }

  

  includes(pos) {
    return this.segments.some(segment => Coord.equals(segment, pos));
  }

  incrementSize() {
    this.length++;
    this.grow--;
  }

  move() {
    const delta = {};
    delta.newHead = Coord.plus(this.segments[0], this.directionCoords());

    if (this.includes(delta.newHead)) throw "Ran into yourself!";
    this.segments.unshift(delta.newHead);

    if (this.grow > 0) {
      this.incrementSize();
      delta.oldTail = null;
    } else {
      delta.oldTail = this.segments.pop();
    }

    this.turnLock = false;
    return delta;
  }

  eatApple() {
    this.grow += 3;
  }

  turn(direction) {
    if (this.turnLock) {
      return;
    } else if (!Coord.isOpposite(this.direction, direction)) {
      this.direction = direction;
      this.turnLock = true;
    }
  }
}

module.exports = Snake;
