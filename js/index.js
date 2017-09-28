var preSearch = "";
$(document).ready(function() {
  
  $(".fa-random").animate({
    
  });

  $("#search").submit(function(event) {
    $("#preview div").remove();
    var search = $("#searchBox").val();
    // API request to wikipedia
    $.getJSON(
      "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=8&search=" +
        search +
        "&redirect=resolve&callback=?",
      function(data) {
        // Adding to the hidden table
        for (i = 0; i < 8; i++) {
          var header = data[1][i];
          var info = data[2][i];
          var link = data[3][i];
          if (header != undefined) {
          $("#preview").append(
            '<div data-href="' +
              link +
              '" target="_blank"><h3>' +
              header +
              "</h3><p>" +
              info +
              "</p></div>"
            );
          }
        }
        $("#preview div").click(function() {
          var url = $(this).data("href");
          window.open(url, "_blank");
        });
      }
    );
    event.preventDefault();
  });
  
   //Go to random wiki article
  // $(".fa-random").on("click", function(){
  //   var url = $(this).data("https://en.wikipedia.org/wiki/Special:Random");
  //   window.open(url, "_blank");
  // });
});

$("#searchBox").tooltip({
  content: "Search for results",
});

//Autocomplete crap
  $("#searchBox").keypress(function(event) {
    $("#searchBox").tooltip("disable");
    preSearch += event.key;
    $.getJSON(
      "https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=8&search=" +
        preSearch +
        "&redirect=resolve&callback=?",
      function(data) {
        $("#searchBox").autocomplete({
          autoFocus: true,
          source: data[1],
          select: function(event, ui) {
            $("#search").submit();
          }
        });
      }
    );
  });

  $("#searchBox").blur(function() {
    preSearch = "";
    // $(this).val("");
  });

  //Tooltip crap
$(".fa-random").tooltip({
  content: "Go to a random wiki page"
});