/*

Game Plan:

1. Create divs on webpage
    a. Section above the gifs for rating
    b. Section for the gifs

2. Make the buttons display gifs corresponding to the button labels
    a. e.g. If the button is labeled "cats," display cats.

3. Every time a button is pressed, clear out the old divs and add in the new ones corresponding to the pressed button

4. Create a way that allows the user to create their own buttons dynamically.


*/

$("button").on("click", function() {

    // this variable will store whatever the "data-animal" attribute is set to 
    var animal = $(this).attr("data-animal");
    

    // create a variable to hold the queryURL.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=pgNlFjIaMhsyZr48vV7fIJOHNC7r3sQG&limit=10";



    // ajax call to retrieve data from the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {

        var results = response.data;

        for (i = 0; i < results.length; i++) {


            // create new divs for every result
            // This will hold the rating and the image.
            var animalResult = $("<div class = 'd-flex flex-column'></div>");

            var animalRating = $("<p>").text("Rating: " + results[i].rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            $("#results").append(animalResult);
            $(animalResult).append(animalRating);
            $(animalResult).append(animalImage);


        }


    })





})