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

////////////////////////////////////



// this array will store the topics the user enters into the form.
var topics = [];

var gifnum = 10;

function displayGifs() {

    // empties the #results part of the webpage whenever a topic button is clicked
    $("#results").empty();

    gifnum += 10;

    // this variable will store whatever the "data-animal" attribute is set to 
    var animal = $(this).attr("data-animal");
    
    // create a variable to hold the queryURL.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=pgNlFjIaMhsyZr48vV7fIJOHNC7r3sQG&limit=" + gifnum;

    // ajax call to retrieve data from the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {

        var results = response.data;                                            // holds the response we get from the ajax call

        for (i = 0; i < results.length; i++) {                                  // loops through the gif search results

            // create new divs for every result
            // This will hold the rating and the image.
            var animalResult = $("<div class = 'd-flex flex-column'></div>");   
            var animalRating = $("<p>").text("Rating: " + results[i].rating);   // the rating
            $(animalRating).addClass("gif-rating");
            var animalImage = $("<img>");                                       // the image

            var imgMove = results[i].images.fixed_height.url;                   // stores url for moving image
            var imgStill = results[i].images.fixed_height_still.url;            // stores url for still image

            // attaching attributes to animalImage
            animalImage.attr("src", imgStill);                                  // src = imgStill
            animalImage.attr("data-state", "still");                            // data-state = "still"
            animalImage.attr("data-still", imgStill);                           // data-still = imgStill
            animalImage.attr("data-animate", imgMove);                          // data-animate = imgMove
            animalImage.addClass("img");                                        // class = "img"

            $("#results").append(animalResult);                                 // appends animalResult "holder" to element with #results
            $(animalResult).append(animalImage);                                // appends animalImage to animalResult
            $(animalResult).append(animalRating);                               // appends animalRating to animalResult

        }
    })

}

// the click event for the "submit" button on the form.
$("#submitButton").on("click", function(event) {                             
    event.preventDefault();                                             // prevents the button from actually submitting data

    // if the form is empty, then... 
    if ($("#animalForm").val() === "") {                        
        alert("Please enter a topic!");
    }

    else {
        var newTopic = $("#animalForm").val().trim();                       // takes input from the form and stores it in this variable
        topics.push(newTopic);                                              // adds this variable to the "topics" array
        console.log(topics);
        $("#animalForm").val("");                                           // empties the form
        displayButtons();                                                   // function to display user's custom buttons
    }
   
})


 // function to display user's custom buttons
function displayButtons() {

    $("#created-buttons").empty();                                      // empties the div with #created-buttons
    
    for (i = 0; i < topics.length; i++) {                               // loops through the entries of the "topics" array
        var newButton = $("<button class = 'button'></button>");        // newButton is a button element
        $(newButton).attr("data-animal", topics[i]);                    // adds data-animal = topics[i] attribute to newButton
        $(newButton).text(topics[i]);                                   // the button will have the text of the appropriate search term
        $("#created-buttons").append(newButton);                        // appends the custom buttons to the div with #created-buttons
        console.log(newButton);
    }
}

// function to toggle the gif between moving and still
function toggleGif() {

    // holds the value of the "data-state" attribute in a variable.
    // here, the "this" refers to the object with the class ".img"
    var state = $(this).attr("data-state");                             
    console.log(state);

    var imgMove2 = $(this).attr("data-animate");                        // variable to hold the "data-animate" attribute
    var imgStill2 = $(this).attr("data-still");                         // variable to hold the "data-still" attribute

    // if the gif is not moving, then....
    if (state === "still") {                                        
        $(this).attr("src", imgMove2);                                  // sets the element's src attribute to "data-animate"
        $(this).attr("data-state", "animate");                          // sets the element's data-state attribute to "animate"
    }

    // if the gif is moving, then...
    else {
        $(this).attr("src", imgStill2);                                 // sets the element's src attribute to "data-still"
        $(this).attr("data-state", "still");                            // sets the element's data-state attribute to "still"
    }
}

// thanks to this line of code, any button in the document will run the displayGifs() function when clicked.
// this property extends to newly created buttons.
// $("button").on("click", displayGifs) would not work.
$(document).on("click", "button", displayGifs);

// when an image is clicked, toggleGif() function runs
$(document).on("click", ".img", toggleGif);