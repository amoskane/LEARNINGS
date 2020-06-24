//var stockPricesYesterday = [10, 7,  8, 11, 5,9],
//var stockPricesYesterday = [12,11, 10, 9, 8,7],
 //    maxx,
 //    minn,
	// maxxIndex,
 //    minnIndex,
 //    result,
 //    clony,
 //    getStatsIndex = 0;

//function getMaxProfit(arg) {
    //console.log("type of arg is "+typeof(arg));
	// function getStats(arg){
 //        //console.log("type of arg is "+typeof(arg));
 //        maxx = Math.max.apply(null, arg);         //1
 //        //console.log("maxx is "+maxx);
	// 	minn = Math.min.apply(null, arg);         //1
 //        //console.log(minn);
	// 	maxxIndex = arg.indexOf(maxx);            //1
 //        console.log("position of highest number is "+maxxIndex);
	// 	minnIndex = arg.indexOf(minn);            //1
 //        console.log("position of lowest number is "+minnIndex);

 //        if(minnIndex < maxxIndex){
	// 		result = maxx - minn;
	// 	}else{
 //            getStatsIndex++;
 //            console.log(getStatsIndex);
 //            if(getStatsIndex<arg.length){     //1
 //                clony = Array.prototype.slice.call(arg, 0);
 //                clony.splice(minnIndex,1);
 //                console.log("clony is "+ clony);
 //            	getStats(clony);               //n
 //            }else{
 //                result = maxx - minn;
 //            }
	// 	}
 //    }

 //    getStats(arg);

var stockPricesYesterday = [12,11, 10, 9, 8,7],
    minPrice,
    maxProfit;

if (stockPricesYesterday.length < 2) {
    throw new Error('Getting a profit requires at least 2 prices');
}else{
    function getMaxProfit(arg) {

        minPrice = stockPricesYesterday[0];
        maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];
        console.log(minPrice);
        console.log(maxProfit);

        for (var i = 1; i < stockPricesYesterday.length; i++) {
            var currentPrice = stockPricesYesterday[i];

            // see what our profit would be if we bought at the
            // min price and sold at the current price
            var potentialProfit = currentPrice - minPrice;
            console.log("potentialProfit "+potentialProfit);

 // update maxProfit if we can do better
            maxProfit = Math.max(maxProfit, potentialProfit);
            console.log("maxProfit "+maxProfit);

            // ensure minPrice is the lowest price we've seen so far
            minPrice = Math.min(minPrice, currentPrice);
            console.log("minPrice "+minPrice);



        }

        return 'running with ' + arg+", and get "+maxProfit+" as a result.";
    }
}
console.log(getMaxProfit(stockPricesYesterday));






