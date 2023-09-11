
$(document).ready(function(){

    // Retrieve JSON data
    $.getJSON('prices.json', function(data){
        selection(data);
        
    }).fail(function(){
        console.log("An error has occurred.");
    });

});


// For Populating Dropdown Items & functions for indiv dropdown items
function selection(priceData) {

    console.log(priceData);
    var inputSelectedValue, inputPrice;
    var outputSelectedValue, outputPrice;

    // Codes for Input
    for(var i=0; i < priceData.length; i++) {
        // console.log(priceData[i]);

        
        $("#input-dropdown").append('<li><a class="dropdown-item" href="#" data-value="'+ priceData[i].currency +'"><img src="tokens/'+  priceData[i].currency +'.svg" class="pe-2 input-img"/>' + priceData[i].currency  + '</li>'); 
        
        // Set default value to first value in list
        var defaultOption = $("#input-dropdown").find('li:first-child a.dropdown-item').text();
        $('#input-button').text(defaultOption);

        if (defaultOption == priceData[i].currency) {
            inputPrice = priceData[i].price;
        }

        // Change value of button to selected value in list
        $('#input-dropdown').on('click', 'a.dropdown-item', function() {
            inputSelectedValue = $(this).data('value');
            $('#input-button').text(inputSelectedValue);

            for(var i=0; i < priceData.length; i++) {
        
                // Retrieve price value of clicked dropdown item
                if (inputSelectedValue == priceData[i].currency) {
                    inputPrice = priceData[i].price;
                    inputConversion(inputPrice, outputPrice);
                }
            }
        });


    }

    
    // end of codes for Input


    // Codes for Output


    for(var i=0; i < priceData.length; i++) {
        $("#output-dropdown").append('<li> <a class="dropdown-item" href="#" data-value="'+ priceData[i].currency +'"><img src="tokens/'+ priceData[i].currency + '.svg" class="pe-2 input-img"/>' + priceData[i].currency  + '</li>'); 

        // Change value of button to selected value in list
        $('#output-dropdown').on('click', 'a.dropdown-item', function() {
            outputSelectedValue = $(this).data('value');
            $('#output-button').text(outputSelectedValue);
            $('#output-button').attr('style', 'background-color: white !important; color: black');
            
            for(var i=0; i < priceData.length; i++) {
        
                // Retrieve price value of clicked dropdown item
                if (outputSelectedValue == priceData[i].currency) {
                    outputPrice = priceData[i].price;
                    outputConversion(inputPrice, outputPrice);
                }
            }
        });
    }

    //End codes for output


    // When input text is added
    $('#input-amount').on('input', function() {
        
        if (outputSelectedValue == null) {
        } else {
            inputConversion(inputPrice, outputPrice);
        }
    });

    // When output text is added
    $('#output-amount').on('input', function() {

        if (outputSelectedValue == null) {
        } else {
            outputConversion(inputPrice, outputPrice);
        }
        
    });
   
    // Swap button functions
    $("#swap-button").click(function(){
        console.log("clicked");

        // function to swap values happens here

        var temp = inputPrice;
        inputPrice = outputPrice;
        outputPrice = temp;

        // Swap the prices
        inputConversion(inputPrice, outputPrice, 1);
        outputConversion(inputPrice, outputPrice, 1);

        // Swap the selected currency text
        var inputBut = $('#input-button').text();
        var outputBut = $('#output-button').text();

        $('#input-button').text(outputBut);
        $('#output-button').text(inputBut);
    });
   
}


// For input conversion
function inputConversion(inputCurrencyPrice, outputCurrencyPrice, swap) {
    
    
    var inputVal = $("#input-amount").val();
    var outputVal = $("#output-amount").val(); // not used in any calculations in this function

    // swap == 1 means there is a swap
    if (swap == 1){
        var temp = inputVal;
        inputVal = outputVal;
        outputVal = temp;
    }


    var inputPrice = inputVal * inputCurrencyPrice;

     if ( $('#input-amount').val()=='0'|| !$('#input-amount').val()) {
        $("#input-price").text("");
    } else {
        $("#input-price").text("$" + inputPrice.toFixed(2));
    }

    //OUTPUT CODES
    var outputPrice, outputAmt;


    // Find out exchange rate between the input currency and output currency
    var exRate = inputCurrencyPrice/outputCurrencyPrice;

    // var anExRate = outputCurrencyPrice/inputCurrencyPrice;

    // outputPrice = (outputVal * exRate)/price;
    outputAmt = inputVal * exRate;

    // Assuming that there is a 5% fee
    var fee = 0.05
    outputPrice = (outputAmt  * outputCurrencyPrice)* (1-fee);
    
    
 
    if ($('#ouput-amount').val() == 0 || (!$('#ouput-amount').val() && !$('#input-amount').val())) {
        $('#output-amount').val("");
        $("#output-price").text("");
    }  else if ($("#input-amount").val()) {
        $('#output-amount').val(outputAmt.toFixed(4));
        $("#output-price").text("$" + outputPrice.toFixed(2) + " (-"+ fee*100 +"%)");
    }
    
}

// for output conversion
function outputConversion(inputCurrencyPrice, outputCurrencyPrice, swap) {
    var inputVal = $("#input-amount").val(); // not used in any calculations in this function
    var outputVal = $("#output-amount").val();

    // swap == 1 means there is a swap
    if (swap == 1){
        var temp = inputVal;
        outputVal = temp;
        inputVal = outputVal;
    }

    // Assuming 5% fee
    var fee = 0.05
    var outputPrice = (outputVal * outputCurrencyPrice)* (1-fee);

    

     if ( $('#output-amount').val()=='0'|| !$('#output-amount').val()) {
        $("#output-price").text("");
    } else {
        $("#output-price").text("$" + outputPrice.toFixed(2) + " (-"+ fee*100 +"%)"); 
    }
   
    var inputPrice, inputAmt;

    // Find out exchange rate between the input currency and output currency
    // var exRate = inputCurrencyPrice/outputCurrencyPrice;

    var anExRate = outputCurrencyPrice/inputCurrencyPrice;

    // outputPrice = (outputVal * exRate)/price;
    inputAmt = outputVal * anExRate;

    // Assuming that there is a 5% fee
    inputPrice = inputAmt  * inputCurrencyPrice;
    

    if ($('#output-amount').val() == 0 || (!$('#input-amount').val() && !$('#output-amount').val())) {
        $('#input-amount').val("");
        $("#input-price").text("");
    } else {
        $('#input-amount').val(inputAmt.toFixed(4));
        $("#input-price").text("$" + inputPrice.toFixed(2));
    }
    
}