// JavaScript source code


var probability = document.createElement("p");
probability.id = "probability";
document.body.appendChild(probability);

var times = document.createElement("p");
times.id = "times";
document.body.appendChild(times);

$("span[data-reactid = '.0.2.0.1.0.0.0.1.0.1.0.1.$game_0.0.0.0']").id = "lastGame";

document.getElementById("lastGame").addEventListener("DOMSubtreeModified", function () { alert("teste"); });

function teste() {
    var lastGame = parseInt($("span[data-reactid = '.0.2.0.1.0.0.0.1.0.1.0.1.$game_0.0.0.0']").innerHTML);
    var p = parseInt(probability.innerHTML);
    var t = parseInt(times.innerHTML);

    if (lastGame < 10) {
        alert("menor");
    }
    else {
        alert("maior");
    }
}
parseInt()


$("button[data-reactid = '.0.2.0.0.0.0.0.1.0.1.0.1.0.0']").click();

var probability = document.createElement("p");
probability.innerHTML = 0.0981179199;
document.body.appendChild(probability);
var times = document.createElement("p");
times.innerHTML = 0;
document.body.appendChild(times);
$("span[data-reactid = '.0.2.0.1.0.0.0.1.0.1.0.1.$game_0.0.0.0']").id = "lastGame";
$("button[data-reactid = '.0.2.0.0.0.0.0.1.0.1.0.1.0.0']").id = "bet";
function betabit() {
    var lastGame = parseFloat(document.getElementById("lastGame").innerHTML);
    var p = parseFloat(probability.innerHTML);
    var t = parseFloat(times.innerHTML);
    if (lastGame < 10 && t <= 1) {
        probability.innerHTML = (1 - ((1 - p) * (1 - 0.0981179199)));
        times.innerHTML = t + 1;
    } else if (lastGame < 10 && t > 1) {
        document.getElementById("bet").focus();
        document.getElementById("bet").click();
    } else {
        probability.innerHTML = 0.0981179199;
        times.innerHTML = 0;
    }
}
document.getElementById("lastGame").addEventListener("DOMSubtreeModified", betabit);


$("span[data-reactid = '.0.2.0.1.0.0.0.1.0.1.0.1.$game_0.0.0.0']").id = "lastGame";
$("button[data-reactid = '.0.2.0.0.0.0.0.1.0.1.0.1.0.0']").id = "bet";
function betabit() { document.getElementById("bet").click(); }
document.getElementById("lastGame").addEventListener("DOMSubtreeModified", betabit);




var lastValue = 0;
var t = 1;
var gamesStart = 0;
var initialBet = 100;
var cashout = 500;
var increaseLoss = 1.25;
var maxBetCount = 4;
var betCount = 1;

var bet = initialBet;

engine.on('game_starting', function (info) {
    //Verifica se o último valor sorteado é menor que o cashout da minha aposta
    if (lastValue < cashout) {
        if (t < gamesStart) {
            t = t + 1;
            console.log('times ' + t);
        } else if (betCount = maxBetCount) {
            engine.placeBet(100, cashout, false);
            t = t + 1;
            betCount = betCount + 1;
            console.log('times ' + t);
            console.log('Betting : ' + bet);
        }
    }
    else {
        if (betCount = maxBetCount) {
            engine.placeBet(100, cashout, false);
            t = t + 1;
            betCount = betCount + 1;
            console.log('times ' + t);
            console.log('Betting : ' + bet);
        } else {
            bet = initialBet;
        }
        t = 1;
        betCount = 0;
    }
});

engine.on('game_crash', function (data) {
    console.log('Game crashed at ', data.game_crash);
    lastValue = data.game_crash;

    if (lastValue < cashout)
        bet = bet * increaseLoss;

});







var pwin = 0.0981179199;
var prob = 0.0981179199;
var probMin = 0.65;
var lastValue = 0;
var initialBet = 400;
var cashout = 990;
var increaseLoss = 1.13;
var bet = initialBet;
var balance = engine.getBalance();
var betCount = 0;
var maxBetCount = 11;
var stopCount = 0;
var stopTimes = 0;
var stopMultiplier = 12;

function updateProbability(gameResult) {
    if (gameResult >= cashout) {
        prob = prob * pwin;
    }
    else {
        prob = 1 - (1 - prob) * (1 - pwin);
    }
}

engine.on('game_starting', function (info) {
    if (stopCount == 1) {
        if (prob > probMin) {
            betCount = 0;
            stopCount = 0;
        }
    }
    if (betCount < maxBetCount && engine.getBalance() - bet > balance / 2) {
        engine.placeBet(parseInt(bet / 100) * 100, cashout, false);
        console.log('Betting : ' + bet);
        betCount = betCount + 1;
    }
    else {
        if (stopCount == 0) {
            if (stopTimes == 0) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes + 1) + 5;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 1) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes + 1) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 2) {
                stopCount = 60;
                console.log('stopbet:' + stopCount);
            }
            stopTimes = stopTimes + 1;
        }
        else {
            if (stopCount > 1) {
                stopCount = stopCount - 1;
            }
        }
        console.log('Not betting!');
    }
});

engine.on('game_crash', function (data) {
    lastValue = data.game_crash;
    updateProbability(lastValue);
    console.log('Game crashed at ', lastValue);
    console.log('Probability of next game: ', prob);
    if (engine.lastGamePlayed()) {
        if (lastValue >= cashout) {
            betCount = 0;
            stopTimes = 0;
            bet = initialBet;
            console.log('Won | Balance:' + engine.getBalance());
        } else {
            bet = bet * increaseLoss;
            console.log('Lost | Balance:' + engine.getBalance());
        }
    }
});


var gameHistoryDiv = document.createElement("div");
gameHistoryDiv.id = "gameHistory";
document.body.appendChild(gameHistoryDiv);

gameHistory.push("datahora;gameNumber;gameCrash/n");
gameHistory.push("11/10/2016 12:00:00;100;500/n");
gameHistoryDiv.innerText = gameHistoryDiv.innerText.concat("11/10/2016 12:00:00;100;500/n");
gameHistory.push("11/10/2016 12:00:20;101;100/n");
gameHistory.push("11/10/2016 12:00:25;102;200/n");
gameHistory.push("11/10/2016 12:00:35;103;200/n");
gameHistory.push("11/10/2016 12:00:45;104;150/n");

var gameProbability = "datahora;gameNumber;p2;p5;p10;p25;p50;p100;p250;p500;p1000;";
var gameWithout = "datahora;gameNumber;p2;p5;p10;p25;p50;p100;p250;p500;p1000;";

var maxBet = 0;



var gameHistory = [];
var gameHistoryDiv = document.createElement("div");
gameHistoryDiv.id = "gameHistory";
document.body.appendChild(gameHistoryDiv);
engine.on('game_crash', function (data) {
    lastValue = data.game_crash;
    var d = new Date()
    var data = d.getDay() + "/" + d.getMonth() + "/" + d.getYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    gameHistory.push(data + ";" + lastValue + "/n");
    gameHistoryDiv.innerText = gameHistoryDiv.innerText.concat(data + ";" + lastValue + "/n");
});




// This strategy editor is in BETA mode, please
// exercise extreme caution and use exclusively at
// your own risk. No bets can or will be refunded in
// case of errors.

// Please note the strategy editor executes arbitrary
// javascript without a sandbox and as such, only use
// strategies from trusted sources, as they can be
// backdoored to lose all your money or have
// intentional exploitable weaknesses etc.

// To see the full engine API see this mirror:
///https://github.com/kungfuant/webserver/blob/master/client_new/scripts/game-logic/script-controller.js

//Engine events: 

engine.on('game_starting', function (info) {
    console.log('Game Starting in ' + info);
});

engine.on('game_started', function (data) {
    console.log('Game Started', data);
});

engine.on('game_crash', function (data) {
    console.log('Game crashed at ', data);
});

engine.on('connect', function () {
    console.log('Client connected, this wont happen when you run the script');
});

engine.on('disconnect', function () {
    console.log('Client disconnected');
});


//Getters:
console.log('Balance: ' + engine.getBalance());
console.log('The current payout is: ' + engine.getCurrentPayout());
console.log('My username is: ', engine.getUsername());
console.log('The max current bet is: ', engine.getMaxBet() / 100, ' Bits');
console.log('The current maxWin is: ', engine.getMaxWin() / 100, ' Bits');
// engine.getEngine() for raw engine 


//Helpers:
console.log('Was the last game played? ', engine.lastGamePlayed() ? 'Yes' : 'No');
console.log('Last game status: ', engine.lastGamePlay());


//Actions:
//Do this between the 'game_starting' and 'game_started' events
//engine.placeBet(betInSatoshis, autoCashOutinPercent, autoPlay);

//engine.cashOut(); //Do this when playing
//engine.stop(); //Stops the strategy
//engine.chat('Hello Spam');



var cashout = 200;
var increaseLoss = 2;
var sumLoss = bet;
var maxBalance = engine.getBalance();
var bet = maxBalance / 2000;
var betCount = 0;
var maxBetCount = 2;


engine.on('game_starting', function (info) {
    console.log("game starting ")
    if (betCount < maxBetCount && engine.getBalance() - bet > maxBalance / 2) {
        engine.placeBet(parseInt(bet / 100) * 100, cashout, false);
        console.log('Betting : ' + bet);
    }
});

engine.on('game_crash', function (data) {
    console.log('Game crashed at ', data.game_crash);
    if (data.game_crash >= cashout) {
        betCount = 0;
        if (engine.lastGamePlayed()) {
            bet = maxBalance / 2000;
            sumLoss = bet;
            console.log('Won | Balance:' + engine.getBalance());
        }
    }
    else {
        betCount += 1;
        if (engine.lastGamePlayed()) {
            bet = (bet * increaseLoss) + sumLoss;
            console.log('Lost | Balance:' + engine.getBalance());
        }
    }
});




var lastValue = 0;
var initialBet = 400;
var cashout = 990;
var increaseLoss = 1.12;
var bet = initialBet;
var maxBalance = engine.getBalance();
var betCount = 0;
var maxBetCount = 8;
var stopCount = 0;
var stopTimes = 0;
var stopMultiplier = 10;

engine.on('game_starting', function (info) {
    if (betCount < maxBetCount && engine.getBalance() - bet > maxBalance / 2) {
        engine.placeBet(parseInt(bet / 100) * 100, cashout, false);
        console.log('Betting : ' + bet);
        betCount = betCount + 1;
    }
    else {
        if (stopCount == 0) {
            if (stopTimes == 0) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes + 1) + 5;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 1) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes + 1) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 2) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes + 1) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 3) {
                stopCount = 60;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 4) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes - 3) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 5) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes - 3) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 6) {
                stopCount = parseInt(Math.random() * stopMultiplier) * (stopTimes - 3) + 10;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 7) {
                stopCount = 60;
                console.log('stopbet:' + stopCount);
            } else if (stopTimes == 8) {
                stopCount = 60;
                console.log('stopbet:' + stopCount);
            }
            stopTimes = stopTimes + 1;
        }
        else {
            stopCount = stopCount - 1;
            if (stopCount == 0) {
                betCount = 0;
            }
        }
        console.log('Not betting!');
    }
});

engine.on('game_crash', function (data) {
    lastValue = data.game_crash;
    console.log('Game crashed at ', lastValue);
    if (engine.lastGamePlayed()) {
        if (lastValue >= cashout) {
            betCount = 0;
            stopTimes = 0;
            bet = initialBet;
            console.log('Won | Balance:' + engine.getBalance());
        } else {
            bet = bet * increaseLoss;
            console.log('Lost | Balance:' + engine.getBalance());
        }
    }
    if (engine.getBalance() > maxBalance) {
        maxBalance = engine.getBalance();
    }
});
