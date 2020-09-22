/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying;


init();




//writes text content on webpage where id=score-0
//document.querySelector('#score-0').textContent = dice;

//writes html code specified in the string
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


//reads value from html where id is score-0 and store in var x
//var x = document.querySelector('#score-0').textContent;
//console.log(x);




//applies given css properties to mentioned class or id......syntax:- stytle.property = 'value'

function hideDice(){
    //applies given css properties to mentioned class or id......syntax:- stytle.property = 'value'
    document.querySelector('.dice').style.display = 'none';
}


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        hideDice();
}



document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        
        //1.Random number

        //returns random number between 1 and 6 and stores in dice
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Diisplay the result

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3.Update the round score if the roll was not 1

        if(dice !== 1){
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){

        //1. Add current score to global score

        scores[activePlayer] +=  roundScore;

        //2. Update the UI

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        

        //4. Check if player won the game

        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click',init);

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //this is only used for id
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');

    hideDice();
}