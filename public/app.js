    class Hello extends React.Component {
        componentWillMount() {
            return console.log('In componentWillMount')
        }
        handleSubmit() {
            let movie = {
                title: this.title.value,
                genre: this.genre.value,
                year: this.year.value,
                actors: this.actors.value.split(','),
                rating: this.rating.value
            }
            console.log(movie);

            $.post( "http://localhost:8080/api/movies", movie );
        }

        handleDelete() {
            let deleteId = this.deleteMovie.value;
            $.ajax({
                url: 'http://localhost:8080/api/movies/' + deleteTitle,
                type: 'DELETE',
                success: function(result) {
                }
            });
        }

        handleGetMovies() {
            $.get( "http://localhost:8080/api/movies", function( movies ) {
                movies.forEach(function( movie ) {
                    $('#movieList').append('<tr><td>' + movie.title + '</td><td>' + movie.genre + '</td><td>' + movie.year + 
                    '</td><td>' + movie.actors + '</td><td>' + movie.rating + '</td><td><button id=' + movie._id + 
                    'onClick={this.handleDelete.bind(this.id)}' +'>Delete Title</button></td></tr>');
                })
            });
        }

        render() {
            return (   
                <div>     
                    <input placeholder="Title" id="title" type="text" ref={(input) => { this.title = input; }}/>  
                    <input placeholder="Genre" id="genre" type="text" ref={(input) => { this.genre = input; }}/> 
                    <input placeholder="Year" id="year" type="text" ref={(input) => { this.year = input; }}/> 
                    <input placeholder="Rober De Niro, Joe Pesci" id="actors" type="text" ref={(input) => { this.actors = input; }}/> 
                    <input placeholder="Rating" id="rating" type="text" ref={(input) => { this.rating = input; }}/> 
                    <button onClick={this.handleSubmit.bind(this)}>Add</button><br></br>
                    <button onClick={this.handleGetMovies.bind(this)}>Show All Movies</button>

                    <table id ="movieList" className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Actors</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </tbody>
                    </table>

                </div>  
            )
        }
    };

    ReactDOM.render(
        <Hello name="World" />,
        document.getElementById('container')
    );