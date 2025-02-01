import { Main } from "./Main";
import SpreadsheetReader from "./DataHandling/SpreadSheetReader";
import React, { useEffect, useRef, useState } from "react";
import "./STYLE/StockSheet/calc.css";
import { Calc } from "./Components/Calc";
import TestLanding from "./test-landing";

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Main />
      {/* <TestLanding /> */}

      {/* <Calculator /> */}
      {/* <ScrollableList /> */}
      {/* <SpreadsheetReader /> */}
    </div>
  );
}

function NavBar() {
  return <div className="navBar">navBar</div>;
}

//------

function ScrollableList() {
  const [searchQuery, setSearchQuery] = useState("");
  const list = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Roshan",
    "Richar",
    "Ram",
    "roshit",
    "Raju",
  ];

  // Create a ref for each list item
  const itemRefs = useRef([]);

  // Ensure refs array has the same length as the list
  itemRefs.current = list.map(
    (_, i) => itemRefs.current[i] || React.createRef()
  );
  console.log(itemRefs.current[1], "from ChatGPT CODE");
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Find the index of the item that matches the search query
    const index = list.findIndex((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    // Scroll to the matching item
    if (index !== -1) {
      itemRefs.current[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />
      <div
        style={{
          maxHeight: "200px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <ul>
          {list.map((item, index) => (
            <li
              key={index}
              ref={itemRefs.current[index]}
              style={{
                padding: "10px",
                backgroundColor:
                  searchQuery &&
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                    ? "#f0f8ff"
                    : "#fff",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
