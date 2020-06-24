
1
-------------------------
T and F are shorthand for TRUE and FALSE.

declare a variable:
x<-42

functions:
sum
rep     rep("Yo ho!", time=3)
sqrt    (square root)

help(functionname) 
example(functionname) 

list.files()

source("bo­ttle1.R") 


2 Vectors
----------------------------
c(4,7,9)
c is short for Combine

or strings
c('a', 'b', 'c') 

Vectors cannot hold values with different modes (types). 

make a vector with start:end notation.
or
seq(5, 9) 

steps of .5:
seq(5, 9, 0.5)

sentence <- c('walk', 'the', 'plank')
sentence[3]
[1] "plank"

Rs vector indices start at 1

> sentence[c(1, 3)]
[1] "walk" "dog"

> sentence[2:4]
[1] "the" "dog" "to"

You can also set ranges of values; 
just provide the values in a vector. 
sentence[5:7]<- c('the', 'poop', 'deck')

VECTOR NAMES: 
//store 1 through 3 in 'ranks'
ranks <- 1:3
//
> names(ranks) <- c("first", "second", "third")

You can assign names to a vectors elements by passing 
a second vector filled with names to the names assignment function,
names(ranks)<-c("first", "sec", "third")

> ranks
 first second  third
     1      2      3
> ranks["first"]
first 
    1

Now see if you can set the value for the "third" rank 
to something other than 3 using the name rather than 
the position.

> ranks["third"]<-"last"

barplot() function

> vesselsSunk <- c(4, 5, 1)
> names(vesselsSunk) <- c("England", "France", "Norway")
> barplot(vesselsSunk)


VECTOR MATH:
where a<-(1,2,3)
b<-(4,5,6)

> a == c(1, 99, 3)
[1]  TRUE FALSE  TRUE

> a > b
[1] FALSE FALSE FALSE
compares all values in vector

> sin(a)
[1] 0.8414710 0.9092974 0.1411200

> sqrt(a)
[1] 1.000000 1.414214 1.732051


SCATTER PLOTS:
> plot(x, y)


NA VALUES:
a sample was not available: NA

remove all NA's' from the set and continue as usual
> sum(a, na.rm­ = TRUE)­ 

---------------------------------
3--MATRICES

> matrix(0, 3, 4) 
> matrix(all fields set to, high, wide) 

where a<-1:12

> matrix(a, 3, 4)
     [,1] [,2] [,3] [,4]
[1,]    1    4    7   10
[2,]    2    5    8   11
[3,]    3    6    9   12


The dim assignment function sets dimensions for a matrix. 
It accepts a vector with the number of rows 
and the number of columns to assign.

dim(plank)­ <- c(2, 4) 

> print(plank)
     [,1] [,2] [,3] [,4]
[1,]    1    3    5    7
[2,]    2    4    6    8


MATRIX ACCESS
You can get an entire row of the matrix by omitting the 
column index (but keep the comma).
> plank[2,]
[1] 2 4 6 8 

To get an entire column, omit the row index. 
> plank[, 4]
[1] 7 8

You can read multiple rows or columns by providing 
a vector or sequence with their indices. 
> plank[, 2:4]
     [,1] [,2] [,3]
[1,]    3    5    7
[2,]    4    6    8


MATRIX PLOTTING
> contour(matrix)

Or you can create a 3D perspective plot 
with the persp function

> persp(elevation, expand=0.2)
limits the vertical expansion to one-fifth

sample data sets: volcano

The image function will create a heat map.


---------------------------------
4:Summary Statistics

MEAN
> mean(vector)
takes the average

 The abline function can take an h parameter with a 
 value at which to draw a horizontal line, 
 or a v parameter for a vertical line. 
 When its called, it updates the previous plot.
> abline(h = mean(­limbs)) 

MEDIAN
The median is calculated by sorting the values and choosing 
the middle one - the third value, in this case. 
(For sets with an even number of values, 
the middle two values are averaged.)
> median(limbs)

STANDARD DEVIATION
Statisticians use the concept of "standard deviation" 
from the mean to describe the range of typical values 
for a data set.
deviation <- sd(po­unds) 

We'll' add a line on the plot to show one standard deviation 
above the mean (the top of the normal range)...
> abline(h = meanV­alue + devia­tion) 
> abline(h = meanV­alue - devia­tion) 


---------------------------------
5:Factors

factors group your data together by category

> chests <- c('gold', 'silver', 'gems', 'gold', 'gems')
> types <- facto­r(chests) 

> print(chests)
[1] "gold"   "silver" "gems"   "gold"   "gems"  

> print(types)
[1] gold   silver gems   gold   gems  
Levels: gems gold silver
(integer references, not strings)

look at the underlying integers:
Pass the factor to the as.integer function:
> as.integer(types)
[1] 2 3 1 2 1

to get only the factor levels:
> levels(typ­es) 


2- Plots With Factors 
we plotted chests with weight vs. price
but we cant tell which chest is which

we can use different plot characters for each type 
by converting the factor to integers, 
and passing it to the pch argument of plot.

plot(weights, prices, pch=as.integer(types))


The legend function takes a location to draw in, 
a vector with label names, and a vector with 
numeric plot character IDs.

legend("topright", c("gems", "gold", "silver"), pch=1:3)


If you hard-code the labels and plot characters, 
you'll' have to update them every time you change the plot 
factor. Instead, it's' better to derive them by using the 
levels function on your factor:

legend("topright", levels(types), pch=1:length(levels(types)))


------------------------------
6:DATA FRAMES
1) Data Frames
Like a database table: set # of cols expecting values,
unlimited rows

> treasure <- data.­frame(weig­hts, price­s, types­) 

> print(treasure)
  weights prices  types
1     300   9000   gold
2     200   5000 silver
3     100  12000   gems
4     250   7500   gold
5     150  18000   gems

(the col names are the var names) 


2) Data Frame Access
get 2nd col:
> treasure[[2]]

or get col:
> treasure[[­"weights"]­] 

or shorthand:
> treasure$p­rices 


3) Loading Data Frames
import csv!!!!
> read.csv("­targets.cs­v") 

For files that use separator strings other than commas, 
you can use the read.table function. 
The sep argument defines the separator character, 
and you can specify a tab character with "\t".

infantry has tab separated data:
> read.table­("infantry­.txt", sep="­\t") 

if you want the first line to be treated as a header, add
header=TRUE


4) Merging Data Frames
R's' merge function joins two data frames together, 
using the contents of one or more columns.

By default, it joins the frames on columns with the same name


--------------------------------
7: Real-World Data

load csv data into a data frame
> piracy <- read.csv("piracy.csv")

merge the data on country name
> countries <- merge(x = gdp, y = piracy)

plot GDP vs. Piracy:
> plot(countries$GDP, countries$Piracy)

test for correlation between two vectors 
with the cor.test function.

Conventionally, any correlation with a p-value less than 0.05 
is considered statistically significant

Try to estimate piracy for countries we don't' have data for?
Try calculating the linear model for piracy rate by GDP, 
and assign it to the line variable:
line <- lm(countries$Piracy ~ countries$GDP)

then 
> abline(line)

GGPLOT2

get more libraries at Comprehensive R Archive Network, or CRAN

install ggplot2:
> install.pa­ckages("gg­plot2") 

get help:
> help(packa­ge = "ggpl­ot2") 

to run it:
> library(ggplot2)
> qplot(weig­hts, price­s, color­ = types­) 





















