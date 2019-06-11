$(document).ready(function() {
  var topics = ["Batman", "Ironman", "Wonder Woman", "Super Girl","Captain America"];

  // functions
  function renderButtons() {
    $("#button-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("superhero-button");
      button.attr("data-type", topics[i]);
      button.text(topics[i]);
      $("#button-view").append(button);
    }
  }

  function superheroButtonClick() {
    var superheroName = $(this).attr("data-type");
    giphyAjax(superheroName);
  }

  function giphyAjax(superhero) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      superhero +
      "&api_key=QDbQHB76EXbeaDedJzwuuVU3b6ldCiRj&limit=15";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#superheroGifs").empty();
      for (var i = 0; i < response.data.length; i++) {
        var still = response.data[i].images.fixed_height_still.url;
        var animate = response.data[i].images.fixed_height.url;
        var heroImage = $("<img>");
        heroImage.attr("src", still);
        heroImage.attr("data-still", still);
        heroImage.attr("data-animate", animate);
        heroImage.attr("data-state", "still");
        heroImage.attr("class", "hero-image");
        $("#superheroGifs").append(heroImage);
      }
    });
  }

  function superheroImageClick() {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  function addHeroToTopic() {
    var newHero = $("input#new-hero")
      .val()
      .trim();
    topics.push(newHero);
    renderButtons();
    giphyAjax(newHero);
    $("input#new-hero").val('');
  }

  // event listeners
  $(document).on("click", ".superhero-button", superheroButtonClick);
  $(document).on("click", ".hero-image", superheroImageClick);
  $(document).on("click", "#add-hero", addHeroToTopic);
  $(document).on("keypress", function(e) {
    /* ENTER PRESSED*/
    if (e.keyCode == 13) {
      addHeroToTopic();
    }
  });
 
  // start page
  renderButtons();
});
