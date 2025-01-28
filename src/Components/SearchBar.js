import { useState } from "react";

export function SearchBar({
  placeholder = "Search...",
  data = [],
  setSelectedItem,
}) {
  const values = data.map((item) => item.Name);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Filter the data based on the query
    if (input.trim() !== "") {
      const results = values
        .filter((item) => item.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 5); // Limit to the first 5 matches
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="search-container">
      <form className="search-bar">
        <input
          onClick={handleInputChange}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <button className="search-button">🔍</button>
      </form>

      {/* Display filtered results */}
      {filteredResults.length > 0 && (
        <ul className="results-list">
          {filteredResults.map((result, index) => (
            <li
              onClick={() => {
                setSelectedItem(result);
                setFilteredResults([]);
              }}
              key={index}
              className="result-item"
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
