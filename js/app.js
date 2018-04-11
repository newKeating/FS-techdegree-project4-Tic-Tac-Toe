!function () {
  const $startDiv = $('#start');
  const $boardDiv = $('#board');
  const $finishDiv = $('#finish');
  const $startButton = $('#start-button');
  const $playerOLi = $('#player1');
  const $playerXLi = $('#player2');
  const $box = $('.box');

  // default player info objects
  const playerO = {
    active: false,
    moves: 0,
    win: false
  }
  const playerX = {
    active: false,
    moves: 0,
    win: false,
  }

  // This only shows start-screen.
  $boardDiv.hide();
  $finishDiv.hide();

  // when clicking the start-button, the game starts.
  $startButton.on('click', () => {
    $startDiv.hide();
    $boardDiv.show();
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

  // When the game starts, player-O is active by default.
  activePlayer('playerO');

  // hover-event-listeners for boxes
  $box.mouseover((e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).addClass('box-hover-1');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).addClass('box-hover-2');
    }
  });
  $box.mouseleave((e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).removeClass('box-hover-1');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).removeClass('box-hover-2');
    }
  });
  // When clicking each box, the box is filled with the player's symbol(O/X) and color.
  $box.on('click', (e) => {
    if(playerO.active && !boxFilled(e)) {
      $(e.target).addClass('box-filled-1');
      activePlayer('playerX');
    } else if(playerX.active && !boxFilled(e)) {
      $(e.target).addClass('box-filled-2');
      activePlayer('playerO');
    }
  });
} ();
