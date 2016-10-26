
function strategy1() {

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

    $("#pct_payout").val(cashout);
    $("#pct_payout").keyup();
    $("#pct_bet").val(bet + '');
    $("#pct_bet").keyup();
    $("#a_hi").click();
}
