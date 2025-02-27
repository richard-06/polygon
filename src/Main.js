import { useState } from "react";
import "./STYLE/StockSheet/searchBar.css";
import "./STYLE/StockSheet/itemList.css";
import "./STYLE/StockSheet/calc.css";
import "./STYLE/StockSheet/stockBody.css";
import "./STYLE/StockSheet/sideBar.css";
import "./STYLE/StockSheet/stocktakeNav.css";
import { SearchBar } from "./Components/SearchBar";
import { ItemList } from "./Components/ItemList";
// import { product } from "./DataHandling/data";
import { Calc } from "./Components/Calc";
import SpreadsheetReader from "./DataHandling/SpreadSheetReader";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";

export function Main({ setDev }) {
  const [val, setVal] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [data, setData] = useState([]);

  const [type, setType] = useState("Type");
  const [subType, setSubType] = useState("Sub Type");

  return (
    <div className="main">
      {/* <div
        className="DevMode"
        onClick={() => {
          setDev(true);
        }}
      >
        Dev Mode selectedItem: {selectedItem}
      </div> */}
      <h2>
        <div className="stocktake-title">{` Stock Take`}</div>
        {/* {selectedItem.length > 25
          ? selectedItem.slice(0, 22) + "..."
          : selectedItem} */}
      </h2>

      <SearchBar
        setSelectedItem={setSelectedItem}
        setType={setType}
        setSubType={setSubType}
      />
      <div className="stock-body">
        <ItemList
          // product={product}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          data={data}
          setData={setData}
          setVal={setVal}
          type={type}
          setType={setType}
          subType={subType}
          setSubType={setSubType}
        />

        <SideBar
          data={data}
          setData={setData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          val={val}
          setVal={setVal}
        />
      </div>
    </div>
  );
}

function SideBar({
  selectedItem,
  setSelectedItem,
  data,
  setData,
  val,
  setVal,
}) {
  const date = new Date(Date.now());
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = days[date.getDay()];
  const formatted = date.toLocaleDateString("en-GB").split("/").join("-");
  console.log(formatted); // Output: "13-02-2024"
  return (
    <div className="side-bar">
      <Calc
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        data={data}
        setData={setData}
        val={val}
        setVal={setVal}
      />
      {/* <div className="side-nav-top">
        <div className="side-bar-day">{dayName}</div>
        <div className="side-bar-date">{formatted}</div>
        <Button
          style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          className="side-bar-complete"
        >
          Complete
        </Button>
      </div> */}
    </div>
  );
}
