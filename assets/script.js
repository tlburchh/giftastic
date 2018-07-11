var gifs = ["Thunder Cats", "80's Commercials", "Ninja Turtles 80's", "NES", "Voltron"]

function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2HJHZnfl6qLIKPmYKooOm9pFucMg7Gl5&q=" +
    gif + "&limit=10&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        var gifDiv =  $("<div class='gif'>");
        for (var j=0; j <= 9; j++){

            // rating
        var rating = response.data[j].rating;

        var p = $("<p>").text("Rating: " + rating);
        // create element to hold image

        var still = response.data[j].images.downsized_still.url;
        var animated = response.data[j].images.downsized.url;

        var gifImage = $("<img>");

        gifImage.attr("src", still);
        gifImage.attr("data-still", still);
        gifImage.attr("data-animate", animated);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");

        gifDiv.append(p);
        gifDiv.append(gifImage)
        
    };
        $("#gif-view").empty();
        $("#gif-view").prepend(gifDiv);

    });
}
        $(document).on("click",".gif-image", function(){
            var gifState = $(this).attr("data-state")
    
            if (gifState === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                console.log(gifState);
                // console.log(gifClass);
            }
        });

// creating buttons for each of the gif topics
function renderButtons() {
    $("#buttons-view").empty();

    for (var i=0; i < gifs.length; i++){
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
})

$(document).on("click", ".gif-btn", displayGif);

renderButtons();

// $(".gif-btn").on("click", function(){
//     if(state === 'imgURL'){
//         $(this).attr("src", $(this).attr(imgURLStill.path))
//         $(this).attr("data-state", "still")
//     } else {
//         $(this).attr("src", $(this).attr(imgURL.path))
//         $(this).attr("data-state", "animate")
//     });