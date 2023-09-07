/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const key = "8f221be1";
export default function Search({ setMovies, setError, setLoading }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not Found");
        setMovies(data.Search);
        console.log(data.Search);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
