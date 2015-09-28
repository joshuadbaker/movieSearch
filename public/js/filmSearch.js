$(document).ready(function() {
  $('#search').on('click', function() {
    var search = $('#keyword').val();

    // API call to the website.  Returns JSON data
    $.getJSON('https://www.omdbapi.com/?s='+search+'&y=&plot&tomatoes=true&r=json', function(response) {
      
      // Interate over the JSON file with the index of each object and the object itself
      $.each(response.Search, function(i, movie) {
        
        // Use jQuery to add html elements to display the attributes of each movie object from JSON
        $('.movie-list').append('<h3>'+movie.Title+'<span><button class="show">details</button></span></h3><div class="details"><ul>'+
        '<li>Year: '+movie.Year+'</li><li>Title: '+movie.Type+'</li><li>imdb: '+movie.imdbID+'</li></ul><button class="save-movie">Favorite</button></div>');        
        
        // Use toggle to show/hide the details of each movie
        $('.movie-list h3:eq('+i+') .show').on('click', function() {
          $('.details:eq('+i+')').toggle();
        });

        // save favorites with AJAX on a click event created by the save movie button
        // This is currently working as expected.  Data is being written in the data.json file and it displays on '/favorites' in the browser, but doesn't appear to be giving a success or error alert as coded below.  
        $('.save-movie:eq('+i+')').on('click', function() {
          $.ajax({
            type: 'POST',
            data: movie,
            url: '/index',
            dataType: 'JSON',
            success: function(movie) {
              alert(movie.Title + ' movie saved!');
              // $('.save-movie:eq('+i+')').remove();
              // $('.movie-list:eq('+i+')').append('<h5>Movie Saved!</h5>');
            },
            error: function(xhr, status, errorThrown) {
              alert('Sorry there was a an error.');
              console.log( "Error: " + errorThrown );
              console.log( "Status: " + status );
            },
            complete: function(xhr, status) {
              alert('The request is complete!');
            }
          });
        }); 
      });     
    });
  });
});

