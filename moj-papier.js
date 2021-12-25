const gameSummary = { 
    numbers: 0,
    wins: 0,
    looses: 0,
    draws: 0
}

const game = {
    playerHand: '',
    aiHand: ''
}


const images =[...document.querySelectorAll('.select img')];

function imgSelection() {
    game.playerHand = this.dataset.option;
    images.forEach((img) => {
        img.style.boxShadow = "";
    });
    this.style.boxShadow = '0 0 0 10px red';
}

images.forEach((img) => {
    img.addEventListener('click', imgSelection);
});

function aiChoose() {
    const aiHand = images[Math.floor(Math.random()*3)].dataset.option;
    return aiHand;
}

function gameResult() {
    console.log(game.playerHand, game.aiHand)
        if (game.playerHand === game.aiHand) {
            return 'draw';
        } else if ((game.playerHand === 'papier'&& game.aiHand === 'kamień') ||
        (game.playerHand === 'nożyce' && game.aiHand === 'papier')||
        (game.playerHand === 'kamień' && game.aiHand === 'papier')) {
            return 'win';
        } else {
            return 'loose';
        }    
    }

function addResult(playerHand, aiHand, result) {
    document.querySelector('[data-summary = "your-choice"]').textContent = playerHand;
    document.querySelector('[data-summary = "ai-choice"]').textContent = aiHand;
    if (result === 'draw') {
       document.querySelector('[data-summary = "who-win"]').textContent = "REMIS";
       document.querySelector('[data-summary = "who-win"]').style.color = 'blue';
       gameSummary.draws++;
       document.querySelector('.draws span').textContent = gameSummary.draws;
    }
    if (result === 'win') {
        document.querySelector('[data-summary = "who-win"]').textContent = "TY WYGRAŁEŚ! :)";
        document.querySelector('[data-summary = "who-win"]').style.color = 'green';
        gameSummary.wins++;
        document.querySelector('.wins span').textContent = gameSummary.wins;
    }
    if (result === 'loose') {
        document.querySelector('[data-summary = "who-win"]').textContent = "AI CIE PRZECHYTRZYŁ! :(";
        document.querySelector('[data-summary = "who-win"]').style.color = 'red';
        gameSummary.looses++;
        document.querySelector('.looses span').textContent = gameSummary.looses;
    }
}

function endGame() {
    document.querySelector(`[data-option ='${game.playerHand}']`).style.boxShadow = "";
    game.playerHand = '';
}

function startGame() {
    if (game.playerHand === '') {
        alert('Wybierz obrazek !!!');
    }
    if (game.playerHand !='') {
        game.aiHand = aiChoose();
        const result = gameResult(game.playerHand, game.aiHand);
        addResult(game.playerHand, game.aiHand, result);
        document.querySelector('.numbers span').textContent = ++gameSummary.numbers;
        endGame();
    }
}

document.querySelector('button').addEventListener('click', startGame);
