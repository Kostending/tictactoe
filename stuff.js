$(function() {
	// Player array
	const players = {0: 'red', 1: 'blue'};
	// Number of rounds
	let turn = 0;
	// Winner
	let winner = null;

	// When field is clicked on, current player owns it
	$('.container').on('click', '.field', function(e) {
		let target = e.target;
		const currentPlayer = players[(turn % 2)];

		// Check for no overrides
		if($(target).attr('data-player') !== undefined) {
			return;
		}

		// Fix color and save current player to field
		$(target).css('background-color', currentPlayer);
		$(target).attr('data-player', currentPlayer);

		// Any winners ?
		checkForWinner(currentPlayer);

		// New turn
		turn++;

		// Draw ?
		if(turn > 8 && winner === null) {
			alert('Draw');
			location.reload();
		}
	});

	function checkForWinner(currentPlayer) {
		// Possible configurations for winning ...  hope i got em all;
		const winningConfigurations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

		// Check all possible configurations
		winningConfigurations.forEach(function(elem, index) {
			let wincount = 0;

			// Check fields for this win-configuration
			elem.forEach(function(elem) {
				let dataPlayer = $($('.field')[elem]).attr('data-player');
				if(dataPlayer === currentPlayer) {
					wincount++;
				}
			});

			// Winner ?
			if (wincount > 2) {
				winner = currentPlayer;
				alert(currentPlayer + " won the game");
				location.reload();
			}
		});
	}
});