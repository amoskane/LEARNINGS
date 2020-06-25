function bubbleSort(arr){
   var len = arr.length;  //6

   for (var i = len-1; i>=0; i--){ // start @ i=5, go down
     for(var j = 1; j<=i; j++){ // start @ j=1, go up
       if(arr[j-1]>arr[j]){ //if arr[0]>arr[1]
                            //if   7   >  5
                            //true
           var temp = arr[j-1]; //temp= 7
           arr[j-1] = arr[j];   //set index 1 val to index 0
                                //[7,5,2,4,3,9] change to
                                //[5,5,2,4,3,9]
           arr[j] = temp;       //[5,7,2,4,3,9]
        }
     }
   }
   return arr;
}
bubbleSort([7,5,2,4,3,9]); //[2, 3, 4, 5, 7, 9]
bubbleSort([9,7,5,4,3,1]); //[1, 3, 4, 5, 7, 9]
bubbleSort([1,2,3,4,5,6]); //[1, 2, 3, 4, 5, 6]<span class="label label-default">Label</span>

//the outer loop is setting the limit and bringing
//it in closer each time.




for(var j = 1; j<=i; j++){ // j=2
       if(arr[j-1]>arr[j]){ //if arr[1]>arr[2]
                            //if   5>2
                            //true
           var temp = arr[j-1]; //temp= 5
           arr[j-1] = arr[j];   //set index 2 val to index 1
                                //[5,7,2,4,3,9] change to
                                //[5,2,2,4,3,9]
           arr[j] = temp;       //[5,2,7,4,3,9]
        }
     }


for(var j = 1; j<=i; j++){ // j=3
       if(arr[j-1]>arr[j]){ //if arr[2]>arr[3]
                            //if   7>4
                            //true
           var temp = arr[j-1]; //temp= 7
           arr[j-1] = arr[j];   //set index 3 val to index 2 val
                                //[5,2,7,4,3,9] change to
                                //[5,2,4,4,3,9]
           arr[j] = temp;       //[5,2,4,7,3,9]
        }
     }


for(var j = 1; j<=i; j++){ // j=4
       if(arr[j-1]>arr[j]){ //if arr[3]>arr[4]
                            //if   7>3
                            //true
           var temp = arr[j-1]; //temp= 7
           arr[j-1] = arr[j];   //set index 4 val to index 3 val
                                //[5,2,4,7,3,9] change to
                                //[5,2,4,3,3,9]
           arr[j] = temp;       //[5,2,4,3,7,9]
        }
     }


for(var j = 1; j<=i; j++){ // j=5
       if(arr[j-1]>arr[j]){ //if arr[4]>arr[5]
                            //if   7>9
                            //false
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;       //[5,2,4,3,7,9]
        }
     }



   for (var i = len-1; i>=0; i--){ // i=4, go down
     for(var j = 1; j<=i; j++){ // start @ j=1, go up
       if(arr[j-1]>arr[j]){ //if arr[0]>arr[1]
                            //if   5   >  2
                            //true
           var temp = arr[j-1]; //temp= 5
           arr[j-1] = arr[j];   //set index 1 val to index 0
                                //[5,2,4,3,7,9] change to
                                //[2,2,4,3,7,9]
           arr[j] = temp;       //[2,5,4,3,7,9]
        }
     }
   }


[2,3,4,5,7,9]


