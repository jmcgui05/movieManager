    class MoviesList extends React.Component {
        constructor(props) {
            super(props);

            this.state = {}

        }
        componentWillMount() {
            console.log('In Mount');
            var list;
            $.ajax({
                url: 'http://localhost:8080/api/movies',
                type: 'GET',
                async: false,
                success: function(result) {
                    list = result;
                }
            });
            this.setState({movies: list})
        }

        actionGetAllMovies() {
            var list;
                $.get( "http://localhost:8080/api/movies", function( movieList ) {
                    list = movieList;
                })
                this.setState({movies: list});
        }

        handleSubmit() {
            let movie = {
                title: this.title.value,
                genre: this.genre.value,
                year: this.year.value,
                actors: this.actors.value.split(','),
                rating: this.rating.value
            }
            this.state.movies.push(movie);
            this.setState({movies: this.state.movies});
            $.post( "http://localhost:8080/api/movies", movie );
            $('#title').val("");
            $('#genre').val("");
            $('#year').val("");
            $('#actors').val("");
            $('#rating').val("");
        }

        handleDelete(movie) {
            let deleteId = movie._id;
            this.state.movies.splice(this.state.movies.indexOf(movie), 1);
            this.setState({movies: this.state.movies});

            $.ajax({
                url: 'http://localhost:8080/api/movies/' + movie._id,
                type: 'DELETE',
                success: function(result) {
                }
            });
        }

        render() {
            const movies = this.state.movies; 
            var self = this;
            const movieNode = movies.map(function(mov) {
                return (
                    <tr>
                    <td key={mov._id}>{mov.title}</td><td>{mov.genre}</td><td>{mov.year}</td><td>{mov.actors}</td><td>{mov.rating}</td><td><button onClick={self.handleDelete.bind(self, mov)}>Delete</button></td>
                    </tr>
                )
            })
            return (   

                <div>  
                    <h1>Movie Manager</h1>   
                    <input placeholder="Title" id="title" type="text" ref={(input) => { this.title = input; }}/>  
                    <input placeholder="Genre" id="genre" type="text" ref={(input) => { this.genre = input; }}/> 
                    <input placeholder="Year" id="year" type="text" ref={(input) => { this.year = input; }}/> 
                    <input placeholder="Rober De Niro, Joe Pesci" id="actors" type="text" ref={(input) => { this.actors = input; }}/> 
                    <input placeholder="Rating" id="rating" type="text" ref={(input) => { this.rating = input; }}/> 
                    <button onClick={this.handleSubmit.bind(this)} id="submitButton">Add</button>
                    <button onClick={this.actionGetAllMovies.bind(this)} id="getButton">Show All</button>
                    <div><br></br></div>

                    <table id='movieList' ref={(list) => { this.movieList = list;}}>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Actors</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                            {movieNode}
                    </tbody>
                    </table>
                    <ul>
                    </ul>
                </div>  
            )
        }
    };

    ReactDOM.render(
        <MoviesList/>,
        document.getElementById('container')
    );