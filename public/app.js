//     var movies = [
//   {
//     "_id": "586eb8c708e54d833f0ebe58",
//     "rating": "4/5",
//     "year": "1981",
//     "genre": "Action",
//     "title": "Rocky",
//     "__v": 0,
//     "actors": [
//       "Sly Stallone",
//       " Russian Dude"
//     ]
//   },
//   {
//     "_id": "586ebfddf0a2c285b81df51f",
//     "rating": "5/5",
//     "year": "2016",
//     "genre": "Comedy",
//     "title": "Why Him",
//     "__v": 0,
//     "actors": [
//       "[Brian Cranston]"
//     ]
//   },
//   {
//     "_id": "586ebfddf0a2c285b81df51f",
//     "rating": "5/5",
//     "year": "2016",
//     "genre": "Comedy",
//     "title": "Why Him",
//     "__v": 0,
//     "actors": [
//       "Billy Bob"
//     ]
//   },
//   {
//     "_id": "586ebfddf0a2c285b81df51f",
//     "rating": "5/5",
//     "year": "2016",
//     "genre": "Comedy",
//     "title": "Why Him",
//     "__v": 0,
//     "actors": [
//       "George Clooney"
//     ]
//   }
// ]
    
    class MoviesList extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                movies: []
            }
        }
        componentWillMount() {
            console.log('In Mount')
        }

        actionGetAllMovies() {
            var list;
                $.get( "http://localhost:8080/api/movies", function( movieList ) {
                    list = movieList;
                }).done(function() {
                    console.log('List : ', list)
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
            const {movies} = this.state; 
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
                    <input placeholder="Title" id="title" type="text" ref={(input) => { this.title = input; }}/>  
                    <input placeholder="Genre" id="genre" type="text" ref={(input) => { this.genre = input; }}/> 
                    <input placeholder="Year" id="year" type="text" ref={(input) => { this.year = input; }}/> 
                    <input placeholder="Rober De Niro, Joe Pesci" id="actors" type="text" ref={(input) => { this.actors = input; }}/> 
                    <input placeholder="Rating" id="rating" type="text" ref={(input) => { this.rating = input; }}/> 
                    <button onClick={this.handleSubmit.bind(this)}>Add</button><br></br>
                    <button onClick={this.actionGetAllMovies.bind(this)}>Show All</button><br></br>

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