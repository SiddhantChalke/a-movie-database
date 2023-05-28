import {useEffect, useState} from 'react'
import  './App.css';
import SearchIcon from './Search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=75bc6f6b'; // 75bc6f6b api key

const App = ()=> {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMov = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMov('Avatar')
    
  },[])

  return (
    <div className="App">
      <h1>AMDb-a movie database</h1>
      <div className="search">
        <input type="text" placeholder='Search for movies' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt='search' onClick={()=>searchMov(searchTerm)}/>
      </div>
      {
        movies?.length > 0
        ?(
          <div className="container">
            {movies.map((movie)=>(
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found !</h2>
          </div>
        )
      }
      {/* Above, we're dynamically looping thru movies arr fetched from the api
      and passing each movie as a prop to render it as a card*/}
    </div>
  );
}

export default App;
