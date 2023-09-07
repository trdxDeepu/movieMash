/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { BeatLoader } from "react-spinners";

const key = "8f221be1";

function MovieList({ movies, setSelectedID }) {
  function handleSelected(id) {
    setSelectedID((selectedId) => (id === selectedId ? null : id));
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

function MovieDetails({ selectedID, setSelectedID, watched, setWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

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

  function handleCloseMovie() {
    setSelectedID(null);
  }

  console.log(watched);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedID]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    console.log(newWatchedMovie.userRating);
    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "MovieMash";
      console.log("clean up funtion");
    };
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        handleCloseMovie();
        console.log("Your Escape  Worked");
      }
    }

    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [handleCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <BeatLoader color="#626665" className="loader" />
      ) : (
        <>
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
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Straing : {actors}</p>
            <p>Directed by : {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export { MovieList, Movie, MovieDetails };
