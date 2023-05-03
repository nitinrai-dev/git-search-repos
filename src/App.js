import { useState } from "react";
import "./index.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
  
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchTerm}`
    );
    const data = await response.json();
    setSearchResults(data.items);
    setLoader(false);
  };

  console.log(searchResults);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label htmlFor="search-input">Search for GitHub repositories:</label>
          <br />
          <input
            id="search-input"
            placeholder="Search..."
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {loader && <div className="spinner"></div>}

      {searchResults.length > 0 && !loader && (
        <ul className="card-wrapper">
          {searchResults.map((result) => (
            <li key={result.id}>
              <div className="card">
                <div className="card-image">
                  <img
                    src={result.owner.avatar_url}
                    alt={`Avatar of ${result.owner.login}`}
                  />
                  <small>{result.language}</small>
                </div>
                <h4>{result.full_name}</h4>
                <small>{result.description}</small>
                <div>
                  Stars: {result.stargazers_count}
                  <br />
                  Watch: {result.watchers_count}
                  <br />
                  Score: {result.score}
                  <br />
                  Name: {result.name}
                  <br />
                </div>
                <div>Created: {formatDate(result.created_at)}</div>
                <div>Updated: {formatDate(result.updated_at)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
