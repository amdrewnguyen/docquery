/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(1);
const Snake = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Coord = {
  plus(coord1, coord2) {
    return[coord1[0] + coord2[0], coord1[1] + coord2[1]];
  },

  equals(coord1, coord2) {
    return (coord1[0] === coord2[0] && coord1[1] === coord2[1]);
  },

  isOpposite(direction1, direction2) {
    switch (direction1) {
      case "N":
        return direction2 === "S";
      case "S":
        return direction2 === "N";
      case "E":
        return direction2 === "W";
      case "W":
        return direction2 === "E";
    }
  },

  randomInterval() {
    return Math.floor(Math.random() * 7000);
  }
};

module.exports = Coord;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(3);

$( () => {
  const $rootEl = $('.snake-game');
  new View($rootEl);
});

console.log("A-OK!");


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class View {
  constructor($el) {
    this.el = $el;
    this.board = new Board();
    this.makeGrid();
    this.setSnake();
    this.renderApple();
    this.appleCounter = $('<label>');
    this.appleCounter.addClass("apple-counter");
    this.el.append(this.appleCounter);
    this.goldenApple = null;
    this.setAppleCounter();
    this.intervalID = setInterval(this.step.bind(this), 100);
    this.setKeyBinds();
  }

  setKeyBinds() {
    $('body').on("keydown", (e) => {
      // debugger
      switch (e.keyCode) {
        case 37:
        case 65:
          this.board.turnSnake("W");
          break;
        case 38:
        case 87:
          this.board.turnSnake("N");
          break;
        case 39:
        case 68:
          this.board.turnSnake("E");
          break;
        case 40:
        case 83:
          this.board.turnSnake("S");
          break;
        default:
          break;
      }
    });
  }

  renderApple() {
    this.getLi(this.board.apple).toggleClass("empty apple");
  }

  setSnake() {
    this.board.snake.segments.forEach((segment) => {
      const $segmentLi = this.getLi(segment);
      $segmentLi.toggleClass("snake empty");
      $segmentLi.toggleClass("top bot dex sin");
    });
  }

  setAppleCounter() {
    this.appleCounter.text(`Apples Eaten: ${this.board.applesEaten}`);
  }

  renderNewSnakeHead(pos) {
    // called after new head added to segments
    const $newSnakeHeadLi = this.getLi(pos);
    $newSnakeHeadLi.removeClass("apple empty");
    $newSnakeHeadLi.addClass("snake");
    const oldHead = this.board.snake.segments[1];
    const dirY = pos[0] - oldHead[0];
    const dirX = pos[1] - oldHead[1];
    const newBorderArray = [];
    const oldBorderArray = [];
    if (dirX === 1) {
      newBorderArray.push("dex", "top", "bot");
      oldBorderArray.push("dex");
    } else if (dirX === -1) {
      newBorderArray.push("sin", "top", "bot");
      oldBorderArray.push("sin");
    } else if (dirY === 1) {
      newBorderArray.push("dex", "sin", "bot");
      oldBorderArray.push("bot");
    } else if (dirY === -1) {
      newBorderArray.push("dex", "sin", "top");
      oldBorderArray.push("top");
    }
    this.getLi(pos).toggleClass(newBorderArray.join(" "));
    this.getLi(oldHead).toggleClass(oldBorderArray.join(" "));
  }

  renderNewTail(oldLoc, newLoc) {
    const $oldTail = this.getLi(oldLoc);
    $oldTail.removeClass("top bot dex sin snake");
    $oldTail.addClass("empty");
    const newTail = this.getLi(newLoc);
    const dirY = newLoc[0] - oldLoc[0];
    const dirX = newLoc[1] - oldLoc[1];
    if (dirX === 1) {
      newTail.toggleClass("sin");
    } else if (dirX === -1) {
      newTail.toggleClass("dex");
    } else if (dirY === 1) {
      newTail.toggleClass("top");
    } else if (dirY === -1) {
      newTail.toggleClass("bot");
    }
  }

  isOffGrid(pos) {
    if (pos[0] < 0 || pos[1] < 0 || pos[0] >= 20 || pos[1] >= 20) {
      return true;
    }
    return false;
  }

  youLose(e) {
    clearInterval(this.intervalID);
    alert(`${e} You lose!`);
  }

  renderGoldenApple(pos) {
    this.goldenApple = pos;
    const $goldApple = this.getLi(pos);
    $goldApple.removeClass("empty");
    $goldApple.addClass("gold-apple");
  }

  destroyGoldenApple(pos) {
    this.goldenApple = null;
    const $goldApple = this.getLi(pos);
    $goldApple.removeClass("gold-apple");
    $goldApple.addClass("empty");
  }

  step() {
    let delta;
    try {
      delta = this.board.step();
    } catch(e) {
      console.log(e);
      this.youLose(e);
      return;
    }

    const $newHeadLi = this.getLi(delta.newHead);

    if (!this.goldenApple && delta.goldenApple) {
      this.renderGoldenApple(delta.goldenApple);
    } else if (!delta.goldenApple && this.goldenApple) {
      this.destroyGoldenApple(this.goldenApple);
    }

    if (delta.ateApple) {
      this.renderApple();
    }
    this.setAppleCounter();

    this.renderNewSnakeHead(delta.newHead);

    if (delta.oldTail !== null) {
      this.renderNewTail(delta.oldTail, ...this.board.snake.segments.slice(-1));
    }

  }

  getLi(pos) {
    return this.$squares[pos[0]][pos[1]];
  }

  makeGrid() {
    const squares = new Array(20);
    const $grid = $("<ul>");
    $grid.addClass("grid");

    for(let i = 0; i < 20; i++){
      squares[i] = [];
      for(let j = 0; j < 20; j++){
        const $square = $('<li>');
        $square.addClass("empty");
        squares[i].push($square);
        $grid.append($square);
      }
    }
    this.el.append($grid);
    this.$squares = squares;
  }
}

module.exports = View;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(1);
const Board = __webpack_require__(0);

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


/***/ })
/******/ ]);