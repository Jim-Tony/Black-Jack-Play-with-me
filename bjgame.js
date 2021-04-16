
let blackjackgame ={
    'you' : {'scorespan': '#black-jack-your-result', 'div':'#your-box','score':0},
    'dealer' : {'scorespan': '#black-jack-dealer-result', 'div':'#Dealer-box','score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap' : {'2': 2,'3':3, '4':4, '5':5,'6':6,'7':7,'8':8,'9':9,'10':10, 'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' :0,
    'isStand' : false,
    'isTurnover' : false,

};


//let ran = blackjackgame['cards'][Math.floor(Math.random()*13)];


const YOU = blackjackgame['you'];
const DEALER = blackjackgame['dealer'];
const hitsound = new Audio('sounds/swish.m4a');
const winsound = new Audio('sounds/cash.mp3');
const losssound = new Audio('sounds/aww.mp3');


document.querySelector('#button-deal').addEventListener('click',blackjackdeal);
document.querySelector('#button-stand').addEventListener('click',dealerlogic);
document.querySelector('#button-hit').addEventListener('click',buttonhitgame);

function buttonhitgame(){
    if(blackjackgame['isStand']===false){
        const card_random = card_rand();
        console.log(card_random);
        showcards(card_random,YOU);
        updateScore(card_random,YOU);
        // console.log(YOU['score']);
        show_score_span(YOU);
    }
}

function card_rand(){
    let ran = Math.floor(Math.random()*13);
    return blackjackgame['cards'][ran];
}

function showcards(_card_random_1, selector){
    if(selector['score']<=21){
        let card_image = document.createElement('img');
        card_image.src = 'images/'+_card_random_1+'.png';
        document.querySelector(selector['div']).appendChild(card_image);
        hitsound.play();
    }
}

function blackjackdeal(){
    // showResult(comupteWinner());
    if(blackjackgame['isTurnover']===true){
        blackjackgame['isStand'] = false;
        let collect_images_you  =  document.querySelector('#your-box').querySelectorAll('img');
        let collect_images_dealer  =  document.querySelector('#Dealer-box').querySelectorAll('img');
        for(let i=0;i<collect_images_dealer.length;i++){
            collect_images_dealer[i].remove();
            }
    // console.log(collect_images_you);
        for(let i=0;i<collect_images_you.length;i++){
            collect_images_you[i].remove(); 
                 }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#black-jack-your-result').textContent = 0;

        document.querySelector('#black-jack-dealer-result').textContent = 0;

        document.querySelector('#black-jack-your-result').style.color  =  'white';
        document.querySelector('#black-jack-dealer-result').style.color  =  'white';
        let text1 = "Let's Play";
        document.querySelector('#bj-result').textContent = text1;
        document.querySelector('#bj-result').style.color = 'black';
        }
    
}
function updateScore(_card,_activeplayer){
    if(_card === 'A'){
        if((_activeplayer['score'] + blackjackgame['cardsMap'][_card][1])<=21){
            _activeplayer['score']+= blackjackgame['cardsMap'][_card][1];
        }
        else{
            _activeplayer['score']+= blackjackgame['cardsMap'][_card][0];
        }
    }
    else{
    _activeplayer['score'] += blackjackgame['cardsMap'][_card];
}
}
function show_score_span(__activeplayer){
    if(__activeplayer['score']>21){

        document.querySelector(__activeplayer['scorespan']).textContent = 'BUST!';
        document.querySelector(__activeplayer['scorespan']).style.color = 'red';
    }
    else{
        document.querySelector(__activeplayer['scorespan']).textContent = __activeplayer['score']; 
}
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));  
}
async function dealerlogic(){
    blackjackgame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackgame['isStand'] === true){
        const card_random = card_rand();
        // console.log(card_random);
        showcards(card_random,DEALER);
        updateScore(card_random,DEALER);
        show_score_span(DEALER);
        await sleep(1000);
    }
     blackjackgame['isTurnover'] = true;
     let winner = comupteWinner();
     showResult(winner);
}
function comupteWinner(){
    let winner;
    //Dealer busts!!!
    if(YOU['score']<=21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] >21){
            console.log('Yo won');
            blackjackgame['wins']++;
            winner  = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            console.log('Dealer won');
            blackjackgame['losses']++;

            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            blackjackgame['draws']++;

            console.log('You drew');
        }
    }
    // User busts!!!
    else if(YOU['score']>21 && DEALER['score'] <=21){
        console.log('You lost');
        blackjackgame['losses']++;

        winner = DEALER;
    }
    //Both busts
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('You drew');
        blackjackgame['draws']++;

    }
    console.log('Winner is', winner);

    return winner;
}
function showResult(winner){
    let msg,msgcolor
    if(blackjackgame['isTurnover']===true){
        
        if(winner === YOU){
            document.querySelector('#black-jack-wins').textContent = blackjackgame['wins'];
            msg = 'You won';
            msgcolor   = 'green';
            winsound.play();
        }
        
        else if(winner === DEALER){
            document.querySelector('#black-jack-losses').textContent = blackjackgame['losses'];
            msg = 'You lost';
            msgcolor   = 'red';
            losssound.play();
        }
        else{
            document.querySelector('#black-jack-draws').textContent = blackjackgame['draws'];
            msg = 'You drew';
            msgcolor = 'black';
        }
        document.querySelector('#bj-result').textContent = msg;
        document.querySelector('#bj-result').style.color = msgcolor;
    }

}