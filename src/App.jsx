/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Navbar, Logo, NumResult } from "./components/Navbar";
import Box from "./components/Box";
import MainItem from "./components/MainItem";
import { MovieList, Movie } from "./components/MovieList";
import { WatchedMovieList, WatchedMovie } from "./components/WatchedMovieList";
import Summary from "./components/Summary";
import Search from "./components/Search";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];



const key = "8f221be1";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=inception`)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search));
  }, []);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </Navbar>
      <MainItem>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </MainItem>
    </>
  );
}
