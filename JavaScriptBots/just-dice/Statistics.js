function updateProbability(gameResult) {
    if (gameResult >= cashout) {
        prob = prob * pwin;
    }
    else {
        prob = 1 - (1 - prob) * (1 - pwin);
    }
}

function winProb(cashOut) {
    var factor = Math.ceil(100 * cashOut);
    return 9900 / (101 * (factor - 1));
}

function totalWinProb(cashOut, gameCount) {
    var pwin = winProb(cashOut);
    var totalWinProb = pwin;

    for (var i = 0; i < gameCount - 1; i++)
        totalWinProb = 1 - (1 - totalWinProb) * (1 - pwin);

    return totalWinProb;
}

function gamesToLose(balance, initialBet, increaseOnLoss) {
    var bet = initialBet;
    var gameCount = 1;
    if (bet > 0) {
        while ((balance - bet) > 0) {
            gameCount += 1;
            bet = bet * increaseOnLoss;
        }
    }
    return gameCount;
}

function updateLossCount(lossCount, win) {
    if (!win)
        return lossCount + 1;
    else
        return 0;
}

function updateMaxLosses(maxLosses, lossCount) {
    if (lossCount > maxLosses)
        return lossCount;
    return maxLosses;
}

function updateAvgLosses(avgLosses, lossesCount, lastLossCount, win) {
    if (win)
        return ((avgLosses * lossesCount) + lastLossCount) / lossesCount;
    return avgLosses;
}

function updateLastBigLoss(bet, initialBet, balance, initialBalance) {
    if (bet == initialBet && balance < initialBalance)
        return new Date();
    return 0;
}

function calculateInitialStatistics(balance, initialBet, cashOut, increaseOnLoss) {
    bot_gamesToLose = gamesToLose(balance, initialBet, increaseOnLoss);
    $("#bot_gamesToLose").val(bot_gamesToLose);
    bot_probWin = totalWinProb(cashOut, bot_gamesToLose);
    $("#bot_probWin").val(bot_probWin);
    bot_Profit = 0;
    bot_InitialProfit = parseFloat($("#myprofit").val());

    bot_gameCount = 0;
    $("#bot_gameCount").val(bot_gameCount);
    bot_avgLosses = 0;
    $("#bot_avgLosses").val(bot_avgLosses);
    bot_maxLosses = 0;
    $("#bot_maxLosses").val(bot_maxLosses);
    bot_LastBigLoss = 0;
    $("#bot_LastBigLoss").val(bot_LastBigLoss);
    bot_lossCount = 0;
    $("#bot_lossCount").val(bot_lossCount);
    bot_balance = 0;
    $("#bot_balance").val(bot_balance);
    bot_Profit = 0;
    $("#bot_Profit").val(bot_Profit);
}

function calculateGameStatistics() {
    bot_gameCount += 1;
    $("#bot_gameCount").val(bot_gameCount);
    bot_avgLosses = updateAvgLosses(bot_avgLosses, bot_lossesCount, bot_lossCount, bot_win);
    $("#bot_avgLosses").val(bot_avgLosses);
    bot_maxLosses = updateMaxLosses(bot_lossCount, bot_maxLosses);
    $("#bot_maxLosses").val(bot_maxLosses);
    bot_LastBigLoss = updateLastBigLoss(bot_bet, bot_initialBet, bot_balance, bot_initialBalance);
    $("#bot_LastBigLoss").val(bot_LastBigLoss);
    bot_lossCount = updateLossCount(bot_lossCount, bot_win);
    $("#bot_lossCount").val(bot_lossCount);
    bot_balance = parseFloat($("#pct_balance").val());
    $("#bot_balance").val(bot_balance);
    bot_Profit = parseFloat($("#myprofit").val()) - bot_InitialProfit;
    $("#bot_Profit").val(bot_Profit);
}