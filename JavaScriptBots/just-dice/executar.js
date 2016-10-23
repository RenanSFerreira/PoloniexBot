$(".wrapper .container:first-child").css("display", "none");
$(".wrapper").prepend("<fieldset> <div class='row'> <p class='llabel'>cashout</p> <input id='bot_cashout' tabindex='1' value='10'> <p class='rlabel'>x</p> </div> <div class='row'> <p class='llabel'>incOnLoss</p> <input id='bot_increaseOnLoss' tabindex='3' value='1.113'> <p class='rlabel'>x</p> </div> </fieldset> <fieldset> <div class='row'> <p class='llabel'>bet Limit</p> <input id='bot_balancePercentage' tabindex='1' value='50'> <p class='rlabel'>%</p> </div> </fieldset> <div class='big'> <div class='fleft'> <div class='button_group'> <div class='button_inner_group'> <button id='bot_play' class='play'> <b>Bot Play</b> <div id='b_play' class='target'></div> </button> </div> <div class='button_inner_group'> <button id='bot_stop' class='play invalid'> <b>Bot Stop</b> <div id='b_stop' class='target'></div> </button> </div> </div> </div> </div> <div class='chatstat'> <table> <tbody> <tr> <th></th> <th>Prob of Win</th> <th>games to lose</th> <th></th> <th></th> <th></th> <th></th> </tr> <tr> <th>Statistics</th> <td> <span class='bot_probWin'>99%</span> </td> <td> <span class='Bot_gamesToLose'>80</span> </td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody> </table> </div> ");

var cashOut = 5;
var increaseOnLoss = 1.25;
var balancePercentage = 0.01;
var betLimit = 0.5;
var intervalId = -1;
var canStop = false;
var stop = false
var initialBalance = parseFloat($("#pct_balance").val());

$("#bot_update").on("click", function () {
    cashOut = parseFloat($("#bot_cashout").val());
    increaseOnLoss = parseFloat($("#incOnLoss").val());
    balancePercentage = parseFloat($("#bot_balancePercentage").val());
    betLimit = parseFloat($("#bot_betLimit").val());
});

$("#bot_play").on("click", function () {
    stop = false;
    intervalId = setInterval(doWork, 1000);
});

$("#bot_stop").on("click", function () {
    stop = true;
});

function doWork() {

    //para a execução se clicar em stop e tiver ganhado a última partida
    if (stop && canStop) 
        clearInterval(intervalId);
}
