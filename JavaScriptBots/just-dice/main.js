var cashout = 100;
var increaseOnLoss = 1.0108;
var initialBalance = parseFloat($("#pct_balance").val());
var balancePercentage = 0.0001;
var initialBet = initialBalance * balancePercentage;
var bet = initialBet;
var totalLoss = 0;
var betId = 0;
var stopSize = 50;
var stop = 0;


function doWork() {


    $("#pct_payout").val(cashout);

    if ($(".result.me")) {
        betId = $(".result.me:first").find(".betid a").prop("innerHTML");

        if ($($(".result.me")[0]).hasClass("win")) {
            initialBalance = parseFloat($("#pct_balance").val());
            initialBet = initialBalance * balancePercentage;
            bet = initialBet;
            totalLoss = 0;
        }
        else if ($($(".result.me")[0]).hasClass("lose")) {
            if (betId > 0) {
                totalLoss += bet;
                bet = bet * increaseOnLoss;
                $(".result.me:first").find(".betid a").remove();
            }
        }
    }
    if (totalLoss >= initialBalance * 0.25 || bet >= initialBalance / 2) {
        bet = initialBet;
        totalLoss = 0;
        stop = stopSize;
    }
    if (stop > 0) {
        stop = stop - 1;
        $("#pct_bet").val(0);
        $(".play").click();
    }
    else {
        $("#pct_bet").val(bet);
        $(".play").click();
    }
}

setInterval(doWork, 500);