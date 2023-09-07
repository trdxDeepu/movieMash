/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navbar, Logo, NumResult } from "./components/Navbar";
import Box from "./components/Box";
import MainItem from "./components/MainItem";
import { MovieList, MovieDetails } from "./components/MovieList";
import { WatchedMovieList } from "./components/WatchedMovieList";
import Summary from "./components/Summary";
import Search from "./components/Search";
import BeatLoader from "react-spinners/BeatLoader";

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  return (
    
    <>
      <Navbar>
        <Logo />
        <Search
          setMovies={setMovies}
          setError={setError}
          setLoading={setLoading}
          setSelectedID={setSelectedID}
        />
        <NumResult movies={movies} />
      </Navbar>
      <MainItem>
        <Box>
          {loading && <BeatLoader color="#626665" className="loader" />}
          {!loading && !error && (
            <MovieList movies={movies} setSelectedID={setSelectedID} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </MainItem>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🌋</span>
      {message}
    </p>
  );
}
