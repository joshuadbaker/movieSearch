$(document).ready(function() {
  $('#search').on('click', function() {
    var search = $('#keyword').val();

    $.getJSON('http://www.omdbapi.com/?s='+search+'&y=&plot=short&r=json', function(response) {
      $.each(response.Search, function(i, movie) {
        $('.movie-list').append('<h3>'+movie.Title+'<span><button class="show">details</button></span></h3><div class="details"><ul>'+
        '<li>'+movie.Year+'</li><li>'+movie.Actors+'</li><li>'+movie.Director+'</li></ul><button class="save-movie">Favorite</button></div>');        
      
        $('.movie-list h3:eq('+i+') .show').on('click', function() {
          $('.details:eq('+i+')').toggle();
        });

        
      });
      $('.save-movie').on('click', function() {
        var newFilm = {
          title: $('h3').text()
        }
        // alert(newFilm.title);
        $.ajax({
          type: 'POST',
          data: newFilm,
          url: '/index',
          dataType: 'JSON'
        }).done(function(response) {
          
        })
      });

      // $getJSON('/favorites', function(data) {
      //   var favoritesArray = [];
      // });

      
        

      
      // createFavorite = function()
      // $.http.get('/favorites')-----displays favorites

    });
  });
});