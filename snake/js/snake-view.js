const Board = require("./board.js");

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
