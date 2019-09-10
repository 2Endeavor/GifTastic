$(document).ready(function() {
  var topics = ["Spiderman","Batman", "Ironman", "Wonder Woman", "Super Girl","Captain America"];

  // functions
  function renderButtons() {
    $("#button-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.addClass("superhero-button");
      button.attr("data-type", topics[i]);
      button.text(topics[i]);
      if(topics[i]===""){
        console.log("this is a blank button")
      }
      else{
        $("#button-view").append(button)

      };
    

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
      "&api_key=QDbQHB76EXbeaDedJzwuuVU3b6ldCiRj&limit=15&rating=PG-13";
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
// Adding an if statement to keep blank and duplicate buttons from being added
  function addHeroToTopic() {
    var newHero = $("input#new-hero")
      .val()
      .trim()
      .toLowerCase()
      // titleText(newHero);
      // if(topics.indexOf(newHero)===-1 && newHero !==""){
      if(topics.indexOf(newHero)!==-1){
        console.log("line 73 newHero: ", newHero);
        giphyAjax(newHero)
        $("input#new-hero").val('')
      }
      else if (newHero === ""){
        giphyAjax("spiderman")
        $("input#new-hero").val('')
        console.log("line 79 newHero: ", newHero);

      }
      else {
        console.log(topics.indexOf(newHero), newHero)
        console.log("line 85 newHero: ", newHero);
        topics.push(newHero)
        console.log("line 66", topics)
        renderButtons()
        giphyAjax(newHero);
        $("input#new-hero").val('')

      }};



//Function to convert the button text to title case
  function titleText(hero){
    temp = [];
    temp.push(hero[0].toUpperCase());
    console.log("line 77 temp array: ",temp);
    for (let i = 1; i < hero.length; i++) {
      if (hero[i] ===" "){
        temp.push(hero[i])
        temp.push(hero[i+1].toUpperCase());
        i++
      }else{
       temp.push(hero[i]);
      }
      
      
      
    }
    newHero = temp.join("");
    console.log("line 90", newHero)
    
    return newHero;
   
  }

  // Temp[0] will always be captiolized
// Any letter following a space will be capitolized

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
