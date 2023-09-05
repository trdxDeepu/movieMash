/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";

function Navbar({ children }) {
    const [query, setQuery] = useState("");
  
    return <nav className="nav-bar">{children}</nav>;
  }
  
  function Logo() {
    return (
      <div className="logo">
        <span role="img">🍿</span>
        <h1>MovieMash</h1>
      </div>
    );
  }
  
  function NumResult({ movies }) {
    return (
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    );
  }

  export {Navbar,Logo,NumResult}