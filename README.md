# GifButtons
By Matt Mejia

## This project is an example of an app that interfaces with an API via an AJAX request and performs various functions with the retrieved data.

_Specifically, this application performs an ajax request to retrieve data from the GIPHY API,  then uses this data to populate the webpage with gifs._ 

This application contains buttons that search for and display the first 10 relevant gifs from GIPHY when clicked. Three buttons are initially displayed, but the user can create more buttons by typing topics in the search bar. New buttons will then be created based on these topics. 

Currently, the webpage will clear old gif results when any button is clicked. If the user wishes to disable this feature, they can comment out or remove the $(results).empty() line inside the displayGifs() function found in the JavaScript file. 

When a gif is clicked, it will animate. If the gif is clicked again, it will stop animating. Multiple gifs can be animated and stopped in this manner. 

## App in Action

Searching for and animating dog gifs:

![dog_search](https://github.com/Mattmej/GifButtons/blob/master/assets/gifs/dog_search.gif)

<br/>
<br/>

Searching for and animating cat gifs:

![cat_search](https://github.com/Mattmej/GifButtons/blob/master/assets/gifs/cat_search.gif)

<br/>
<br/>

Searching for and animating mouse gifs:

![mouse_search](https://github.com/Mattmej/GifButtons/blob/master/assets/gifs/mouse_search.gif)

<br/>
<br/>

Adding custom search buttons:

![add_custom_buttons](https://github.com/Mattmej/GifButtons/blob/master/assets/gifs/add_custom_buttons.gif)

<br/>
<br/>

Using custom search:

![custom_search](https://github.com/Mattmej/GifButtons/blob/master/assets/gifs/custom_search.gif)

