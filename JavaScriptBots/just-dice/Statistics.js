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

function totalWinProb(cashOut, gameCount){
    var winProb = winProb(cashOut);
    var totalWinProb = winProb;

    for (var i = 0; i < gameCount-1; i++)
        totalWinProb = 1 - (1 - totalWinProb) * (1 - pwin);

    return totalWinProb;
}

function nextBet(bet){
    return bet * increaseOnLoss;
}

function gamesToLose(balance, initialBet){
    var bet = initialBet;
    var gameCount = 1;
    while ((balance - bet)>0) {
        count +=1;
        bet =  nextBet(bet);
    }
    return gameCount;
}

function updateLossCount(lossCount, win){
    if (!win) 
        return lossCount + 1;
    else
        return 0;
}

function updateMaxLosses(maxLosses, lossCount){
    if (lossCount > maxLosses)
        return lossCount;
    return maxLosses;
}

function updateAvgLosses(avgLosses, lossesCount, lastLossCount, win){
    if (win)
        return ((avgLosses * lossesCount) + lastLossCount)/lossesCount;
    return avgLosses;
}

function calculateInitialStatistics(){
    bot_gamesToLose = gamesToLose(balance, initialBet);
    $("#bot_gamesToLose").val(bot_gamesToLose);
    bot_gamesToLose = totalWinProb(cashOut, gameCount);
    $("#bot_gamesToLose").val(bot_gamesToLose);
}

function calculateGameStatistics(){ 
    bot_gameCount += 1;
    $("#bot_gameCount").val(bot_gameCount);
    bot_avgLosses = updateAvgLosses(bot_avgLosses, bot_lossesCount, bot_lossCount, bot_win);
    $("#bot_avgLosses").val(bot_avgLosses);
    bot_maxLosses = updateMaxLosses(bot_lossCount, bot_maxLosses);
    $("#bot_maxLosses").val(bot_maxLosses);
    bot_LastBigLoss = updateLastBigLoss();
    $("#bot_LastBigLoss").val(bot_LastBigLoss);
    bot_lossCount = updateLossCount(bot_lossCount, bot_win);
    $("#bot_lossCount").val(bot_lossCount);
    bot_balance
    bot_Profit
}