var cashout = 5;
var increaseOnLoss = 1.25; 
var balancePercentage =  0.00001;
var limitLoss = 0.5;
var winLimit = 2;
var loseLimit = 5;
var winCount = 0;
var loseCount = 0;
var totalLoss = 0;
var betId = 0;
var lastGameValue = 0;
var initialBalance = parseFloat($("#pct_balance").val());
var initialBet = initialBalance * balancePercentage;
var bet = initialBet;
var canIncreaseOnLoss = true;

$(".tabs li a")[1].click()


function doWork(){
	
	if($(".result.me")){
		if($($(".result.me")[0]).hasClass("win")){		
			winCount++;
console.log("Win: " + winCount +". Games Lose: " + loseCount );		
			loseCount = 0;
			

			$(".result.me:first").find(".bet span").remove();
			var betResult = $(".result.me:first").find(".bet").prop("innerHTML");
	
//console.log("Bet: " + bet);				
//console.log("BetResult:" + betResult);
			

			if(betResult > 0.000001){
console.log("WON yay!");
				winCount = 0;
				initialBalance = parseFloat($("#pct_balance").val());
				initialBet = initialBalance * balancePercentage;
				bet = initialBet;
				lastGameValue = 0;
				canIncreaseOnLoss = true;
				totalLoss = 0;
			}
			
			if(winCount >= winLimit){
				if(lastGameValue > 0){
					bet = lastGameValue;	
					lastGameValue = 0;
					canIncreaseOnLoss = true;					
				}			
			}
		}
		else if ($($(".result.me")[0]).hasClass("lose")){
			betId = $(".result.me:first").find(".betid a").prop("innerHTML");
			if(betId > 0){
				loseCount++;
				$(".result.me:first").find(".betid a").remove();
//console.log("Lose: " + loseCount);
				if(canIncreaseOnLoss){
					bet = bet * increaseOnLoss;
				}
				if(loseCount >= loseLimit || !canIncreaseOnLoss){
					lastGameValue = lastGameValue == 0 ? bet : lastGameValue;
					bet = 0;
					canIncreaseOnLoss = false;
				}
			}
			if(winCount >= winLimit){
				winCount = 0;
			}
			totalLoss += bet;
		}
	}
	
	if(loseCount >= loseLimit * 3){
		var betHighValue = initialBalance * 0.0001;
		if(betHighValue > lastGameValue){
			loseCount = 0;
			winCount = 0;
			bet = bet > betHighValue ? bet:  betHighValue;
			lastGameValue = 0;
			canIncreaseOnLoss = true;
		}
	}
	
	if(totalLoss + bet >= initialBalance * limitLoss|| bet >= initialBalance / 2){
		bet = initialBet;
		totalLoss = 0;
		lastGameValue = 0;
	}
	
	$("#pct_payout").val(cashout);
	$("#pct_payout").keyup();
	$("#pct_bet").val(bet + '');
	$("#pct_bet").keyup();
	$("#a_hi").click();	
}

setInterval(doWork, 1000);