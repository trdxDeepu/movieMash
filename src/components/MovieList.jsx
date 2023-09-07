/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const key = "8f221be1";

function MovieList({ movies, setSelectedID }) {
  function handleSelected(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelected={handleSelected} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelected }) {
  return (
    <li
      onClick={() => {
        onSelected(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedID, setSelectedID }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  console.log(title, year, actors);

  function handleCloseMovie() {
    setSelectedID(null);
  }

  useEffect(() => {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
      );
      const data = await res.json();
      setMovie(data);
    }
    getMovieDetails();
  }, []);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie.`} />
        <div className="details-overview">
          <h2 className="title">{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB rating
          </p>
        </div>
      </header>
      <section>
        <StarRating/>
        <p>
          <em>{plot}</em>
        </p>
        <p>Straing : {actors}</p>
        <p>Directed by : {director}</p>
      </section>
    </div>
  );
}

export { MovieList, Movie, MovieDetails };
