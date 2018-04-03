/*

Game Plan:

1. Create divs on webpage
    a. Section above the gifs for rating
    b. Section for the gifs

2. Make the buttons display gifs corresponding to the button labels
    a. e.g. If the button is labeled "cats," display cats.

3. Every time a button is pressed, clear out the old divs and add in the new ones corresponding to the pressed button

4. Create a way that allows the user to create their own buttons dynamically.

5. When gifs first displayed, they will be still.

6. When gifs are clicked, they will move.
    a. Look into on("click") functions

//////////////////////////////////

Part 2: 

1. Create a form that allows submission of more button search suggestions.

2. When the form is filled and submitted, a new button is created based on the form text.

3. This button will behave like the pre-existing buttons.

////////////////////////////////////

To Do: 

1. Create an empty array of topics

2. Work with the form so that whatever is entered will be pushed into the array.

3. Display the array elements as buttons with the same functionality as the original buttons.


*/

var topics = [];


function displayGifs() {

    $("#results").empty();

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

            // $("#results").empty();


            // create new divs for every result
            // This will hold the rating and the image.
            var animalResult = $("<div class = 'd-flex flex-column'></div>");   
            var animalRating = $("<p>").text("Rating: " + results[i].rating);   // the rating
            $(animalRating).addClass("gif-rating");
            var animalImage = $("<img>");                                       // the image

            var imgMove = results[i].images.fixed_height.url;
            var imgStill = results[i].images.fixed_height_still.url;

            // attaching attributes to animalImage
            animalImage.attr("src", imgStill);                                  // src = imgStill
            animalImage.attr("data-state", "still");                            // data-state = "still"
            animalImage.attr("data-still", imgStill);                           // data-still = imgStill
            animalImage.attr("data-animate", imgMove);                          // data-animate = imgMove

            animalImage.addClass("img");
            $("#results").append(animalResult); 
            $(animalResult).append(animalImage);
            $(animalResult).append(animalRating);


            var imageState = animalImage.attr("src");

        }
    })

}



$("#submitButton").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#animalForm").val().trim();
    topics.push(newTopic);
    console.log(topics);
    $("#animalForm").val("");
    // create and insert a function here that creates buttons based on what is in the array.
    displayButtons();
})

function displayButtons() {

    $("#created-buttons").empty();
    
    for (i = 0; i < topics.length; i++) {
        var newButton = $("<button class = 'button'></button>");
        $(newButton).attr("data-animal", topics[i]);
        $(newButton).text(topics[i]);
        $("#created-buttons").append(newButton);
        console.log(newButton);
    }
}

/* 

test case for displayButtons()

1. created "goat" button

    a. topics = [goat];

    b. displayButtons() -> loops for topics.length
        i. newButton created
            * Has data-animal = goat
        ii. newButton is appended to #created-buttons

2. created "bird" button

    a. topics = [goat, bird];


    b. displayButtons() -> loop i = 0
        i. newButton created
            * Has data-animal = goat
        ii. newButton is appended to #created-buttons

    c. loop i = 1
        i. newButton w/ data-animal = bird
        ii. newButton is appended.

    d. Now #created-buttons has these buttons: goat, goat, bird

///////////////////////////////

new test case -> put $("#created-buttons").empty() in the "for" loop.
    











*/


// displayButtons();

function toggleGif() {
    var state = $(this).attr("data-state");     // here, the "this" refers to the object with the class ".img"
    console.log(state);

    // var imgMove = this.images.fixed_height.url;
    // var imgStill = this.images.fixed_height_still.url;

    var imgMove2 = $(this).attr("data-animate");
    var imgStill2 = $(this).attr("data-still");

    if (state === "still") {
        $(this).attr("src", imgMove2);
        $(this).attr("data-state", "animate");
    }

    else {
        $(this).attr("src", imgStill2);
        $(this).attr("data-state", "still");
    }
}

// $("button:not(#submitButton)").on("click", displayGifs);
// $("button").on("click", displayGifs);
$(document).on("click", "button", displayGifs);

// $(".img").on("click", toggleGif);

$(document).on("click", ".img", toggleGif);