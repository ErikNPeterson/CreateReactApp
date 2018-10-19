import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log("this is my initializer");

    // const movies = [
    //   {id: 0, poster_src: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg", title: "Avengers: Infinity War", overview: "As the bla bla blah AND THEN MORE BLAH BLAH BLAH... Thanos win's!"},
    //   {id: 1, poster_src: "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg", title: "The Avengers", overview: "This is my second overview"},
    // ]
    
    // var movieRows = [];
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state ={rows: movieRows}

    this.performSearch("ant man");
  }

  performSearch(searchTerm){
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search?api_key=228d2a3b60dddb8c258df6928f086459&query=" + searchTerm ;
    $.ajax({
      url: urlString,
      success:(searchResults) => {
        console.log("Fetched data successfully");
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0]);

        var movieRows = []; 

        results.forEach((movie) => {
          movie.poster_src = "";
          console.log(movie.title)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data");
      }
    })

  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="100" src="image2vector.svg"/>
              </td>
              <td width="15"/>
              <td>
                <h1>Movies DB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 50,
        }} onChange={this.searchChangeHandler.bind(this)}placeholder="Enter search term"/>  

        {this.state.rows}



      </div>
    );
  }
}

export default App;

