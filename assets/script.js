var gifs = ["Thunder Cats", "Silver Hawks", "Transformers", "M.A.S.K."]

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
        var imgURL = response.data[j].images.downsized_still
        ;
        };
        var image = $("<img>").attr("src", imgURL);
        gifDiv.append(image);

        $("#gif-view").prepend(gifDiv);
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
