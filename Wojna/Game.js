class Game {
    constructor() {
        let _isGameStarted = false;
        let _choosenPlayerImg = document.getElementById('choosenPlayer');
        let _choosenComputerImg = document.getElementById('choosenComputer');
        let _choosenPlayerImg2 = document.getElementById('choosenPlayer2');
        let _choosenComputerImg2 = document.getElementById('choosenComputer2');

        let _cardsManager = new CardsManager(_choosenPlayerImg, _choosenComputerImg, _choosenPlayerImg2, _choosenComputerImg2);

        let _card = document.querySelector('.card');
        let _card2 = document.querySelector('.card2');

        let _winsPlayerSpan = document.querySelector("p.wins-player span"); //TODO ...Span w nazwie
        let _winsComputerSpan = document.querySelector("p.wins-computer span");
        let _drawsSpan = document.querySelector("p.draws span");
        let _whoWinSpan = document.querySelector('[data-summary="who-win"]');

        let _statistics = new Statistics(_winsPlayerSpan, _winsComputerSpan, _drawsSpan, _whoWinSpan);

        let _startButton = document.getElementsByClassName('start')[0];
        _startButton.addEventListener('click', () => {
            if (_isGameStarted) return;

            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

            _card.classList.remove('is-none');
            _card2.classList.remove('is-none');

            _cardsManager.generateCards();
            _cardsManager.giveCards();
            _statistics.clear();

            _cardsManager.makeNextTurn();

            let lastTurnResult = _cardsManager.getLastTurnResult();
            _statistics.givePointWinner(lastTurnResult);

            _cardsManager.logCards();

            _isGameStarted = true;
        });

        let _nextTurnButton = document.getElementsByClassName('next')[0];
        _nextTurnButton.addEventListener('click', () => {
            if (!_isGameStarted) return;

            _card.classList.toggle('is-flipped');
            _card2.classList.toggle('is-flipped');

            console.log('--------------------------------------')
            if (_cardsManager.makeNextTurn()) {
                _cardsManager.clearCards();
                _whoWinSpan.textContent = "KONIEC GRY";
                drawTitle("KONIEC GRY");
                _isGameStarted = false;
                console.log('koniec gry!!!');
                setTimeout(() => {
                    location.reload();
                }, 5000);
            } else {
                let lastTurnResult = _cardsManager.getLastTurnResult();
                setTimeout(() => {
                    _statistics.givePointWinner(lastTurnResult)
                }, 1000);
            }



            _cardsManager.logCards();
            console.log('--------------------------------------')
        });
    }
}