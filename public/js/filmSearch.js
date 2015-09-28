$(document).ready(function() {
  $('#search').on('click', function() {
    var search = $('#keyword').val();

    // API call to the website.  Will return JSON dat
    $.getJSON('http://www.omdbapi.com/?s='+search+'&y=&plot&tomatoes=true&r=json', function(response) {
      $.each(response.Search, function(i, movie) {
        $('.movie-list').append('<h3>'+movie.Title+'<span><button class="show">details</button></span></h3><div class="details"><ul>'+
        '<li>Year: '+movie.Year+'</li><li>Title: '+movie.Type+'</li><li>imdb: '+movie.imdbID+'</li></ul><button class="save-movie">Favorite</button></div>');        
      
        $('.movie-list h3:eq('+i+') .show').on('click', function() {
          $('.details:eq('+i+')').toggle();
        });

        // save favorites
        $('.save-movie:eq('+i+')').on('click', function() {
          $.ajax({
            type: 'POST',
            data: movie,
            url: '/index',
            dataType: 'JSON'
          }).done(function() {
             // $('.save-movie:eq('+i+')').append('<span><h4>You saved this movie!</h4></span>)
             // alert(movie); 
          });
        });
        
      });
      
      // display favorites
      
    });
  });
  // $('#faves').on('click', function() {
        
  //       $.ajax({
  //         type: 'GET',
  //         data: data,
  //         url: '/favorites',
  //         dataType: 'JSON'
  //       }).done(function(response) {
  //         alert("hello!");
  //         // $('body').append('#json')
          
  //       });
  // });
});

