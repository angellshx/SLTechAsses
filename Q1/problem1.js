var sum_to_n_a = function(n) {

    // Sum of N using for loop
    var sum = 0;
    
    for(var i=1; i <= n; i++) {
        sum += i;
    }
    
    console.log("First Way Sum is " + sum);
};

var sum_to_n_b = function(n) {

    // Sum of N using Geometric Series Formula
    var sum = (n * (n+1)) / 2;

    console.log("Second Way Sum is " + sum);
};

var sum_to_n_c = function(n) {
    // Sum of N using while loop

    var sum = 0, i=0;
    
    while (i <= n) {
        sum += i;
        i++
    }

    console.log("Third Way Sum is " + sum);
};

var nVal = 10
sum_to_n_a(nVal);
sum_to_n_b(nVal);
sum_to_n_c(nVal);
