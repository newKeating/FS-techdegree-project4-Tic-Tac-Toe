!function () {
  const $startDiv = $('#start');
  const $boardDiv = $('#board');
  const $finishDiv = $('#finish');
  const $startButton = $('#start-button');
  const $player1Li = $('#player1');
  const $player2Li = $('#player2');
  // This only shows start-screen.
  $boardDiv.hide();
  $finishDiv.hide();

  // player info constructor function
  // function playerInfo(player, ) {
  //
  // }

  // when clicking the start-button, the game starts.
  $startButton.on('click', () => {
    $startDiv.hide();
    $boardDiv.show();
  });

  // Player1 becomes active by default.
  $player1Li.addClass('active');

} ();
