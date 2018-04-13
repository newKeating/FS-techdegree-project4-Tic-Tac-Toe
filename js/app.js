// Module Pattern
// !function () {
  const $startDiv = $('#start');
  const $boardDiv = $('#board');
  const $finishDiv = $('#finish');
  const $startButton = $('#start-button');
  const $playerOLi = $('#player1');
  const $playerXLi = $('#player2');
  const $boxes = $('.box');
  const boxes = document.querySelectorAll('.box');
  const $newGameButton = $('#newgame-button');

  // default player info objects
  const playerO = {
    active: false,
    win: false
  }
  const playerX = {
    active: false,
    win: false,
  }

  // This only shows start-screen.
  $boardDiv.hide();
  $finishDiv.hide();

  // when clicking the start-button, the game starts.
  $startButton.on('click', () => {
    $startDiv.hide();
    $boardDiv.show();
    // When the game starts, player-O is active by default.
    activePlayer('playerO');
  });

  // a function which adds '.active' class to the selected player.
  const activePlayer = (player) => {
    if(player === 'playerO') {
      playerO.active = true;
      $playerOLi.addClass('active');
      playerX.active = false;
      $playerXLi.removeClass('active');
    } else if(player === 'playerX') {
      playerO.active = false;
      $playerOLi.removeClass('active');
      playerX.active = true;
      $playerXLi.addClass('active');
    }
  }

  const boxFilled = (e) => {
    if($(e.target).hasClass('box-filled-1') || $(e.target).hasClass('box-filled-2')) {
      return true;
    } else {
      return false;
    }
  }

  // hover-event-listeners for boxes
  $boxes.mouseover((e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).addClass('box-hover-1');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).addClass('box-hover-2');
    }
  });
  $boxes.mouseleave((e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).removeClass('box-hover-1');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).removeClass('box-hover-2');
    }
  });
  // When clicking each box, the box is filled with the player's symbol(O/X) and color.
    // If the box is already filled, it cannot be filled with other symbol.
    // Whenever a user clicks a box, "decideWinner" function checks the winning condition and a winner.
  $boxes.on('click', (e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).addClass('box-filled-1');
      activePlayer('playerX');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).addClass('box-filled-2');
      activePlayer('playerO');
    }
    decideWinner(e);
    showWinner();
  });

  // a function checking three boxes for winning conditions.
  const checkWinningBoxes = (a, b, c) => {
    if (boxes[a].classList.contains('box-filled-1') && boxes[b].classList.contains('box-filled-1') && boxes[c].classList.contains('box-filled-1')) {
      return true;
    } else if (boxes[a].classList.contains('box-filled-2') && boxes[b].classList.contains('box-filled-2') && $boxes[c].classList.contains('box-filled-2')) {
      return true;
    } else {
      return false;
    }
  }

  // Switch the player's win status.
  const decideWinner = (e) => {
    if (checkWinningBoxes(0, 1, 2) || checkWinningBoxes(3, 4, 5) || checkWinningBoxes(6, 7, 8) || checkWinningBoxes(0, 3, 6) || checkWinningBoxes(1, 4, 7) || checkWinningBoxes(2, 5, 8) || checkWinningBoxes(0, 4, 8) || checkWinningBoxes(2, 4, 6)) {
      if($(e.target).hasClass('box-filled-1')) {
        playerO.win = true;
      } else if($(e.target).hasClass('box-filled-2')) {
        playerX.win = true;
      }
    }
  }

  // returns true only when all boxes are filled.
  const allBoxesFilled = () => {
      if(   (boxes[0].classList.contains('box-filled-1') || boxes[0].classList.contains('box-filled-2'))
        &&  (boxes[1].classList.contains('box-filled-1') || boxes[1].classList.contains('box-filled-2'))
        &&  (boxes[2].classList.contains('box-filled-1') || boxes[2].classList.contains('box-filled-2'))
        &&  (boxes[3].classList.contains('box-filled-1') || boxes[3].classList.contains('box-filled-2'))
        &&  (boxes[4].classList.contains('box-filled-1') || boxes[4].classList.contains('box-filled-2'))
        &&  (boxes[5].classList.contains('box-filled-1') || boxes[5].classList.contains('box-filled-2'))
        &&  (boxes[6].classList.contains('box-filled-1') || boxes[6].classList.contains('box-filled-2'))
        &&  (boxes[7].classList.contains('box-filled-1') || boxes[7].classList.contains('box-filled-2'))
        &&  (boxes[8].classList.contains('box-filled-1') || boxes[8].classList.contains('box-filled-2'))
    ) {
        return true;
      } else {
        return false;
      }
  }

  // checks a tie condition.
  const checkTie = () => {
    if( !playerO.win && !playerX.win && allBoxesFilled() ) {
      return true;
    } else {
      return false;
    }
  }

  // shows the finish div.
    // also adds winner's class to the finish div.
    // if there is no winner, show the finish div with a tie background.
  const showWinner = () => {
    let message = document.querySelector('.message');
    if(playerO.win) {
      $finishDiv.addClass('screen-win-one');
      message.textContent = 'Winner';
      $boardDiv.hide();
      $finishDiv.show();
    } else if(playerX.win) {
      $finishDiv.addClass('screen-win-two');
      message.textContent = 'Winner';
      $boardDiv.hide();
      $finishDiv.show();
    } else if(checkTie()) {
      $finishDiv.addClass('screen-win-tie');
      message.textContent = 'Draw';
      $boardDiv.hide();
      $finishDiv.show();
    }
  }

  // when a user clicks the new game button, the game resets.
  $newGameButton.on('click', () => {
    $finishDiv.hide();
    $boardDiv.show();
    // removes all box-filled classes
    boxes.forEach((box) => {
      if(box.classList.contains('box-filled-1')) {
        box.classList.remove('box-hover-1');
        box.classList.remove('box-filled-1');
      } else if (box.classList.contains('box-filled-2')) {
        box.classList.remove('box-hover-2');
        box.classList.remove('box-filled-2');
      }
    });
    // resets every other modified along the game.
    playerX.win = false;
    playerO.win = false;
    if($finishDiv.hasClass('screen-win-one')){
      $finishDiv.removeClass('screen-win-one');
    } else if($finishDiv.hasClass('screen-win-two')){
      $finishDiv.removeClass('screen-win-two');
    } else if($finishDiv.hasClass('screen-win-tie')){
      $finishDiv.removeClass('screen-win-tie');
    }
    // When the game starts, player-O is active by default.
    activePlayer('playerO');
  });
