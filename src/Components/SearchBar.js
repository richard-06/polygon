import { useState, useEffect } from "react";
import { fetchData } from "../DataHandling/data"; // Import fetchData function

export function SearchBar({ placeholder = "Search...", setSelectedItem }) {
  const [data, setData] = useState([]); // Store fetched data
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(); // Wait for fetchData to complete
      setData(result || []); // Ensure result is always an array
    };

    getData();
  }, []);

  // Extract only valid Names
  const values = data
    .map((item) => item?.Name) // Use optional chaining to prevent errors
    .filter((name) => name !== undefined); // Remove undefined values

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Ensure `values` only contains strings before filtering
    if (input.trim() !== "") {
      const results = values
        .filter(
          (item) =>
            typeof item === "string" &&
            item.toLowerCase().includes(input.toLowerCase())
        )
        .slice(0, 5); // Limit to first 5 matches
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="search-container">
      <form className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <button type="button" className="search-button">
          🔍
        </button>
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
