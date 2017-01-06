'use strict'

//get request for all movies and jquery append to table
function actionGetAllMovies() {
    var list;
    $.get( "http://localhost:8080/api/movies", function( movieList ) {
        list = movieList;
    }).done(function() {
        list.forEach(function(movie) {
            $('#movieTable').append(
                '<tr id="' + movie._id + '"><td>' + movie.title + '</td><td>' + movie.genre + '</td><td>' + movie.year + '</td><td>' + 
                movie.actors + '</td><td>' + movie.rating + '</td><td><button id="' + movie._id + '" onclick="handleDelete(this)">Delete</td></tr>'
            )
        })
    })
}

//reset the input fields
function clearArea() {
        $('#title').val("");
        $('#genre').val("");
        $('#year').val("");
        $('#actors').val("");
        $('#rating').val("");
}

//get the input field values and post request to save the new movie
//improvement would be to add directly to the list
function handleSubmit() {
    let movie = {
        title: $('#title').val(),
        genre: $('#genre').val(),
        year: $('#year').val(),
        actors: $('#actors').val().split(','),
        rating: $('#rating').val()
    }
    $.post( "http://localhost:8080/api/movies", movie );
}

//delete request by id and remove it from list
function handleDelete(movie) {
    var id = $(movie).attr('id');
    $( "#" + id ).remove();
    let deleteId = id;
    $.ajax({
        url: 'http://localhost:8080/api/movies/' + id,
        type: 'DELETE',
        success: function(result) {
        }
    });
}
