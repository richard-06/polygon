import { Main } from "./Main";
import SpreadsheetReader from "./DataHandling/SpreadSheetReader";
import React, { useEffect, useRef, useState } from "react";
import "./STYLE/StockSheet/calc.css";
import "./STYLE/StockSheet/ManageItems.css";
import "./STYLE/StockSheet/StockTakeHist.css";
import { Calc } from "./Components/Calc";
import TestLanding from "./test-landing";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button, Empty } from "antd";
import NavBar from "./Components/NavBar";
import { StockTakeHist } from "./Components/StockTakeHist";
import { ManageItems } from "./Components/ManageItems";

export default function App() {
  const [dev, setDev] = useState(false);
  const [page, setPage] = useState("StockTake");
  return (
    <div className="app">
      <div className="hor-nav"></div>
      <NavBar setPage={setPage} page={page} />

      {/* {dev ? <TestLanding setDev={setDev} /> : <Main setDev={setDev} />} */}

      {page == "StockTake" ? <Main /> : ""}
      {page == "PrevData" ? <StockTakeHist /> : ""}
      {page == "EditItems" ? <ManageItems /> : ""}

      {/* <Calculator /> */}
      {/* <ScrollableList /> */}
      {/* <SpreadsheetReader /> */}
    </div>
  );
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
