/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navbar, Logo, NumResult } from "./components/Navbar";
import Box from "./components/Box";
import MainItem from "./components/MainItem";
import { MovieList, Movie } from "./components/MovieList";
import { WatchedMovieList, WatchedMovie } from "./components/WatchedMovieList";
import Summary from "./components/Summary";
import Search from "./components/Search";

const tempQuery = "Mission Impossible";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  return (
    <>
      <Navbar>
        <Logo />
        <Search
          setMovies={setMovies}
          setError={setError}
          setLoading={setLoading}
        />
        <NumResult movies={movies} />
      </Navbar>
      <MainItem>
        <Box>
          {loading && <Loader />}
          {!loading && !error && <MovieList movies={movies} setSelectedID={setSelectedID} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails selectedID={selectedID} />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </MainItem>
    </>
  );
}



function MovieDetails({ selectedID }) {
  return <div className="details">{selectedID}</div>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🌋</span>
      {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading</p>;
}
