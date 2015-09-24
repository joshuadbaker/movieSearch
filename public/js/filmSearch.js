$(document).ready(function() {
  $('#search').on('click', function() {
    var search = $('#keyword').val();

    $.getJSON('http://www.omdbapi.com/?s='+search+'&y=&plot&tomatoes=true&r=json', function(response) {
      $.each(response.Search, function(i, movie) {
        $('.movie-list').append('<h3>'+movie.Title+'<span><button class="show">details</button></span></h3><div class="details"><ul>'+
        '<li>Year: '+movie.Year+'</li><li>Title: '+movie.Type+'</li><li>imdb: '+movie.imdbID+'</li></ul><button class="save-movie">Favorite</button></div>');        
      
        $('.movie-list h3:eq('+i+') .show').on('click', function() {
          $('.details:eq('+i+')').toggle();
        });

        
      });
      
      // save favorites
      $('.save-movie').on('click', function() {
        var newFilm = {
          title: $('h3').text()
        }
        
        $.ajax({
          type: 'POST',
          data: $('h3').text(),
          url: '/favorites',
          dataType: 'JSON'
        }).done(function(response) {
          
        });
      });

      // display favorites
      $('.display').on('click', function() {
        $ajax({
          type: 'GET',
          data: response.body,
          url: '/public/data.json',
          dataType: 'JSON'
        }).done(function(response) {
          $('body').html('<h1>'+body+'<h1>')
        });
      });
    });
  });
});