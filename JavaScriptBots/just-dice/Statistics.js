
<th>Prob of Win</th>
<th>Games to Lose</th>
<th>Loss Count</th>
<th>Max Losses</th>
<th>Avg Losses</th>
<th>Balance</th>
<th>Profit</th>
<th>Last Big Loss</th>

function updateProbability(gameResult) {
    if (gameResult >= cashout) {
        prob = prob * pwin;
    }
    else {
        prob = 1 - (1 - prob) * (1 - pwin);
    }
}

function winProb(cashOut){
    var factor = Math.ceil(100 * cashOut);
    return 9900 / (101*(factor-1));
}

function nextBet(bet){
    return bet * increaseOnLoss;
}

function gamesToLose(balance){
    var bet = initialBalance;
    var gameCount = 1;
    while ((balance - bet)>0) {
        count +=1;
        bet =  nextBet(bet);
    }
}