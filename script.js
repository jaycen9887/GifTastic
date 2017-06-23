var gifs = $("#gifs");
var topics = ["Help Fail", "Bike Fail", "Child Fail", "Parent Fail", "Dog Fail", "Cat Fail", "Truck Fail", "Door Fail", "Fall Fail",];

function displayGiphys() {
    var topic = $(this).attr("title");
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=9ee9c131e6b540a9a44e94467e4e1f23&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        r = response;
        $("#gifs").empty();
        console.log(response);
        for (var i = 0; i < 10; i++){
            var div = $("<div>");
            var table = $("<table>");
            var row1 = $("<tr>");
            var row2 = $("<tr>");
            var col1 = $("<td>");
            var col2 = $("<td>");
            var img = $("<img>");
            var rating = $("<figcaption>");
            
            div.addClass("gifDiv");
            
            img.attr("src", response.data[i].images.fixed_width_still.url);
            img.attr("data-animate", response.data[i].images.fixed_width.url);
            img.attr("data-still", response.data[i].images.fixed_width_still.url);
            img.attr("data-state", "still");
            img.attr("onClick", "playPauseGifs()");
            img.addClass("images");
            
            rating.text("Rating: " + (response.data[i].rating).toUpperCase());
            rating.addClass("rating");
            
            
            col1.append(img);
            row1.append(col1);
            table.append(row1);
            
            col2.append(rating);
            row2.append(col2);
            table.append(row2);
            
            div.append(table);
            
            $("#gifs").append(div);
        }
        
        $(".images").on("click", function(){
            console.log("clicked");
            var state = $(this).attr("data-state");

            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
        
    });
}

function displayButtons() {
    $("#topicSelect").empty();
    
    for (var i = 0; i < topics.length; i++){
        var button = $("<button>");
        button.addClass("topic");
        button.attr("title", topics[i]);
        button.text(topics[i]);
        $("#topicSelect").append(button);
    }
}

$(document).on("click", ".topic", displayGiphys);

var colors= ["#FF6666", "#9933FF", "#00CCFF", "#00FF99", "#FFF35C"];

function ChangeColor(){
    
    setTimeout(ChangeColor, 200);
    var color;
    for(var i = 0; i < colors.length; i++){
        color = colors[Math.floor(Math.random() * 5)];
    }
    $("#header").css("color", color);
}


$(document).ready(function(){
        
    displayButtons();
    
    /*$("#container").css("height", (window.innerHeight + 20));*/
    
    ChangeColor();
    
    $("#add-topic").on("click", function(event){
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        displayButtons();
    });
    
});













