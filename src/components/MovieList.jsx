/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

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
  function handleCloseMovie() {
    setSelectedID(null);
  }
  return (
    <div className="details">
      <button className="btn-back" onClick={handleCloseMovie}>
        &larr;
      </button>
      {selectedID}
    </div>
  );
}

export { MovieList, Movie, MovieDetails };
