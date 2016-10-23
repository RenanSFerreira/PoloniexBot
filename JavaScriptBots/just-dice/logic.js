
var cashout = 10;
var increaseOnLoss = 1.25;
var balancePercentage = 0.00001;
var limitLoss = 0.5;
var loseLimit = 15;
var winCount = 0;
var totalLoss = 0;
var betId = 0;
var lastGameValue = 0;
var initialBalance = parseFloat($("#pct_balance").val());
var initialBet = initialBalance * balancePercentage;
var bet = initialBet;
var canIncreaseOnLoss = true;

$(".tabs li a")[1].click();

function doWork() {

    if ($(".result.me")) {
        if ($($(".result.me")[0]).hasClass("win")) {
            winCount++;
            loseCount = 0;
            canStop = true;

            $(".result.me:first").find(".bet span").remove();
            var betResult = $(".result.me:first").find(".bet").prop("innerHTML");

        }
        else if ($($(".result.me")[0]).hasClass("lose")) {
            betId = $(".result.me:first").find(".betid a").prop("innerHTML");
            if (betId > 0) {
                loseCount++;
                $(".result.me:first").find(".betid a").remove();
                if (canIncreaseOnLoss) {
                    bet = bet * increaseOnLoss;
                }
                if (loseCount >= loseLimit || !canIncreaseOnLoss) {
                    lastGameValue = lastGameValue == 0 ? bet : lastGameValue;
                    bet = 0;
                    canIncreaseOnLoss = false;
                }
            }
            if (winCount >= winLimit) {
                winCount = 0;
            }
            totalLoss += bet;
        }
    }

    if (totalLoss + bet >= initialBalance * limitLoss) {
        bet = initialBet;
        totalLoss = 0;
    }

    $("#pct_payout").val(cashout);
    $("#pct_payout").keyup();
    $("#pct_bet").val(bet + '');
    $("#pct_bet").keyup();
    $("#a_hi").click();
}

setInterval(doWork, 1000);