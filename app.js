// API key QDbQHB76EXbeaDedJzwuuVU3b6ldCiRj
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");

// Initial array of superheros
var topics = ["Batman", "Ironman", "Wonder Woman", "Super Girl"];

// Function for placing the JSON content for each button into the div
//function displaySuperheroGifs() {}

// Function for displaying the buttons
function renderButtons() {
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.addClass("superhero-button");
    button.attr("data-type", topics[i]);
    button.text(topics[i]);
    $("#button-view").append(button);
  }
  debugger;
}

$(document).on("click", ".superhero-button", function() {
  $("#superheroGifs").empty();
  var type = $(this).attr("data-type");
  console.log(type);
  var queryURL =
  "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=QDbQHB76EXbeaDedJzwuuVU3b6ldCiRj&limit=15";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    for (var i=0; i<response.data.length; i++){
      console.log(response.data[0].images.fixed_height_still.url);
      var still = response.data[i].images.fixed_height_still.url;
      var animate = response.data[i].images.fixed_height.url;
      var heroImage = $("<img>");
      heroImage.attr("src", still);
      heroImage.attr("data-still",still);
      heroImage.attr("data-animate",animate);
      heroImage.attr("data-state", "still");
      heroImage.attr("class","hero-image");
      $("#superheroGifs").append(heroImage);
    }
  });
});

$(document).on("click",".hero-image", function(){
  var state = $(this).attr("data-state");
  console.log(state);
  if(state==="still"){
    $(this).attr("src",$(this).attr("data-animate"));
    $(this).attr("data-state","animate");
    
    
  }else{
    $(this).attr("src",$(this).attr("data-still"));
    $(this).attr("data-state","still");
  }
})
// add superhero that was typed in
$(document).on("click", "#add-hero", function(){
  var newHero = $("input#new-hero").val().trim();
  topics.push(newHero);
  renderButtons();
  
  console.log(newHero);
  
  
});


  


  

renderButtons();
