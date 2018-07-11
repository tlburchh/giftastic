var gifs = ["Thunder Cats", "Heman", "Transformers", "Voltron"]

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
        // create element to hold image
        var imgURL = {dataStill: "response.data[j].images.downsized_still.url",
                     dataAnimate: "response.data[j].images.downsized.url",
                     dataState: "still",
                     class: "gifClass"}
        

        var image = $("<img>").attr("src", imgURL.dataStill);
        gifDiv.append(image);
        console.log(image);
    };
        $("#gif-view").empty();
        $("#gif-view").prepend(gifDiv);

        $(".gifClass").on("click", function(){
            var gifState = $(this).attr("imgURL.dataState")

            if (gifState === "still"){
                $(this).attr("src", $(this).attr("imgURL.dataAnimate"));
                $(this).attr("imgURL.dataState", "animate");
            } else {
              $(this).attr("src", $(this).attr("imgURL.dataStill"));
                $(this).attr("imgURL.dataState", "still");
            }
        })
    });
}

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