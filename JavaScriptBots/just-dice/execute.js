$($(".wrapper .container")[0]).css("display", "none");
$($(".wrapper .container")[1]).css("display", "none");
$($(".wrapper .container")[2]).css("display", "none");
$(".wrapper").prepend("<fieldset> <div class='row'> <p class='llabel'>cashOut</p> <input id='bot_cashOut' tabindex='1' value='10' type='number'> <p class='rlabel'>x</p> </div> <div class='row'> <p class='llabel'>incOnLoss</p> <input id='bot_increaseOnLoss' tabindex='3' value='1.113'> <p class='rlabel'>x</p> </div> </fieldset><fieldset> <div class='row'> <p class='llabel'>Initial Bet</p> <input id='bot_betBalancePercentage' tabindex='1' value='0.00001'> <p class='rlabel'>%</p> </div> <div class='row'> <p class='llabel'>bet Limit</p> <input id='bot_betLimit' tabindex='1' value='0.5'> <p class='rlabel'>%</p> </div> </fieldset><div class='big'> <div class='fleft'> <div class='button_group'> <div class='button_inner_group'> <button id='bot_update' class='play'> <b>Update Param</b> <div id='b_update' class='target'></div> </button> </div> <div class='button_inner_group'> <button id='bot_play' class='play'> <b>Bot Play</b> <div id='b_play' class='target'></div> </button> </div> <div class='button_inner_group'> <button id='bot_stop' class='play'> <b>Bot Stop</b> <div id='b_stop' class='target'></div> </button> </div> </div> </div> </div> <div class='chatstat'> <table> <tbody> <tr> <th></th> <th>Prob of Win</th> <th>Games to Lose</th> <th>Game Count</th> <th>Loss Count</th> <th>Max Losses</th> <th>Avg Losses</th> <th>Last Big Loss</th> <th>Balance</th> <th>Profit</th> </tr> <tr> <th>Statistics</th> <td><span class='bot_probWin'>0%</span></td> <td><span class='bot_gamesToLose'>0</span></td> <td><span class='bot_gameCount'>0</span></td> <td><span class='bot_lossCount'>0</span></td> <td><span class='bot_maxLosses'>0</span></td> <td><span class='bot_avgLosses'>0</span></td> <td><span class='bot_LastBigLoss'>0</span></td> <td><span class='bot_balance'>0</span></td> <td><span class='bot_profit'>0</span></td> </tr> </tbody> </table> </div>");

//////////////////////
//global variables
//////////////////////

var bot_cashOut = 10;//value to cash Out
var bot_increaseOnLoss = 1.113;//value to multipli the last bet
var bot_betBalancePercentage = 0//0.00001;//percentege of the balance of the first bet
var bot_initialBalance = parseFloat($("#pct_balance").val());//initial balance
var bot_initialBet = bot_betBalancePercentage * bot_initialBalance;//value of the first bet
var bot_betLimit = 0.5;//percentage of the max balance to stop betting
var bot_intervalId = -1;//id of the interval. Used to stop the bot.
var bot_stop = false;//it is tru if the play button was clicked
var bot_win = true;//result of the last game played
var bot_bet = bot_initialBet;//value of the bet

//////////////////////////////
//statistics global variables
//////////////////////////////
var bot_gameCount = 0;
var bot_avgLosses = 0;
var bot_maxLosses = 0;
var bot_LastBigLoss = 0;
var bot_lossesCount = 0;
var bot_lossCount = 0;
var bot_balance = 0;
var bot_profit = 0;

var logic = function strategy1() {

    if (bot_win) {
        bot_initialBalance = parseFloat($("#pct_balance").val());
        bot_initialBet = bot_betBalancePercentage * bot_initialBalance;
        bot_bet = bot_initialBet;
    }
    else {
        bot_bet = bot_bet * bot_increaseOnLoss;
    }
    if (bot_initialBalance - bot_balance + bot_bet >= bot_initialBalance * bot_betLimit) {
        bot_bet = bot_initialBet;
    }

    $("#pct_payout").val(bot_cashOut);
    $("#pct_payout").keyup();
    $("#pct_bet").val(bot_bet.toFixed(8));
    $("#pct_bet").keyup();
    $("#a_hi").click();
}

var lastGameResult = function () {
    $(".tabs li a")[1].click();
    var resultMe = $(".result.me");
    var lastGame = $(resultMe[0]);

    if (resultMe) {
        if (lastGame.hasClass("win")) {
            bot_win = true;
            lastGame.find(".bet span").remove();
        }
        else if (lastGame.hasClass("lose")) {
            betId = lastGame.find(".betid a").prop("innerHTML");
            if (betId > 0) {
                bot_win = false;
                lastGame.find(".betid a").remove();
            }
        }
    }
}
///////////////////////////////////////////////
/////Statistics
///////////////////////////////////////////////
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
    bot_profit = 0;
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
    $("#bot_Profit").val(bot_profit);
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
    bot_profit = parseFloat($("#myprofit").val()) - bot_InitialProfit;
    $("#bot_profit").val(bot_profit);
}
///////////////////////////////////////////////
/////End Statistics
///////////////////////////////////////////////


$("#bot_update").on("click", function () {
    if (bot_intervalId == -1) {
        bot_cashOut = parseFloat($("#bot_cashOut").val());
        bot_increaseOnLoss = parseFloat($("#bot_increaseOnLoss").val());
        bot_betBalancePercentage = parseFloat($("#bot_betBalancePercentage").val());
        bot_initialBalance = parseFloat($("#pct_balance").val());
        bot_initialBet = bot_betBalancePercentage * bot_initialBalance;
        bot_betLimit = parseFloat($("#bot_betLimit").val());

        calculateInitialStatistics(bot_initialBalance * bot_betLimit, bot_initialBet, bot_cashOut, bot_increaseOnLoss);

        $(".bot_probWin").html(bot_probWin);
        $(".bot_gamesToLose").html(bot_gamesToLose);
        $(".bot_gameCount").html(bot_gameCount);
        $(".bot_lossCount").html(bot_lossCount);
        $(".bot_maxLosses").html(bot_maxLosses);
        $(".bot_avgLosses").html(bot_avgLosses);
        $(".bot_LastBigLoss").html(bot_LastBigLoss);
        $(".bot_balance").html(bot_balance);
        $(".bot_probWin").html(bot_probWin);
        $(".bot_profit").html(bot_profit);
    }
    else {
        alert("You can't update the bot while running!!!");
    }
});

$("#bot_play").on("click", function () {
    if (bot_intervalId == -1) {
        bot_stop = false;
        bot_intervalId = setInterval(doWork, 5000);
    }
    else {
        alert("You alredy have a bot running!!!");
    }
});

$("#bot_stop").on("click", function () {
    bot_stop = true;
    alert("Wait for a win");
});

function doWork() {
    lastGameResult();
    //stop the bot if stop was clicked and the last game was wan
    if (bot_stop && bot_win) {
        clearInterval(bot_intervalId);
        bot_intervalId = -1;
        alert("Bot stoped");
    }
    else {
        calculateGameStatistics();
        logic();

        $(".bot_gameCount").html(bot_gameCount);
        $(".bot_lossCount").html(bot_lossCount);
        $(".bot_maxLosses").html(bot_maxLosses);
        $(".bot_avgLosses").html(bot_avgLosses);
        $(".bot_LastBigLoss").html(bot_LastBigLoss);
        $(".bot_balance").html(bot_balance);
        $(".bot_probWin").html(bot_probWin);
        $(".bot_profit").html(bot_profit);
    }

}
