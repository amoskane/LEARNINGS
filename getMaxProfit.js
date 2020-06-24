var stockPricesYesterday = [12,11, 10, 9, 8,7];

function getMaxProfit(stockPricesYesterday) {

    var maxProfit = 0;

    // go through every time
    for (var outerTime = 0; outerTime < stockPricesYesterday.length; outerTime++) {

//console.log("a"+stockPricesYesterday.length);
console.log("outerTime is >>>>>>>>>>>>>>>>>>");
        // for every time, got through every OTHER time
        for (var innerTime = 0; innerTime < stockPricesYesterday.length; innerTime++) {
console.log("innerTime is "+stockPricesYesterday[innerTime]);
            // for each pair, find the earlier and later times
            //console.log("b"+stockPricesYesterday.length);

            var earlierTime = Math.min(outerTime, innerTime);
            var laterTime   = Math.max(outerTime, innerTime);
console.log("earlierTime >>>>>"+earlierTime);
console.log("laterTime "+laterTime);

            // and use those to find the earlier and later prices
            var earlierPrice = stockPricesYesterday[earlierTime];
            var laterPrice   = stockPricesYesterday[laterTime];
console.log("earlierPrice "+earlierPrice);
console.log("laterPrice "+laterPrice);
            // see what our profit would be if we bought at the
            // min price and sold at the current price
            var potentialProfit = laterPrice - earlierPrice;

            // update maxProfit if we can do better
            maxProfit = Math.max(maxProfit, potentialProfit);
        }
    }
    console.log(maxProfit);
    return maxProfit;
}

getMaxProfit(stockPricesYesterday);